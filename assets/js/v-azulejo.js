if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const y = reduce ? 0 : 26;

  // Hero
  gsap.from('.azu-hero [data-fx]', {
    y, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.1
  });

  // Reveals por sección
  gsap.utils.toArray('.azu-section, .azu-quote-sec').forEach((sec) => {
    const items = sec.querySelectorAll('[data-fx]');
    gsap.from(items, {
      y, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: sec, start: 'top 84%' }
    });
  });
}
