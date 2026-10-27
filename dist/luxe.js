// Full-surface material studies and separately labelled art-directed product scenes.

let objectView='live';
const stage=$('.mock-stage');
stage.insertAdjacentHTML('beforeend','<div class="model-stage" id="modelStage"></div><span class="stage-caption" id="stageCaption">写实概念陈列 · AI 创作</span>');
$('.object-info').insertAdjacentHTML('beforeend','<div class="view-modes"><button class="active" data-view="live">写实陈列</button><button data-view="scene">纹样原稿</button></div><p class="material-note" id="viewNote">完整器物的材质与光影参考。此陈列图为固定的 AI 写实概念图。</p><div class="material-details"><div>器物材质<b id="materialName">全竹编 · 竹篾包边</b></div><div>设计纹样<b id="materialPattern">十字编</b></div></div>');
$('.object-tag').textContent='以竹为骨，以编成器';
function materialSVG(){
 const raw=svg().replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'');
 const defs=`<defs><pattern id="woven" width="1" height="1" patternUnits="objectBoundingBox" viewBox="0 0 640 640" preserveAspectRatio="none">${raw}</pattern><linearGradient id="shade"><stop stop-color="#000" stop-opacity=".7"/><stop offset=".25" stop-color="#fff0cf" stop-opacity=".22"/><stop offset=".57" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></linearGradient><linearGradient id="edge"><stop stop-color="#716448"/><stop offset=".4" stop-color="#b9a683"/><stop offset=".55" stop-color="#d0bf9b"/><stop offset="1" stop-color="#827150"/></linearGradient><radialGradient id="light"><stop stop-color="#6a5028" stop-opacity=".25"/><stop offset="1" stop-color="#08090b"/></radialGradient><filter id="grain"><feTurbulence baseFrequency=".09 .6" numOctaves="2" seed="12"/><feColorMatrix type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/><feComponentTransfer><feFuncA type="linear" slope=".18"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter><filter id="shadow"><feGaussianBlur stdDeviation="15"/></filter></defs>`;
 const lightScene=state.presentation!=='dark';
 const face=(d)=>`<path d="${d}" fill="url(#woven)" filter="url(#grain)"/><path d="${d}" fill="url(#shade)"/><path d="${d}" fill="none" stroke="url(#edge)" stroke-width="5"/>`;
 let form='';const kind=objects[state.object][0];
 if(kind==='tote'){
  const front='M165 230 Q365 255 553 239 L533 505 Q520 530 482 533 L208 512 Q172 506 166 478 Z';
  const side='M553 239 L630 201 605 460 Q597 498 533 505Z';
  form=`<path d="M212 253 C196 23 398 8 415 263" fill="none" stroke="#73512b" stroke-width="22"/><path d="M210 250 C193 21 397 7 413 260" fill="none" stroke="url(#edge)" stroke-width="13"/><path d="M165 230 Q350 160 630 201 L553 239 Q365 264 165 230" fill="#342516" stroke="url(#edge)" stroke-width="9"/>${face(side)}${face(front)}<path d="M259 256 C252 53 484 55 478 252" fill="none" stroke="#281b10" stroke-width="24"/><path d="M259 252 C252 49 484 51 478 248" fill="none" stroke="url(#edge)" stroke-width="17"/><path d="M259 252 C252 49 484 51 478 248" fill="none" stroke="#715329" stroke-width="18" stroke-dasharray="2 9"/><path d="M165 230 Q365 263 553 239 L630 201" fill="none" stroke="url(#edge)" stroke-width="14"/><path d="M165 230 Q365 263 553 239 L630 201" fill="none" stroke="#4d361b" stroke-width="14" stroke-dasharray="2 9"/>`;
 }else if(kind==='fan'){let fanPath='M400 67 A167 167 0 1 1 399.9 67Z';if(state.fanShape==='petal'){fanPath=Array.from({length:193},(_,i)=>{const t=i*Math.PI*2/192,r=158+12*Math.cos(t*8);return (i?'L':'M')+(400+r*Math.cos(t)).toFixed(2)+' '+(234+r*Math.sin(t)).toFixed(2)}).join('')+'Z'}form=`<g transform="rotate(-19 400 300)"><rect x="387" y="346" width="26" height="207" rx="9" fill="url(#edge)"/><path d="M388 450H411M388 502H411" stroke="#745329" stroke-width="5"/>${face(fanPath)}<path d="${fanPath}" fill="none" stroke="${state.a}" stroke-width="12"/><path d="${fanPath}" fill="none" stroke="#d8c8a4" stroke-width="13" stroke-dasharray="2 9"/></g>`;
 }else if(kind==='vase'){form=face('M350 100 Q330 170 352 205 C362 259 285 290 270 377 Q240 526 325 535 L475 535 Q559 526 530 377 C515 290 438 259 448 205 Q470 170 450 100Z')+'<ellipse cx="400" cy="100" rx="50" ry="13" fill="#b5ac94" stroke="#eee6d1" stroke-width="8"/>';
 }else if(kind==='phone'){form=`<g transform="rotate(8 400 300)"><rect x="267" y="53" width="266" height="494" rx="35" fill="#777269"/><rect x="275" y="61" width="250" height="478" rx="30" fill="url(#woven)"/><rect x="275" y="61" width="250" height="478" rx="30" fill="url(#shade)"/><rect x="362" y=" seventy" width="76" height="18" rx="9" fill="#08090b"/><path d="M350 518H450" stroke="#fff" opacity=".7" stroke-width="4"/></g>`.replace('y=" seventy"','y="75"');
 }else{form=`<g transform="rotate(14 400 300)">${face('M350 100H460V535H350Z')}<circle cx="405" cy="123" r="6" fill="#17110b"/><path d="M405 124 Q480 5 555 79" fill="none" stroke="#aa8442" stroke-width="3"/>${Array.from({length:14},(_,i)=>`<path d="M550 76 Q${550+i*2} 105 ${530+i*4} 150" stroke="#ae853b" fill="none" stroke-width="2"/>`).join('')}</g>`;}
 return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="当前纹样完整覆盖的${objects[state.object][1]}立体材质预览">${defs}<rect width="800" height="600" fill="${lightScene?'#eee8da':'#090a0c'}"/><rect width="800" height="600" fill="url(#light)" opacity="${lightScene?'.06':'1'}"/><ellipse cx="405" cy="540" rx="230" ry="24" fill="${lightScene?'#786c55':'#000'}" opacity=".35" filter="url(#shadow)"/>${form}</svg>`;
}
// Both views derive from the same live design; fixed concept photos are never exported.
function showcaseSVG(){
 const result=objectView==='live'?materialSVG():'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="'+(state.presentation==='dark'?'#171915':'#eee9df')+'"/><svg x="135" y="35" width="530" height="530" viewBox="0 0 640 640">'+svg().replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')+'</svg></svg>';
 // SVG paint servers must not collide with the editor or pattern library.
 return result.replace(/id="([^" ]+)"/g,'id="showcase-$1"').replace(/url\(#([^)]+)\)/g,'url(#showcase-$1)');
}
function updateLuxuryObject(){
 $('#modelStage').innerHTML=showcaseSVG();stage.classList.add('live');
 $('#materialName').textContent=({0:'皮革包边与把手 · 竹编面板',2:'屏幕壁纸 · 三屏陈列',3:'竹编扇面 · 竹柄',4:'文创载体 · 纹样应用'})[state.object];
 $('#materialPattern').textContent=(state.designMode==='mix'?'十字编 × 人字编':state.designMode==='custom'?'自定义挑压':names[state.type])+' / '+state.palette;
 $('#viewNote').textContent=objectView==='scene'?'当前设计的完整纹样原稿；编法、配色和逐根上色与工坊保持同步。':'当前设计实时应用到所选载体。调整编法、配色或单根竹条后，陈列与导出同步更新。';
 $('#stageCaption').textContent=objectView==='scene'?'我的设计 · 纹样原稿':state.object===0?'写实样机 · 当前纹样':'当前纹样 · 立体陈列示意';
 $('#exportMock').textContent='导出当前画面 PNG ↓';
 document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===objectView);b.setAttribute('aria-pressed',String(b.dataset.view===objectView));if(b.dataset.view==='live')b.textContent=state.object===0?'写实陈列':'作品陈列'});
}
const originalRender=render,originalObjectRender=renderObject;
render=function(){originalRender()};renderObject=function(){originalObjectRender();updateLuxuryObject()};
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{objectView=b.dataset.view;updateLuxuryObject()});
let exportingMock=false;
$('#exportMock').onclick=async()=>{
 if(exportingMock)return;
 const button=$('#exportMock'),markup=$('#modelStage svg').outerHTML;
 const filename='竹序-'+objects[state.object][1]+(objectView==='scene'?'-纹样原稿':'-我的设计')+'.png';
 exportingMock=true;button.disabled=true;button.setAttribute('aria-busy','true');
 let url;
 try{
  const blob=await new Promise((resolve,reject)=>{
   const image=new Image();url=URL.createObjectURL(new Blob([markup],{type:'image/svg+xml;charset=utf-8'}));
   image.onerror=()=>reject(Error('image'));
   image.onload=()=>{try{const canvas=document.createElement('canvas');canvas.width=1600;canvas.height=1200;const ctx=canvas.getContext('2d');if(!ctx)throw Error('canvas');ctx.drawImage(image,0,0,1600,1200);canvas.toBlob(b=>b?resolve(b):reject(Error('empty')),'image/png')}catch(e){reject(e)}};
   image.src=url;
  });
  download(blob,filename);toast('当前画面已导出，包含你的纹样与配色');
 }catch{toast('导出未完成，请重试；也可在工坊导出 SVG 保存设计')}
 finally{if(url)URL.revokeObjectURL(url);exportingMock=false;button.disabled=false;button.removeAttribute('aria-busy')}
};
updateLuxuryObject();

$('#heritage').insertAdjacentHTML('beforeend',`<div class="craft-photo-collage"><figure><img src="assets/craft-hands-v11.jpg" loading="lazy" alt="篾匠手持竹篾经过工具修整，细薄篾丝从指间延伸"><figcaption>指间功夫，一篾成丝<small>从制篾开始，读懂竹的韧性与尺度。</small></figcaption><a class="photo-source" href="https://www.jxln.gov.cn/lnzf/c104706/202307/6ed96a35499a46e281fad68d157b2682.shtml" target="_blank" rel="noopener">工艺实拍 · 龙南市文旅部门《客家竹编》</a></figure><figure><img src="assets/weave-detail-v11.png" loading="lazy" alt="天然竹篾的交叠细节，宽窄篾条形成六角孔与立体层次"><figcaption>经纬之间，见真章<small>细看竹纤维、挑压关系与自然留孔。</small></figcaption><span class="photo-source">竹编纹样实拍 · 用户提供参考</span></figure></div>`);
