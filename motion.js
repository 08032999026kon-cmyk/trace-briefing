/* 初期表示は端末設定に従う。利用者が明示した再生・停止は優先する。 */
(function(root){'use strict';
const KEY='trace-motion-v2';let toggleCurrent=()=>{};
function enabled(preference,reduced){return preference==='on'||(preference!=='off'&&!reduced)}
function init(){const button=document.querySelector('#motion-toggle'),query=window.matchMedia?.('(prefers-reduced-motion: reduce)');let preference='auto';try{const saved=localStorage.getItem(KEY);if(['auto','on','off'].includes(saved))preference=saved;else if(localStorage.getItem('trace-motion-v1')==='off')preference='off'}catch(e){}
function update(){const on=enabled(preference,!!query?.matches),html=document.documentElement;html.dataset.motionPreference=preference;html.dataset.motion=on?'on':'off';html.dataset.motionReason=preference==='auto'&&query?.matches?'system':on?'playing':'paused';button.textContent=on?'アニメを止める':'▶ アニメを再生';button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',on?'アニメーションを停止する':'アニメーションを再生する');button.disabled=false;button.title=on?'押すとアニメーションを停止します':'押すと再生します。端末の設定よりこの操作を優先します。';}
toggleCurrent=()=>{preference=enabled(preference,!!query?.matches)?'off':'on';try{localStorage.setItem(KEY,preference)}catch(e){}update()};button.onclick=toggleCurrent;query?.addEventListener?.('change',update);update();}
const api={enabled,init,toggle(){toggleCurrent()}};root.TraceMotion=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
