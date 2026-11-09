// Forma /api/lead ga yuboriladi: u Telegram, CRM va Meta CAPI'ga tarqatadi.
const getCookie = n => (document.cookie.match('(^|; )' + n + '=([^;]*)') || [])[2];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(pointer: fine)').matches;

// ---------- darslar va jonli maketlar ----------
const MOCK = {
  dash: `<div class="mk" data-mock="dash"><div class="lap"><div class="scr">
      <div class="side"><b>BM CRM</b><span class="on">Bosh sahifa</span><span>Lidlar</span><span>Mijozlar</span><span>Hisobotlar</span><span>Sozlamalar</span></div>
      <div class="main"><h5>Biznes dashboard · Noyabr</h5>
        <div class="kpis">
          <div class="kpi"><small>Daromad</small><strong><span data-count="248">248</span> mln</strong><em>+18%</em></div>
          <div class="kpi"><small>Yangi lidlar</small><strong data-count="412" data-live>412</strong><em>+24%</em></div>
          <div class="kpi"><small>Konversiya</small><strong><span data-count="11.6" data-dec="1">11,6</span>%</strong><em>+2,1%</em></div>
          <div class="kpi"><small>Xarajat</small><strong><span data-count="61">61</span> mln</strong><em>−4%</em></div>
        </div>
        <div class="chart"><div><small>Daromad dinamikasi</small>
          <svg viewBox="0 0 300 100" preserveAspectRatio="none"><path class="ar" d="M0 82 L40 74 L80 78 L120 56 L160 60 L200 40 L240 44 L300 18 L300 100 L0 100Z"/><path class="ln" d="M0 82 L40 74 L80 78 L120 56 L160 60 L200 40 L240 44 L300 18"/></svg></div>
          <div><small>Lidlar manbasi</small><div class="bars" style="height:80%"><i style="--h:90%"></i><i style="--h:62%"></i><i style="--h:44%"></i><i style="--h:28%"></i></div></div></div>
      </div></div><div class="base"></div></div>
      <div class="phone"><div class="br">BOBUR MIRZO AKADEMIYASI</div><h6>AI xodimlar orqali biznesni oson boshqaring</h6><div class="cta">JOY BAND QILISH</div>
        <div class="it"><b>7 dars</b>Haftasiga 2 marta</div><div class="it"><b>2 kurator</b>AI va inson</div><div class="it"><b>100% kafolat</b>Natija bo'lmasa, pul qaytadi</div></div></div>`,
  crm: `<div class="mk" data-mock="crm"><div class="lap"><div class="scr">
      <div class="side"><b>BM CRM</b><span>Bosh sahifa</span><span class="on">Lidlar</span><span>Mijozlar</span><span>Hisobotlar</span><span>Sozlamalar</span></div>
      <div class="main"><h5>Lidlar voronkasi</h5><div class="cols">
        <div class="col" style="--c:#8FA39A"><h6><i></i>Yangi</h6></div>
        <div class="col" style="--c:#D9A43E"><h6><i></i>Aloqada</h6></div>
        <div class="col" style="--c:#527DA3"><h6><i></i>Taklif</h6></div>
        <div class="col" style="--c:#1E9A55"><h6><i></i>To'lov</h6></div>
      </div></div></div><div class="base"></div></div>
      <div class="phone light"><div class="hi">Salom, Bobur!</div><h6 style="color:#1D2A26">Bugungi natija</h6>
        <div class="stt"><div>Lidlar<strong data-count="37" data-live>37</strong></div><div>Sotuv<strong data-count="9">9</strong></div><div>Tushum<strong><span data-count="18">18</span>mln</strong></div></div>
        <div style="margin-top:1.2cqw;font-weight:700;font-size:1.4cqw">So'nggi lidlar</div><div class="feed"></div></div></div>`,
  chat: `<div class="mk" data-mock="chat"><div class="tg"><header><i></i><div><b>BM AI menejer</b><small class="st">bot · 24/7</small></div></header><div class="msgs"></div><div class="toast">✓ Lid <b>CRM'ga yozildi</b></div></div>
      <div class="crmside"><h6>CRM · Yangi lidlar</h6><div class="nl"></div></div></div>`
};
const LESSONS = [
  ['AI assistentlar va maslahat kengashini qurish', 'img:d1', ['Prompt formulasi: rol, vaziyat, vazifa, shakl, cheklov', "Claude loyihasi, Gemini va NotebookLM'da assistent yasash", "Biznesingiz bilimlar bazasini yig'ish", "AI javobidagi xato va to'qimalarni cheklash", 'Mentorlar uslubidagi AI maslahat kengashini qurish'], "Biznesingizni biladigan shaxsiy AI assistent va o'z maslahat kengashingiz"],
  ['Kontent zavod', 'img:d2', ['AI bilan sotadigan rasm va bannerlar', 'Qisqa video, 3D motion va subtitr', 'Fonni almashtirish va stok kadrlar bilan ishlash', "Musiqa tanlash va ovoz qo'shish", 'Bir oylik kontent reja tuzish'], "Kontentni o'zingiz yasaysiz: post, rasm va qisqa video"],
  ['Veb sayt va biznes dashboard', 'mock:dash', ['Dasturlashsiz, Claude Code bilan sayt yasash', 'Sotadigan sahifa tuzilishi va ariza formasi', "Biznes raqamlarini bir joyga yig'ish", 'Daromad, lid va xarajat grafiklari', "Dashboard'ni har kuni yangilanadigan qilish"], 'Ishlaydigan veb sayt va biznesingiz raqamlari paneli'],
  ['CRM va mobil ilova', 'mock:crm', ["O'z CRM tizimingizni loyihalash: lid bosqichlari", 'Mijoz kartasi, vazifalar va eslatmalar', 'Tizimni internetga chiqarish', "Mobil ilova: telefonga o'rnatiladigan versiya", 'Telegram ichidagi mini ilova'], "Telefoningizdagi o'z CRM va mobil ilovangiz"],
  ['Birinchi AI xodim', 'mock:chat', ["Telegram'da AI xodim yasash", "Lavozim yo'riqnomasi va bilimlar bazasini yozish", "Mijozga 24/7 to'g'ri javob berish", "Lidni avtomatik CRM'ga yozish", "Muhim qarorlarda inson tasdig'i"], "Mijozga javob berib, lidni CRM'ga yozadigan birinchi AI xodimingiz"],
  ['AI xodimlar jamoasi va biznes tizimi', 'fit:tuzilma', ["AI direktor: vazifani qabul qilib, bo'limlarga taqsimlash", "Bo'limlar va bo'ysunish tizimi", 'Nazorat va kunlik hisobot', 'Biznesingizning tashkiliy tuzilmasi', 'Keyingi 30 kunlik rivojlanish rejasi'], "O'z biznesingizning AI jamoasi va tashkiliy tuzilmasi"],
  ['Natijalar taqdimoti va yakuniy bazm', 'img:d7', ['Har bir ishtirokchi qurgan tizimini taqdim etadi', 'Mentorlar va guruhdan fikr-mulohaza', "Keyingi rivojlanish bosqichlari bo'yicha tavsiyalar", 'Sertifikatlar topshirish', 'Bitiruv bazmi va hamjamiyat bilan tanishuv'], 'Ishlaydigan tizim, sertifikat va tadbirkorlar hamjamiyati'],
];
$('#lessons').innerHTML = LESSONS.map(([title, media, items, res], i) => {
  const [kind, id] = media.split(':');
  const m = kind === 'mock' ? MOCK[id] : `<img ${kind === 'img' ? 'data-par=".06"' : ''} src="/aj/web/${id}.webp" alt="${i + 1}-dars: ${title}" loading="lazy" decoding="async">`;
  return `<article class="les rv" style="--i:${i}">
    <div class="im${kind === 'fit' ? ' fit' : ''}">${m}</div>
    <div class="tx"><span class="big">${i + 1}</span>
      <span class="lab">${i + 1}-dars · 4 soat</span>
      <h3>${title}</h3>
      <h4>NIMALARNI O'RGANASIZ</h4>
      <ul>${items.map(t => `<li>${t}</li>`).join('')}</ul>
      <div class="res"><span>NATIJA</span><b>${res}</b></div>
    </div></article>`;
}).join('');

