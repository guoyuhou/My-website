// 导航管理类
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelector('.nav-links');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        // 移动端菜单切换
        this.mobileMenu.addEventListener('click', () => this.toggleMobileMenu());
        
        // 滚动处理
        window.addEventListener('scroll', () => this.handleScroll());
        
        // 点击导航链接时关闭移动端菜单
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // 点击外部时关闭移动端菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        this.navLinks.classList.toggle('active');
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.navLinks.classList.remove('active');
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏显示/隐藏逻辑
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// 动画管理类
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimation();
        this.setupLazyLoading();
    }

    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 使用全局 themeManager 实例
    if (!window.themeManager) {
        window.themeManager = new ThemeManager();
    }
    new NavigationManager();
    new AnimationManager();

    // 加载最新文章
    const postsGrid = document.querySelector('.posts-grid');
    if (postsGrid) {
        try {
            await window.postManager.init();
            const recentPosts = window.postManager.getRecentPosts(3);
            
            if (recentPosts.length === 0) {
                postsGrid.innerHTML = '<div class="no-posts">暂无文章</div>';
                return;
            }

            postsGrid.innerHTML = recentPosts.map(post => `
                <article class="post-card">
                    <div class="post-image-container">
                        <img src="${post.cover || '/assets/images/default-cover.jpg'}" 
                             alt="${post.title}" 
                             class="post-image"
                             loading="lazy"
                             onerror="this.src='/assets/images/default-cover.jpg'">
                    </div>
                    <div class="post-content">
                        <div class="post-meta">
                            <span><i class="fas fa-folder"></i> ${post.category}</span>
                            <span><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString('zh-CN')}</span>
                        </div>
                        <h3>${post.title}</h3>
                        <p>${post.summary}</p>
                        <a href="/posts/detail.html?id=${post.id}" class="btn">阅读更多</a>
                    </div>
                </article>
            `).join('');

            // 添加动画类
            document.querySelectorAll('.post-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 200);
            });

        } catch (error) {
            console.error('Error loading recent posts:', error);
            postsGrid.innerHTML = `
                <div class="error-message">
                    <p>加载最新文章失败，请稍后重试</p>
                </div>
            `;
        }
    }

    // 技能专长动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // 如果是技能卡片，触发进度条动画
                if (entry.target.classList.contains('skill-card')) {
                    const progress = entry.target.querySelector('.skill-progress');
                    if (progress) {
                        const width = progress.style.width;
                        progress.style.width = '0';
                        setTimeout(() => {
                            progress.style.width = width;
                        }, 100);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // 观察所有技能卡片
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// 工具函数
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    formatDate(date) {
        return new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}; 