
document.addEventListener('DOMContentLoaded', () => {
  // Reveal cards on scroll
  const cards = document.querySelectorAll('.card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('reveal'); obs.unobserve(e.target); } });
  }, {threshold: 0.25});
  cards.forEach(c => obs.observe(c));
});
