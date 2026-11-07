/* 説明会の代表用QR（index.html#e1 など）で開いたとき、事件一覧で迷わないよう、指定の事件を自動で開く。
   app.js は変更しない。自動で開くのは、その事件がまだ「この事件を調べる」（保存なし）のときだけ。
   保存がある（「続きから」「調査結果を見る」）ときは勝手に続行せず、一覧のその事件へ移動して
   「続きから」か「最初から始める」を本人に選んでもらう。保存は削除しない。 */
(function(){'use strict';
 if(typeof location==='undefined'||typeof document==='undefined'||!document.querySelector)return;
 const id=String(location.hash||'').replace(/^#/,'');
 if(!/^[a-z0-9]+$/i.test(id))return;
 const key='trace-leader-entry:'+id;
 try{if(sessionStorage.getItem(key))return}catch(e){}
 let tries=0;
 (function attempt(){
  const btn=document.querySelector('.episode-card button[data-episode="'+id+'"]');
  if(btn){
   try{sessionStorage.setItem(key,'1')}catch(e){}
   if(/この事件を調べる/.test(btn.textContent||'')){btn.click();return}
   const card=btn.closest('.episode-card')||btn;
   try{card.scrollIntoView({block:'center'})}catch(e){}
   try{btn.focus({preventScroll:true})}catch(e){}
   return;
  }
  if(++tries<40)setTimeout(attempt,100);
 })();
})();
