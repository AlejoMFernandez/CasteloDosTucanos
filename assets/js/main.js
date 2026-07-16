// ---------- Menú mobile ----------
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// ---------- Header sólido al scrollear ----------
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---------- Selector de idioma ----------
const langBtn = document.querySelector('.lang');
const langMenu = document.querySelector('.lang-menu');
if (langBtn && langMenu) {
  const current = langBtn.querySelector('.lang-current');
  const closeLang = () => {
    langBtn.classList.remove('open');
    langMenu.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  };
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = langMenu.classList.toggle('open');
    langBtn.classList.toggle('open', open);
    langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  langMenu.querySelectorAll('button[data-lang]').forEach((b) => {
    if (b.dataset.lang === current.textContent.trim()) b.setAttribute('aria-current', 'true');
    b.addEventListener('click', () => {
      current.textContent = b.dataset.lang;
      langMenu.querySelectorAll('button').forEach(x => x.removeAttribute('aria-current'));
      b.setAttribute('aria-current', 'true');
      closeLang();
      // Prototipo: aquí se cargaría el idioma real (i18n / ?lang=xx)
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-wrap')) closeLang();
  });
}

// ---------- Fechas por defecto ----------
function fmt(d) { return d.toISOString().slice(0, 10); }
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
if (checkin && checkout) {
  const hoy = new Date();
  const salida = new Date(); salida.setDate(hoy.getDate() + 4);
  checkin.value = fmt(hoy);
  checkout.value = fmt(salida);
  checkin.min = fmt(hoy);
}

// ---------- Buscador de precio (demo) ----------
// En producción consulta disponibilidad/tarifas reales del motor hqbeds.
const form = document.getElementById('searchbar');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ci = checkin.value, co = checkout.value;
    if (!ci || !co || co <= ci) { alert('Revisá las fechas: la salida debe ser posterior a la entrada.'); return; }
    const noches = Math.round((new Date(co) - new Date(ci)) / 86400000);

    let res = document.querySelector('.search-result');
    if (!res) { res = document.createElement('div'); res.className = 'search-result'; form.appendChild(res); }
    const total = 18 * noches;
    res.innerHTML = `<strong>${noches}</strong> noche(s) · dorm desde <strong>U$S ${total}</strong> · `
      + `<a href="https://booking.hqbeds.com.br" target="_blank" rel="noopener" style="color:#C4633B;font-weight:700">reservá directo →</a>`;
    res.classList.add('show');
    if (window.gsap) gsap.from(res, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
  });
}

// ---------- Animaciones (GSAP + ScrollTrigger) ----------
// Fallback seguro: si GSAP no cargó, el contenido queda visible tal cual.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Respetar preferencia de menos movimiento: conservamos los fundidos, quitamos el desplazamiento
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shift = reduce ? 0 : 20;

  // Entrada del hero
  const heroBits = document.querySelectorAll('.hero [data-reveal]');
  gsap.from(heroBits, {
    y: reduce ? 0 : 22, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.2
  });

  // Parallax de la foto del hero (solo si el usuario no pidió menos movimiento)
  const heroMedia = document.querySelector('.hero-media[data-parallax]');
  if (heroMedia && !reduce) {
    gsap.to(heroMedia, {
      yPercent: 14, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // Reveal individual (títulos de sección, reseña) — evita el hero y las grillas con stagger
  const staggered = '.social-inner, .grid-2, .grid-rooms, .grid-exp';
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    if (el.closest('.hero') || el.closest(staggered)) return;
    gsap.from(el, {
      y: shift, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Stagger en grupos de tarjetas
  ['.social-inner', '.grid-2', '.grid-rooms', '.grid-exp'].forEach((sel) => {
    const cont = document.querySelector(sel);
    if (!cont) return;
    const items = cont.querySelectorAll('[data-reveal]');
    gsap.from(items, {
      y: shift, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06,
      scrollTrigger: { trigger: cont, start: 'top 85%' }
    });
  });
}
