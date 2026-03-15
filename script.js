/**
 * Blog Data (ブログ記事のデータ)
 */
const BLOG_POSTS = [
    {
        id: '1',
        title: '2024年のWebデザイン・トレンド',
        date: '2024.03.10',
        excerpt: '今年のWebデザインにおける主要なトレンドと、それらがユーザー体験に与える影響について考察します。',
        content: `
            2024年のWebデザインは、よりパーソナライズされた体験と、アクセシビリティへの配慮がこれまで以上に重要視されています。
            
            特に注目すべきは、AIを活用した動的なコンテンツ生成や、ミニマリズムをベースにしつつも大胆なタイポグラフィを組み合わせたスタイルです。
            
            また、ダークモードの標準化や、マイクロインタラクションによる細やかなフィードバックも、ユーザーの満足度を高める重要な要素となっています。
            
            デザイナーとして、これらのトレンドを単に取り入れるだけでなく、クライアントのブランド価値をどう高めるかを常に考える必要があります。
        `,
        image: 'https://picsum.photos/seed/blog1/800/500',
    },
    {
        id: '2',
        title: '使いやすいポートフォリオの作り方',
        date: '2024.02.25',
        excerpt: 'クリエイターにとって名刺代わりとなるポートフォリオサイト。その設計で気をつけるべきポイントをまとめました。',
        content: `
            ポートフォリオサイトは、単に作品を並べる場所ではありません。それはあなたの「問題解決能力」を示すプレゼンテーションの場です。
            
            まず大切なのは、訪問者が迷わないシンプルなナビゲーションです。次に、各プロジェクトの背景、課題、そしてあなたがどう解決したかを言語化すること。
            
            ビジュアルの美しさはもちろん重要ですが、読み込み速度やモバイル対応といったテクニカルな側面も、プロフェッショナルとしての信頼に直結します。
            
            自分自身のブランドをどう表現するか、じっくり時間をかけて設計してみましょう。
        `,
        image: 'https://picsum.photos/seed/blog2/800/500',
    },
    {
        id: '3',
        title: 'Figmaからコーディングへのスムーズな連携',
        date: '2024.01.15',
        excerpt: 'デザインツールFigmaで作成したデザインを、効率よく正確にHTML/CSSで実装するためのTipsを紹介します。',
        content: `
            デザインと開発のギャップを埋めることは、プロジェクトの成功に不可欠です。Figmaのオートレイアウト機能やコンポーネント機能を活用することで、実装時の迷いを減らすことができます。
            
            また、カラーパレットやタイポグラフィをスタイルとして定義しておくことで、CSSでの変数管理が容易になります。
            
            最近では、Dev Modeなどの開発者向け機能も充実しており、プロパティの確認やコードスニペットの取得が非常にスムーズになりました。
            
            デザイナーとエンジニアが共通の言語で話せるよう、ツールの機能を最大限に活用していきましょう。
        `,
        image: 'https://picsum.photos/seed/blog3/800/500',
    },
];

/**
 * DOM Elements (HTML要素の取得)
 */
const hamburger = document.getElementById('js-hamburger');
const nav = document.getElementById('js-nav');
const blogGrid = document.getElementById('blog-grid');
const homeView = document.getElementById('home-view');
const articleView = document.getElementById('article-view');
const articleDetail = document.getElementById('article-detail');
const backToListBtn = document.getElementById('back-to-list');
const logoLink = document.getElementById('logo-link');
const navHome = document.querySelector('.nav-home');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Navigation Toggle (ハンバーガーメニューの開閉)
 */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

function closeNav() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
}

/**
 * View Switching (表示画面の切り替え)
 */
function showHome() {
    homeView.classList.remove('hidden');
    articleView.classList.add('hidden');
    window.scrollTo(0, 0);
}

function showArticle(post) {
    homeView.classList.add('hidden');
    articleView.classList.remove('hidden');
    
    // 記事本文のHTMLを流し込む
    articleDetail.innerHTML = `
        <div class="article-header">
            <p class="date">${post.date}</p>
            <h1 class="article-title">${post.title}</h1>
        </div>
        <div class="article-img">
            <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="article-content">
            ${post.content.trim().split('\n').map(line => `<p>${line.trim()}</p>`).join('')}
        </div>
    `;
    
    window.scrollTo(0, 0);
}

/**
 * Blog Rendering (ブログ一覧の自動生成)
 */
function renderBlog() {
    blogGrid.innerHTML = BLOG_POSTS.map(post => `
        <article class="blog-item" data-id="${post.id}">
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-text">
                <p class="date">${post.date}</p>
                <h3 class="title">${post.title}</h3>
                <p class="excerpt">${post.excerpt}</p>
                <span class="read-more">READ MORE</span>
            </div>
        </article>
    `).join('');

    // 各記事にクリックイベントを設定
    document.querySelectorAll('.blog-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const post = BLOG_POSTS.find(p => p.id === id);
            showArticle(post);
        });
    });
}

/**
 * Event Listeners (各種クリックイベント)
 */
logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
    closeNav();
});

navHome.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
    closeNav();
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        showHome();
        closeNav();
    });
});

backToListBtn.addEventListener('click', () => {
    showHome();
});

/**
 * Initialize (初期化処理)
 */
document.addEventListener('DOMContentLoaded', () => {
    renderBlog();
    // Lucideアイコンライブラリが読み込まれている場合にアイコンを生成
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
