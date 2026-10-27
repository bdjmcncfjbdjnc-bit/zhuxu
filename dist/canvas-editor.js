/* Per-ribbon color overrides: identical strand IDs share base and crossing color. */
function cleanRibbonColors(value){const clean={};if(value&&typeof value==='object')for(const [key,color] of Object.entries(value).slice(0,3000))if(/^[0-5]:[0-3]:-?\d+(?::-?\d+){0,2}$/.test(key)&&/^#[0-9a-f]{6}$/i.test(color))clean[key]=color;return clean}
state.strandColors=cleanRibbonColors(state.strandColors);state.presentation=state.presentation==='dark'?'dark':'ivory';state.fanShape=['round','petal','plum','square','oval','leaf'].includes(state.fanShape)?state.fanShape:'round';
let ribbonTool='select',selectedRibbon=null,brushColor='#8a675c',paintingStroke=false,strokeDirty=false,strokeKeys=new Set(),ribbonZoom=1;
$('.canvas-toolbar').insertAdjacentHTML('afterend',`<div class="ribbon-editor"><div class="ribbon-tools" role="group" aria-label="竹条编辑工具"><button data-ribbon-tool="select" class="active">↖ 点选</button><button data-ribbon-tool="paint">✎ 涂色</button><button data-ribbon-tool="erase">擦除</button><button data-ribbon-tool="sample">取色</button><label class="brush-label">画笔<input id="ribbonColor" type="color" value="${brushColor}"></label><label>放大<select id="ribbonZoom"><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label></div><div class="ribbon-selection"><span id="ribbonSelection" role="status">点选一根竹条，再选择颜色</span><button id="clearRibbon">恢复选中竹条</button><button id="clearAllRibbons">清除此编法的涂色</button></div><p id="ribbonHint">点到交叉处会选中上层竹条；在它露出的其他位置可选中下层竹条。颜色跟随整根竹条。</p></div>`);
$('.object-info').insertAdjacentHTML('beforeend','<div class="product-settings"><label>展示背景<select id="presentation"><option value="ivory">暖白摄影台</option><option value="dark">玄色陈列台</option></select></label><label id="fanShapeLabel">团扇器型<select id="fanShape"><option value="round">圆形团扇</option><option value="petal">八瓣花形扇</option></select></label></div>');
function ribbonNodes(key){return /^[0-5]:[0-3]:-?\d+(?::-?\d+){0,2}$/.test(key||'')?[...$('#livePattern').querySelectorAll('[data-strand="'+key+'"]')]:[]}
function ribbonName(key){if(!key)return '尚未选中竹条';const p=key.split(':');return names[+p[0]]+' · '+(+p[0]===5?(p[1]==='0'?'放射篾':'连续绕篾'):['第一向竹条','第二向竹条','第三向竹条','装饰穿丝'][+p[1]])+' '+p.slice(2).join(' / ')}
function updateRibbonUI(){
 if(selectedRibbon&&!ribbonNodes(selectedRibbon).length)selectedRibbon=null;
 if(selectedRibbon&&ribbonTool==='select'){const ink=ribbonNodes(selectedRibbon)[0]?.querySelector('[data-ink]');if(ink){brushColor=ink.getAttribute('stroke');$('#ribbonColor').value=brushColor}}
 document.querySelectorAll('[data-ribbon-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ribbonTool===ribbonTool)));
 $('#ribbonSelection').textContent=selectedRibbon?ribbonName(selectedRibbon):'点选一根竹条，再选择颜色';
 $('#clearRibbon').disabled=!selectedRibbon||!state.strandColors?.[selectedRibbon];
 const count=Object.keys(state.strandColors||{}).filter(k=>k.startsWith(state.type+':')).length;
 $('#clearAllRibbons').disabled=!count;$('#clearAllRibbons').textContent=count?'清除此编法的 '+count+' 根涂色':'此编法尚未单独涂色';
 $('#livePattern').classList.toggle('brush-mode',ribbonTool!=='select');
 $('#livePattern').style.width=ribbonZoom*100+'%';
 $('#presentation').value=state.presentation||'ivory';$('#fanShape').value=state.fanShape||'round';$('#fanShapeLabel').hidden=state.object!==3;
 $('#livePattern').querySelectorAll('.selected-ribbon').forEach(n=>n.classList.remove('selected-ribbon'));if(selectedRibbon)ribbonNodes(selectedRibbon).forEach(n=>n.classList.add('selected-ribbon'));
}
function setRibbonColor(key,color){state.strandColors={...(state.strandColors||{})};if(color===null)delete state.strandColors[key];else state.strandColors[key]=color;}
function pickRibbon(node){selectedRibbon=node.dataset.strand;const ink=node.querySelector('[data-ink]');if(ink){brushColor=state.strandColors?.[selectedRibbon]||ink.getAttribute('stroke');$('#ribbonColor').value=brushColor}updateRibbonUI()}
function paintRibbon(node){const key=node.dataset.strand;if(strokeKeys.has(key))return;strokeKeys.add(key);selectedRibbon=key;
 if(ribbonTool==='erase'){if(!state.strandColors?.[key])return;setRibbonColor(key,null);strokeDirty=true;$('#livePattern').innerHTML=svg()}
 else if(state.strandColors?.[key]!==brushColor){setRibbonColor(key,brushColor);strokeDirty=true;for(const n of ribbonNodes(key))n.querySelectorAll('[data-ink]').forEach(p=>p.setAttribute('stroke',brushColor))}
 updateRibbonUI();
}
function finishRibbonStroke(){if(!paintingStroke)return;paintingStroke=false;strokeKeys.clear();if(strokeDirty){strokeDirty=false;changed()}}
$('#livePattern').addEventListener('pointerdown',e=>{if(e.button>0||e.isPrimary===false)return;const node=e.target.closest?.('[data-strand]');if(!node)return;if(ribbonTool==='select'||ribbonTool==='sample'){pickRibbon(node);if(ribbonTool==='sample')toast('已取竹条颜色，可切换涂色工具');return}e.preventDefault();paintingStroke=true;strokeDirty=false;strokeKeys.clear();paintRibbon(node)});
$('#livePattern').addEventListener('pointermove',e=>{if(!paintingStroke)return;const node=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-strand]');if(node&&$('#livePattern').contains(node))paintRibbon(node)});
document.addEventListener('pointerup',finishRibbonStroke);document.addEventListener('pointercancel',finishRibbonStroke);window.addEventListener?.('blur',finishRibbonStroke);
document.querySelectorAll('[data-ribbon-tool]').forEach(b=>b.onclick=()=>{finishRibbonStroke();ribbonTool=b.dataset.ribbonTool;document.querySelectorAll('[data-ribbon-tool]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',String(el===b))});$('#ribbonHint').textContent=ribbonTool==='paint'?'按住并划过竹条连续涂色，松开后记为一次修改，可一键撤销。':ribbonTool==='erase'?'划过已涂色的竹条，恢复它跟随整体配色的颜色。':ribbonTool==='sample'?'点选竹条，吸取它的颜色作为画笔色。':'点选整根竹条后调整画笔色。局部涂色优先于整体配色；清除涂色后重新跟随配色。';updateRibbonUI()});
$('#ribbonColor').oninput=e=>{brushColor=e.target.value;if(ribbonTool==='select'&&selectedRibbon){setRibbonColor(selectedRibbon,brushColor);for(const n of ribbonNodes(selectedRibbon))n.querySelectorAll('[data-ink]').forEach(p=>p.setAttribute('stroke',brushColor))}};
$('#ribbonColor').onchange=()=>{if(ribbonTool==='select'&&selectedRibbon)changed()};
$('#clearRibbon').onclick=()=>{if(selectedRibbon){setRibbonColor(selectedRibbon,null);changed()}};
$('#clearAllRibbons').onclick=()=>{state.strandColors=Object.fromEntries(Object.entries(state.strandColors||{}).filter(([key])=>!key.startsWith(state.type+':')));changed();toast('已恢复此编法的整体配色，可撤销')};
$('#ribbonZoom').onchange=e=>{ribbonZoom=+e.target.value;updateRibbonUI()};
$('#presentation').onchange=e=>{state.presentation=e.target.value;objectView='live';changed()};
$('#fanShape').onchange=e=>{state.fanShape=e.target.value;objectView='live';changed()};
const renderBeforeRibbon=render;render=function(){renderBeforeRibbon();updateRibbonUI()};
const objectBeforeRibbon=renderObject;renderObject=function(){objectBeforeRibbon();$('#fanShapeLabel').hidden=state.object!==3};
designHistory=[JSON.stringify(state)];designFuture=[];render();
