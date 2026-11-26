// Openings for the home page ("the chat") and the Schools page ("the chalkboard").
// The Families page keeps the Think First Family app's opening (intro.js).
// Each is about 3 seconds; click, tap, a key or scrolling skips it.
window.TFIntroPages = (function () {
  function shell(un, cls, extraCss) {
    var css = document.createElement('style');
    css.textContent = '.tfx{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;transition:opacity .45s ease,transform .45s ease}' +
      '.tfx.out{opacity:0;transform:scale(1.04);pointer-events:none}' +
      '.tfx-skip{position:absolute;bottom:22px;left:0;right:0;text-align:center;font:600 12px ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;opacity:.6}' + extraCss;
    document.head.appendChild(css);
    var el = document.createElement('div'); el.className = 'tfx ' + cls; el.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(el); un();
    var timers = [], done = false, EV = ['pointerdown', 'keydown', 'wheel', 'touchmove'];
    function finish() {
      if (done) return; done = true; timers.forEach(clearTimeout);
      el.classList.add('out'); document.documentElement.style.overflow = '';
      setTimeout(function () { el.remove(); css.remove(); }, 480);
      EV.forEach(function (e) { removeEventListener(e, finish, true); });
    }
    EV.forEach(function (e) { addEventListener(e, finish, true); });
    return { el: el, at: function (ms, fn) { timers.push(setTimeout(function () { if (!done) fn(); }, ms)); }, finish: finish, q: function (s) { return el.querySelector(s); }, all: function (s) { return el.querySelectorAll(s); } };
  }
  function pop(letters) { return letters.split('').map(function (c, i) { return '<i style="--i:' + i + '">' + (c === ' ' ? '&nbsp;' : c) + '</i>'; }).join(''); }

  // ---------- Home: the chat ----------
  function home(un, still) {
    var Q = 'What makes the sky blue?';
    var S = shell(un, 'tfh',
      '.tfh{background:#F7F3EA;color:#1F1B16;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif}' +
      '.tfh-stage{position:relative;width:min(560px,88vw);height:min(560px,72vh)}' +
      '.tfh-win{position:absolute;left:0;right:0;top:20%;margin:auto;width:100%;min-height:240px;box-sizing:border-box;overflow:hidden;border:1.5px solid #1F1B16;border-radius:22px;background:#FBF8F1;box-shadow:0 30px 60px -30px rgba(31,27,22,.35);padding:14px 18px 22px;transform:translateY(40px) scale(.94);opacity:0;transition:transform .55s cubic-bezier(.3,1.4,.5,1),opacity .3s}' +
      '.tfh-win.in{transform:none;opacity:1}.tfh-win.away{transform:translateY(60px) scale(.88);opacity:0;transition:transform .45s ease-in,opacity .4s}' +
      '.tfh-bar{display:flex;gap:6px;margin-bottom:16px}.tfh-bar i{width:10px;height:10px;border-radius:50%;border:1.3px solid #1F1B16}.tfh-bar i:first-child{background:#CFDD3C}' +
      '.tfh-me{margin-left:auto;width:max-content;max-width:80%;background:#1F1B16;color:#F7F3EA;border-radius:18px 18px 4px 18px;padding:11px 15px;font-size:clamp(15px,2.6vw,19px);min-height:1.4em}' +
      '.tfh-me:after{content:"";display:inline-block;width:2px;height:1em;background:#CFDD3C;margin-left:2px;vertical-align:-2px;animation:tfhc .6s steps(1) infinite}.tfh-me.sent:after{display:none}@keyframes tfhc{50%{opacity:0}}' +
      '.tfh-ai{margin-top:14px;width:62%;border:1.3px solid #DED6C6;border-radius:18px 18px 18px 4px;padding:12px 15px;background:#F7F3EA;opacity:0;transform:translateY(8px);transition:all .3s;position:relative}' +
      '.tfh-ai.in{opacity:1;transform:none}.tfh-ai b{display:block;height:9px;border-radius:5px;background:#DED6C6;margin:6px 0}.tfh-ai b:nth-child(2){width:85%}.tfh-ai b:nth-child(3){width:60%}' +
      '.tfh-ai .dots{display:flex;gap:5px}.tfh-ai .dots i{width:7px;height:7px;border-radius:50%;background:#8A8275;animation:tfhd .9s infinite}.tfh-ai .dots i:nth-child(2){animation-delay:.15s}.tfh-ai .dots i:nth-child(3){animation-delay:.3s}@keyframes tfhd{40%{transform:translateY(-5px);opacity:.5}}' +
      '.tfh-ai.blur{filter:blur(6px);opacity:.45;transition:filter .3s,opacity .3s}' +
      '.tfh-dog{position:absolute;left:46%;bottom:-8px;width:min(180px,34vw);transform:translateY(115%);opacity:0;transition:transform .5s cubic-bezier(.3,1.6,.5,1),opacity .15s}.tfh-dog.in{transform:none;opacity:1}.tfh-dog svg{width:100%;display:block}' +
      '.tfh-sign{position:absolute;left:-74%;top:6%;font:800 clamp(13px,2.4vw,17px)/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;background:#CFDD3C;border:2px solid #1F1B16;border-radius:10px;padding:10px 13px;white-space:nowrap;transform:rotate(-8deg) scale(0);transform-origin:right bottom;transition:transform .4s cubic-bezier(.3,1.9,.5,1)}.tfh-sign.in{transform:rotate(-8deg) scale(1)}' +
      '.tfh-t{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none}' +
      '.tfh-h{position:relative;isolation:isolate;font:700 clamp(54px,10vw,112px)/1 -apple-system,"SF Pro Display",system-ui,sans-serif;letter-spacing:-.045em;opacity:0;transform:scale(2.4);filter:blur(8px)}' +
      '.tfh-h.in{opacity:1;transform:none;filter:none;transition:transform .32s cubic-bezier(.5,0,.75,0),opacity .12s,filter .25s}' +
      '.tfh-h.thud{animation:tfht .45s ease-out}@keyframes tfht{0%{transform:none}25%{transform:translateY(5px) scale(1.02,.96)}60%{transform:translateY(-3px)}100%{transform:none}}' +
      '.tfh-h em{font-style:normal;position:relative}.tfh-h em:after{content:"";position:absolute;left:-.04em;right:-.04em;bottom:.08em;height:.24em;background:#CFDD3C;z-index:-1;transform:scaleX(0);transform-origin:left;transition:transform .35s ease-out}.tfh-h em.on:after{transform:none}' +
      '.tfh-s{margin-top:16px;font-size:clamp(17px,2.6vw,24px);color:#5E574C;opacity:0;transform:translateY(10px);transition:all .4s}.tfh-s.in{opacity:1;transform:none}' +
      '.tfh-ring{position:absolute;left:50%;top:50%;width:200px;height:200px;margin:-100px;border-radius:50%;border:3px solid #CFDD3C;opacity:0}.tfh-ring.go{animation:tfhr .6s ease-out}@keyframes tfhr{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(3.2)}}');
    S.el.innerHTML = '<div class="tfh-stage"><div class="tfh-win"><div class="tfh-bar"><i></i><i></i><i></i></div><div class="tfh-me"></div>' +
      '<div class="tfh-ai"><div class="dots"><i></i><i></i><i></i></div></div>' +
      '<div class="tfh-dog"><span class="tfh-sign">TRY FIRST!</span><div class="dog proud">' + TF.dogSVG('proud', 'Noodle') + '</div></div></div>' +
      '<div class="tfh-t"><div class="tfh-ring"></div><div class="tfh-h">Think <em>First</em></div><div class="tfh-s">Try first, then ask the AI.</div></div></div><div class="tfx-skip">Click to skip</div>';
    var me = S.q('.tfh-me'), ai = S.q('.tfh-ai');
    if (still) { S.q('.tfh-h').classList.add('in'); S.q('.tfh-h em').classList.add('on'); S.q('.tfh-s').classList.add('in'); S.at(1300, S.finish); return; }
    S.at(60, function () { S.q('.tfh-win').classList.add('in'); });
    for (var k = 1; k <= Q.length; k++) (function (k) { S.at(300 + k * 24, function () { me.textContent = Q.slice(0, k); }); })(k);
    var typed = 300 + Q.length * 24;
    S.at(typed + 120, function () { me.classList.add('sent'); ai.classList.add('in'); });
    S.at(typed + 520, function () { ai.innerHTML = '<b></b><b></b><b></b>'; });
    S.at(typed + 600, function () { S.q('.tfh-dog').classList.add('in'); ai.classList.add('blur'); });
    S.at(typed + 860, function () { S.q('.tfh-sign').classList.add('in'); });
    S.at(typed + 1600, function () { S.q('.tfh-win').classList.add('away'); });
    S.at(typed + 1800, function () { S.q('.tfh-h').classList.add('in'); });
    S.at(typed + 2130, function () { var h = S.q('.tfh-h'); h.classList.add('thud'); S.q('.tfh-ring').classList.add('go'); S.q('.tfh-h em').classList.add('on'); });
    S.at(typed + 2330, function () { S.q('.tfh-s').classList.add('in'); });
    S.at(typed + 3050, S.finish);
  }

  // ---------- Schools: the chalkboard ----------
  function school(un, still) {
    var cap = '<svg viewBox="0 0 60 44"><path d="M30 4 L58 16 L30 28 L2 16 Z" fill="#1F1B16" stroke="#F4EFE5" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 22 V32 C14 38 46 38 46 32 V22 L30 29 Z" fill="#1F1B16" stroke="#F4EFE5" stroke-width="1.5"/><path d="M30 16 L50 22 V34" stroke="#CFDD3C" stroke-width="2.4" fill="none"/><circle cx="50" cy="36" r="3" fill="#CFDD3C"/></svg>';
    var S = shell(un, 'tfs',
      '.tfs{background:#3A2E22}' +
      '.tfs-board{position:relative;width:min(900px,92vw);height:min(560px,76vh);border-radius:14px;background:radial-gradient(120% 90% at 40% 30%,#3F5E4B 0%,#2E4838 55%,#253B2E 100%);box-shadow:inset 0 0 0 10px #6B4A2E,inset 0 0 0 12px #4E3420,0 30px 70px rgba(0,0,0,.45);overflow:hidden;transform:scale(.96);opacity:0;transition:all .45s cubic-bezier(.3,1.3,.5,1)}' +
      '.tfs-board.in{transform:none;opacity:1}' +
      '.tfs-board:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(255,255,255,.025) 0 2px,transparent 2px 9px);pointer-events:none}' +
      '.tfs-ledge{position:absolute;left:12px;right:12px;bottom:12px;height:16px;background:#5A3D25;border-top:2px solid #7A5535}' +
      '.tfs-chalk{position:absolute;bottom:26px;width:34px;height:8px;border-radius:3px;background:#F4EFE5}' +
      '.tfs-svg{position:absolute;left:0;right:0;top:20%;width:100%;height:30%;clip-path:inset(0 100% 0 0)}.tfs-svg.go{animation:tfsclip 1.5s cubic-bezier(.45,.1,.55,.95) forwards}@keyframes tfsclip{to{clip-path:inset(0 0 0 0)}}' +
      '.tfs-svg text{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;font-size:118px;fill:rgba(244,239,229,0);stroke:#F4EFE5;stroke-width:1.6;stroke-dasharray:900;stroke-dashoffset:900;stroke-linecap:round}' +
      '.tfs-svg.go text{animation:tfsw 1.6s ease-out forwards,tfsf .5s 1.35s forwards}' +
      '@keyframes tfsw{to{stroke-dashoffset:0}}@keyframes tfsf{to{fill:rgba(244,239,229,.92);stroke-width:.6}}' +
      '.tfs-tip{position:absolute;top:30%;width:14px;height:14px;border-radius:50%;background:#F4EFE5;box-shadow:0 0 14px 4px rgba(244,239,229,.55);opacity:0}.tfs-tip.go{animation:tfstip 1.5s cubic-bezier(.45,.1,.55,.95) forwards}@keyframes tfstip{0%{left:20%;opacity:1;transform:translateY(0)}20%{transform:translateY(-18px)}40%{transform:translateY(14px)}60%{transform:translateY(-12px)}80%{transform:translateY(10px)}99%{opacity:1}100%{left:80%;opacity:0}}' +
      '.tfs-svg .ul{stroke:#CFDD3C;stroke-width:7;stroke-linecap:round;fill:none;stroke-dasharray:700;stroke-dashoffset:700;opacity:.9}.tfs-svg.ul-go .ul{transition:stroke-dashoffset .45s ease-out;stroke-dashoffset:0}' +
      '.tfs-sub{position:absolute;left:0;right:0;top:53%;text-align:center;font:italic 400 clamp(24px,4vw,40px) "Iowan Old Style",Palatino,Georgia,serif;color:#E6EE8F;opacity:0;transform:translateY(8px);transition:all .4s;text-shadow:0 0 1px rgba(230,238,143,.6)}.tfs-sub.in{opacity:.95;transform:none}' +
      '.tfs-dust{position:absolute;width:6px;height:6px;border-radius:50%;background:rgba(244,239,229,.55);pointer-events:none;animation:tfsd .9s ease-out forwards}@keyframes tfsd{to{transform:translate(var(--x),var(--y));opacity:0}}' +
      '.tfs-dog{position:absolute;bottom:26px;left:-30%;width:min(170px,26vw);transition:left 1.1s cubic-bezier(.2,.8,.3,1)}.tfs-dog.in{left:9%}.tfs-dog svg{width:100%;display:block}' +
      '.tfs-live{position:absolute;right:6%;bottom:46px;display:flex;align-items:center;gap:9px;font:700 clamp(11px,1.6vw,14px)/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;color:#1F1B16;background:#CFDD3C;border:2px solid #1F1B16;border-radius:999px;padding:9px 14px;transform:scale(0) rotate(-6deg);transition:transform .4s cubic-bezier(.3,1.9,.5,1)}.tfs-live.in{transform:rotate(-4deg)}' +
      '.tfs-live i{width:9px;height:9px;border-radius:50%;background:#C9412E;animation:tfsl 1s infinite}@keyframes tfsl{50%{opacity:.3}}' +
      '.tfs-cap{position:absolute;width:56px;left:50%;top:50%;margin:-20px 0 0 -28px;opacity:0;pointer-events:none}.tfs-cap.go{animation:tfsc 1.4s cubic-bezier(.2,.7,.4,1) forwards}' +
      '@keyframes tfsc{0%{opacity:1;transform:translate(0,40px) rotate(0)}45%{opacity:1;transform:translate(var(--x),var(--y)) rotate(var(--r))}100%{opacity:0;transform:translate(calc(var(--x)*1.25),calc(var(--y) + 260px)) rotate(calc(var(--r)*2))}}' +
      '@media (max-width:640px){.tfs-svg{top:26%;height:22%}.tfs-svg text{font-size:132px}.tfs-board{height:62vh}.tfs-sub{top:50%}}');
    var caps = '';
    for (var n = 0; n < 9; n++) caps += '<div class="tfs-cap" style="--x:' + Math.round((n - 4) * 70 + (n % 2 ? 20 : -15)) + 'px;--y:-' + (170 + (n * 37) % 120) + 'px;--r:' + ((n % 2 ? 1 : -1) * (120 + n * 25)) + 'deg">' + cap + '</div>';
    S.el.innerHTML = '<div class="tfs-board"><svg class="tfs-svg" viewBox="0 0 900 170" preserveAspectRatio="xMidYMid meet"><text x="450" y="125" text-anchor="middle">Think First</text><path class="ul" d="M250 150 C380 140 520 158 650 144"/></svg>' +
      '<div class="tfs-tip"></div><div class="tfs-sub">for Schools</div><div class="tfs-ledge"></div><div class="tfs-chalk" style="right:18%"></div><div class="tfs-chalk" style="right:24%;width:22px;background:#E6EE8F"></div>' +
      '<div class="tfs-dog"><div class="dog run">' + TF.dogSVG('proud', 'Noodle', { accessory: 'glasses' }) + '</div></div>' +
      '<div class="tfs-live"><i></i>CLASS IS LIVE</div>' + caps + '</div><div class="tfx-skip" style="color:#E6DDCB">Click to skip</div>';
    var board = S.q('.tfs-board'), svg = S.q('.tfs-svg');
    if (still) { board.classList.add('in'); svg.classList.add('go', 'ul-go'); S.q('.tfs-sub').classList.add('in'); S.q('.tfs-live').classList.add('in'); S.q('.tfs-dog').classList.add('in'); S.at(1400, S.finish); return; }
    S.at(40, function () { board.classList.add('in'); });
    S.at(380, function () { svg.classList.add('go'); S.q('.tfs-tip').classList.add('go'); });
    // chalk dust while writing
    for (var d = 0; d < 16; d++) (function (d) {
      S.at(420 + d * 85, function () {
        var r = board.getBoundingClientRect(), p = document.createElement('i');
        p.className = 'tfs-dust'; p.style.left = (r.width * (.22 + .56 * d / 15)) + 'px'; p.style.top = (r.height * (.3 + (d % 3) * .05)) + 'px';
        p.style.setProperty('--x', (Math.random() * 30 - 15) + 'px'); p.style.setProperty('--y', (20 + Math.random() * 30) + 'px'); board.appendChild(p);
      });
    })(d);
    S.at(700, function () { S.q('.tfs-dog').classList.add('in'); });
    S.at(1750, function () { S.q('.tfs-dog .dog').className = 'dog proud'; });
    S.at(1800, function () { svg.classList.add('ul-go'); });
    S.at(2000, function () { S.q('.tfs-sub').classList.add('in'); });
    S.at(2250, function () { S.q('.tfs-live').classList.add('in'); });
    S.at(2450, function () { S.all('.tfs-cap').forEach(function (c, i) { setTimeout(function () { c.classList.add('go'); }, i * 40); }); });
    S.at(3900, S.finish);
  }
  return { home: home, school: school };
})();