// ---------- raqamlar sanog'i ----------
function count(el) {
  if (el.dataset.done) return;
  el.dataset.done = 1;
  const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), t0 = performance.now(), dur = 1600;
  const fmt = v => dec ? v.toFixed(dec).replace('.', ',') : Math.round(v).toLocaleString('ru-RU').replace(/ /g, ' ');
  if (RM) { el.textContent = fmt(to); return; }
  const step = t => { const k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(to * e); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

// ---------- ekranga chiqqanda ochilish ----------
const rio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(count);
  if (e.target.matches('[data-count]')) count(e.target);
  rio.unobserve(e.target);
}), { rootMargin: '0px 0px -10% 0px' });
$$('.rv, .num li, .pic, .wish, .cal, .map li').forEach(el => rio.observe(el));

// ---------- scroll: progress, parallaks, savol, yo'l xaritasi ----------
const prog = $('#prog'), road = $('#road'), roadBar = road.querySelector('.bar'), roadItems = [...road.querySelectorAll('li')];
const askP = $('#askText');
askP.innerHTML = askP.textContent.split(' ').map(w => `<span class="w">${w}</span>`).join(' ');
const askWords = [...askP.querySelectorAll('.w')];
const parEls = $$('[data-par]');
let ticking = false;
function onScroll() {
  ticking = false;
  const vh = innerHeight, sy = scrollY, max = document.documentElement.scrollHeight - vh;
  prog.style.transform = `scaleX(${max > 0 ? sy / max : 0})`;
  if (!RM) for (const el of parEls) {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    el.style.transform = `scale(1.12) translateY(${((r.top + r.height / 2) - vh / 2) * -parseFloat(el.dataset.par)}px)`;
  }
  const a = askP.getBoundingClientRect();
  const p = Math.min(Math.max((vh * .85 - a.top) / (a.height + vh * .35), 0), 1);
  askWords.forEach((w, i) => w.classList.toggle('on', RM || i < p * askWords.length + .5));
  const rr = road.getBoundingClientRect(), mid = vh * .6;
  roadBar.style.setProperty('--p', Math.min(Math.max((mid - rr.top) / rr.height, 0), 1));
  roadItems.forEach(li => li.classList.toggle('on', li.getBoundingClientRect().top + 16 < mid));
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// ---------- oltin zarrachalar (canvas) ----------
function sprite(color) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, color); gr.addColorStop(.35, color.replace(/[\d.]+\)$/, '.35)')); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return c;
}
function particles(canvas, { max, spawn, update, color = 'rgba(255,226,160,1)' }) {
  if (RM || !canvas) return;
  const ctx = canvas.getContext('2d'), img = sprite(color), dpr = Math.min(devicePixelRatio || 1, 1.5);
  let w = 0, h = 0, ps = [], run = false, raf = 0;
  const size = () => { const r = canvas.getBoundingClientRect(); w = r.width; h = r.height; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  const tick = () => {
    if (!run) return;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    while (ps.length < max) ps.push(spawn(w, h, ps.length === 0));
    ps = ps.filter(p => update(p, w, h));
    for (const p of ps) { ctx.globalAlpha = Math.max(0, Math.min(1, p.a)); ctx.drawImage(img, p.x - p.s, p.y - p.s, p.s * 2, p.s * 2); }
    raf = requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !run) { size(); run = true; raf = requestAnimationFrame(tick); }
    else if (!e.isIntersecting) { run = false; cancelAnimationFrame(raf); }
  }).observe(canvas);
  addEventListener('resize', () => run && size());
}
const R = (a, b) => a + Math.random() * (b - a);
particles($('#dust'), { max: innerWidth < 600 ? 46 : 80,
  spawn: (w, h) => ({ x: R(0, w), y: R(0, h), vx: R(-.15, .15), vy: R(-.5, -.12), s: R(2, 6), t: R(0, 6.28), a: 0 }),
  update: p => { p.x += p.vx; p.y += p.vy; p.t += .03; p.a = .35 + Math.sin(p.t) * .35; return p.y > -10; } });
