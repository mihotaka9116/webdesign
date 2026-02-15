<script>
  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });
</script>

<script>
  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');
  const navLinks = document.querySelectorAll('#js-nav a');

  // ハンバーガーボタンクリックで開閉
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // メニュー内のリンクをクリックしたら閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
</script>

let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // 下にスクロールしたらヘッダーを隠す
    header.classList.add('hide');
  } else {
    // 上にスクロールしたらヘッダーを表示する
    header.classList.remove('hide');
  }
  lastScrollY = window.scrollY;
});
