// Think First site sound: background music ("Entenca" by Bensound) on every page, plus
// the explosion effects on the Families page (window.TFSound.play).
// Browsers block sound until the visitor interacts, so: try to start at once, otherwise start on
// the first click, tap or key press. The 🔈 button turns it off, and that choice is remembered.
// Playback position carries over between pages.
(function () {
  var KEY = 'tf-sound', POS = 'tf-sound-pos';
  var pref = null; try { pref = localStorage.getItem(KEY); } catch (e) {}
  var want = pref !== '0';
  var css = document.createElement('style');
  css.textContent = '.tf-snd{display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1px solid var(--rule,#E5E5EA);background:var(--card,#fff);color:var(--ink,#1D1D1F);cursor:pointer;padding:0;margin-right:6px;transition:transform .2s}' +
    '.tf-snd:hover{transform:scale(1.06)}.tf-snd svg{width:18px;height:18px}.tf-snd .on{display:none}.tf-snd[aria-pressed=true] .on{display:block}.tf-snd[aria-pressed=true] .off{display:none}' +
    '.tf-snd[aria-pressed=true]{background:#CFDD3C;border-color:#1F1B16;color:#1F1B16}.tf-snd.float{position:fixed;right:16px;bottom:16px;z-index:70;margin:0;box-shadow:0 6px 20px rgba(0,0,0,.15)}' +
    '.tf-snd.wait{animation:tfsndp 1.6s ease-in-out infinite}@keyframes tfsndp{50%{box-shadow:0 0 0 7px rgba(207,221,60,.35)}}@media (prefers-reduced-motion:reduce){.tf-snd.wait{animation:none}}';
  document.head.appendChild(css);
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'tf-snd';
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor"/><path class="on" d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path class="off" d="M16 9.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var theme = document.getElementById('themeBtn');
  if (theme) theme.parentNode.insertBefore(btn, theme); else { btn.classList.add('float'); document.body.appendChild(btn); }

  var music = new Audio('/families/theme.mp3'); music.loop = true; music.preload = 'auto'; music.volume = 0;
  try { var p = parseFloat(sessionStorage.getItem(POS)); if (p > 0) music.currentTime = p; } catch (e) {}
  var playing = false, ctx = null, master = null, noiseBuf = null, fadeT = 0;
  function fadeTo(v, ms) { clearInterval(fadeT); var from = music.volume, t0 = Date.now(); fadeT = setInterval(function () { var k = Math.min(1, (Date.now() - t0) / ms); music.volume = from + (v - from) * k; if (k >= 1) { clearInterval(fadeT); if (v === 0) music.pause(); } }, 40); }
  function render() { btn.setAttribute('aria-pressed', playing); var l = playing ? 'Turn sound off' : 'Turn sound on'; btn.setAttribute('aria-label', l); btn.title = l; btn.classList.toggle('wait', want && !playing); }
  function start() {
    return music.play().then(function () { playing = true; fadeTo(.4, 1500); render(); unlisten(); }).catch(function () { render(); });
  }
  function stop() { playing = false; fadeTo(0, 400); render(); }
  // effects (Families page)
  function audio() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    master = ctx.createGain(); master.gain.value = .9; master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); var d = noiseBuf.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  function noise(dur) { var s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; s.start(); s.stop(ctx.currentTime + dur + .05); return s; }
  function env(g, n, peak, a, r) { g.gain.setValueAtTime(.0001, n); g.gain.exponentialRampToValueAtTime(peak, n + a); g.gain.exponentialRampToValueAtTime(.0001, n + r); }
  var SFX = {
    charge: function () { var n = ctx.currentTime, o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(70, n); o.frequency.exponentialRampToValueAtTime(420, n + .7);
      f.type = 'lowpass'; f.frequency.setValueAtTime(300, n); f.frequency.exponentialRampToValueAtTime(2600, n + .7); f.Q.value = 6;
      g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(.16, n + .6); g.gain.linearRampToValueAtTime(0, n + .78);
      o.connect(f); f.connect(g); g.connect(master); o.start(n); o.stop(n + .8); },
    boom: function () { var n = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(140, n); o.frequency.exponentialRampToValueAtTime(32, n + .9); env(g, n, .9, .015, 1.2);
      o.connect(g); g.connect(master); o.start(n); o.stop(n + 1.25);
      var s = noise(1), f = ctx.createBiquadFilter(), g2 = ctx.createGain(); f.type = 'lowpass'; f.frequency.setValueAtTime(4000, n); f.frequency.exponentialRampToValueAtTime(200, n + .9);
      env(g2, n, .45, .01, .95); s.connect(f); f.connect(g2); g2.connect(master);
      var sp = ctx.createOscillator(), gs = ctx.createGain(); sp.type = 'triangle'; sp.frequency.setValueAtTime(1760, n + .05); sp.frequency.exponentialRampToValueAtTime(2640, n + .4);
      env(gs, n, .05, .08, .6); sp.connect(gs); gs.connect(master); sp.start(n); sp.stop(n + .65); },
    whoosh: function () { var n = ctx.currentTime, s = noise(.6), f = ctx.createBiquadFilter(), g = ctx.createGain();
      f.type = 'bandpass'; f.Q.value = 1.4; f.frequency.setValueAtTime(350, n); f.frequency.exponentialRampToValueAtTime(2800, n + .28); f.frequency.exponentialRampToValueAtTime(600, n + .55);
      env(g, n, .22, .2, .58); s.connect(f); f.connect(g); g.connect(master);
      var o = ctx.createOscillator(), g3 = ctx.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(880, n + .3); o.frequency.exponentialRampToValueAtTime(1320, n + .38);
      env(g3, n + .3, .06, .02, .3); o.connect(g3); g3.connect(master); o.start(n + .3); o.stop(n + .62); },
    lock: function () { var n = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = 'square'; o.frequency.setValueAtTime(220, n); o.frequency.exponentialRampToValueAtTime(70, n + .16); env(g, n, .25, .005, .22);
      f.type = 'lowpass'; f.frequency.value = 1200; o.connect(f); f.connect(g); g.connect(master); o.start(n); o.stop(n + .25);
      var s = noise(.05), g2 = ctx.createGain(); g2.gain.setValueAtTime(.3, n); g2.gain.exponentialRampToValueAtTime(.0001, n + .04); s.connect(g2); g2.connect(master); }
  };
  window.TFSound = { play: function (name) { if (playing && ctx && SFX[name]) { try { SFX[name](); } catch (e) {} } } };

  btn.addEventListener('click', function (e) {
    e.stopPropagation(); audio();
    if (playing) { stop(); want = false; } else { want = true; start(); }
    try { localStorage.setItem(KEY, want ? '1' : '0'); } catch (er) {}
  });
  // first interaction anywhere starts it (unless they turned it off)
  var EVTS = ['pointerdown', 'keydown', 'touchend'];
  function first(e) { if (!want || playing || e.target === btn || btn.contains(e.target)) return; audio(); start(); }
  function unlisten() { EVTS.forEach(function (ev) { removeEventListener(ev, first, true); }); }
  if (want) { EVTS.forEach(function (ev) { addEventListener(ev, first, true); }); start(); }
  document.addEventListener('visibilitychange', function () { if (!playing) return; if (document.hidden) music.pause(); else music.play().catch(function () {}); });
  addEventListener('pagehide', function () { try { sessionStorage.setItem(POS, String(music.currentTime || 0)); } catch (e) {} });
  render();
})();
