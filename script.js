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

