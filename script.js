/* =============================================
   カスタムカーソル
   ============================================= */
const cursorDot  = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className  = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();
document.addEventListener('mouseover', (e) => {
  const h = e.target.closest('a, button, .view-more-btn');
  cursorDot.classList.toggle('is-hover',  !!h);
  cursorRing.classList.toggle('is-hover', !!h);
});

/* =============================================
   海のCanvasアニメーション
   ============================================= */
function initOcean() {
  const canvas = document.getElementById('ocean-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // 波のパラメータ
  const waves = [
    { y: 0.55, amp: 0.022, freq: 0.018, speed: 0.012, opacity: 0.13, color: '255,255,255' },
    { y: 0.62, amp: 0.016, freq: 0.024, speed: 0.018, opacity: 0.10, color: '180,220,255' },
    { y: 0.70, amp: 0.020, freq: 0.014, speed: 0.008, opacity: 0.08, color: '255,255,255' },
    { y: 0.78, amp: 0.012, freq: 0.030, speed: 0.022, opacity: 0.07, color: '160,210,255' },
  ];

  // 泡のパラメータ
  const BUBBLE_COUNT = 28;
  const bubbles = Array.from({ length: BUBBLE_COUNT }, () => createBubble(true));

  function createBubble(random) {
    const h = canvas.height || 400;
    const w = canvas.width  || 800;
    return {
      x:       Math.random() * w,
      y:       random ? Math.random() * h : h + 10,
      r:       1.5 + Math.random() * 3.5,
      speed:   0.3 + Math.random() * 0.7,
      drift:   (Math.random() - 0.5) * 0.4,
      opacity: 0.08 + Math.random() * 0.18,
      wobble:  Math.random() * Math.PI * 2,
    };
  }

  // 光のきらめき
  const SHIMMER_COUNT = 14;
  const shimmers = Array.from({ length: SHIMMER_COUNT }, () => createShimmer(true));

  function createShimmer(random) {
    const h = canvas.height || 400;
    const w = canvas.width  || 800;
    return {
      x:       Math.random() * w,
      y:       random ? Math.random() * h * 0.7 : -10,
      size:    2 + Math.random() * 5,
      alpha:   0,
      maxA:    0.15 + Math.random() * 0.25,
      fadeIn:  true,
      speed:   0.004 + Math.random() * 0.008,
      drift:   (Math.random() - 0.5) * 0.3,
      life:    0,
      maxLife: 120 + Math.random() * 180,
    };
  }

  let t = 0;

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // --- 波を描画 ---
    waves.forEach(wave => {
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 4) {
        const y = wave.y * H
          + Math.sin(x * wave.freq + t * wave.speed * 60) * wave.amp * H
          + Math.sin(x * wave.freq * 1.7 + t * wave.speed * 40) * wave.amp * 0.4 * H;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = `rgba(${wave.color},${wave.opacity})`;
      ctx.fill();
    });

    // --- 泡を描画 ---
    bubbles.forEach((b, i) => {
      b.wobble += 0.04;
      b.x += b.drift + Math.sin(b.wobble) * 0.3;
      b.y -= b.speed;

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${b.opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ハイライト
      ctx.beginPath();
      ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.6})`;
      ctx.fill();

      if (b.y < -10) bubbles[i] = createBubble(false);
    });

    // --- きらめきを描画 ---
    shimmers.forEach((s, i) => {
      s.life++;
      s.x += s.drift;
      s.y += 0.2;
      if (s.fadeIn) {
        s.alpha += s.speed;
        if (s.alpha >= s.maxA) s.fadeIn = false;
      } else {
        s.alpha -= s.speed * 0.6;
      }
      if (s.life > s.maxLife || s.alpha < 0) {
        shimmers[i] = createShimmer(false);
        return;
      }
      // 星形のきらめき
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = s.alpha;
      for (let k = 0; k < 4; k++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 4);
        ctx.moveTo(0, -s.size);
        ctx.lineTo(0,  s.size);
        ctx.strokeStyle = 'rgba(255,255,255,1)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();
    });

    t += 0.016;
    requestAnimationFrame(draw);
  }

  draw();
}

/* =============================================
   スクロールプログレスライン
   ============================================= */
const progressLine = document.createElement('div');
progressLine.className = 'scroll-progress-line';
document.body.appendChild(progressLine);
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressLine.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
}, { passive: true });

/* =============================================
   ヘッダー スクロール変化
   ============================================= */
const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('header-scrolled', y > 60);
  if (window.innerWidth > 768) {
    header.classList.toggle('header-hidden', y > lastScroll && y > 200);
  }
  lastScroll = y;
}, { passive: true });

/* =============================================
   ハンバーガーメニュー
   ============================================= */
const hamburger = document.getElementById('js-hamburger');
const nav       = document.getElementById('js-nav');
const navLinks  = document.querySelectorAll('#js-nav .nav-list a');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    nav.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* =============================================
   スクロールリビール
   ============================================= */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const d  = el.style.getPropertyValue('--delay') || 0;
      el.style.transitionDelay = (d * 0.15) + 's';
      el.classList.add('revealed');
      obs.unobserve(el);
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* =============================================
   ツールタグ スタガー出現
   ============================================= */
function initTagStagger() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('li').forEach((tag, i) => {
        tag.style.transitionDelay = (i * 0.1) + 's';
        tag.classList.add('tag-visible');
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.tool-tags').forEach(el => obs.observe(el));
}

/* =============================================
   ヒーロータイトル 文字アニメーション
   ============================================= */
function initHeroTitle() {
  const el = document.querySelector('.hero-title');
  if (!el) return;
  const text = el.textContent;
  el.innerHTML = '';
  el.style.opacity = '1';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'char-anim';
    span.style.animationDelay = (0.04 * i + 0.2) + 's';
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
  });
}

/* =============================================
   ページローダー
   ============================================= */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('loader-done');
    document.body.classList.add('loaded');
    initHeroTitle();
  }, 700);
}

/* =============================================
   初期化
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initOcean();
  initScrollReveal();
  initTagStagger();
});
