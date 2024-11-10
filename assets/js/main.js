// 主题管理类
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        if (!this.themeToggle) return;
        this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.currentTheme = localStorage.getItem('theme');
        this.init();
    }

    init() {
        if (!this.themeToggle) return;
        if (this.currentTheme) {
            document.body.setAttribute('data-theme', this.currentTheme);
            this.updateThemeIcon(this.currentTheme === 'dark');
        } else if (this.prefersDarkScheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
            this.updateThemeIcon(true);
        }

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(!isDark);
    }

    updateThemeIcon(isDark) {
        if (!this.themeToggle) return;
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    handleSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            this.updateThemeIcon(e.matches);
        }
    }
}

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
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
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