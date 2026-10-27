const validSVG=s=>! /NaN|undefined/.test(s.replace(/data:image\/[a-z]+;base64,[A-Za-z0-9+\/=]+/g,''));
// DOM integration checks. Does not replace browser layout/canvas verification.
const {parseHTML}=require('../qa-tools/node_modules/linkedom');
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const path=require('node:path');const root=path.join(__dirname,'dist');
const b=require('./dist/weave-engine.js');let passed=0;
function test(name,fn){if(process.env.ZHUXU_TEST_PATTERN&&!new RegExp(process.env.ZHUXU_TEST_PATTERN).test(name))return;fn();passed++;console.log('PASS',name)}
test('plain alternates horizontally and vertically',()=>{for(let r=-8;r<16;r++)for(let c=-8;c<16;c++){assert.notEqual(b.overAt(0,r,c),b.overAt(0,r,c+1));assert.notEqual(b.overAt(0,r,c),b.overAt(0,r+1,c))}});
test('all continuous layouts have bound strands and floats <=4',()=>{for(const type of [0,3])for(const layout of ['bands','checker','frame']){const a=b.analyze(type,{mix:true,layout});assert.equal(a.unbound,0);assert(a.maxFloat<=4);const svg=b.pattern(type,{mix:true,layout});assert(!svg.includes('clipPath'));assert(validSVG(svg));for(let r=-16;r<16;r++)for(let c=-16;c<16;c++)assert.equal(b.overAt(type,r,c,{mix:true,layout}),b.overAt(type,r+16,c+16,{mix:true,layout}));}});
test('custom unbound rows and columns are detected',()=>assert.equal(b.analyze(0,{matrix:Array(36).fill(true)}).unbound,12));
test('over-under ratios 1..4 preserve specified count',()=>{for(let over=1;over<5;over++)for(let under=1;under<5;under++){let n=0;for(let c=0;c<over+under;c++)n+=b.overAt(0,0,c,{over,under});assert.equal(n,over)}});
const {document}=parseHTML(fs.readFileSync(path.join(root,'index.html'),'utf8'));const saved=new Map(),timers=new Map();let id=0;
saved.set('zhuxu-studio-v3',JSON.stringify({type:5,designMode:'mix',secondary:3,layout:'invalid',a:'#979e78',b:'#d2c3a0',c:'#75694f',bg:'#ece6d8',object:999,over:99,under:-5,density:100,width:100,offsetX:60,offsetY:60,mode:'invalid',palette:'旧方案'}));
const env={document,console,Blob,URL,Image:function(){},setTimeout:(f)=>{timers.set(++id,f);return id},clearTimeout:i=>timers.delete(i),requestAnimationFrame:f=>{f();return 0},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},fetch:async()=>({ok:true,blob:async()=>new Blob(['image'])})};env.window=env;
vm.createContext(env);const run=s=>vm.runInContext(s,env);const q=s=>document.querySelector(s);const click=s=>{const el=q(s);assert(el,s);assert(!el.disabled,s+' disabled');el.onclick({target:el})};
test('seven production scripts initialize against real DOM',()=>{for(const f of ['weave-engine.js','app.js','luxe.js','studio-v3.js','canvas-editor.js','assets/bag-mock-data.js','feedback-v6.js','assets/realism-data.js','realism-v10.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),env,{filename:f});assert(q('#livePattern svg'));assert(q('#modelStage svg'));assert.equal(document.querySelectorAll('#methods button').length,6)});
test('legacy spiral mix and invalid persisted parameters migrate safely',()=>{assert.equal(run('state.designMode'),'single');assert.equal(run('state.type'),5);assert.equal(run('state.object'),0);assert.equal(run('state.layout'),'bands');assert.equal(run('state.offsetX'),60);assert.equal(run('state.density'),36);assert.equal(run('state.over'),4);assert.equal(run('state.under'),1);click('#reset')});

(async()=>{
let mode='success',pendingImage,revoked=0,captured;
env.URL={createObjectURL:b=>{captured=b;return 'blob:test'},revokeObjectURL:()=>revoked++};
env.Image=function(){Object.defineProperty(this,'src',{set:()=>{pendingImage=this}})};
const create=document.createElement.bind(document);
document.createElement=name=>name==='canvas'?{getContext:()=>({drawImage:()=>{if(mode==='drawError')throw Error('draw')}}),toBlob:cb=>cb(mode==='nullBlob'?null:new Blob(['png']))}:create(name);
run('download=(blob,name)=>{window.exported={blob,name}}');
for(mode of ['success','loadError','nullBlob','drawError']){
 env.exported=null;const expected=q('#modelStage svg').outerHTML;const promise=q('#exportMock').onclick();assert(q('#exportMock').disabled);assert.equal(await captured.text(),expected);
 if(mode==='success'){const first=pendingImage;await q('#exportMock').onclick();assert.equal(first,pendingImage);run('state.object=2;renderObject()')}
 mode==='loadError'?pendingImage.onerror():pendingImage.onload();await promise;assert(!q('#exportMock').disabled);assert.equal(run('exportingMock'),false);
 if(mode==='success'){assert(env.exported.name.includes('手提包'));assert(env.exported.blob.size)}else{assert.equal(env.exported,null);assert(q('#toast').textContent.includes('未完成'))}
 console.log('PASS export '+mode);
}
assert.equal(revoked,4);console.log('PASS export snapshot, duplicate-click guard and URL cleanup');
})().catch(e=>{console.error(e);process.exitCode=1});