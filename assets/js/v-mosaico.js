if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const y = reduce ? 0 : 24;

  // Hero bento: entrada en stagger
  gsap.from('.mos-hero .tile', {
    y, opacity: 0, scale: reduce ? 1 : 0.98, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.1
  });

  // Reveals por sección
  gsap.utils.toArray('.mos-section').forEach((sec) => {
    const items = sec.querySelectorAll('[data-fx]');
    gsap.from(items, {
      y, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07,
      scrollTrigger: { trigger: sec, start: 'top 84%' }
    });
  });
}
