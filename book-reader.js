/* 一つの綴じ帳票を前後にめくる閲覧UI。資料・証拠の判定は進行モデルが担う。 */
(function (host, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else host.TraceBook = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const bindings = new WeakMap();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));

  function render({page, index, count, checked, sourceTitle}) {
    const total = Number.isFinite(Number(count)) ? Math.max(1, Math.floor(Number(count))) : 1;
    const at = Math.max(0, Math.min(total - 1, Math.floor(Number(index)) || 0));
    const normalize = text => String(text ?? '').replace(/[\s・（）()]/g, '').replace(/控え/g, '控');
    const separateTitle = normalize(sourceTitle) !== normalize(page.title);
    return `<section class="ledger-book" data-book-index="${at}" data-book-count="${total}" aria-label="${esc(sourceTitle)}の帳票">
      <div class="book-toolbar"><div class="book-title"><h2>${esc(sourceTitle)}</h2></div><div class="book-tools"><span class="book-header-folio" aria-hidden="true">${at + 1}<i> / ${total}</i></span><button class="book-original" data-action="original">拡大して読む ↗</button></div></div>
      <div class="book-reference">${separateTitle ? `<span>${esc(page.title)}</span>` : ''}<p>${esc(page.ref)}</p></div>
      <label class="book-check ${checked ? 'book-is-checked' : ''}"><input type="checkbox" data-pick="${esc(page.id)}" ${checked ? 'checked' : ''} aria-label="このページを証拠に選ぶ：${esc(sourceTitle)} ${at + 1} / ${total}ページ" aria-describedby="book-pick-hint"><span class="book-check-copy"><span class="book-check-topline"><small>この1ページを選択</small><b class="book-check-state" aria-hidden="true">${checked ? '✓ 選択中' : '未選択'}</b></span><strong>${checked ? 'このページを証拠に選択中' : 'このページを証拠に選ぶ'}</strong><small class="book-check-help" id="book-pick-hint">${checked ? 'もう一度押すと外せます。提示は下のボタンから。' : '選べる証拠は1ページ。別のページを選ぶと入れ替わります。'}</small></span></label>
      <div class="book-paper-stage"><div class="book-stack"><div class="book-leaf">${checked ? '<span class="book-evidence-tab" aria-hidden="true">選択中</span>' : ''}<div class="book-punches" aria-hidden="true"><i></i><i></i><i></i></div><div class="book-page-area" tabindex="0" role="group" aria-label="帳票の紙面。左右の矢印キーでページをめくれます"><div class="paper-scroll" data-fit="true" role="region" aria-label="${esc(page.title)}・画面幅表示"><div class="paper-canvas">${page.html}</div></div><span class="book-spine" aria-hidden="true"></span><span class="book-paper-corner" aria-hidden="true"></span></div></div></div></div>
      <div class="book-navigation"><button class="book-turn-button" data-page="${at - 1}" ${at === 0 ? 'disabled' : ''}><span aria-hidden="true">‹</span> 前のページ</button><div class="book-folio" aria-live="polite" aria-label="${total}ページ中${at + 1}ページ"><strong>${at + 1}</strong><span> / ${total}</span></div><button class="book-turn-button book-turn-next" data-page="${at + 1}" ${at === total - 1 ? 'disabled' : ''}>次のページ <span aria-hidden="true">›</span></button></div>
      <p class="book-gesture-hint"><span class="book-desktop-hint">ボタン・キーボードの ← → でめくれます</span><span class="book-touch-hint">紙面を左右にスワイプしてもめくれます</span></p>
    </section>`;
  }

  function bind({root, onTurn}) {
    if (!root || typeof root.addEventListener !== 'function') return () => {};
    const existing = bindings.get(root);
    if (existing) { existing.onTurn = onTurn; existing.active = null; return existing.cleanup; }
    const state = {onTurn, active: null};
    const control = 'button, input, label, a, select, textarea, summary, [contenteditable]:not([contenteditable="false"])';
    const clear = () => { state.active = null; };
    const zoomed = () => typeof window !== 'undefined' && Number(window.visualViewport?.scale ?? 1) > 1.01;
    const hasSelection = () => {
      const selection = typeof window !== 'undefined' && window.getSelection?.();
      return !!(selection && !selection.isCollapsed && String(selection).length);
    };
    const turn = (book, direction) => {
      if (!book || typeof root.contains === 'function' && !root.contains(book)) return false;
      const index = Number(book.getAttribute('data-book-index'));
      const count = Number(book.getAttribute('data-book-count'));
      if (!Number.isInteger(index) || !Number.isInteger(count) || index + direction < 0 || index + direction >= count) return false;
      if (typeof state.onTurn !== 'function') return false;
      state.onTurn(direction);
      return true;
    };
    const down = event => {
      if (event.pointerType !== 'touch') return;
      if (zoomed()) { clear(); return; }
      if (event.isPrimary === false || state.active) { clear(); return; }
      const target = event.target;
      if (!target || typeof target.closest !== 'function' || target.closest(control)) return;
      const area = target.closest('.book-page-area');
      const book = area?.closest('.ledger-book');
      if (!book || typeof root.contains === 'function' && !root.contains(book)) return;
      if (hasSelection()) return;
      state.active = {id: event.pointerId, x: event.clientX, y: event.clientY, started: Date.now(), book, vertical: false};
    };
    const move = event => {
      const active = state.active;
      if (!active || event.pointerId !== active.id) return;
      if (zoomed()) { clear(); return; }
      const x = Math.abs(event.clientX - active.x), y = Math.abs(event.clientY - active.y);
      if (y > 14 && y > x * .85) active.vertical = true;
    };
    const up = event => {
      const active = state.active;
      if (!active || event.pointerId !== active.id) return;
      clear();
      if (zoomed() || hasSelection()) return;
      const dx = event.clientX - active.x, dy = event.clientY - active.y;
      const width = active.book.clientWidth || 360;
      const threshold = Math.max(56, Math.min(90, width * .15));
      if (active.vertical || Math.abs(dx) < threshold || Math.abs(dy) > 40 || Math.abs(dy) > Math.abs(dx) * .35 || Date.now() - active.started > 1100) return;
      const direction = dx < 0 ? 1 : -1;
      turn(active.book, direction);
    };
    const keydown = event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || event.isComposing || hasSelection()) return;
      const target = event.target;
      if (target?.closest?.(control)) return;
      const book = target?.closest?.('.ledger-book') || root.querySelector?.('.ledger-book');
      if (!book) return;
      if (turn(book, event.key === 'ArrowRight' ? 1 : -1)) {
        event.preventDefault?.();
        root.querySelector?.('.book-page-area')?.focus?.({preventScroll: true});
      }
    };
    root.addEventListener('pointerdown', down, {passive: true});
    root.addEventListener('pointermove', move, {passive: true});
    root.addEventListener('pointerup', up, {passive: true});
    root.addEventListener('pointercancel', clear, {passive: true});
    root.addEventListener('keydown', keydown, {passive: false});
    state.cleanup = () => {
      root.removeEventListener?.('pointerdown', down);
      root.removeEventListener?.('pointermove', move);
      root.removeEventListener?.('pointerup', up);
      root.removeEventListener?.('pointercancel', clear);
      root.removeEventListener?.('keydown', keydown);
      bindings.delete(root);
    };
    bindings.set(root, state);
    return state.cleanup;
  }

  function animate(direction) {
    if (typeof document === 'undefined') return false;
    const html = document.documentElement;
    if (html?.dataset?.motion === 'off') return false;
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced && html?.dataset?.motionPreference !== 'on') return false;
    const leaf = document.querySelector('.ledger-book .book-leaf');
    if (!leaf || typeof leaf.setAttribute !== 'function') return false;
    leaf.removeAttribute?.('data-book-turn');
    // 再描画直後の紙面にも、続けて同じ方向へめくる際にも適用する。
    void leaf.offsetWidth;
    leaf.setAttribute('data-book-turn', direction < 0 ? 'previous' : 'next');
    return true;
  }

  return {render, bind, animate};
}));
