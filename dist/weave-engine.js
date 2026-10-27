/* Bamboo ribbons with local, alternating over-under crossings. */
(function(root){
const names=['十字编','六角编','穿丝编','人字编','三角孔编','螺旋编'];let serial=0;
const mod=(x,n)=>((x%n)+n)%n;
function overAt(type,row,col,o={}){
 if(o.mix&&(type===0||type===3)){
  const block=8,rr=mod(row,16),cc=mod(col,16);
  const alternate=o.layout==='checker'?(Math.floor(rr/block)+Math.floor(cc/block))%2===1:o.layout==='frame'?(rr>=4&&rr<12&&cc>=4&&cc<12):rr>=block;
  return overAt(alternate?(type===0?3:0):type,row,col,{over:1,under:1});
 }
 if(Array.isArray(o.matrix)&&o.matrix.length===36)return !!o.matrix[mod(row,6)*6+mod(col,6)];
 const up=Math.max(1,Math.min(4,Number(o.over)||1)),down=Math.max(1,Math.min(4,Number(o.under)||1));
 if(type===3){const p=mod(row,8),shift=p<4?p:7-p;return mod(col+shift,4)<2;}
 return mod(row+col,up+down)<up;
}
function intersections(lines){const hits=[];for(let i=0;i<lines.length;i++)for(let j=i+1;j<lines.length;j++){let a=lines[i],b=lines[j];if(a.family===b.family)continue;const den=a.nx*b.ny-a.ny*b.nx;if(Math.abs(den)<.01)continue;let x=(a.c*b.ny-a.ny*b.c)/den,y=(a.nx*b.c-a.c*b.nx)/den;if(x>=-25&&x<=665&&y>=-25&&y<=665)hits.push({a,b,x,y,sin:Math.abs(den)})}return hits}
function pattern(type=0,o={}){
 const s=Math.max(14,Math.min(90,Number(o.spacing)||32)),w=Math.max(2,Math.min(s*.82,Number(o.width)||s*.58));
 const color=(v,d)=>/^#[0-9a-f]{6}$/i.test(v||'')?v:d,a=color(o.a,'#b4a180'),b=color(o.b,'#72816b'),bg=color(o.bg,'#ece5d6'),c=color(o.c,'#98715e');
 const id='bw'+serial++,f=n=>Number(n.toFixed(2));let parts=[],lines=[];
 const ribbonColor=(key,fallback)=>color(o.strandColors&&o.strandColors[type+':'+key],fallback);
 const strip=(x1,y1,x2,y2,color,width=w,bridge=false,key='')=>{color=ribbonColor(key,color);let d=`M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;const length=Math.hypot(x2-x1,y2-y1)||1,nx=-(y2-y1)/length,ny=(x2-x1)/length;const fibers=[-.36,-.23,-.09,.14,.31].map(t=>`M${f(x1+nx*width*t)} ${f(y1+ny*width*t)}L${f(x2+nx*width*t)} ${f(y2+ny*width*t)}`).join('');return `<g${key?` data-strand="${type}:${key}"`:""}>${bridge?`<path d="${d}" stroke="#251e16" stroke-opacity=".37" stroke-width="${f(width+3)}"/>`:''}<path data-ink="true" d="${d}" stroke="${color}" stroke-width="${f(width)}"/><path d="${d}" stroke="#fff1cf" stroke-opacity=".21" stroke-width="${f(width*.67)}"/><path d="${d}" stroke="#59442c" stroke-opacity=".17" stroke-width="${f(Math.max(.45,width*.075))}"/><path d="${d}" stroke="#fff8e5" stroke-opacity=".15" stroke-width="${f(width*.32)}"/><path d="${fibers}" fill="none" stroke="#fff6d9" stroke-opacity=".35" stroke-width=".36"/></g>`};
 const family=(angle,color,k,phase=0)=>{let t=angle*Math.PI/180,dx=Math.cos(t),dy=Math.sin(t),nx=-dy,ny=dx;for(let z=-60;z<=60;z++){let q=z*s+phase+Number(o.x||0)*nx+Number(o.y||0)*ny;if(Math.abs(q)>960)continue;let ln={dx,dy,nx,ny,c:q,family:k,index:z,color};lines.push(ln);parts.push(strip(nx*q-dx*1100,ny*q-dy*1100,nx*q+dx*1100,ny*q+dy*1100,color,w,false,k+':'+z))}};
 if(type===5){
  const count=25,pitch=s*.78,k=pitch/(2*Math.PI),cx=320+Number(o.x||0),cy=320+Number(o.y||0);
  for(let i=0;i<count;i++){let t=i*Math.PI*2/count;parts.push(strip(cx+Math.cos(t)*8,cy+Math.sin(t)*8,cx+Math.cos(t)*520,cy+Math.sin(t)*520,a,w*.45,false,'0:'+i))}
  let coil='';const end=(520-16)/k;
  for(let t=0;t<=end;t+=.035){let r=16+k*t;coil+=(t?'L':'M')+f(cx+r*Math.cos(t))+' '+f(cy+r*Math.sin(t))}
  parts.push(`<g data-strand="5:1:0"><path data-ink="true" d="${coil}" fill="none" stroke="${ribbonColor('1:0',b)}" stroke-width="${w*.55}"/><path d="${coil}" fill="none" stroke="#fff1cf" stroke-opacity=".25" stroke-width="${w*.2}"/></g>`);
  for(let j=0;j<count*end/(2*Math.PI);j++){let t=j*2*Math.PI/count,r=16+k*t;if(r<42)continue;const x=cx+r*Math.cos(t),y=cy+r*Math.sin(t),half=w*.43;
   if(j%2===0)parts.push(strip(x-Math.cos(t)*half,y-Math.sin(t)*half,x+Math.cos(t)*half,y+Math.sin(t)*half,a,w*.45,true,'0:'+(j%count)));
   else {let dx=k*Math.cos(t)-r*Math.sin(t),dy=k*Math.sin(t)+r*Math.cos(t),len=Math.hypot(dx,dy);dx/=len;dy/=len;parts.push(strip(x-dx*half,y-dy*half,x+dx*half,y+dy*half,b,w*.55,true,'1:0'))}
  }
 }else{
  if(type===0||type===3){family(90,a,0);family(0,b,1)}
  else{family(0,a,0);family(60,b,1,(type===4?0:.5)*s);family(120,type===2?b:a,2,type===4?s*.12:0)}
  for(const h of intersections(lines)){
   let top;if(type===0||type===3)top=overAt(type,h.b.index,-h.a.index,o)?h.a:h.b;
   else top=(h.a.family===0&&h.b.family===1)||(h.a.family===1&&h.b.family===2)?h.a:h.b;
   let len=(w/h.sin+2)/2;
   parts.push(`<g data-crossing="${h.a.index},${h.b.index}" data-top="${top.family}">${strip(h.x-top.dx*len,h.y-top.dy*len,h.x+top.dx*len,h.y+top.dy*len,top.color,w,true,top.family+':'+top.index)}</g>`);
  }
  if(type===2){for(let y=-30;y<680;y+=s*2)for(let x=-30;x<680;x+=s*3.464){const xx=x+((Math.round(y/s)/2)%2)*s*1.732;for(let t=0;t<3;t++){let angle=t*Math.PI/3;parts.push(strip(xx-Math.cos(angle)*s*.7,y-Math.sin(angle)*s*.7,xx+Math.cos(angle)*s*.7,y+Math.sin(angle)*s*.7,c,w*.24,true,'3:'+Math.round(x/s)+':'+Math.round(y/s)+':'+t))}}}
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="${names[type]||names[0]}上下交织纹样"><defs><radialGradient id="${id}"><stop stop-color="#fff8de" stop-opacity=".12"/><stop offset="1" stop-color="#38281c" stop-opacity=".13"/></radialGradient></defs><rect width="640" height="640" fill="${bg}"/><g>${parts.join('')}</g><rect width="640" height="640" fill="url(#${id})" pointer-events="none"/></svg>`;
}
function analyze(type,o={}){
 const size=o.matrix?6:o.mix?16:type===3?8:Math.max(1,Math.min(4,Number(o.over)||1))+Math.max(1,Math.min(4,Number(o.under)||1));let maxFloat=0,unbound=0;
 for(let axis=0;axis<2;axis++)for(let line=0;line<size;line++){
  const values=Array.from({length:size},(_,j)=>overAt(type,axis?j:line,axis?line:j,o));
  if(values.every(v=>v===values[0]))unbound++;
  let run=1;for(let j=1;j<size*2;j++){run=values[j%size]===values[(j-1)%size]?run+1:1;maxFloat=Math.max(maxFloat,Math.min(run,size))}
 }
 return {maxFloat,unbound};
}
root.Bamboo={names,pattern,overAt,intersections,analyze};if(typeof module!=='undefined')module.exports=root.Bamboo;
})(typeof window!=='undefined'?window:globalThis);