particles($('#sand'), { max: 26, color: 'rgba(255,214,140,1)',
  spawn: (w, h) => ({ x: w * .5 + R(-3, 3), y: h * R(.42, .48), vy: R(.6, 1.2), s: R(1.5, 3), a: R(.6, 1) }),
  update: (p, w, h) => { p.y += p.vy; p.vy += .03; p.a -= .008; return p.y < h * .74 && p.a > 0; } });

// ---------- jonli maketlar ----------
const NAMES = [['Dilshod R.', 'Instagram'], ['Madina K.', 'Sayt'], ['Aziz T.', 'Telegram'], ['Sherzod N.', "Qo'ng'iroq"], ['Nodira A.', 'Instagram'], ['Bekzod U.', 'Sayt'], ['Laylo F.', 'Telegram'], ['Javlon M.', 'Instagram'], ['Sardor Q.', 'Sayt'], ['Gulnoza S.', 'Telegram']];
let ni = 0;
const nextName = () => NAMES[ni++ % NAMES.length];
const card = ([n, s]) => { const d = document.createElement('div'); d.className = 'card mv'; d.innerHTML = `<b>${n}</b><span>${s}</span><br><u>Kurs</u>`; return d; };

function liveLoop(mk, start) {
  let on = false, stop = null;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !on) { on = true; mk.classList.add('run'); mk.querySelectorAll('[data-count]').forEach(count); stop = start(() => on); }
    else if (!e.isIntersecting && on) { on = false; stop && stop(); }
  }, { threshold: .25 }).observe(mk);
}
$$('[data-mock="dash"]').forEach(mk => liveLoop(mk, alive => {
  const el = mk.querySelector('[data-live]');
  const id = setInterval(() => { if (!alive()) return; const v = parseInt(el.textContent.replace(/\D/g, '')) + 1; el.textContent = v; el.animate([{ color: '#1E9A55' }, { color: 'inherit' }], 900); }, 2600);
  return () => clearInterval(id);
}));
$$('[data-mock="crm"]').forEach(mk => {
  const cols = mk.querySelectorAll('.col'), feed = mk.querySelector('.feed'), lid = mk.querySelector('[data-live]');
  [[0, 2], [1, 2], [2, 1], [3, 1]].forEach(([c, n]) => { for (let k = 0; k < n; k++) { const x = card(nextName()); x.classList.remove('mv'); cols[c].append(x); } });
  const STAT = ['Yangi', 'Aloqada', 'Taklif', "To'landi"];
  const addFeed = (n, st) => { const d = document.createElement('div'); d.className = 'li mv'; d.innerHTML = `<span>${n}</span><em>${st}</em>`; feed.prepend(d); while (feed.children.length > 3) feed.lastChild.remove(); };
  for (let k = 0; k < 3; k++) addFeed(nextName()[0], 'Yangi');
  liveLoop(mk, alive => {
    let step = 0;
    const id = setInterval(() => {
      if (!alive()) return;
      if (step++ % 3 === 0) { const nm = nextName(); cols[0].querySelector('h6').after(card(nm)); addFeed(nm[0], 'Yangi'); lid.textContent = +lid.textContent + 1; }
      else {
        const c = 1 + Math.floor(Math.random() * 3), from = cols[c - 1].querySelectorAll('.card');
        if (!from.length) return;
        const x = from[from.length - 1]; x.classList.remove('mv'); void x.offsetWidth; x.classList.add('mv'); cols[c].querySelector('h6').after(x);
        addFeed(x.querySelector('b').textContent, STAT[c]);
      }
      cols.forEach(col => { const cs = col.querySelectorAll('.card'); if (cs.length > 3) cs[cs.length - 1].remove(); });
    }, 1700);
    return () => clearInterval(id);
  });
});
$$('[data-mock="chat"]').forEach(mk => {
  const box = mk.querySelector('.msgs'), st = mk.querySelector('.st'), toast = mk.querySelector('.toast'), nl = mk.querySelector('.nl');
  const SCRIPT = [
    [1, 'Assalomu alaykum! Kurs qachon boshlanadi?'],
    [0, "Va alaykum assalom! «30 kunda AI jamoa» kursi 14-noyabrdan boshlanadi. Darslar haftasiga 2 marta, 4 soatdan."],
    [1, 'Yozilmoqchiman'],
    [0, "Ajoyib! Ismingiz va raqamingizni qoldiring, menejer siz bilan bog'lanadi."],
    [1, 'Dilshod, +998 90 ••• •• ••'],
    [0, "Rahmat! Ma'lumotlaringiz CRM'ga yozildi ✓"],
  ];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  liveLoop(mk, alive => {
    let cancelled = false;
    (async () => {
      while (!cancelled && alive()) {
        box.innerHTML = ''; nl.innerHTML = ''; [['Madina K.', 'Sayt'], ['Aziz T.', 'Instagram']].forEach(x => { const k = card(x); k.classList.remove('mv'); nl.append(k); }); toast.classList.remove('on');
        for (const [me, text] of SCRIPT) {
          if (cancelled) return;
          if (!me) { const t = document.createElement('div'); t.className = 'bub typing'; t.innerHTML = '<i></i><i></i><i></i>'; box.append(t); st.textContent = 'yozmoqda…'; await sleep(1100); t.remove(); st.textContent = 'bot · 24/7'; }
          else await sleep(900);
          if (cancelled) return;
          const b = document.createElement('div'); b.className = 'bub' + (me ? ' me' : ''); b.textContent = text; box.append(b);
        }
        toast.classList.add('on');
        const c = card(['Dilshod', 'Telegram bot']); nl.append(c);
        await sleep(4200);
      }
    })();
    return () => { cancelled = true; };
  });
});

