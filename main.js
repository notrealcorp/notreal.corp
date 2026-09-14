/* =====================
   LOADER (index only — other pages reveal instantly)
   ===================== */
const loader = document.querySelector('.loader');
if (loader) {
  const fill  = loader.querySelector('.loader-fill');
  const count = loader.querySelector('.loader-count');
  let n = 0;
  fill.classList.add('sweep');
  const tick = setInterval(() => {
    n = Math.min(100, n + Math.round(4 + Math.random() * 10));
    count.textContent = n + '%';
    if (n >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        loader.setAttribute('data-done', '');
        document.body.classList.add('revealed');
        setTimeout(() => loader.remove(), 800);
      }, 150);
    }
  }, 90);
} else {
  document.body.classList.add('revealed');
}

/* =====================
   BUTTON SWIPE LABEL (mirrors visible text into data-label for ::before)
   ===================== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.setAttribute('data-label', btn.textContent.trim());
});

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
   POLARITY TOGGLE (hero)
   ===================== */
const polarityBtn = document.querySelector('.polarity-btn');
const hero = document.querySelector('.hero');
if (polarityBtn && hero) {
  polarityBtn.addEventListener('click', () => {
    hero.classList.toggle('inverted');
    polarityBtn.querySelector('span').textContent =
      hero.classList.contains('inverted') ? 'Mode clair' : 'Mode contraste';
  });
}

/* =====================
   MAGNETIC BUTTONS
   ===================== */
document.querySelectorAll('.magnetic').forEach(el => {
  const strength = 18;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
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
