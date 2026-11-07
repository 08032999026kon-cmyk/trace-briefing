/* 説明会のグループ体験用：メンバーのスマホで机の帳票を閲覧するだけの画面。
   証拠の選択・社長への提示はできない（代表のスマホ=index.htmlだけが行う）。
   代表側の調査の進行・保存には一切触れない（保存キーは別）。 */
(function(host,make){'use strict';
 const api=make();
 if(typeof module==='object'&&module.exports)module.exports=api;else{host.TraceMemberView=api;if(host.document?.querySelector?.('#member-main'))api.mount()}
}(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
 const KEY='trace-member-v1';
 // app.js の investigationQuestions と同じ文面（tests/member-view.cjs で一致を確認）。
 const QUESTIONS={e1:['商品を受け取った事実は、どの書類で確かめられるだろう？','代金を受け取った記録はあるだろうか。取引先・日付・金額を確かめよう。','取消を指示したのは誰だろう。処理の記録と、社内のやり取りをつなげよう。'],case02:['成果物を受け取り、内容を確認した記録はあるだろうか？','外注先は本当に作業を終えていたのか。実施状況を確かめよう。','未着手の仕事を費用に入れるよう、誰が指示したのだろう？'],case03:['打合せは実際に行われたのか。相手先との記録で確かめよう。','誰が、何のために旅行したのか。実際の手配内容を調べよう。','この旅行を出張として処理するよう、誰が指示したのだろう？']};
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 function clampInt(v,min,max,dflt){const n=Number(v);return Number.isInteger(n)&&n>=min&&n<=max?n:dflt}
 function cleanView(raw,episode){
  const docs=episode?.docs||[],acts=(episode?.claims||[]).length||3;
  const v={act:0,docId:null,index:0,zoom:false};
  if(!raw||typeof raw!=='object')return v;
  v.act=clampInt(raw.act,0,acts-1,0);
  const doc=docs.find(d=>d.id===raw.docId);
  if(doc){v.docId=doc.id;v.index=clampInt(raw.index,0,doc.pages.length-1,0);v.zoom=raw.zoom===true}
  return v;
 }

 function caseList(episodes){
  return `<section class="member-cases" aria-labelledby="member-cases-title"><h1 id="member-cases-title">事件を選んでください</h1><p>代表のスマホと<strong>同じ事件</strong>を選びます。分からないときは、運営スタッフに確認してください。</p><ul>${episodes.map((e,i)=>`<li><button class="member-case" data-case="${esc(e.id)}"><span>CASE ${String(i+1).padStart(2,'0')}</span><strong>${esc(e.title)}</strong><small>${esc(e.company)}／${esc(e.amountLabel||'')} ${esc(e.amountText||'')}</small></button></li>`).join('')}</ul></section>`;
 }

 function roleBanner(episode,number){
  return `<section class="member-role" aria-label="この画面の役割"><div><span class="member-role-badge">メンバー用</span><strong>帳票を読む専用の画面です</strong></div><p>気になるページは「<b>資料名の○ページ目</b>」とグループに伝えます。社長にぶつけるのは<b>代表のスマホ</b>です。</p><div class="member-case-line"><span>CASE ${esc(number)}／${esc(episode.title)}</span><button class="text-button" data-member-cases>事件を選び直す</button></div></section>`;
 }

 function briefing(episode){
  const b=episode.briefing;if(!b)return '';
  return `<details class="member-brief"><summary>調査の状況（役割・対象の取引）</summary><dl><div><dt>あなたの役割</dt><dd>${esc(b.role)}（${esc(b.location)}）</dd></div><div><dt>調べている取引</dt><dd>${esc(b.target)}</dd></div><div><dt>調査のきっかけ</dt><dd>${esc(b.clue)}</dd></div><div><dt>心がけ</dt><dd>${esc(b.stance)}</dd></div></dl></details>`;
 }

 // 主張は3つとも並べて見せる。代表の進行と同期しないため、メンバーに番号を合わせる操作をさせない。
 function claimPanel(episode,act,portrait){
  const claims=episode.claims||[];
  let face='';try{face=portrait?portrait('smug',episode.id):''}catch(e){face=''}
  return `<section class="member-claim" aria-label="社長の主張と、確かめること"><div class="member-claim-head">${face?`<div class="member-claim-face" aria-hidden="true">${face}</div>`:''}<div><strong>${esc(episode.president)}社長の3つの主張</strong><p>代表が読み上げた主張の<span class="member-red">赤字の問い</span>を手がかりに探します。</p></div></div><ol class="member-claim-list">${claims.map((c,i)=>`<li><span class="member-claim-no">主張${i+1}</span><div><strong>「${esc(c)}」</strong><p class="member-question">${esc(QUESTIONS[episode.id]?.[i]||episode.acts?.[i]?.goal||'')}</p></div></li>`).join('')}</ol></section>`;
 }

 function workspace(episode,view,Inspection,number){
  if(!Inspection)return '';
  if(!view.docId)return `<div class="member-section-heading"><h2>机の上の帳票</h2><p>束を押すと開きます。全部の資料が最初から机にあります。</p></div>`+Inspection.renderDesk({episode,caseNumber:number});
  let html=Inspection.renderPage({episode,docId:view.docId,index:view.index});
  if(view.zoom)html=html.replace('data-fit="true"','data-fit="false"').replace('拡大して読む ↗','画面幅に戻す');
  const doc=episode.docs.find(d=>d.id===view.docId),page=doc?.pages[view.index];
  const tell=page?`<p class="member-tell">相談するときは「<b>${esc(doc.title)}</b>の<b>${view.index+1}ページ目</b>」と伝えると分かりやすいです。</p>`:'';
  return html+tell;
 }

 function render(ctx){
  const {episodes,episode,view,Inspection,portrait}=ctx;
  if(!episode)return caseList(episodes);
  const number=String(episodes.findIndex(e=>e.id===episode.id)+1).padStart(2,'0');
  return roleBanner(episode,number)+briefing(episode)+claimPanel(episode,view.act,portrait)+`<section class="member-workspace" aria-label="帳票">${workspace(episode,view,Inspection,number)}</section>`;
 }

 function mount({doc=globalThis.document,win=globalThis.window,Story=globalThis.TraceStory,Inspection=globalThis.TraceDeskInspection,Characters=globalThis.TraceCharacters,Fit=globalThis.PaperFit}={}){
  const main=doc.querySelector('#member-main');if(!main||!Story)return null;
  const episodes=Story.episodes;
  let store={};try{store=JSON.parse(win.localStorage.getItem(KEY)||'{}')||{}}catch(e){store={}}
  const params=new URLSearchParams(win.location?.search||'');
  const wanted=params.get('case')||String(win.location?.hash||'').replace(/^#/,'');
  let episode=episodes.find(e=>e.id===wanted)||episodes.find(e=>e.id===store.active)||null;
  let view=cleanView(store.views?.[episode?.id],episode),deskScroll=0;
  const portrait=Characters?.president?(x,id)=>Characters.president(x,id):null;
  function persist(){try{store.active=episode?.id||null;store.views=store.views||{};if(episode)store.views[episode.id]=view;win.localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}}
  function draw(scroll){
   main.innerHTML=render({episodes,episode,view,Inspection,portrait});
   bind();Fit?.refresh?.();persist();
   if(scroll==='top')win.scrollTo?.({top:0,behavior:'auto'});
   else if(scroll==='reader'){const r=main.querySelector('.member-workspace');if(r)win.scrollTo?.({top:Math.max(0,(r.getBoundingClientRect?.().top||0)+(win.scrollY||0)-8),behavior:'auto'})}
   else if(typeof scroll==='number')win.scrollTo?.({top:scroll,behavior:'auto'});
  }
  function openDoc(id){deskScroll=win.scrollY||0;view={...view,docId:id,index:0,zoom:false};draw('reader')}
  function setPage(n){const d=episode.docs.find(x=>x.id===view.docId);if(!d||n<0||n>=d.pages.length)return;const y=win.scrollY||0;view={...view,index:n};draw(y)}
  function toDesk(){view={...view,docId:null,index:0,zoom:false};draw(deskScroll)}
  function bind(){
   main.querySelectorAll('[data-case]').forEach(b=>b.onclick=()=>{episode=episodes.find(e=>e.id===b.dataset.case)||null;view=cleanView(store.views?.[episode?.id],episode);draw('top')});
   main.querySelectorAll('[data-member-cases]').forEach(b=>b.onclick=()=>{episode=null;draw('top')});
   main.querySelectorAll('[data-member-act]').forEach(b=>b.onclick=()=>{const y=win.scrollY||0;view={...view,act:Number(b.dataset.memberAct)};draw(y)});
   Inspection?.bind?.({root:main,episode,onOpen:openDoc,onPage:setPage,onDesk:toDesk,onOriginal:()=>{const y=win.scrollY||0;view={...view,zoom:!view.zoom};draw(y)}});
   const paper=main.querySelector('.inspection-paper');
   if(paper&&!view.zoom){let sx=0,sy=0,on=false;
    paper.addEventListener('touchstart',e=>{if(e.touches.length!==1){on=false;return}on=true;sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
    paper.addEventListener('touchend',e=>{if(!on)return;on=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)setPage(view.index+(dx<0?1:-1))},{passive:true});
   }
  }
  doc.addEventListener('keydown',e=>{if(!episode||!view.docId||e.target?.closest?.('input,textarea,select'))return;if(e.key==='ArrowRight')setPage(view.index+1);else if(e.key==='ArrowLeft')setPage(view.index-1)});
  draw('top');
  return {state:()=>({episode:episode?.id||null,view:{...view}})};
 }

 return {QUESTIONS,KEY,cleanView,render,mount};
}));