// ---------- kursor nuri va kartalar qiyaligi (kompyuterda) ----------
if (FINE && !RM) {
  const g = $('#glow');
  addEventListener('pointermove', e => { g.style.opacity = 1; g.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, { passive: true });
  $$('.tilt').forEach(el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// ---------- shior: harflab yoziladi ----------
const motto = $('#motto');
let mottoDone = false;
function typeMotto() {
  if (mottoDone || RM) return;
  mottoDone = true;
  const text = motto.dataset.text; motto.innerHTML = '<span class="typed"></span>';
  const sp = motto.firstChild;
  let i = 0; const id = setInterval(() => { sp.textContent = text.slice(0, ++i); if (i >= text.length) { clearInterval(id); setTimeout(() => sp.style.borderColor = 'transparent', 1200); } }, 70);
}

// ---------- jin sahnasi: video, keyin jin va tadbirkor gaplashadi ----------
(() => {
  const scene = $('#jinScene'), vid = $('#jinVid'), sbJin = $('#sbJin'), sbMan = $('#sbMan'), again = $('#jinReplay');
  const chips = Object.fromEntries($$('#wishes li').map(li => [li.dataset.k, li]));
  const WISHES = [['crm', 'Menga CRM kerak!'], ['tekin', 'Menga tekin ishlaydigan xodimlar kerak!'], ['pro', 'Menga professional xodimlar kerak!'],
    ['mobil', 'Menga mobil ilova kerak!'], ['sayt', 'Menga veb sayt kerak!'], ['ozi', "Biznesim o'zi ishlasin!"]];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let run = 0, jinShown = false;
  async function talk(id) {
    if (jinShown) return;
    jinShown = true;
    sbJin.classList.add('on');
    await sleep(2200); if (id !== run) return;
    sbJin.classList.remove('on');
    for (const [k, text] of WISHES) {
      sbMan.textContent = text; sbMan.classList.add('on'); chips[k].classList.add('lit');
      await sleep(1500); if (id !== run) return;
      sbMan.classList.remove('on'); await sleep(260); if (id !== run) return;
    }
    sbJin.classList.add('on');
    typeMotto();
    again.classList.add('on');
  }
  const still = () => { vid.poster = '/aj/web/jin-oxir.webp'; };
  function play() {
    const id = ++run; jinShown = false;
    sbJin.classList.remove('on'); sbMan.classList.remove('on'); again.classList.remove('on');
    Object.values(chips).forEach(c => c.classList.remove('lit'));
    try { vid.currentTime = 0; } catch {}
    const p = vid.play();
    if (p) p.catch(() => { still(); talk(id); });
    vid.ontimeupdate = () => { if (vid.duration && vid.currentTime > vid.duration - 1.4) talk(id); };
    vid.onended = () => talk(id);
  }
  if (RM) { still(); sbJin.classList.add('on'); Object.values(chips).forEach(c => c.classList.add('lit')); return; }
  vid.addEventListener('error', () => { still(); talk(run); }, true);
  again.addEventListener('click', play);
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); vid.preload = 'auto'; play(); } }, { threshold: .6 }).observe(scene);
})();

