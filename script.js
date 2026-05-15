/* ============================================
   NUSSA'S GRADUATION GIFT — JAVASCRIPT v2
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1. FLOATING PETALS (Hero)
     ============================================ */
  const petalsContainer = document.querySelector('.petals-container');
  const petalEmojis = ['🌸', '🌺', '🌷', '✿', '❀', '🌸', '🌸'];

  for (let i = 0; i < 22; i++) {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

    const size  = Math.random() * 0.9 + 0.55;
    const left  = Math.random() * 100;
    const delay = Math.random() * 14;
    const dur   = Math.random() * 10 + 12;

    petal.style.cssText = `
      left: ${left}%;
      top: -60px;
      font-size: ${size}rem;
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
    `;
    petalsContainer.appendChild(petal);
  }

  /* ============================================
     2. FLOATING HEARTS (Hero)
     ============================================ */
  const heartsWrapper = document.querySelector('.hero-hearts');

  function spawnHeart() {
    const heart  = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = ['♡', '♥', '❤'][Math.floor(Math.random() * 3)];

    const x    = Math.random() * 100;
    const size = Math.random() * 1 + 0.6;
    const dur  = Math.random() * 3 + 3.5;
    const bot  = Math.random() * 20 + 5;

    heart.style.cssText = `
      left: ${x}%;
      bottom: ${bot}%;
      font-size: ${size}rem;
      animation-duration: ${dur}s;
    `;

    heartsWrapper.appendChild(heart);
    setTimeout(() => heart.remove(), dur * 1000 + 100);
  }

  setInterval(spawnHeart, 700);

  /* ============================================
     3. UNIVERSAL SCROLL REVEAL
     ============================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ============================================
     4. TIMELINE STAGGERED REVEAL
     ============================================ */
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 200);
        });
        timelineObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });

  const timeline = document.querySelector('.timeline');
  if (timeline) timelineObserver.observe(timeline);

  /* ============================================
     5. SIDE NAV — ACTIVE DOT ON SCROLL
     ============================================ */
  const sections = ['hero', 'letter', 'reasons', 'future', 'closing'];
  const dots     = document.querySelectorAll('.side-dot');

  function getActiveSection() {
    const midY = window.scrollY + window.innerHeight * 0.4;
    let active = sections[0];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= midY) active = id;
    });
    return active;
  }

  function updateDots() {
    const active = getActiveSection();
    dots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.section === active);
    });
  }

  window.addEventListener('scroll', updateDots, { passive: true });
  updateDots();

  /* ============================================
     6. MUSIC TOGGLE
     ============================================ */
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic     = document.getElementById('bgMusic');

  if (musicToggle && bgMusic) {
    bgMusic.volume = 0.35;

    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicToggle.classList.add('playing');
        }).catch(() => {
          // Browser blocked autoplay or no src — show feedback
          musicToggle.title = 'Add music.mp3 to this folder to enable music';
          musicToggle.style.opacity = '0.5';
        });
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
      }
    });
  }

  /* ============================================
     7. SUBTLE HERO PARALLAX
     ============================================ */
  const heroEl = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroEl && scrollY < window.innerHeight) {
      heroEl.style.backgroundPositionY = `${50 + scrollY * 0.015}%`;
    }
  }, { passive: true });

  /* ============================================
     8. CARD STAGGER ON ENTER
     ============================================ */
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.reason-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 110);
        });
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  const cardsGrid = document.querySelector('.cards-grid');
  if (cardsGrid) gridObserver.observe(cardsGrid);

});
