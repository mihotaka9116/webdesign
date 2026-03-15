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
  mouseX = e.clientX;
  mouseY = e.clientY;
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
  const isHoverable = e.target.closest('a, button, .view-more-btn');
  cursorDot.classList.toggle('is-hover',  !!isHoverable);
  cursorRing.classList.toggle('is-hover', !!isHoverable);
});

/* =============================================
   スクロールプログレスライン
   ============================================= */
const progressLine = document.createElement('div');
progressLine.className = 'scroll-progress-line';
document.body.appendChild(progressLine);

window.addEventListener('scroll', () => {
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressLine.style.width = progress + '%';
}, { passive: true });

/* =============================================
   ヘッダー スクロール変化
   ============================================= */
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
  if (window.innerWidth > 768) {
    if (scrollY > lastScroll && scrollY > 200) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
  }
  lastScroll = scrollY;
}, { passive: true });

/* =============================================
   スクロールリビール (Intersection Observer)
   ============================================= */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = el.style.getPropertyValue('--delay') || 0;
      el.style.transitionDelay = (delay * 0.15) + 's';
      el.classList.add('revealed');
      observer.unobserve(el);
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* =============================================
   ツールタグ スタガー出現
   ============================================= */
function initTagStagger() {
  const lists = document.querySelectorAll('.tool-tags');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('li').forEach((tag, i) => {
        tag.style.transitionDelay = (i * 0.1) + 's';
        tag.classList.add('tag-visible');
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  lists.forEach(list => observer.observe(list));
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
   ハンバーガーメニュー（元のコードと同じ）
   ============================================= */
const hamburger = document.getElementById('js-hamburger');
const nav       = document.getElementById('js-nav');
const navLinks  = document.querySelectorAll('.nav-list a');

if (hamburger && nav) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

/* =============================================
   初期化
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initScrollReveal();
  initTagStagger();
});
