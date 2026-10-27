/* Document-led palette library, repeat editor and composition controls. */
const vintage=[
 ['松间茶事','#68806b','#d8c294','#f2ecdf','#925b42'],
 ['绛雪海棠','#964f59','#dfc9af','#f5eee5','#617c6e'],
 ['雾蓝旧笺','#567c89','#d5b791','#f1e9da','#a46e5b'],
 ['柿染山岚','#b6774f','#3d7069','#f3e8d3','#d2bb83'],
 ['烟紫莲塘','#82738b','#b8be95','#ede8dc','#516b61'],
 ['墨竹金砂','#526251','#c4a368','#eae1d0','#914e42']
];
const modern=[
 ['晴空杏橘','#287d98','#e8ad54','#fff4df','#d87848'],
 ['薄荷莓果','#51a28c','#dc8192','#fff1e3','#a95471'],
 ['鸢尾青柠','#817bb2','#bccb79','#f6f2e8','#5b8066'],
 ['海盐珊瑚','#5d9fa6','#e79a82','#fcf3e8','#366d7c'],
 ['樱桃奶油','#a94255','#edd9ae','#fff6e6','#588b76'],
 ['靛蓝麦穗','#285b78','#d9b96b','#f6edda','#a45d46'],
 ['桃粉松绿','#e5a2b2','#39816d','#fff1dc','#bd7961'],
 ['可可燕麦','#846353','#d8c5a3','#f6eee3','#8eaa9a']
];
const studioDefaults={...state,type:0,density:20,width:18,offsetX:0,offsetY:0,palette:vintage[0][0],a:vintage[0][1],b:vintage[0][2],bg:vintage[0][3],c:vintage[0][4],mode:'fixed',object:0,designMode:'single',secondary:3,layout:'bands',over:1,under:1,matrix:null,strandColors:{},presentation:'ivory',fanShape:'round'};
let designHistory=[],designFuture=[],restored=false,autosaveTimer;
try{const d=JSON.parse(localStorage.getItem('zhuxu-studio-v3'));if(d&&Number.isInteger(d.type)&&d.type>=0&&d.type<6&&[d.a,d.b,d.bg,d.c].every(x=>/^#[0-9a-f]{6}$/i.test(x))){state={...studioDefaults,...d,density:Math.max(10,Math.min(36,+d.density||20)),width:Math.max(2,Math.min(34,+d.width||18)),designMode:['single','mix','custom'].includes(d.designMode)?d.designMode:'single',secondary:Number.isInteger(d.secondary)&&d.secondary>=0&&d.secondary<6?d.secondary:3,matrix:Array.isArray(d.matrix)&&d.matrix.length===36?d.matrix.map(Boolean):null};restored=true}else state={...studioDefaults}}catch{state={...studioDefaults}}
if(state.designMode==='mix'&&![0,3].includes(state.type))state.designMode='single';
state.secondary=state.type===0?3:0;
state.layout=['bands','checker','frame'].includes(state.layout)?state.layout:'bands';
state.object=[0,2,3,4].includes(state.object)?state.object:0;
state.over=Math.max(1,Math.min(4,Math.round(+state.over||1)));state.under=Math.max(1,Math.min(4,Math.round(+state.under||1)));
state.offsetX=Math.max(0,Math.min(60,+state.offsetX||0));state.offsetY=Math.max(0,Math.min(60,+state.offsetY||0));
state.mode=state.mode==='painting'||state.mode==='modern'?'modern':'fixed';
if(state.designMode==='custom'){state.type=0;state.matrix=state.matrix||matrixDefault()}
designHistory=[JSON.stringify(state)];
desc.splice(0,desc.length,'一挑一压：每个交叉点轮流由经篾或纬篾在上，下一行错开一格。','三组平行竹篾沿三个方向交织，在交点轮换上下，形成六角孔与三角小孔。','以三向编织为底，再穿入细篾作装饰；点缀色用于穿丝。','斜纹挑压单元逐行移动，再反向排列，织出连续的人字纹。','三向竹篾在交叉处错层，留下细小三角孔。','放射篾条与环绕篾条交替穿插，适合探索器底的圆形编织。');
$('.control-section').insertAdjacentHTML('beforeend',`<div class="design-mode" aria-label="创作方式"><button data-design="single">选一种编法</button><button data-design="mix">连续变编</button><button data-design="custom">自定义挑压</button></div><div id="mixControls" hidden><label>同一经纬中的另一种挑压<select id="secondaryMethod">${[0,3].map(i=>`<option value="${i}">${names[i]}</option>`).join('')}</select></label><label>挑压分区<select id="mixLayout"><option value="bands">平编与人字交替</option><option value="checker">方格变编</option><option value="frame">平编与人字回纹</option></select></label><p class="assist-caption">经纬篾条贯穿整幅，只改变交叉点的上下关系。每 16 格循环，组合固定为平编与人字编。</p></div><div id="crossControls"><div class="rule-row"><label>挑（经篾在上）<select id="overCount"><option>1</option><option>2</option><option>3</option><option>4</option></select></label><label>压（纬篾在上）<select id="underCount"><option>1</option><option>2</option><option>3</option><option>4</option></select></label></div><p class="assist-caption" id="ruleHint">一挑一压，逐行错位。用下方小样查看上下层次。</p></div><div id="customControls" hidden><p class="assist-caption">点击交叉点切换谁在上。6 × 6 单元会重复铺满整幅纹样。</p><div id="weaveMatrix" class="weave-matrix" aria-label="六乘六挑压编辑器"></div><div class="matrix-legend"><i></i> 经篾在上 <i></i> 纬篾在上</div><button id="resetMatrix" class="quiet-button">恢复一挑一压</button></div>`);
$('.canvas-toolbar').insertAdjacentHTML('beforeend','<div class="history-actions"><button id="undo" aria-label="撤销修改">↶</button><button id="redo" aria-label="重做修改">↷</button></div>');
$('.canvas-bottom').insertAdjacentHTML('afterend','<div class="weave-feedback"><div><b id="weaveStatus">一挑一压</b><span id="weaveAdvice"></span></div><span id="saveStatus" role="status">已准备</span></div><div class="crossing-study"><div id="crossingPreview"></div><div><span class="mini-label">看懂一个交叉点</span><h4>篾条有上下，纹样才有层次。</h4><p>亮边是上层竹篾，交点下方的暗影是被压住的竹篾。十字编会逐格交换上下关系。</p></div></div>');
$('#width').max=34;$('#density').max=36;
$('.custom-colors').insertAdjacentHTML('beforeend','<label>点缀<input type="color" id="colorC" value="#75694f"></label>');
$('.palette-tabs button[data-mode="fixed"]').textContent='复古配色';
$('#palettes').insertAdjacentHTML('afterend','<div class="palette-detail"><span id="paletteStory"></span><button id="swapColors" aria-label="互换经线和纬线颜色">经纬互换 ⇄</button></div>');
$('#studio .section-heading h2').innerHTML='一挑一压，<span>自在成编。</span>';
$('#patterns .caption').textContent='从经纬平编到三向编织，观察每个交叉点的上下关系。以下为数字结构示意，实际制作品仍需结合竹篾材性调整。';
$('.design-mode').insertAdjacentHTML('afterend','<p class="assist-caption" id="mixEligibility"></p>');
function makePattern(type,small=false){return Bamboo.pattern(type,{spacing:small?92:640/state.density,width:small?37:state.width,x:state.offsetX,y:state.offsetY,a:state.a,b:state.b,c:state.c,bg:state.bg,over:state.over,under:state.under,matrix:state.designMode==='custom'?state.matrix:null,mix:state.designMode==='mix',layout:state.layout,strandColors:state.strandColors})}
svg=function(){return makePattern(state.type)};
function matrixDefault(){return Array.from({length:36},(_,i)=>(Math.floor(i/6)+i%6)%2===0)}
function drawMatrix(){if(!state.matrix)state.matrix=matrixDefault();$('#weaveMatrix').innerHTML=state.matrix.map((top,i)=>`<button class="${top?'warp-top':'weft-top'}" data-cell="${i}" aria-label="第${Math.floor(i/6)+1}行第${i%6+1}列，${top?'经篾':'纬篾'}在上，点击交换" aria-pressed="${top}"><span></span><i></i></button>`).join('');$('#weaveMatrix').style.setProperty('--warp',state.a);$('#weaveMatrix').style.setProperty('--weft',state.b);document.querySelectorAll('[data-cell]').forEach(b=>b.onclick=()=>{let i=+b.dataset.cell;state.matrix[i]=!state.matrix[i];changed();document.querySelector(`[data-cell="${i}"]`).focus()})}
palettes=function(){const list=state.mode==='fixed'?vintage:modern;$('#palettes').innerHTML=list.map((p,i)=>`<button class="palette ${state.palette===p[0]?'active':''}" data-palette="${i}" aria-pressed="${state.palette===p[0]}"><span class="swatches">${[p[1],p[2],p[4],p[3]].map(c=>`<i style="background:${c}"></i>`).join('')}</span>${p[0]}</button>`).join('');$('#paintingTools').hidden=false;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===state.mode));document.querySelectorAll('[data-palette]').forEach(b=>b.onclick=()=>{let p=list[+b.dataset.palette];[state.palette,state.a,state.b,state.bg,state.c]=p;changed();palettes()});$('#paletteStory').textContent='经 · 纬 · 点缀 · 底色 / 四色成组，自由替换'};
function validateWidth(){const limit=Math.floor(640/state.density*.82);if(state.width>limit){state.width=limit;return true}return false}
const previousRenderV3=render;
render=function(){
 validateWidth();previousRenderV3();
 const mixed=state.designMode==='mix',custom=state.designMode==='custom';
 $('#liveSummary').textContent=(custom?'自定义挑压':names[state.type])+(mixed?' × '+names[state.secondary]:'')+' · '+state.palette;
 $('#patternCode').textContent=custom?'CUSTOM / 6 × 6':mixed?'CONTINUOUS / 连续经纬':['PLAIN','HEXAGON','INLAY','TWILL','TRIANGLE','SPIRAL'][state.type];
 $('#colorC').value=state.c;$('#mixControls').hidden=!mixed;$('#customControls').hidden=!custom;
 $('#crossControls').hidden=custom||mixed||state.type!==0;
 $('#secondaryMethod').disabled=true;
 const mixButton=$('[data-design="mix"]');mixButton.disabled=![0,3].includes(state.type);mixButton.title=mixButton.disabled?'连续变编适用于十字编和人字编，请先选择其中一种':'在同一经纬网格中切换挑压';
 $('#mixEligibility').textContent=mixButton.disabled?'这类编法采用独立结构。选择十字编或人字编，即可体验连续变编。':'试试连续变编：同一组篾条，在平编与人字挑压之间变化。';
 if(state.type===0)$('#methodDescription').textContent=mixed?'完整经纬贯穿全幅，在分区内分别使用平编与人字挑压。':custom?'逐点编辑经纬谁在上，观察重复单元如何形成整体纹样。':`经篾挑 ${state.over}、压 ${state.under}，逐行错位；经纬连续交织。`;
 $('#ruleHint').textContent=`挑 ${state.over}、压 ${state.under}，逐行错位。挑压较长时，请留意下方浮线提示。`;
 $('#secondaryMethod').value=state.secondary;$('#mixLayout').value=state.layout;$('#overCount').value=state.over;$('#underCount').value=state.under;
 document.querySelectorAll('[data-design]').forEach(b=>{b.classList.toggle('active',b.dataset.design===state.designMode);b.setAttribute('aria-pressed',String(b.dataset.design===state.designMode))});
 const ratio=state.width/(640/state.density);let title=custom?'自定义挑压 · 6 × 6 循环':mixed?names[state.type]+' × '+names[state.secondary]:state.type===0?`挑 ${state.over} · 压 ${state.under}`:names[state.type]+' · 交错编织';
 $('#weaveStatus').textContent=title;$('#weaveAdvice').textContent=`${ratio>.65?'细密':ratio>.4?'适中':'疏朗'} · 竹篾宽 ${state.width} / 间距 ${(640/state.density-state.width).toFixed(1)}　${ratio<.3?'留孔较大，适合通透装饰。':ratio>.7?'篾条较密，适合袋身与书签。':'疏密平衡，可继续调整。'}`;
 $('#crossingPreview').innerHTML=Bamboo.pattern(custom?0:state.type,{spacing:80,width:47,a:state.a,b:state.b,c:state.c,bg:state.bg,over:state.over,under:state.under,matrix:custom?state.matrix:null,mix:mixed,layout:state.layout}).replace('viewBox="0 0 640 640"','viewBox="120 120 240 240"');
 if(mixed)$('#crossingPreview').innerHTML=makePattern(state.type);
 $('#materialPattern').textContent=title+' / '+state.palette;
 if(custom||mixed||[0,3].includes(state.type)){
 const audit=Bamboo.analyze(state.type,{matrix:custom?state.matrix:null,mix:mixed,layout:state.layout,over:state.over,under:state.under});
 $('#weaveAdvice').textContent+=' '+(audit.unbound?'有 '+audit.unbound+' 条经纬在循环内没有交织，请调整挑压。':audit.maxFloat>4?'最长浮线跨 '+audit.maxFloat+' 格，建议缩短连续挑压。':'交叉关系连续，最长浮线 '+audit.maxFloat+' 格。');
 }
 $('.crossing-study p').textContent=mixed?'完整经纬穿过分区边界；局部改变挑压，不裁断篾条。数字示意需结合竹篾厚度与弯曲能力打样。':custom?'点击左侧格点交换上下。若整行或整列都由同一方向在上，该方向就缺少交织约束。':'亮边表示上层篾条，暗影表示交叉遮挡。此处为结构示意，并非可直接投产的工艺图。';
 $('#colorC').disabled=state.type!==2;
 $('#colorC').parentElement.title=state.type===2?'穿丝编的细篾点缀色':'点缀色用于穿丝编，其他编法保留此颜色但不使用';
 renderObject();
 $('#undo').disabled=designHistory.length<2;$('#redo').disabled=!designFuture.length;
 if(custom)drawMatrix();
 clearTimeout(autosaveTimer);autosaveTimer=setTimeout(()=>{try{localStorage.setItem('zhuxu-studio-v3',JSON.stringify(state));$('#saveStatus').textContent='已自动保存至本机'}catch{$('#saveStatus').textContent='请导出保存'}},400);
};
function changed(record=true){render();if(record){const current=JSON.stringify(state);if(current!==designHistory[designHistory.length-1]){designHistory.push(current);if(designHistory.length>35)designHistory.shift();designFuture=[]}}$('#undo').disabled=designHistory.length<2;$('#redo').disabled=!designFuture.length}
function setMethod(i){state.type=i;state.matrix=null;if(state.designMode==='custom'||(state.designMode==='mix'&&![0,3].includes(i)))state.designMode='single';state.secondary=i===0?3:0;state.over=1;state.under=1;state.width=Math.round(640/state.density*([1,2,4].includes(i)?.28:.56));changed()}
$('#methods').innerHTML=names.map((n,i)=>`<button data-method="${i}">${n}</button>`).join('');
$('#patternCards').innerHTML=names.map((n,i)=>`<button class="pattern-card" data-method="${i}" aria-label="选择${n}并进入工坊"><div class="pattern-picture">${Bamboo.pattern(i,{spacing:48,width:[1,2,4].includes(i)?13:27,a:vintage[0][1],b:vintage[0][2],bg:vintage[0][3],c:vintage[0][4]})}</div><h3>${n}<span class="arrow">↗</span></h3><small>0${i+1} / ${['PLAIN','HEXAGON','INLAY','HERRINGBONE','TRIANGLE','SPIRAL'][i]}</small></button>`).join('');
document.querySelectorAll('[data-method]').forEach(b=>b.onclick=()=>{setMethod(+b.dataset.method);if(b.classList.contains('pattern-card'))$('#studio').scrollIntoView({behavior:'smooth'})});
document.querySelectorAll('[data-design]').forEach(b=>b.onclick=()=>{if(b.dataset.design==='mix'&&![0,3].includes(state.type))return;state.designMode=b.dataset.design;state.secondary=state.type===0?3:0;if(state.designMode==='custom'){state.type=0;state.matrix=state.matrix||matrixDefault()}changed()});
[['secondaryMethod','secondary'],['mixLayout','layout'],['overCount','over'],['underCount','under']].forEach(([id,key])=>$('#'+id).onchange=e=>{state[key]=key==='layout'?e.target.value:+e.target.value;changed()});
$('#resetMatrix').onclick=()=>{state.matrix=matrixDefault();changed()};
let scheduled=0;['density','width','offsetX','offsetY'].forEach(key=>{$('#'+key).oninput=e=>{state[key]=+e.target.value;if(!scheduled)scheduled=requestAnimationFrame(()=>{scheduled=0;render()})};$('#'+key).onchange=()=>changed()});
[['colorA','a'],['colorB','b'],['colorBg','bg'],['colorC','c']].forEach(([id,key])=>{$('#'+id).oninput=e=>{state[key]=e.target.value;state.palette='我的复古配色';render();palettes()};$('#'+id).onchange=()=>changed()});
$('#swapColors').onclick=()=>{[state.a,state.b]=[state.b,state.a];state.palette='我的复古配色';changed();palettes()};
$('#undo').onclick=()=>{if(designHistory.length<2)return;designFuture.push(designHistory.pop());state=JSON.parse(designHistory.at(-1));render();palettes()};$('#redo').onclick=()=>{if(!designFuture.length)return;let next=designFuture.pop();designHistory.push(next);state=JSON.parse(next);render();palettes()};
$('#reset').onclick=()=>{state={...studioDefaults};changed();palettes();toast('已恢复松间茶事 · 一挑一压')};
$('#save').onclick=()=>{try{localStorage.setItem('zhuxu-studio-v3',JSON.stringify(state));toast('方案已保存，包含配色、组合方式和挑压小样')}catch{toast('存储不可用，请导出纹样')}};
$('#export').onclick=()=>{download(new Blob([svg()],{type:'image/svg+xml'}),'竹序-'+(state.designMode==='mix'?names[state.type]+'-'+names[state.secondary]:state.designMode==='custom'?'自定义挑压':names[state.type])+'-'+state.palette+'.svg');toast('已导出完整纹样与上下层次')};
document.querySelectorAll('[data-object]').forEach(b=>b.onclick=()=>{state.object=+b.dataset.object;objectView='live';changed()});
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;palettes();changed()});
$('#tryPainting').onclick=()=>{state.mode='modern';palettes();changed();$('#studio').scrollIntoView({behavior:'smooth'})};
$('.canvas-bottom').insertAdjacentHTML('beforeend','<a class="primary" id="applyObject" href="#objects">看看我的作品 ↗</a>');
$('#applyObject').onclick=()=>{objectView='live';renderObject()};
objectView='live';
palettes();render();if(restored)$('#saveStatus').textContent='已恢复上次创作';
