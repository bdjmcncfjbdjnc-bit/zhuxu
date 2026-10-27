/* 原创参数化竹编图形系统：以平面示意呈现经纬与穿插关系。 */
(function(root){
const names=['十字编','六角编','穿丝编','人字编','三角孔编'];
function pattern(type=0,o={}){
 const s=Number(o.spacing||32),w=Number(o.width||7),a=o.a||'#bda16b',b=o.b||'#76603b',bg=o.bg||'#111613';
 let lines='';const line=(x1,y1,x2,y2,c,sw=w)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${sw}"/>`;
 if(type===0||type===2){for(let i=0;i<720;i+=s){lines+=line(i,0,i,720,a)+line(0,i,720,i,b);}for(let x=0;x<720;x+=s)for(let y=0;y<720;y+=s){if((Math.round(x/s)+Math.round(y/s))%2===0)lines+=line(x,y-s*.42,x,y+s*.42,a);}if(type===2)for(let i=-720;i<720;i+=s*2)lines+=line(i,0,i+720,720,'#ddd0a0',Math.max(1,w*.24));}
 else if(type===3){for(let x=-s;x<740;x+=s)for(let y=-s;y<740;y+=s){let d=Math.floor(x/s)%2===0?1:-1;lines+=line(x,y,x+s,y+d*s,a)+line(x,y+s*.5,x+s,y+d*s+s*.5,b,w*.5);}}
 else if(type===1){let h=s*Math.sqrt(3);for(let col=-2;col<720/(s*1.5);col++)for(let row=-2;row<720/h;row++){let cx=col*s*1.5,cy=row*h+(col%2)*h/2;for(let k=0;k<6;k++){let t=k*Math.PI/3,u=(k+1)*Math.PI/3;lines+=line(cx+s*Math.cos(t),cy+s*Math.sin(t),cx+s*Math.cos(u),cy+s*Math.sin(u),k%2?a:b,w*.6)}}}
 else {for(let i=-720;i<1440;i+=s*1.73){lines+=line(i,0,i+416,720,a)+line(i,0,i-416,720,b);}for(let y=0;y<720;y+=s)lines+=line(0,y,720,y,a,w*.45);}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><rect width="640" height="640" fill="${bg}"/><g transform="translate(${Number(o.x||0)-64} ${Number(o.y||0)-64})">${lines}</g></svg>`;
}root.Bamboo={names,pattern};if(typeof module!=='undefined')module.exports=root.Bamboo;
})(typeof window!=='undefined'?window:globalThis);
