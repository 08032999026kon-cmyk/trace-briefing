/* 机の上の帳票束を選ぶ。配置・装飾は進行や正解に依存させない。 */
(function(host,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else host.TraceDesk=api;
}(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fallback=()=>'<div class="desk-generic-form"><span></span><b></b><i></i><i></i><i></i><i></i><i></i><i></i></div>';
function render({docs=[],state={},targetLabel='',caseNumber=''}){
 const picks=Array.isArray(state.picks)?state.picks:[];
 return `<section class="desk-worktop" aria-label="机の上の帳票"><div class="desk-surface"><div class="desk-topline"><div><span class="desk-case-label">CASE ${esc(caseNumber)}</span></div><span class="desk-bundle-total">${docs.length}束の帳票</span></div><div class="desk-target-slip"><span>調査対象</span><strong>${esc(targetLabel)}</strong></div><div class="desk-pencil" aria-hidden="true"><i></i></div><div class="desk-paper-layout">${docs.map((d,i)=>{
  const selected=d.pages.filter(p=>picks.includes(p.id)).length;
  const preview=d.pages[0]?.html||fallback();
  return `<button class="desk-pile desk-pile-pose-${i%6}${selected?' desk-pile-selected':''}" data-doc="${esc(d.id)}" aria-label="${esc(d.title)}、${d.pages.length}ページ${selected?`、${selected}ページ選択中`:''}を開く"><span class="desk-under-sheet desk-under-sheet-back" aria-hidden="true"></span><span class="desk-under-sheet desk-under-sheet-middle" aria-hidden="true"></span><span class="desk-sheet-face"><span class="desk-metal-clip" aria-hidden="true"></span><span class="desk-preview-window" aria-hidden="true" inert><span class="desk-preview">${preview}</span><span class="desk-preview-fade"></span></span><span class="desk-document-label"><strong>${esc(d.title)}</strong><small>${esc(d.sub||d.source||'')}</small></span><span class="desk-pile-bottom"><span>${d.pages.length}ページ${selected?` <b>・${selected}ページ選択中</b>`:''}</span><span class="desk-pile-open">開く <i aria-hidden="true">↗</i></span></span>${selected?'<span class="desk-selected-tag" aria-hidden="true">✓</span>':''}</span></button>`;
 }).join('')}</div><div class="desk-lower-edge" aria-hidden="true"><span></span><i></i></div></div></section>`;
}
return {render};
}));
