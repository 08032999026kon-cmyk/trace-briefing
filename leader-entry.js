/* 説明会の代表用QR（index.html#e1 など）で開いたとき、事件一覧で迷わないよう、指定の事件を自動で開く。
   app.js は変更しない。一覧に表示された「この事件を調べる／続きから」ボタンを1回だけ押す。 */
(function(){'use strict';
 if(typeof location==='undefined'||typeof document==='undefined'||!document.querySelector)return;
 const id=String(location.hash||'').replace(/^#/,'');
 if(!/^[a-z0-9]+$/i.test(id))return;
 const key='trace-leader-entry:'+id;
 try{if(sessionStorage.getItem(key))return}catch(e){}
 let tries=0;
 (function attempt(){
  const btn=document.querySelector('button[data-episode="'+id+'"]');
  if(btn){try{sessionStorage.setItem(key,'1')}catch(e){}btn.click();return}
  if(++tries<40)setTimeout(attempt,100);
 })();
})();
