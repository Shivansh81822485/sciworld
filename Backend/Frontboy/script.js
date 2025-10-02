// update footer year (safe)
document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastY = window.scrollY || 0;
  let ticking = false;
  let hidden = false;

  function onScroll() {
    const currentY = window.scrollY || 0;
    const delta = currentY - lastY;

    // ignore tiny movements
    if (Math.abs(delta) < 8) {
      lastY = currentY;
      ticking = false;
      return;
    }

    // scrolling down -> hide (after threshold)
    if (delta > 0 && currentY > 120 && !hidden) {
      navbar.classList.add('navbar-hidden');
      hidden = true;
    }

    // scrolling up -> show
    if (delta < 0 && hidden) {
      navbar.classList.remove('navbar-hidden');
      hidden = false;
    }

    lastY = currentY <= 0 ? 0 : currentY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
});