// ---------- pastki tugma ----------
const seen = { hero: true, form: false };
const sbar = $('#sbar'), hb = $('.hero .btn');
new IntersectionObserver(es => {
  es.forEach(e => { seen[e.target === hb ? 'hero' : 'form'] = e.isIntersecting; });
  sbar.classList.toggle('on', !seen.hero && !seen.form);
}).observe(hb);
new IntersectionObserver(([e]) => { seen.form = e.isIntersecting; sbar.classList.toggle('on', !seen.hero && !seen.form); }).observe($('#yozilish'));

// fon animatsiyalari tab ko'rinmaganda to'xtaydi
document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));

// ---------- forma ----------
const phone = $('#phone');
phone.addEventListener('input', () => {
  const d = phone.value.replace(/\D/g, '').slice(0, 9);
  phone.value = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ');
});
$('#lead').addEventListener('submit', async e => {
  e.preventDefault();
  const err = $('#err'), f = e.target, name = f.name.value.trim(), digits = phone.value.replace(/\D/g, '');
  if (name.length < 2) { err.textContent = 'Ismingizni yozing.'; f.name.focus(); return; }
  if (digits.length !== 9) { err.textContent = 'Telefon raqamni to\'liq yozing: 9 ta raqam.'; phone.focus(); return; }
  err.textContent = '';
  const utm = Object.fromEntries([...new URLSearchParams(location.search)].filter(([k]) => k.startsWith('utm_') || k === 'manba'));
  const eventId = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
  let fbc = getCookie('_fbc');
  const fbclid = new URLSearchParams(location.search).get('fbclid');
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  const btn = $('#send'); btn.disabled = true;
  try {
    const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone: '998' + digits, eventId, fbp: getCookie('_fbp'), fbc, pageUrl: location.href, utm, website: f.website.value }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) throw new Error(j.error || '');
    if (window.fbq) window.fbq('track', 'Lead', { content_name: '30 kunda AI jamoa' }, { eventID: j.eventId || eventId });
    f.hidden = true; $('#ok').hidden = false;
  } catch (ex) {
    err.textContent = ex.message || 'Yuborilmadi. Qayta urinib ko\'ring yoki qo\'ng\'iroq qiling: +998 99 999 00 38';
    btn.disabled = false;
  }
});
