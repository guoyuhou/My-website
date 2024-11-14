// 使用立即执行函数创建单例
const ThemeManager = (function() {
    let instance;

    class ThemeManagerClass {
        constructor() {
            if (instance) {
                return instance;
            }
            
            this.themeToggle = document.querySelector('.theme-toggle');
            if (!this.themeToggle) return;
            this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            this.currentTheme = localStorage.getItem('theme');
            instance = this;
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
    }

    return new ThemeManagerClass();
})();

// 导出为全局变量
window.themeManager = ThemeManager; 