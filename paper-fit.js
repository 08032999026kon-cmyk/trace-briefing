/* 帳票の列構成を保ち、表示領域の幅に合わせて全体を縮小する。 */
(function(root){'use strict';
function dimensions(width,height,available){const scale=width>0&&available>0?Math.min(1.5,available/width):1;return {scale,width:width*scale,height:Math.ceil(height*scale)}}
function fit(region){const canvas=region.querySelector('.paper-canvas'),sheet=canvas?.querySelector('.business-sheet');if(!canvas||!sheet||region.clientWidth<=0)return;
canvas.style.width='1000px';canvas.style.transform='none';
const width=Math.max(1000,sheet.scrollWidth);canvas.style.width=width+'px';
if(region.dataset.fit==='false'){region.style.height='auto';return}
const layout=dimensions(width,canvas.offsetHeight,region.clientWidth);
canvas.style.transform=`scale(${layout.scale})`;
region.style.height=(layout.height+2)+'px';
}
let observer;
function refresh(){if(typeof document==='undefined')return;observer?.disconnect();const regions=document.querySelectorAll('.paper-scroll');regions.forEach(fit);if(typeof ResizeObserver!=='undefined'){observer=observer||new ResizeObserver(entries=>entries.forEach(e=>fit(e.target)));regions.forEach(r=>observer.observe(r))}}
if(typeof window!=='undefined'){window.addEventListener('resize',refresh,{passive:true});if(typeof document!=='undefined')document.fonts?.ready.then(refresh)}
const api={dimensions,fit,refresh};root.PaperFit=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
