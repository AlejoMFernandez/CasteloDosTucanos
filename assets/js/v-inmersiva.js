// Nav sólido al scrollear
const nav = document.getElementById('imm-nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Parallax en fondos
  if (!reduce) {
    gsap.utils.toArray('[data-parallax]').forEach((bg) => {
      gsap.fromTo(bg, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  // Reveals de texto
  gsap.utils.toArray('[data-fx]').forEach((el) => {
    gsap.from(el, {
      y: reduce ? 0 : 40, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });

  // Título del hero
  gsap.from('.imm-hero-content > *', {
    y: reduce ? 0 : 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.15
  });

  // Habitaciones: scroll horizontal pinneado
  const track = document.getElementById('imm-rooms-track');
  const section = document.getElementById('imm-rooms');
  if (track && section && window.innerWidth > 760) {
    const distance = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }
}
