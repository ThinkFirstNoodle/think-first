// The opening, as in the Think First Family app: Noodle chases his tennis ball along the ground
// line, leaps and catches it in a lime flash and a burst of balls and sparkles, while "Think First"
// pops up letter by letter. About 3 seconds, on every page load. Click, tap, a key or scrolling skips it.
// Reduce Motion: a short, still version.
(function () {
  var un = function () { document.documentElement.classList.remove('tfi-pre'); };
  if (!window.TF || !TF.dogSVG) return un();
  var page = location.pathname.replace(/\/$/, '/index.html').split('/').pop();
  var SUB = { 'families.html': 'Family', 'schools.html': 'for Schools' }[page] || 'Try first, then ask AI';
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var css = document.createElement('style');
  css.textContent = [
    '.tfi{position:fixed;inset:0;z-index:9999;background:#F7F3EA;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px;cursor:pointer;transition:opacity .45s ease,transform .45s ease;overflow:hidden}',
    '.tfi.out{opacity:0;transform:scale(1.04);pointer-events:none}',
    '.tfi-t{text-align:center;color:#1F1B16;font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif}',
    '.tfi-h{position:relative;isolation:isolate;display:inline-flex;font-size:clamp(46px,8vw,88px);line-height:1.05}',
    '.tfi-h i{font-style:normal;display:inline-block;white-space:pre;color:#CFDD3C;opacity:0;transform-origin:50% 100%;transform:translateY(50px) scale(.1) rotate(var(--r))}',
    '.tfi-h i.in{color:#1F1B16;opacity:1;transform:none;transition:transform .55s cubic-bezier(.3,1.75,.5,1),opacity .2s,color .5s .25s}',
    '.tfi-h i.hop{animation:tfihop .55s cubic-bezier(.3,1.6,.5,1) both}',
    '@keyframes tfihop{0%{transform:none}30%{transform:translateY(-16px)}100%{transform:none}}',
    '.tfi-hl{position:absolute;left:-.04em;right:-.04em;bottom:.06em;height:.24em;border-radius:4px;background:rgba(207,221,60,.9);z-index:-1;transform:scaleX(0);transform-origin:left;transition:transform .3s ease-out}',
    '.tfi-hl.in{transform:none}',
    '.tfi-s{font-style:italic;font-size:clamp(26px,4.4vw,46px);color:#5E574C;opacity:0;transform:translateY(14px) scale(.6);transition:all .5s cubic-bezier(.3,1.5,.5,1)}',
    '.tfi-s.in{opacity:1;transform:none}',
    '.tfi-g{position:relative;width:100%;height:var(--dh)}',
    '.tfi-line{position:absolute;left:10%;width:80%;top:calc(var(--dh)*.905);height:1.5px;background:#1F1B16;transform:scaleX(0);transform-origin:left;transition:transform .45s ease-out}',
    '.tfi-line.in{transform:none}',
    '.tfi-dog{position:absolute;left:0;top:0;width:var(--dw);height:var(--dh);will-change:transform}',
    '.tfi-dog .dog{width:100%;height:100%}.tfi-dog .dog svg{width:100%;height:100%;display:block}',
    '.tfi-ball{position:absolute;left:0;top:0;width:var(--bd);height:var(--bd);border-radius:50%;background:#CFDD3C;border:2px solid #1F1B16;box-sizing:border-box;will-change:transform}',
    '.tfi-ball:after{content:"";position:absolute;left:8%;right:8%;top:22%;height:40%;border-bottom:1.6px solid #fff;border-radius:0 0 50% 50%}',
    '.tfi-flash{position:absolute;width:calc(var(--dw)*1.1);height:calc(var(--dw)*1.1);border-radius:50%;background:#CFDD3C;opacity:0;transform:scale(.2)}',
    '.tfi-flash.go{animation:tfiflash .65s ease-out}@keyframes tfiflash{0%{opacity:.55;transform:scale(.2)}20%{opacity:.55}60%{transform:scale(1.25)}100%{opacity:0;transform:scale(1.3)}}',
    '.tfi-p{position:absolute;width:var(--bd);height:var(--bd);margin:calc(var(--bd)/-2);pointer-events:none;opacity:0}',
    '.tfi-p.b{border-radius:50%;background:#CFDD3C;border:1.2px solid #1F1B16;box-sizing:border-box}',
    '.tfi-p.s{color:#1F1B16;font:800 calc(var(--bd)*1.4)/1 -apple-system,system-ui;text-align:center}',
    '.tfi-p.go{animation:tfip .8s cubic-bezier(.2,.9,.3,1) forwards}',
    '@keyframes tfip{0%{opacity:1;transform:translate(0,0) scale(.3) rotate(0)}35%{transform:translate(calc(var(--x)*.85),calc(var(--y)*.85)) scale(1.3) rotate(calc(var(--sp)*.5))}55%{opacity:1}100%{opacity:0;transform:translate(var(--x),var(--y)) scale(.5) rotate(var(--sp))}}',
    '.tfi-dust{position:absolute;border-radius:50%;background:#8A8275;pointer-events:none}',
    '.tfi-speed{position:absolute;height:2px;border-radius:2px;background:rgba(31,27,22,.5);pointer-events:none}',
    '.tfi-skip{position:absolute;bottom:22px;font:600 12px ui-monospace,Menlo,monospace;letter-spacing:.14em;color:#8A8275;text-transform:uppercase}'
  ].join('\n');
  document.head.appendChild(css);

  var w = innerWidth, dw = Math.min(w * (w < 700 ? .46 : .26), 250), dh = dw * 100 / 140, bd = dw * 14 / 140;
  var dogEnd = (w - dw) / 2, ballEnd = dogEnd + dw * 122 / 140 - bd / 2, ground = dh * .905;
  var el = document.createElement('div'); el.className = 'tfi'; el.setAttribute('aria-hidden', 'true');
  el.style.setProperty('--dw', dw + 'px'); el.style.setProperty('--dh', dh + 'px'); el.style.setProperty('--bd', bd + 'px');
  var letters = 'Think First'.split('').map(function (c, i) { return '<i style="--r:' + (i % 2 ? 26 : -30) + 'deg">' + c + '</i>'; }).join('');
  el.innerHTML = '<div class="tfi-t"><div class="tfi-h">' + letters + '<span class="tfi-hl"></span></div><div class="tfi-s">' + SUB + '</div></div>' +
    '<div class="tfi-g"><div class="tfi-line"></div><div class="tfi-flash"></div><div class="tfi-ball"></div><div class="tfi-dog"><div class="dog run">' + TF.dogSVG('neutral', 'Noodle') + '</div></div></div>' +
    '<div class="tfi-skip">Click to skip</div>';
  document.documentElement.style.overflow = 'hidden';
  document.body.appendChild(el); un();
  var $ = function (s) { return el.querySelector(s); }, all = function (s) { return el.querySelectorAll(s); };
  var g = $('.tfi-g'), dog = $('.tfi-dog'), dogIn = dog.firstChild, ball = $('.tfi-ball'), flash = $('.tfi-flash');
  flash.style.left = (dogEnd + dw * .5 - dw * .55) + 'px'; flash.style.top = (dh * .5 - dw * .55) + 'px';

  var timers = [], raf = 0, done = false;
  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function finish() {
    if (done) return; done = true;
    timers.forEach(clearTimeout); cancelAnimationFrame(raf);
    el.classList.add('out');
    document.documentElement.style.overflow = '';
    setTimeout(function () { el.remove(); css.remove(); }, 480);
    ['pointerdown', 'keydown', 'wheel', 'touchmove'].forEach(function (e) { removeEventListener(e, finish, true); });
  }
  ['pointerdown', 'keydown', 'wheel', 'touchmove'].forEach(function (e) { addEventListener(e, finish, true); });

  function showAll() {
    $('.tfi-line').classList.add('in'); all('.tfi-h i').forEach(function (i) { i.classList.add('in'); });
    $('.tfi-s').classList.add('in'); $('.tfi-hl').classList.add('in');
    ball.style.display = 'none'; dogIn.className = 'dog proud carry-ball';
    dog.style.transform = 'translate(' + dogEnd + 'px,0)';
  }
  if (still) { showAll(); at(1300, finish); return; }

  // positions over time
  var easeOut = function (x) { return 1 - Math.pow(1 - x, 3); };
  var t0 = performance.now(), dogX = -dw - 20, lift = 0, ballHop = 0, caught = false, running = true;
  dog.style.transform = 'translate(' + dogX + 'px,0)';
  var puffs = [], speeds = [];
  for (var i = 0; i < 4; i++) { var p = document.createElement('div'); p.className = 'tfi-dust'; g.appendChild(p); puffs.push(p); }
  for (i = 0; i < 3; i++) { var s = document.createElement('div'); s.className = 'tfi-speed'; g.appendChild(s); speeds.push(s); }
  function tick(now) {
    var t = (now - t0) / 1000;
    var bx = -bd - 10 + (ballEnd + bd + 10) * easeOut(Math.min(1, t / 1.2));
    var by = ground - bd - ballHop * dh * .32;
    ball.style.transform = 'translate(' + bx + 'px,' + by + 'px) rotate(' + 900 * easeOut(Math.min(1, t / 1.2)) + 'deg)';
    if (t > .12) dogX = -dw - 20 + (dogEnd + dw + 20) * easeOut(Math.min(1, (t - .12) / 1.3));
    dog.style.transform = 'translate(' + dogX + 'px,' + (-lift) + 'px)';
    puffs.forEach(function (p, k) {
      var life = (t * 2.6 + k / 4) % 1, sz = dw * (.05 + .08 * life);
      p.style.display = running ? '' : 'none';
      p.style.opacity = .35 * (1 - life); p.style.width = p.style.height = sz + 'px';
      p.style.transform = 'translate(' + (dogX + dw * .25 - dw * .35 * life) + 'px,' + (ground - dw * (.07 + .08 * life)) + 'px)';
    });
    speeds.forEach(function (s, k) {
      s.style.display = running ? '' : 'none';
      s.style.width = dw * (.2 - .04 * k) + 'px';
      s.style.transform = 'translate(' + (dogX - dw * .05 - dw * .04 * k + Math.sin(t * 18 + k * 2) * 3 - dw * (.2 - .04 * k)) + 'px,' + dw * (.24 + .09 * k) + 'px)';
    });
    if (!done) raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  $('.tfi-line').offsetWidth;
  at(20, function () { $('.tfi-line').classList.add('in'); });
  at(570, function () { all('.tfi-h i').forEach(function (i, k) { setTimeout(function () { i.classList.add('in'); }, k * 55); }); });
  at(1170, function () { var a = performance.now(); (function hop() { var k = Math.min(1, (performance.now() - a) / 200); ballHop = Math.sin(k * Math.PI / 2); if (k < 1 && !caught) requestAnimationFrame(hop); })(); });
  at(1250, function () { running = false; dogIn.className = 'dog'; var a = performance.now(); (function up() { var k = Math.min(1, (performance.now() - a) / 160); lift = dh * .22 * easeOut(k); if (k < 1) requestAnimationFrame(up); })(); });
  at(1390, function () {
    caught = true; ball.style.display = 'none'; dogIn.className = 'dog proud carry-ball';
    var a = performance.now(); (function down() { var k = Math.min(1, (performance.now() - a) / 380); var b = 1 - Math.pow(2, -10 * k) * Math.cos(k * 9); lift = dh * .22 * (1 - b); if (k < 1) requestAnimationFrame(down); else lift = 0; })();
    flash.classList.add('go');
    var mx = dogEnd + dw * 122 / 140, my = dh * .5 - dh * .22;
    for (var n = 0; n < 14; n++) {
      var p = document.createElement('div'), ang = n / 14 * Math.PI * 2 + (n % 2 ? -.1 : .2), reach = bd * (n % 3 === 0 ? 8 : 6);
      p.className = 'tfi-p ' + (n % 2 ? 's' : 'b'); if (n % 2) p.textContent = '✦';
      p.style.left = mx + 'px'; p.style.top = my + 'px';
      p.style.setProperty('--x', Math.cos(ang) * reach + 'px'); p.style.setProperty('--y', Math.sin(ang) * reach + 'px'); p.style.setProperty('--sp', (n % 2 ? -120 : 180) + 'deg');
      g.appendChild(p); p.offsetWidth; p.classList.add('go');
    }
    all('.tfi-h i').forEach(function (i, k) { setTimeout(function () { i.classList.add('hop'); }, 20 + k * 30); });
    dog.animate([{ rotate: '-2.5deg' }, { rotate: '2.5deg' }], { duration: 160, iterations: 6, direction: 'alternate', delay: 240 });
  });
  at(1510, function () { $('.tfi-s').classList.add('in'); });
  at(1630, function () { $('.tfi-hl').classList.add('in'); });
  at(2900, finish);
})();
