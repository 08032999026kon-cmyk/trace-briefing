/* Original fictional character artwork. No external assets or runtime dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TraceCharacters = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var ink = '#172430';
  var skin = '#e7ac83';
  var light = '#f6c49b';
  var shade = '#c88060';

  function torso(expression) {
    var loose = expression === 'sweat' || expression === 'cornered';
    return '<g class="ceo-torso">' +
      // The silhouette is deliberately broad and slightly asymmetrical.
      '<path d="M92 640 91 462c-2-39 12-68 45-88l75-35 139 0 70 32c36 17 54 49 54 90l9 179Z" fill="#142637" stroke="' + ink + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="m111 449 34-58 56-28-19 137-17 140H94l-2-151Z" fill="#203b50"/>' +
      '<path d="m409 390 39 39 16 211h-99l-1-146-23-132Z" fill="#112131"/>' +
      '<path d="m207 337 5-51 137-1 6 59-20 49-100-1Z" fill="' + skin + '" stroke="' + ink + '" stroke-width="3.5"/>' +
      '<path d="m212 304 133-6 3 33-38 33-42 7-39-19-18-16Z" fill="' + shade + '"/>' +
      '<path d="m212 340 67 40 72-41 17 26-49 211-47 60-48-59-31-206Z" fill="#f4f1e8" stroke="' + ink + '" stroke-width="3"/>' +
      '<path d="m281 381-31 87-28-73-22-32 12-25Z" fill="#fffdf5" stroke="#adb3ad" stroke-width="2.5"/>' +
      '<path d="m281 381 31 83 29-71 22-29-12-25Z" fill="#fffdf5" stroke="#adb3ad" stroke-width="2.5"/>' +
      (loose ? '<path d="m269 405 26-2 10 22-16 21 19 145-29 38-24-40 22-143-16-17Z" fill="#89463f" stroke="' + ink + '" stroke-width="3"/><path d="m281 445-10 132 10 34 6-156Z" fill="#ad5b4d"/>' :
        '<path d="m266 379 30 0 15 23-21 25 19 163-30 40-27-41 19-161-21-24Z" fill="#8c413d" stroke="' + ink + '" stroke-width="3"/><path d="m278 428-11 154 14 30 5-185Z" fill="#ac5d4e"/><path d="m267 385 28 1-10 23Z" fill="#b66c58"/>') +
      '<path d="m207 342-34 19-26 81 39 10-24 26 75 162h39l-35-140Z" fill="#28465a" stroke="' + ink + '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="m352 342 34 19 29 81-39 10 22 27-75 161h-42l37-139Z" fill="#20394d" stroke="' + ink + '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="m202 359-21 83 24 6-19 26 53 123-29-118Z" fill="#3b586a" opacity=".65"/>' +
      '<path d="m356 363 20 76-24 9 18 28-42 99 25-104Z" fill="#385367" opacity=".62"/>' +
      '<path d="m364 475 46 5-3 17-46-4Z" fill="#101e2c" stroke="#527080" stroke-width="2"/>' +
      '<path d="m370 478 5-21 10 14 12-11 5 20Z" fill="#c6b8a1"/>' +
      '<path d="m285 480 18-1 1 7-20 1Z" fill="#d4b165" stroke="#937136" stroke-width="1.5"/>' +
      '<circle cx="299" cy="581" r="5" fill="#0d1e2a" stroke="#596e7b" stroke-width="2"/>' +
      '<path d="m124 443-10 105m322-106 14 105M174 602l-9 38m225-38 5 38" fill="none" stroke="#0d1d2a" stroke-width="3" stroke-linecap="round"/>' +
      '</g>';
  }

  function head(expression) {
    var tilt = expression === 'cornered' ? ' transform="rotate(3 280 255)"' : '';
    return '<g class="ceo-head"' + tilt + '>' +
      '<path d="M197 215c-13-11-28-4-27 14l5 26c2 15 13 24 28 16m168-57c13-10 27-2 25 15l-6 26c-3 14-12 22-26 16" fill="' + skin + '" stroke="' + ink + '" stroke-width="3.5"/>' +
      '<path d="M190 230c-10-7-12 2-8 15l9 10m188-24c10-6 11 3 7 14l-9 10" fill="none" stroke="' + shade + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M192 183c-2-61 34-91 88-94 65-4 101 29 97 92l-7 81c-3 27-17 50-39 66l-21 14c-15 8-39 10-56 1l-24-15c-23-15-36-39-38-67Z" fill="' + light + '" stroke="' + ink + '" stroke-width="4"/>' +
      '<path d="M358 155c9 33 6 63-1 87-4 16-7 41-24 59l-24 19c-24 17-45 13-65 4 8 13 23 24 40 24 21 1 34-5 50-17 23-17 36-39 38-70l6-78Z" fill="' + skin + '"/>' +
      '<path d="m200 218 10 39 9 17-3 29-15-22-8-28-1-28Z" fill="#d99873"/>' +
      '<path d="m354 212 7 23-9 28-5 7-9-8Z" fill="#d6956f" opacity=".75"/>' +
      '<path d="M194 224c-10-15-13-34-11-56-7-24 0-48 19-63 17-28 45-43 77-40 36-9 68 5 82 27 24 11 33 37 28 61l-15 71-11-35-5-43c-13 7-29 5-43 0-29 12-62 7-82-3l-23 19-3 39Z" fill="#253039" stroke="' + ink + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M196 153c2-31 23-52 48-58 28-22 67-15 83-3-37-9-59 9-82 26-13 9-27 19-49 35Z" fill="#44505a"/>' +
      '<path d="M231 134c37 4 53-29 87-29 14-1 32 4 42 15-22-6-36-3-56 8-26 15-46 22-73 6Z" fill="#3a4752"/>' +
      '<path d="M194 165c-5 18-2 41 2 55l10-22 3-36 15-19Z" fill="#65717a"/>' +
      '<path d="m363 160 2 38 9 24 7-33-2-38Z" fill="#65717a"/>' +
      '<path d="M211 127c15-20 36-30 54-34m-40 38c25-8 34-22 55-28m25-14c23 0 44 10 51 23" fill="none" stroke="#6e7880" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M235 175c18-6 38-5 54-1m-48 9c13-3 26-3 37-1" fill="none" stroke="#ce9874" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="m279 226-9 35c-2 6 4 10 12 10l13-2" fill="none" stroke="#a96d52" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="m284 229 9 29-2 7-12 1Z" fill="#e3a47b"/>' +
      '<path d="m249 268-10 13m77-15 10 14" fill="none" stroke="#bf8464" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M262 320c11 5 29 6 41-1" fill="none" stroke="#c38a68" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M202 186q76-25 164-3l-5 25q-38-5-67 9-45-12-91 2Z" fill="#6e5146" opacity=".13"/>' +
      '<path d="m225 261-9 8m130-13 10 8" stroke="#af7559" stroke-width="2.5"/>' +
      face(expression) + '</g>';
  }

  function face(expression) {
    // Expression reads first: a boastful grin, a sharp rebuttal, panic, defeat.
    if (expression === 'defensive') {
      return '<path d="m209 198 31-2 27 14-37-3Z m92 11 29-15 27 3-19 10Z" fill="#18222c"/>' +
        '<g class="ceo-eyes"><path d="M213 224q23-17 48 1-24 13-48-1m89-3q23-17 47-2-21 14-47 2" fill="#fffaf0" stroke="' + ink + '" stroke-width="3"/><ellipse cx="245" cy="223" rx="4.5" ry="7" fill="#18232d"/><ellipse cx="319" cy="220" rx="4.5" ry="7" fill="#18232d"/><path d="m216 239 24 3m81-3 25-4" fill="none" stroke="#af7258" stroke-width="2.5"/></g>' +
        '<path d="m271 201 7-12m13 10 4-12" fill="none" stroke="#ba805e" stroke-width="2.5"/>' +
        '<g class="ceo-mouth"><path d="M249 294q31-14 67-4l-10 16q-31-5-54 3Z" fill="#673b35" stroke="#794b3f" stroke-width="3"/><path d="m257 292 50-1-5 9-44 2Z" fill="#fff8e5"/><path d="m274 292 0 9m16-10 0 9" stroke="#c5baa0" stroke-width="1.8"/></g>';
    }
    if (expression === 'sweat') {
      return '<path d="m211 201 20-15 33 11-30-1-18 11Z m91-4 31-12 19 16-21-6Z" fill="#18222c"/>' +
        '<g class="ceo-eyes"><path d="M211 226q22-30 49-2-23 24-49 2m90-2q21-29 47-2-22 23-47 2" fill="#fffdf2" stroke="' + ink + '" stroke-width="3"/><ellipse cx="239" cy="225" rx="4.2" ry="9" fill="#18232d"/><ellipse cx="325" cy="222" rx="4.2" ry="9" fill="#18232d"/><path d="m215 245 27 3m76-3 28-5" fill="none" stroke="#ad6e57" stroke-width="2.5"/></g>' +
        '<path d="m269 177-1 20m12-24 1 18m12-15 3 18" stroke="#ac7159" stroke-width="2.3"/>' +
        '<g class="ceo-mouth"><path d="M258 294q21-19 43-2l8 19q-27-10-53 1Z" fill="#623c37" stroke="#794b3f" stroke-width="3"/><path d="m266 292 29-1 4 8-34 2Z" fill="#fff9e9"/></g>' +
        '<g class="ceo-sweat" fill="#c4e7ef" stroke="#5089a2" stroke-width="2.2"><path d="M355 218c-3-12 6-30 6-30s12 17 11 29c-1 15-14 17-17 1Z"/><path d="M195 253c-2-11 5-23 5-23s10 13 10 22c0 14-12 15-15 1Z"/><path d="M341 177c-1-7 4-17 4-17s8 10 8 17c0 10-11 11-12 0Z"/></g>';
    }
    if (expression === 'cornered') {
      return '<path d="m213 204 22-10 29 6-30 2-18 9Z m88-3 29-7 20 12-21-4Z" fill="#263039"/>' +
        '<g class="ceo-eyes"><path d="M215 227q23 12 45-1m43-1q22 11 43-2" fill="none" stroke="' + ink + '" stroke-width="4.5"/><path d="m220 241 25 4m72-3 27-5" fill="none" stroke="#ae7158" stroke-width="2.5"/></g>' +
        '<path d="m256 288 16 4 13-2 16 4" fill="none" stroke="#72473e" stroke-width="4"/>' +
        '<g class="ceo-mouth"><path d="M261 307q20-9 41 0" fill="none" stroke="#794d41" stroke-width="3.5"/><path d="m271 315 23 0" stroke="#ba7c60" stroke-width="2"/></g>' +
        '<path d="M352 250c-1-8 5-18 5-18s8 10 8 18c0 10-12 10-13 0Z" fill="#c4e7ef" stroke="#5089a2" stroke-width="2"/>';
    }
    return '<path d="m210 198 31-8 25 19-32-7-20 3Z m91 4 26-18 25 8-26 4Z" fill="#18222c"/>' +
      '<g class="ceo-eyes"><path d="M212 223q24-10 49 5-24 10-49-5m90-4q24-14 48-3-21 14-48 3" fill="#fff8e7" stroke="' + ink + '" stroke-width="3"/><ellipse cx="246" cy="225" rx="4.5" ry="6" fill="#18232d"/><ellipse cx="329" cy="217" rx="4.5" ry="6" fill="#18232d"/><path d="m214 239 25 3m84-5 22-6" fill="none" stroke="#aa6e56" stroke-width="2.5"/></g>' +
      '<g class="ceo-mouth"><path d="M243 283q34 28 78-5c-5 33-49 44-78 5Z" fill="#6e3932" stroke="#794b3f" stroke-width="3" stroke-linejoin="round"/><path d="M249 286q31 17 65-3l-6 14q-31 16-54-2Z" fill="#fff8df"/><path d="m278 294 1 10m15-13 0 10" stroke="#cfbba0" stroke-width="1.8"/><path d="m258 317 16 3m21-3 16-9" fill="none" stroke="#c48763" stroke-width="2.4"/></g>';
  }

  function watch(x, y, angle) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + angle + ')"><path d="M-15-21h30v43h-30Z" fill="#d4ac55" stroke="#856631" stroke-width="2"/><path d="M-13-16h26m-26 6h26m-26 23h26m-26 5h26" stroke="#9b783b" stroke-width="2"/><rect x="-17" y="-12" width="34" height="26" rx="7" fill="#e5c778" stroke="#8a6b34" stroke-width="2.5"/><rect x="-12" y="-8" width="24" height="18" rx="4" fill="#f5e7b2"/><path d="M0-4v7l6 2" fill="none" stroke="#5c5949" stroke-width="2" stroke-linecap="round"/><circle cy="3" r="1.8" fill="#5c5949"/></g>';
  }

  function arms(expression) {
    if (expression === 'defensive') {
      return '<g class="ceo-arms" stroke="' + ink + '" stroke-width="3.5" stroke-linejoin="round">' +
        '<path d="M112 429c-13 26-14 72 6 98 19 25 44 29 78 23l177-31-8-62-195 34-18-55Z" fill="#233f54"/>' +
        '<path d="m126 488 27 22 182-33 10 23-165 35c-28 5-42-5-54-17Z" fill="#355166" stroke="none"/>' +
        '<path d="m323 468 32-7 12 60-32 7Z" fill="#f5f2e8"/>' +
        '<g class="ceo-hand"><path d="M351 469c17-12 36-18 56-13l28 8c12 4 12 13 2 15l-31-6 41 12c10 3 8 14-2 14l-43-8 40 13c10 4 5 14-4 13l-40-9 29 13c9 5 3 14-7 12l-53-16-11-12Z" fill="' + light + '"/><path d="m372 478 27-3m-24 17 26-1m-21 14 19 3" fill="none" stroke="#c58a67" stroke-width="2" stroke-linecap="round"/></g>' +
        '<path d="M448 427c16 22 22 61 5 88-11 18-30 25-59 23L192 516l8-64 188 31 20-57Z" fill="#1c3448"/>' +
        '<path d="m414 481 20-10c8 18 7 35-4 44-9 8-23 11-39 8l-178-20 1-22 182 20Z" fill="#2a4559" stroke="none"/>' +
        '<path d="m212 454-30-4-10 60 31 5Z" fill="#fffaf0"/>' +
        '<g class="ceo-hand"><path d="M188 458c-18-13-35-17-55-10l-32 13c-10 5-7 14 3 13l34-10-39 19c-10 5-5 15 4 12l38-13-31 17c-9 6-2 14 6 10l33-13-23 15c-9 7-1 14 8 9l40-20 7-14Z" fill="' + light + '"/><path d="m162 466-21-1m19 16-17 2m14 12-13 5" fill="none" stroke="#c58a67" stroke-width="2" stroke-linecap="round"/></g>' +
        watch(188, 483, 9) + '</g>';
    }
    if (expression === 'sweat') {
      return '<g class="ceo-arms" stroke="' + ink + '" stroke-width="3.5" stroke-linejoin="round">' +
        '<path d="M111 426c-19 26-25 57-18 86l30 104 79-23-20-86-24-69Z" fill="#233e53"/><path d="m111 520 20 72 50-12-13-65Z" fill="#2d4a60" stroke="none"/>' +
        '<path d="m128 600 13 32 61-14-9-35Z" fill="#fffaf0"/><g class="ceo-hand"><path d="M144 628c9-12 24-21 42-19 22 3 38 15 44 31h-93Z" fill="' + light + '"/><path d="m165 623 17 17m-4-22 24 22m-11-19 21 18" fill="none" stroke="#c58a67" stroke-width="2" stroke-linecap="round"/></g>' +
        '<path d="M434 420c22 17 37 46 26 76-9 25-28 37-54 25l-86-76 43-57 55 48Z" fill="#1f384d"/><path d="m393 474 28 25c12 8 24 3 31-5-9 21-24 27-42 17l-72-68 15-17Z" fill="#2c4960" stroke="none"/>' +
        '<path d="m327 445-23-21 36-48 25 18Z" fill="#fffaf0"/>' +
        '<g class="ceo-hand"><path d="M311 427c-17-13-29-27-32-44l-5-28c-1-8 8-11 12-5l9 22 4-35c1-10 12-9 12 0l-1 29 9-28c3-9 13-5 11 3l-5 29 11-19c4-7 13-3 9 5l-15 38 7 11Z" fill="' + light + '"/><path d="m293 381 18 15m-2-24 12 14m-24 15 11 12" fill="none" stroke="#c58a67" stroke-width="2" stroke-linecap="round"/></g>' +
        watch(328, 414, 39) + '</g>';
    }
    if (expression === 'cornered') {
      return '<g class="ceo-arms" stroke="' + ink + '" stroke-width="3.5" stroke-linejoin="round">' +
        '<path d="M115 424c-22 31-22 72-9 106l44 90 70-35-39-91-20-65Z" fill="#254156"/><path d="m122 516 40 83 40-19-38-90Z" fill="#345267" stroke="none"/>' +
        '<path d="m157 602 13 25 53-26-14-29Z" fill="#fffaf0"/>' +
        '<path d="M436 424c23 31 23 69 10 104l-45 92-70-35 39-91 20-65Z" fill="#1e374b"/><path d="m431 519-39 80-42-20 39-88Z" fill="#2c495d" stroke="none"/>' +
        '<path d="m394 601-15 27-52-27 16-29Z" fill="#fffaf0"/>' +
        '<g class="ceo-hand"><path d="M206 588c16-4 31-2 45 7l26 16 38-11 26-12 20 25-34 22-38 5-28-4-32 4-38-19-13-13Z" fill="' + light + '"/><path d="m273 613 32 12 30-7m-72 7 31 12m-58-33 25 17m-14-20 25 16" fill="none" stroke="#c58a67" stroke-width="2.3" stroke-linecap="round"/></g>' +
        watch(351, 603, -57) + '</g>';
    }
    return '<g class="ceo-arms" stroke="' + ink + '" stroke-width="3.5" stroke-linejoin="round">' +
      '<path d="M111 426c-19 26-25 57-18 86l28 104 80-23-20-86-23-69Z" fill="#233e53"/><path d="m110 520 21 72 50-12-14-65Z" fill="#2e4b60" stroke="none"/>' +
      '<path d="m126 600 14 32 61-14-9-35Z" fill="#fffaf0"/><g class="ceo-hand"><path d="M143 628c11-12 25-21 43-19 22 3 38 15 44 31h-93Z" fill="' + light + '"/><path d="m165 623 17 17m-4-22 24 22m-11-19 21 18" fill="none" stroke="#c58a67" stroke-width="2" stroke-linecap="round"/></g>' +
      '<path d="M434 423c23 18 33 48 22 75-9 22-31 33-54 19l-91-80 45-52 62 53Z" fill="#1d364a"/><path d="m393 476 24 21c13 7 25 2 33-7-8 23-25 29-43 18l-77-70 15-19Z" fill="#2c495e" stroke="none"/>' +
      '<path d="m317 442-23-22 38-46 26 20Z" fill="#fffaf0"/>' +
      '<g class="ceo-hand"><path d="M303 424c-15-13-24-30-27-48l-4-24c-2-9 8-13 12-5l8 21 0-35c0-10 10-12 12-2l3 32 5-32c1-10 12-9 12 0l-1 30 7-22c3-8 13-5 11 3l-7 31c9-9 18-12 22-6 3 4 0 9-6 14l-18 18-8 17Z" fill="' + light + '"/><path d="m291 379 19 15m-7-24 17 13m-21 18 11 10m12-36 7 8" fill="none" stroke="#c58a67" stroke-width="2" stroke-linecap="round"/><path d="m279 354 4 10m11-24 2 10m19-12 0 9m18 0-2 9" fill="none" stroke="#fff0d7" stroke-width="3" stroke-linecap="round"/></g>' +
      watch(320, 415, 40) + '</g>';
  }

  function tailoring(variant) {
    var gold = variant === 'case03' ? '#b28b3f' : '#d6b45b';
    var pocket = variant === 'case02' ? '#a3a595' : variant === 'case03' ? '#89516a' : '#a0393c';
    return '<g class="ceo-tailoring" fill="none" stroke-linecap="round">' +
      '<path d="m114 473 11 165m-2-187 15 187m-3-188 18 188m279-180 10 180m-25-202 11 202m-24-184 12 184" stroke="' + gold + '" stroke-width="1.6" opacity=".26"/>' +
      '<path d="m192 400 10-6 11 14-8 11-14-8Z" fill="' + gold + '" stroke="#826226" stroke-width="2"/>' +
      '<path d="m197 400 7-1 4 8-7 6-5-5Z" fill="#fff0af"/>' +
      (variant === 'case03' ? '<path d="M244 407q39 76 78-4" stroke="#d7ad4f" stroke-width="6"/><path d="M246 409q36 68 73-3" stroke="#fff0b5" stroke-width="1.7"/><path d="m279 447 8-5 8 7-2 13-10 3-7-9Z" fill="#d6ab4c" stroke="#8a6428" stroke-width="2"/><path d="m282 450 5-3 4 5-2 8-6-2Z" fill="#8b375b"/>' : '') +
      '<path d="m365 475 10-23 10 16 13-10 4 23Z" fill="' + pocket + '" stroke="#3a3137" stroke-width="2"/>' +
      '<path d="m367 477 38 3m-31-17 10 14" stroke="' + gold + '" stroke-width="2.5"/>' +
      '<rect x="278" y="478" width="34" height="10" rx="3" fill="' + gold + '" stroke="#95702e" stroke-width="1.8"/>' +
      '<path d="m291 478 7 0 3 5-5 5-6-3Z" fill="#8a3134"/>' +
      '</g>';
  }

  function faceAccessory(expression, variant) {
    if (variant === 'case02') {
      return '<g class="ceo-glasses" fill="none" stroke="#d4b36a" stroke-width="5">' +
        '<path d="m207 211 57 4-4 26-45-3Z m89 3 57-7-5 29-45 4Z" fill="#c1c8bd19"/>' +
        '<path d="m264 221 33-2m-90-1-14-5m160-1 20-9"/>' +
        '<path d="m214 216 21 18m68-15 12 14" stroke="#fff5cf" stroke-width="2.2" opacity=".8"/>' +
        '<path d="m244 271 14-6m51-2 15 5" stroke="#94644e" stroke-width="2.3"/>' +
        '</g>';
    }
    if (variant === 'case03') {
      return '<g class="ceo-luxury-detail"><path d="m265 320 17 5 15-6-7 18-15 0Z" fill="#65706c" stroke="#38423f" stroke-width="2"/>' +
        '<path d="m340 198 7-8m7 7 7 2m-5-11 0-7" stroke="#fff1bb" stroke-width="2.6" stroke-linecap="round"/></g>';
    }
    // A pencil moustache follows the face during breathing and the defeated tilt.
    return '<g class="ceo-moustache" fill="#28313a"><path d="M253 276q13-11 28-2 15-12 32-3l-2 6q-15-3-27 5-14-6-29 2Z"/>' +
      '<path d="m252 282-11-3 12-7m59 0 12-4-10 12"/></g>';
  }

  function ring(expression) {
    var x = expression === 'defensive' ? 422 : expression === 'cornered' ? 249 : expression === 'sweat' ? 312 : 312;
    var y = expression === 'defensive' ? 488 : expression === 'cornered' ? 615 : expression === 'sweat' ? 375 : 369;
    var rotation = expression === 'defensive' ? 13 : expression === 'cornered' ? 18 : -8;
    return '<g class="ceo-ring" transform="translate(' + x + ' ' + y + ') rotate(' + rotation + ')">' +
      '<path d="M-7-4h15v9H-7Z" fill="#ddb454" stroke="#8b6428" stroke-width="1.5"/>' +
      '<path d="m-4-4 4-5 5 4-1 6-6 1Z" fill="#9a3039" stroke="#efcd73" stroke-width="1.7"/>' +
      '<path d="m-1-6 3 1" stroke="#ffd8c0" stroke-width="1.4"/></g>';
  }

  function palette(art, variant) {
    var colors;
    if (variant === 'case02') colors = {'#142637':'#202735','#203b50':'#323d4b','#112131':'#171d29','#28465a':'#43505d','#20394d':'#293340','#3b586a':'#5c6470','#385367':'#4f5964','#233f54':'#384451','#355166':'#53606c','#1c3448':'#252f3d','#2a4559':'#43515d','#233e53':'#303b49','#2d4a60':'#495765','#1f384d':'#293441','#2c4960':'#445361','#254156':'#374451','#345267':'#516170','#1e374b':'#2b3745','#2c495d':'#455563','#2e4b60':'#4a5966','#1d364a':'#283442','#2c495e':'#43535f','#89463f':'#6f6734','#8c413d':'#746933','#ac5d4e':'#9b8a4c','#ad5b4d':'#97864b'};
    else if (variant === 'case03') colors = {'#142637':'#b9ab90','#203b50':'#d3c4a8','#112131':'#93856f','#28465a':'#ecdec0','#20394d':'#cabd9f','#3b586a':'#fff0cc','#385367':'#e6d6b6','#233f54':'#cdbd9f','#355166':'#e7d6b6','#1c3448':'#b4a58a','#2a4559':'#d7c6a7','#233e53':'#c9b99b','#2d4a60':'#e2d0af','#1f384d':'#bdad90','#2c4960':'#d8c6a5','#254156':'#cbb99b','#345267':'#e2d0af','#1e374b':'#bbab8e','#2c495d':'#d8c5a4','#2e4b60':'#e3cfac','#1d364a':'#bfad8f','#2c495e':'#dbc7a5','#89463f':'#783d62','#8c413d':'#74395b','#ac5d4e':'#a65c88','#ad5b4d':'#a45d84','#253039':'#a3aaa5','#44505a':'#c8cbc0','#3a4752':'#b9c0b5','#65717a':'#89968b','#6e7880':'#e3e0d1'};
    else colors = {'#142637':'#291c2a','#203b50':'#482d3c','#112131':'#211622','#28465a':'#694350','#20394d':'#412939','#3b586a':'#875e68','#385367':'#74505e','#233f54':'#543644','#355166':'#77515f','#1c3448':'#352331','#2a4559':'#5f3e4e','#233e53':'#4b303f','#2d4a60':'#684453','#1f384d':'#3d2936','#2c4960':'#5c3f4c','#254156':'#523642','#345267':'#75505e','#1e374b':'#3c2936','#2c495d':'#5f414e','#2e4b60':'#6b4857','#1d364a':'#412b37','#2c495e':'#60414f','#253039':'#18242d','#44505a':'#34414c','#3a4752':'#293742'};
    return art.replace(/#[0-9a-f]{6}(?![0-9a-f])/gi, function(color) { return colors[color] || color; });
  }

  function president(expression, variant) {
    var current = ['smug', 'defensive', 'sweat', 'cornered'].indexOf(expression) >= 0 ? expression : 'smug';
    var type = variant === 'case02' || variant === 'case03' ? variant : 'e1';
    var headArt = head(current);
    headArt = headArt.slice(0, -4) + faceAccessory(current, type) + '</g>';
    var torsoArt = torso(current);
    torsoArt = torsoArt.slice(0, -4) + tailoring(type) + '</g>';
    var armArt = arms(current);
    armArt = armArt.slice(0, -4) + ring(current) + '</g>';
    var artwork = palette(torsoArt + headArt + armArt, type);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 640" class="ceo-character ceo-' + current + ' ceo-cast-' + type + '" aria-hidden="true" focusable="false" fill="none">' +
      '<g stroke-linecap="round">' + artwork + '</g></svg>';
  }

  return Object.freeze({ president: president });
}));
