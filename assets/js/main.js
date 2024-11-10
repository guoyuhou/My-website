document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    setupThemeToggle();
    
    // 移动端菜单
    setupMobileMenu();
    
    // 只在首页加载最新文章
    if (document.querySelector('.posts-grid')) {
        loadRecentPosts();
    }
});

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.setAttribute(
            'data-theme',
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
        localStorage.setItem('theme', document.body.getAttribute('data-theme'));
    });
}

function setupMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

async function loadRecentPosts() {
    try {
        const postManager = new PostManager();
        await postManager.init();
        const recentPosts = await postManager.getRecentPosts(3); // 获取最新的3篇文章
        
        const postsGrid = document.querySelector('.posts-grid');
        if (postsGrid) {
            postsGrid.innerHTML = recentPosts.map(post => `
                <article class="post-card fade-in">
                    <a href="/posts/detail.html?id=${post.id}">
                        <img src="${post.cover}" alt="${post.title}" 
                             onerror="this.src='/assets/images/default-cover.jpg'">
                        <div class="post-content">
                            <h3>${post.title}</h3>
                            <p class="date">${post.date}</p>
                            <p>${post.summary}</p>
                        </div>
                    </a>
                </article>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load recent posts:', error);
        const postsGrid = document.querySelector('.posts-grid');
        if (postsGrid) {
            postsGrid.innerHTML = `
                <div class="error-message">
                    <p>加载最新文章失败，请稍后重试</p>
                </div>
            `;
        }
    }
} 