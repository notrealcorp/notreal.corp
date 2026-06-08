/* =====================
   NAV — scroll shadow
   ===================== */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}

/* =====================
   NAV — mobile toggle
   ===================== */
const hamburger  = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* =====================
   NAV — active link
   ===================== */
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* =====================
   SCROLL REVEAL
   ===================== */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =====================
   TABLE ROW STAGGER
   ===================== */
const tableRows = document.querySelectorAll('.compare-table tbody tr');
if (tableRows.length) {
  const tableObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tableRows.forEach((row, i) => {
            setTimeout(() => row.classList.add('visible'), i * 80);
          });
          tableObserver.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  const table = document.querySelector('.compare-table');
  if (table) tableObserver.observe(table);
}
