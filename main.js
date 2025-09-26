document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const reveal = el => el.classList.add('visible');

  const elements = document.querySelectorAll('.animate-slide-up, .animate-fade-in, .animate-scale, .animate-pop');

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          reveal(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => obs.observe(el));
  } else {
    elements.forEach((el, i) => setTimeout(() => reveal(el), i * 150));
  }

  setTimeout(() => {
    const nav = document.querySelector('.navbar');
    if (nav) nav.classList.add('visible');
  }, 200);
});
