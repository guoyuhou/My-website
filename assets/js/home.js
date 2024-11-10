class HomePage {
    constructor() {
        this.postManager = new PostManager();
        this.recentPostsCount = 3; // 显示最新的3篇文章
    }

    async init() {
        try {
            await this.postManager.init();
            await this.renderRecentPosts();
        } catch (error) {
            console.error('Failed to initialize homepage:', error);
            this.handleError();
        }
    }

    async renderRecentPosts() {
        const container = document.querySelector('.posts-grid');
        const recentPosts = this.postManager.getRecentPosts(this.recentPostsCount);
        
        if (recentPosts.length) {
            container.innerHTML = recentPosts.map(post => this.createPostCard(post)).join('');
            this.setupScrollAnimation();
        } else {
            container.innerHTML = '<div class="no-posts">暂无文章</div>';
        }
    }

    createPostCard(post) {
        return `
            <article class="post-card">
                <img src="${post.cover}" alt="${post.title}" onerror="this.src='assets/images/default-cover.jpg'">
                <div class="post-content">
                    <div class="post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <a href="${post.url}" class="read-more">阅读更多 <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `;
    }

    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.post-card').forEach(card => {
            observer.observe(card);
        });
    }

    handleError() {
        const container = document.querySelector('.posts-grid');
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>加载文章失败，请稍后重试</p>
                <button onclick="location.reload()">重新加载</button>
            </div>
        `;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const homePage = new HomePage();
    homePage.init();
}); 