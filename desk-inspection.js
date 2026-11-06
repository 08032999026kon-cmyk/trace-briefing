/* 確定済みの進行を変えず、同じ机・原帳票を読み返す。 */
(function(host,make){'use strict';const api=typeof module==='object'&&module.exports?make(require('./desk-view.js')):make(host.TraceDesk);if(typeof module==='object'&&module.exports)module.exports=api;else host.TraceDeskInspection=api;}(typeof globalThis!=='undefined'?globalThis:this,function(Desk){'use strict';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const docsFor=e=>Array.isArray(e?.docs)?e.docs:[];
 const caption=()=>'<p class="inspection-caption"><span>調査の進行は変わりません。</span></p>';
 function renderDesk({episode,caseNumber=''}={}){
  const docs=docsFor(episode);if(!docs.length||!Desk?.render)return '';
  return `<section class="desk-inspection" aria-label="資料の見返し">${caption()}${Desk.render({docs,state:{picks:[]},targetLabel:episode.targetLabel||'',caseNumber})}</section>`;
 }
 function renderPage({episode,docId,index=0}={}){
  const doc=docsFor(episode).find(d=>d.id===docId);if(!doc?.pages?.length)return renderDesk({episode});
  const total=doc.pages.length,at=Number.isFinite(Number(index))?Math.max(0,Math.min(total-1,Math.floor(Number(index)))):0,p=doc.pages[at];
  return `<section class="desk-inspection inspection-reader" data-inspection-doc="${esc(doc.id)}" aria-label="資料の見返し">${caption()}<div class="inspection-reader-top"><button class="text-button" data-inspection-desk>← 机の帳票一覧</button><span>${at+1} / ${total}ページ</span></div><div class="inspection-document-heading"><div><h3>${esc(doc.title)}</h3><p>${esc(p.ref)}</p></div><button class="secondary" data-inspection-original="${esc(p.id)}">拡大して読む ↗</button></div><div class="inspection-paper"><div class="paper-scroll" data-fit="true" role="region" aria-label="${esc(p.title)}・画面幅表示"><div class="paper-canvas">${p.html}</div></div></div><div class="inspection-page-controls"><button class="secondary" data-inspection-page="${at-1}" ${at===0?'disabled':''}>← 前のページ</button><span aria-live="polite">${at+1} / ${total}</span><button class="secondary" data-inspection-page="${at+1}" ${at===total-1?'disabled':''}>次のページ →</button></div></section>`;
 }
 function bind({root,episode,onOpen,onPage,onDesk,onOriginal}={}){
  if(!root?.querySelectorAll)return;
  const docs=docsFor(episode),selected=root.querySelector?.('[data-inspection-doc]')?.dataset?.inspectionDoc,doc=docs.find(d=>d.id===selected);
  root.querySelectorAll('[data-doc]').forEach(b=>b.onclick=()=>{if(docs.some(d=>d.id===b.dataset.doc))onOpen?.(b.dataset.doc)});
  root.querySelectorAll('[data-inspection-page]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.inspectionPage);if(!b.disabled&&doc&&Number.isInteger(n)&&n>=0&&n<doc.pages.length)onPage?.(n)});
  root.querySelectorAll('[data-inspection-desk]').forEach(b=>b.onclick=()=>onDesk?.());
  root.querySelectorAll('[data-inspection-original]').forEach(b=>b.onclick=()=>{if(doc?.pages.some(p=>p.id===b.dataset.inspectionOriginal))onOriginal?.(b.dataset.inspectionOriginal)});
 }
 return {renderDesk,renderPage,bind};
}));
