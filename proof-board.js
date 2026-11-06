/* 提示済みの決め手だけを、実際の帳票と注釈で並べる。進行や原稿は変更しない。 */
(function(host,factory){'use strict';
 const api=typeof module==='object'&&module.exports?factory(require('./evidence-recap.js'),require('./recap-data.js')):factory(host.TraceEvidenceRecap,host.TraceRecapData);
 if(typeof module==='object'&&module.exports)module.exports=api;else host.TraceProofBoard=api;
}(typeof globalThis!=='undefined'?globalThis:this,function(Recap,Notes){'use strict';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function pagesFor(episode){return new Map((episode?.docs||[]).flatMap(d=>d?.pages||[]).filter(p=>p&&typeof p.id==='string').map(p=>[p.id,p]));}
 function sources({episode,proof}={}){
  if(!episode||!proof||!Number.isInteger(proof.act)||proof.act<0||!episode.acts?.[proof.act]||!Array.isArray(proof.pageIds))return [];
  const pages=pagesFor(episode),presented=new Set(proof.pageIds),act=episode.acts[proof.act],allowed=(proof.rulesVersion===1?act.legacyCorrect:act.correct)||act.correct||[],seen=new Set(),result=[];
  for(const key of allowed){const id=episode.keyPages?.[key];if(!presented.has(id)||seen.has(id))continue;seen.add(id);const page=pages.get(id),notes=Notes?.forPage?.({episodeId:episode.id,act:proof.act,pageId:id});if(page&&typeof page.html==='string'&&notes?.points?.length)result.push({page,notes});}
  return result;
 }
 function documentCard({page,notes},act){
  const annotated=Recap.annotate(page.html,notes);
  return `<figure class="proof-document" data-proof-page="${esc(page.id)}"><figcaption class="proof-document-heading"><span>実際に提示した帳票</span><strong>${esc(page.title)}</strong><small>${esc(page.ref)}</small></figcaption><div class="proof-document-sheet"><div class="paper-scroll" data-fit="true" role="region" aria-label="${esc(page.title)}、赤枠付きの原帳票"><div class="paper-canvas">${annotated}</div></div></div><ol class="proof-point-notes">${notes.points.map((p,i)=>`<li><b aria-hidden="true">${i+1}</b><div><strong>${esc(p.label)}</strong><p>${esc(p.explanation)}</p></div></li>`).join('')}</ol><div class="proof-document-actions"><button class="text-button" data-recap-act="${act}" data-recap-source-page="${esc(page.id)}">赤枠を拡大して確認 ↗</button><button class="text-button" data-read="${esc(page.id)}">元の帳票を見る ↗</button></div></figure>`;
 }
 function render({episode,proofs}={}){
  if(!episode||!Array.isArray(episode.docs)||!Array.isArray(episode.acts)||!Array.isArray(proofs))return '';
  const pages=pagesFor(episode),seenActs=new Set();
  const stages=proofs.filter(p=>p&&Number.isInteger(p.act)&&p.act>=0&&p.act<episode.acts.length).sort((a,b)=>a.act-b.act).filter(p=>{if(seenActs.has(p.act))return false;seenActs.add(p.act);return true});
  if(!stages.length)return '';
  return `<section class="proof-result proof-board" aria-label="提示した帳票で証拠を比較"><div class="proof-board-heading"><div><h2>あなたがつないだ証拠</h2><p>実際に提示した帳票を、確認した順に並べています。赤枠と番号で決め手を確認できます。</p></div><span class="proof-board-legend">赤枠：見るべき箇所</span></div><div class="proof-board-grid">${stages.map(proof=>{
   const act=episode.acts[proof.act],documents=sources({episode,proof}),decisive=new Set(((proof.rulesVersion===1?act.legacyCorrect:act.correct)||act.correct||[]).map(key=>episode.keyPages?.[key])),submitted=[...new Set(Array.isArray(proof.pageIds)?proof.pageIds:[])].filter(id=>pages.has(id));
   return `<article class="proof-stage" data-proof-act="${proof.act}"><header class="proof-stage-heading"><span class="proof-number">${proof.act+1}</span><div><small>確認 ${proof.act+1}</small><h3>${esc(act.title)}</h3></div></header><div class="proof-stage-copy"><div class="proof-before"><span>社長の説明</span><p>「${esc(episode.claims?.[proof.act])}」</p></div><div class="proof-after"><span>記録で確認した事実</span><p>${esc(act.finding)}</p></div></div><div class="proof-documents">${documents.length?documents.map(d=>documentCard(d,proof.act)).join(''):'<p class="proof-no-preview">提示した帳票は、下の一覧から確認できます。</p>'}</div><details class="proof-submitted"><summary>提示した全${submitted.length}ページを見返す</summary><ul class="proof-pages">${submitted.map(id=>{const p=pages.get(id);return `<li><button class="text-button" data-read="${esc(id)}">${esc(p.title)} / ${esc(p.ref)} ↗<span class="proof-submitted-kind ${episode.other?.includes(id)?'is-outside':''}">${decisive.has(id)?'この確認の決め手':episode.other?.includes(id)?'対象外の参考資料':'あわせて提示した資料'}</span></button></li>`}).join('')}</ul></details></article>`;
  }).join('')}</div></section>`;
 }
 return {sources,render};
}));
