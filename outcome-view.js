(function(host,make){const api=make();if(typeof module==='object'&&module.exports)module.exports=api;else host.TraceOutcome=api;}(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const outcomes={
  correct:{symbol:'✓',title:'正解！ 証拠で矛盾を確認',text:'選んだページが、今回の説明を確かめる決め手になりました。おさらいを確認して先へ進めます。'},
  'off-target':{symbol:'×',title:'不正解：取引・期間が違います',text:'今回の調査対象とは違うページです。次へは進みません。対象番号・日付を確認して選び直してください。'},
  insufficient:{symbol:'!',title:'証拠不足：まだ次へ進めません',text:'このページだけでは、いまの説明の矛盾を確認できません。下の理由を読み、別のページを調べてください。'},
  corroboration:{symbol:'!',title:'証拠不足：別の帳票で裏付けが必要',text:'関係する手がかりですが、今回の確認はまだクリアできていません。実態を確かめる別の帳票を探してください。'},
  'used-evidence':{symbol:'↻',title:'確認済み：同じ帳票では進めません',text:'前の場面で使った帳票です。今回は別の事実を確認するため、ほかの帳票を選んでください。'},
  'one-page':{symbol:'!',title:'選び直し：証拠は1ページだけ',text:'提示するページを1つに絞ってください。この選択では次へ進みません。'}
 };
 const debriefs={
  e1:{headline:'納品済みの売上を、社長の指示で帳簿から外していました。',checks:['商品の引渡し','代金の受領','社長の指示'],summary:'若葉デザインへの納品と代金受領があるのに、売上が記録されていませんでした。',cards:[
   {title:'正当な取消と、何が違った？',answer:'若葉デザインには、実際に商品を渡していました。',compare:[
    {label:'比較用：東雲工業 H-0328',title:'出荷前に取り消した注文',text:'商品を渡す前の取消。売上がない記録と矛盾しません。',tone:'consistent'},
    {label:'調査対象：若葉デザイン W-0330',title:'納品済みなのに、売上がない',text:'3月30日の受領と代金受領を確認。出荷前の取消とは状況が違います。',tone:'contradiction'}
   ]},
   {title:'社長が指示したと、何で分かった？',answer:'指示メールと、その後の取消処理が一致しました。',steps:[
    {label:'3月31日 16:54',text:'社長が、メールで取消処理を指示。'},
    {label:'同日 17:42',text:'営業責任者01が、対象の請求を取消処理。'},
    {label:'証拠の提示後',text:'社長本人も、メールの送信と指示を認めた。'}
   ],note:'入力した人のIDだけで決めず、指示の内容と処理の順序まで照合しました。'},
   {title:'今回、売上を確認する日はいつ？',answer:'この会社の基準では、3月30日の受領確認日です。',facts:[
    {label:'売上の日付',text:'この会社は、受領確認日を基準に計上します。'},
    {label:'入金を調べた理由',text:'「代金を受け取っていない」という社長の説明を確かめるためです。'}
   ],note:'入金の有無だけで、売上を計上する時期を決めるわけではありません。'}
  ]},
  case02:{headline:'未着手の外注費を、社長の指示で計上していました。',checks:['受領・検収','作業の実態','計上の指示'],summary:'請求書はありましたが、外注業務は未着手。それを知る社長が、年度末の計上を指示していました。',cards:[
   {title:'請求書があれば、仕事は完了した？',answer:'請求書や支払があっても、作業は未着手でした。',compare:[
    {label:'帳簿・書類に残っていたもの',title:'請求書と費用計上、後日の支払',text:'これだけでは、仕事をいつ・どこまで受けたかは分かりません。',tone:'record'},
    {label:'実際に確かめたこと',title:'受領・検収の記録なし。作業も未着手',text:'会社側の記録と、外注先の実施状況回答を照合しました。',tone:'contradiction'}
   ]},
   {title:'計上を指示したのは誰？',answer:'未着手と知りながら、社長が計上を指示していました。',steps:[
    {label:'3月30日',text:'社長が、未着手の業務を今期の外注費に入れるようメールで指示。'},
    {label:'3月31日',text:'対象の外注費を仕訳入力・承認。'},
    {label:'証拠の提示後',text:'社長本人も、メールの送信と指示を認めた。'}
   ],note:'経理の入力ログだけで決めず、具体的な指示と本人の返答まで確かめました。'}
  ]},
  case03:{headline:'家族旅行を、社長の指示で会社の出張として処理していました。',checks:['打合せの実施','旅行の内容','精算の指示'],summary:'報告書の打合せは中止され、実際は家族の休暇旅行。社長が会社の出張として処理するよう指示していました。',cards:[
   {title:'報告書の「打合せ出張」は本当だった？',answer:'打合せは中止。実際の手配は、社長と家族の休暇でした。',compare:[
    {label:'出張報告書の説明',title:'北海工業との打合せ・業務視察',text:'社長は、業務のための出張と説明していました。',tone:'record'},
    {label:'相手先・旅行会社の記録',title:'打合せは未実施。家族の休暇手配',text:'相手先の予定確認と、旅行会社の参加者・手配内容を照合しました。',tone:'contradiction'}
   ],note:'家族同伴という一点だけで決めず、中止の記録・手配内容・本人の説明を合わせて確認しました。'},
   {title:'出張扱いにするよう指示したのは誰？',answer:'社長が、休暇旅行を会社の出張として処理させていました。',steps:[
    {label:'4月17日',text:'社長が、報告書の作成と出張扱いの精算をメールで指示。'},
    {label:'その後の処理',text:'精算書の摘要を変更し、申請を登録。'},
    {label:'証拠の提示後',text:'社長本人も、メールの送信と指示を認めた。'}
   ],note:'経理担当者による修正記録と、社長による処理の指示を分けて確かめました。'}
  ]}
 };
 function renderStatus({feedback,confirmed=0,total=3}={}){
  if(!feedback)return '';
  const kind=feedback.right?'correct':Object.hasOwn(outcomes,feedback.kind)?feedback.kind:'insufficient',item=outcomes[kind];
  return `<section class="reaction-heading outcome-status ${feedback.right?'right':'retry'}" data-outcome="${esc(kind)}" aria-labelledby="outcome-title"><span class="outcome-symbol" aria-hidden="true">${item.symbol}</span><div class="outcome-message"><h1 id="outcome-title">${item.title}</h1><p>${item.text}</p></div><div class="outcome-progress"><strong>${confirmed}<span> / ${total}</span></strong><small>確認できた証拠</small></div></section>`;
 }
 function renderClear({episode,proofs=[],caseNumber=''}={}){
  if(!episode?.acts?.length||!episode.acts.every((_,i)=>proofs.some(p=>p.act===i)))return '';
  const checks=debriefs[episode.id]?.checks||episode.acts.map(a=>a.title);
  return `<section class="case-clear" aria-labelledby="case-clear-title"><div class="case-clear-heading"><div class="case-clear-symbol" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><path d="M20 10h24v17c0 10-5 17-12 17S20 37 20 27V10Z" fill="currentColor"/><path d="M20 15H11v9c0 8 5 12 12 12m21-21h9v9c0 8-5 12-12 12M32 44v10m-12 2h24" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="m26 25 4 4 9-10" stroke="#173d33" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><span class="case-clear-eyebrow">CASE ${esc(caseNumber)} CLEAR</span><h1 id="case-clear-title">調査クリア！</h1><p>3つすべての確認で、正しい証拠を提示できました。</p></div><div class="case-clear-count"><strong>${checks.length}<span> / ${checks.length}</span></strong><small>すべて確認</small></div></div><ul class="case-clear-checks" aria-label="正解した確認">${checks.map((label,i)=>`<li><span aria-hidden="true">✓</span><b>${i+1}. ${esc(label)}</b><small>正解</small></li>`).join('')}</ul></section>`;
 }
 function renderDebrief({episodeId}={}){
  const data=debriefs[episodeId];if(!data)return '';
  return `<section class="result-debrief" aria-labelledby="debrief-title"><header class="debrief-heading"><h2 id="debrief-title">事件の答え合わせ</h2></header><div class="debrief-cards">${data.cards.map((card,i)=>`<article class="debrief-card"><header><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(card.title)}</h3></header><div class="debrief-answer"><strong>${esc(card.answer)}</strong></div>${card.compare?`<div class="debrief-comparison">${card.compare.map(c=>`<div class="debrief-comparison-item is-${c.tone}"><small>${esc(c.label)}</small><strong>${esc(c.title)}</strong><p>${esc(c.text)}</p></div>`).join('')}</div>`:''}${card.steps?`<ol class="debrief-timeline">${card.steps.map(s=>`<li><strong>${esc(s.label)}</strong><p>${esc(s.text)}</p></li>`).join('')}</ol>`:''}${card.facts?`<dl class="debrief-facts">${card.facts.map(f=>`<div><dt>${esc(f.label)}</dt><dd>${esc(f.text)}</dd></div>`).join('')}</dl>`:''}${card.note?`<p class="debrief-note">${esc(card.note)}</p>`:''}</article>`).join('')}</div></section>`;
 }
 function renderScope({limit}={}){
  return `<aside class="result-limit result-scope"><span aria-hidden="true">i</span><div><h2>表示金額は、追徴税額ではありません</h2><p>この体験で調べた取引・精算の金額です。税額の計算や、法律上の不正の認定は扱いません。</p><details><summary>この事件で扱わない判断の詳細</summary><p>${esc(limit)}</p></details></div></aside>`;
 }
 const headlineFor=episodeId=>debriefs[episodeId]?.headline;
 return {renderStatus,renderClear,renderDebrief,renderScope,headlineFor};
}));
