// main.js - reveal animations + fallback
document.addEventListener('DOMContentLoaded', () => {
  // set current year in footer
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // small helper to add visible
  const reveal = el => {
    if (!el.classList.contains('visible')) el.classList.add('visible');
  };

  // Sequential reveal for hero items (nice entrance)
  const heroSeq = document.querySelectorAll('.hero .animate-seq');
  heroSeq.forEach((el, i) => {
    setTimeout(() => reveal(el), 160 + i * 140);
  });

  // Elements to observe
  const toObserve = Array.from(document.querySelectorAll('.animate-slide-up, .animate-fade-in, .animate-scale, .animate-pop'));

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target); // reveal once
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    toObserve.forEach(el => obs.observe(el));
  } else {
    // fallback: reveal all with small delays
    toObserve.forEach((el, i) => setTimeout(() => reveal(el), 200 + i * 120));
  }

  // show navbar quickly
  setTimeout(() => {
    const nav = document.querySelector('.navbar');
    if (nav) nav.classList.add('visible');
  }, 120);
});
