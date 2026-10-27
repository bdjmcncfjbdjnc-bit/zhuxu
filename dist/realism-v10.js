/* Real-time photographic material compositing. No remote generation at runtime. */
const beforePhotographicMaterial=materialSVG;
const photoSurfaces={
 giftbox:{shape:'<ellipse cx="397" cy="211" rx="255" ry="86"/>',box:[142,125,510,172],paper:true},
 papertote:{shape:'<path d="M205 316L554 330L552 497L203 474Z"/>',matrix:'matrix(.545 .022 -.006 .545 205 316)',paper:true},
 coaster:{shape:'<ellipse cx="398" cy="274" rx="231" ry="177"/>',box:[167,97,462,354]},
 fan:{shape:'<ellipse cx="397" cy="169" rx="146" ry="140"/>',box:[250,29,294,280]},
 square:{shape:'<rect x="261" y="33" width="273" height="272" rx="48"/>',box:[261,33,273,272]},
 oval:{shape:'<ellipse cx="394" cy="168" rx="91" ry="141"/>',box:[303,27,182,282]},
 leaf:{shape:'<path transform="scale(.552486)" d="M719 57C654 110 557 158 504 237C465 295 465 361 493 416C534 489 621 535 718 557C813 535 902 489 941 415C969 360 970 298 934 243C879 162 786 106 719 57Z"/>',box:[261,31,273,279]},
 petal:{shape:'<path transform="scale(.552486)" d="M718 46C766 43 797 66 816 98C862 91 901 109 927 139C946 161 953 186 949 214C978 237 995 266 994 306C993 345 978 375 949 399C955 440 937 473 906 496C881 515 851 523 818 520C789 546 755 556 718 555C675 558 644 545 615 522C574 528 539 516 512 487C490 464 480 432 489 400C459 376 449 346 449 310C447 271 462 239 489 219C485 175 509 137 541 117C564 104 589 97 619 101C645 65 674 46 718 46Z"/>',box:[248,25,301,282]},
 plum:{shape:'<path transform="scale(.552486)" d="M719 35C786 32 831 76 849 141C904 136 945 157 973 202C1004 255 992 323 934 363C955 422 942 475 896 514C853 550 796 561 746 548L697 548C640 565 575 556 533 521C487 483 482 425 504 369C449 337 427 288 443 236C458 179 512 141 577 145C598 77 647 35 719 35Z"/>',box:[242,19,310,290]}
};
function photographicKey(){if(state.object===3)return state.fanShape==='round'||!fanOptions.includes(state.fanShape)?'fan':state.fanShape;if(state.object===4&&['giftbox','papertote','coaster'].includes(state.craftShape||'giftbox'))return state.craftShape||'giftbox';return null}
function photographicSVG(key){
 const surface=photoSurfaces[key],photo=window.RealismPhotos[key];
 const raw=svg().replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'');
 const mapped=surface.matrix?`<g transform="${surface.matrix}">${raw}</g>`:`<svg x="${surface.box[0]}" y="${surface.box[1]}" width="${surface.box[2]}" height="${surface.box[3]}" viewBox="0 0 640 640" preserveAspectRatio="${state.object===3?'xMidYMid slice':'none'}">${raw}</svg>`;
 // Photo luminance carries the original fibers, local highlights and lighting into the design.
 // Blending occurs only within the calibrated printable/woven surface, leaving bindings intact.
 return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="当前设计的写实材质陈列" data-photo-product="${key}"><defs><clipPath id="surfaceClip">${surface.shape}</clipPath><filter id="photoLuminance" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope=".8" intercept=".23"/><feFuncG type="linear" slope=".8" intercept=".23"/><feFuncB type="linear" slope=".8" intercept=".23"/></feComponentTransfer></filter><filter id="materialRelief" x="-3%" y="-3%" width="106%" height="106%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".55 .18" numOctaves="2" seed="11" result="fiber"/><feDisplacementMap in="SourceGraphic" in2="fiber" scale="${surface.paper?'.35':'.8'}" xChannelSelector="R" yChannelSelector="G"/></filter><radialGradient id="surfaceEdge"><stop offset=".6" stop-color="#493921" stop-opacity="0"/><stop offset="1" stop-color="#493921" stop-opacity="${surface.paper?'.07':'.19'}"/></radialGradient></defs><image href="${photo}" width="800" height="600"/><g clip-path="url(#surfaceClip)" style="isolation:isolate"><g filter="url(#materialRelief)" opacity="${surface.paper?'.92':'.97'}">${mapped}</g><image href="${photo}" width="800" height="600" filter="url(#photoLuminance)" style="mix-blend-mode:multiply" opacity="${surface.paper?'.85':'.58'}"/>${surface.shape.replace('/>',' fill="url(#surfaceEdge)"/>')}</g></svg>`;
}
materialSVG=function(){const key=photographicKey();return key&&window.RealismPhotos&&window.RealismPhotos[key]?photographicSVG(key):beforePhotographicMaterial()};
const previousProductOptions=productOptions;
productOptions=function(){previousProductOptions();const key=photographicKey();if(!key)return;$('#presentation').disabled=true;$('#presentation').value='ivory';$('#presentation').parentElement.title='写实样机保留自然光摄影环境';if(objectView==='live'){$('#stageCaption').textContent='材质已同步 · 你的设计';$('#viewNote').textContent=state.object===3?'你的纹样自动融合竹篾肌理与自然光影，保留竹框、缠线、手柄及流苏。':'选色后自动同步纹样、表面纹理与光影；保留器物的厚度、收边和自然投影。';$('#materialName').textContent=state.object===3?'细篾扇面 · 竹框与竹柄':({giftbox:'肌理纸盒 · 竹制盖沿',papertote:'棉质提绳 · 肌理纸材',coaster:'竹编面 · 手工缠边'})[key];document.querySelector('[data-view="live"]').textContent='写实陈列'}};
renderObject();
