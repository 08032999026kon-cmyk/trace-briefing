/* 成功した指摘だけを、実際の帳票上で復習する。原データは書き換えない。 */
(function(host,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else host.TraceEvidenceRecap=api;
}(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const bindings=new WeakMap();
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const regexEscape=v=>v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function annotate(html,notes){
 if(typeof html!=='string'||!Array.isArray(notes?.points))return typeof html==='string'?html:'';
 const terms=[];
 notes.points.forEach((p,i)=>(p.terms||[]).forEach(term=>{if(typeof term==='string'&&term.trim()&&!terms.some(t=>t.term===term))terms.push({term,index:i+1})}));
 terms.sort((a,b)=>b.term.length-a.term.length);if(!terms.length)return html;
 const lookup=new Map(terms.map(t=>[t.term,t.index])),pattern=new RegExp(terms.map(t=>regexEscape(t.term)).join('|'),'g');
 let protectedTag=null;
 return html.split(/(<[^>]+>)/g).map(token=>{
  if(token.startsWith('<')){const close=token.match(/^<\/(script|style|textarea)\b/i),open=token.match(/^<(script|style|textarea)\b/i);if(close&&protectedTag===close[1].toLowerCase())protectedTag=null;else if(!protectedTag&&open)protectedTag=open[1].toLowerCase();return token}
  if(protectedTag)return token;
  return token.split(/(&(?:#\d+|#x[0-9a-f]+|[a-z][a-z\d]*);)/gi).map(part=>/^&(?:#\d+|#x[0-9a-f]+|[a-z][a-z\d]*);$/i.test(part)?part:part.replace(pattern,term=>`<mark class="recap-mark" data-recap-point="${lookup.get(term)}">${term}</mark>`)).join('');
 }).join('');
}
function render({page,notes}){
 if(!page||!notes||!Array.isArray(notes.points)||!notes.points.length)return '';
 const annotated=annotate(page.html,notes),first=notes.points[0];
 return `<section class="recap-study" aria-label="帳票の見るべきポイント"><div class="recap-document-meta"><span>実際に提示した帳票</span><strong>${esc(page.title)}</strong><small>${esc(page.ref)}</small></div><div class="recap-study-grid"><div class="recap-visual-column"><figure class="recap-crop-figure"><div class="recap-crop-heading"><b class="recap-active-number">1</b><strong class="recap-active-title">${esc(first.label)}</strong><span class="recap-view-status" aria-live="polite">帳票全体</span></div><div class="recap-crop-window" tabindex="0" role="region" aria-label="原帳票の全体と注目箇所"><div class="recap-crop-spacer"><div class="recap-crop-canvas" aria-hidden="true">${annotated}</div><div class="recap-focus-frame" data-number="1" aria-hidden="true"></div></div></div><div class="recap-view-controls" aria-label="帳票の表示切替"><button data-recap-view="overview" aria-pressed="true">全体を見る</button><button data-recap-view="detail" aria-pressed="false">ポイントへ拡大 ↗</button></div><p class="recap-view-hint">まず帳票全体で、枠の位置を確認してください。</p><figcaption class="recap-active-explanation">${esc(first.explanation)}</figcaption></figure><details class="recap-overview"><summary>帳票全体で位置を確かめる</summary><div class="recap-sheet-whole"><div class="paper-scroll" data-fit="true" role="region" aria-label="注釈付き原帳票の全体"><div class="paper-canvas">${annotated}</div></div></div></details><button class="text-button recap-original" data-recap-original="${esc(page.id)}">注釈のない元の帳票を原寸で見る ↗</button></div><aside class="recap-guide"><span class="recap-guide-label">この指摘が的確な理由</span><h3>${esc(notes.title)}</h3><p class="recap-conclusion">${esc(notes.conclusion)}</p><ol class="recap-point-list">${notes.points.map((p,i)=>`<li><button data-recap-select="${i}" aria-pressed="${i===0}"><b>${i+1}</b><span>${esc(p.label)}</span><i aria-hidden="true">↗</i></button><p>${esc(p.explanation)}</p></li>`).join('')}</ol></aside></div></section>`;
}
function geometry({canvasWidth,canvasHeight,areaWidth,target}={}){
 const valid=n=>Number.isFinite(n)&&n>0;if(!valid(canvasWidth)||!valid(canvasHeight)||!valid(areaWidth)||!target||![target.left,target.top,target.width,target.height].every(Number.isFinite)||target.width<0||target.height<0)return null;
 const margin=24,scale=Math.max(1,Math.min(1.35,areaWidth/(Math.min(Math.max(target.width,1),450)+margin*2))),height=Math.max(180,Math.min(280,Math.ceil(target.height*scale+100))),width=canvasWidth*scale,contentHeight=canvasHeight*scale;
 const left=Math.max(0,Math.min(Math.max(0,width-areaWidth),target.left*scale-Math.max(margin,(areaWidth-target.width*scale)/2)));
 const top=Math.max(0,Math.min(Math.max(0,contentHeight-height),target.top*scale-48));
 return {scale,width,contentHeight,height,left,top};
}
function frameGeometry({canvasWidth,canvasHeight,areaWidth,areaHeight,target,view}={}){
 const valid=n=>Number.isFinite(n)&&n>0;if(![canvasWidth,canvasHeight,areaWidth,areaHeight].every(valid)||!target||![target.left,target.top,target.width,target.height].every(Number.isFinite)||target.width<0||target.height<0||!['overview','detail'].includes(view))return null;
 const clamp=(v,low,high)=>Math.max(low,Math.min(high,v));
 const scale=view==='overview'?Math.min(1,(areaWidth>24?areaWidth-24:areaWidth)/canvasWidth,(areaHeight>24?areaHeight-24:areaHeight)/canvasHeight):Math.max(1,Math.min(1.35,areaWidth/(Math.min(Math.max(target.width,1),450)+48)));
 const width=canvasWidth*scale,height=canvasHeight*scale;
 const x=view==='overview'?(areaWidth-width)/2:clamp(areaWidth/2-(target.left+target.width/2)*scale,Math.min(0,areaWidth-width),Math.max(0,(areaWidth-width)/2));
 const y=view==='overview'?(areaHeight-height)/2:clamp(areaHeight/2-(target.top+target.height/2)*scale,Math.min(0,areaHeight-height),Math.max(0,(areaHeight-height)/2));
 const fw=Math.min(areaWidth,Math.max(24,target.width*scale+12)),fh=Math.min(areaHeight,Math.max(22,target.height*scale+12));
 return {scale,x,y,width,height,focus:{left:clamp(x+target.left*scale-6,0,areaWidth-fw),top:clamp(y+target.top*scale-6,0,areaHeight-fh),width:fw,height:fh}};
}
function motionEnabled(root){return (root.ownerDocument?.documentElement||(typeof document!=='undefined'?document.documentElement:null))?.dataset?.motion==='on'}
function cancelTimer(state){if(state.timer!==null&&typeof clearTimeout==='function')clearTimeout(state.timer);state.timer=null;state.generation++}
function measure(root,state){
 const viewport=root.querySelector('.recap-crop-window'),canvas=root.querySelector('.recap-crop-canvas');state.metrics=null;if(!viewport||!canvas||viewport.clientWidth<=0||typeof canvas.getBoundingClientRect!=='function')return;
 root.setAttribute?.('data-recap-transition','off');canvas.style.transform='none';
 const a=canvas.getBoundingClientRect(),width=Math.max(1000,canvas.scrollWidth||0),height=canvas.offsetHeight||canvas.scrollHeight||0;
 const screenHeight=typeof window!=='undefined'&&Number.isFinite(window.innerHeight)?window.innerHeight:800,doc=root.ownerDocument||(typeof document!=='undefined'?document:null),top=viewport.getBoundingClientRect?.().top,footerHeight=doc?.querySelector?.('.recap-modal-footer')?.offsetHeight||110;const areaHeight=Number.isFinite(top)?Math.max(120,Math.min(440,screenHeight-Math.max(0,top)-footerHeight-12)):Math.max(200,Math.min(440,Math.round(screenHeight*.48)));viewport.style.height=areaHeight+'px';
 if(!height)return;const targets=state.notes.points.map((_,i)=>{const mark=canvas.querySelector(`[data-recap-point="${i+1}"]`);if(!mark||typeof mark.getBoundingClientRect!=='function')return null;const b=mark.getBoundingClientRect();return {left:b.left-a.left,top:b.top-a.top,width:b.width,height:b.height}});
 state.metrics={canvasWidth:width,canvasHeight:height,areaWidth:viewport.clientWidth,areaHeight,targets};
}
function paint(root,state,animate){
 const view=state.view;root.setAttribute?.('data-recap-view',view);root.setAttribute?.('data-recap-transition',animate&&motionEnabled(root)?'on':'off');
 root.querySelectorAll('button[data-recap-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-recap-view')===view)));
 const status=root.querySelector('.recap-view-status'),hint=root.querySelector('.recap-view-hint');if(status)status.textContent=view==='overview'?'帳票全体':'注目箇所を拡大';if(hint)hint.textContent=view==='overview'?(state.timer!==null?'枠で示した部分へ、このあと拡大します。':'枠の位置を確認したら「ポイントへ拡大」を押してください。'):'「全体を見る」で、帳票の中の位置を確認できます。';
 const m=state.metrics;if(!m||!m.targets[state.active])return;const g=frameGeometry({...m,target:m.targets[state.active],view});if(!g)return;
 const canvas=root.querySelector('.recap-crop-canvas'),frame=root.querySelector('.recap-focus-frame');if(canvas)canvas.style.transform=`translate(${g.x}px, ${g.y}px) scale(${g.scale})`;if(frame){for(const key of ['left','top','width','height'])frame.style[key]=g.focus[key]+'px';frame.setAttribute('data-number',String(state.active+1))}
}
function selectPoint(root,state,index){
 if(!Number.isInteger(index)||index<0||index>=state.notes.points.length)return false;
 state.active=index;const n=index+1,p=state.notes.points[index];root.setAttribute?.('data-recap-active',String(n));
 root.querySelectorAll('[data-recap-select]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.getAttribute('data-recap-select'))===index)));
 root.querySelectorAll('[data-recap-point]').forEach(m=>m.setAttribute('class','recap-mark'+(Number(m.getAttribute('data-recap-point'))===n?' recap-is-active':'')));
 const label=root.querySelector('.recap-active-title'),number=root.querySelector('.recap-active-number'),caption=root.querySelector('.recap-active-explanation');if(label)label.textContent=p.label;if(number)number.textContent=String(n);if(caption)caption.textContent=p.explanation;return true;
}
function setView(root,view,animate=false){const state=bindings.get(root);if(!state?.mounted||!['overview','detail'].includes(view))return false;cancelTimer(state);state.view=view;paint(root,state,animate);return true}
function activate(root,index){const state=bindings.get(root);if(!state?.mounted||!selectPoint(root,state,index))return false;return setView(root,'detail',true)}
function unmount({root}={}){const state=bindings.get(root);if(!state)return false;cancelTimer(state);state.mounted=false;state.observer?.disconnect();return true}
function mount({root,notes}){
 if(!root||!notes?.points?.length)return false;let state=bindings.get(root);
 if(!state){state={notes,active:0,view:'overview',timer:null,generation:0,mounted:false,metrics:null,observer:null};bindings.set(root,state);if(typeof window!=='undefined')window.addEventListener?.('resize',()=>{if(state.mounted){measure(root,state);paint(root,state,false)}},{passive:true})}
 cancelTimer(state);state.notes=notes;state.mounted=true;state.view='overview';selectPoint(root,state,0);measure(root,state);
 root.querySelectorAll('[data-recap-select]').forEach(b=>b.onclick=()=>{if(activate(root,Number(b.getAttribute('data-recap-select'))))root.querySelector('.recap-crop-figure')?.scrollIntoView?.({block:'nearest',behavior:motionEnabled(root)?'smooth':'auto'})});
 root.querySelectorAll('button[data-recap-view]').forEach(b=>b.onclick=()=>{const view=b.getAttribute('data-recap-view');setView(root,view,view==='detail')});
 const overview=root.querySelector('.recap-overview');if(overview)overview.ontoggle=()=>{if(typeof window!=='undefined')window.PaperFit?.refresh?.()};
 const html=root.ownerDocument?.documentElement||(typeof document!=='undefined'?document.documentElement:null);
 if(typeof MutationObserver!=='undefined'&&html){state.observer?.disconnect();state.observer=new MutationObserver(()=>{if(state.mounted&&!motionEnabled(root)){cancelTimer(state);paint(root,state,false)}});state.observer.observe(html,{attributes:true,attributeFilter:['data-motion']})}
 if(motionEnabled(root)&&typeof setTimeout==='function'){const generation=state.generation;state.timer=setTimeout(()=>{if(!state.mounted||state.generation!==generation)return;state.timer=null;state.view='detail';paint(root,state,true)},1400)}
 paint(root,state,false);return true;
}
return {annotate,render,geometry,frameGeometry,activate,setView,mount,unmount};
}));
