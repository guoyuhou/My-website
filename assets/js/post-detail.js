class PostDetail {
    constructor() {
        this.article = null;
        this.tocItems = [];
        this.postManager = new PostManager();
    }

    async init() {
        await this.postManager.init();
        await this.loadArticle();
        this.renderArticle();
        this.generateTOC();
        this.setupScrollSpy();
        this.setupComments();
    }

    async loadArticle() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        try {
            this.article = await this.postManager.getArticle(articleId);
            
            // 更新浏览器历史记录和 URL
            const url = new URL(window.location);
            url.searchParams.set('id', articleId);
            window.history.replaceState({}, '', url);
            
        } catch (error) {
            console.error('Failed to load article:', error);
            // 显示错误信息或重定向到 404 页面
            window.location.href = '/404.html';
        }
    }

    renderArticle() {
        // 设置页面标题和元数据
        document.title = `${this.article.title} - Diarina`;
        
        // 更新 meta 标签
        document.querySelector('meta[name="description"]').content = this.article.summary;
        
        // 渲染文章头部信息
        const header = document.querySelector('.article-header');
        header.innerHTML = `
            <div class="article-meta">
                <span class="category">
                    <i class="fas fa-folder"></i> ${this.article.category}
                </span>
                <span class="date">
                    <i class="fas fa-calendar"></i> ${this.article.date}
                </span>
                <span class="reading-time">
                    <i class="fas fa-clock"></i> ${this.article.readingTime}
                </span>
                <span class="author">
                    <i class="fas fa-user"></i> ${this.article.author}
                </span>
            </div>
            <h1>${this.article.title}</h1>
            <div class="tags">
                ${this.article.tags.map(tag => 
                    `<span class="tag">${tag}</span>`
                ).join('')}
            </div>
        `;
        
        // 渲染文章内容
        const articleBody = document.querySelector('.article-body');
        
        // 配置 Marked 选项
        marked.setOptions({
            highlight: function(code, lang) {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            },
            breaks: true,
            gfm: true
        });

        articleBody.innerHTML = marked.parse(this.article.content);

        // 处理图片路径
        articleBody.querySelectorAll('img').forEach(img => {
            if (!img.src.startsWith('http')) {
                img.src = `/posts/assets/images/${img.getAttribute('src')}`;
            }
        });
    }

    generateTOC() {
        const headings = document.querySelectorAll('.article-body h2, .article-body h3');
        const toc = document.getElementById('toc');
        let html = '<ul>';
        let prevLevel = 2;

        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const id = `heading-${index}`;
            heading.id = id;

            if (level > prevLevel) {
                html += '<ul>';
            } else if (level < prevLevel) {
                html += '</ul>';
            }

            html += `
                <li>
                    <a href="#${id}" class="toc-link">
                        ${heading.textContent}
                    </a>
                </li>
            `;

            prevLevel = level;
            this.tocItems.push({
                id,
                top: heading.offsetTop
            });
        });

        html += '</ul>';
        toc.innerHTML = html;
    }

    setupScrollSpy() {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            const activeHeading = this.tocItems.reduce((prev, current) => {
                return (Math.abs(current.top - scrollPosition) < Math.abs(prev.top - scrollPosition) ? current : prev);
            });

            document.querySelectorAll('.toc-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeHeading.id}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupComments() {
        // 监听主题变化，同步更新评论区主题
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const theme = document.body.getAttribute('data-theme');
                    const utterances = document.querySelector('.utterances-frame');
                    if (utterances) {
                        const message = {
                            type: 'set-theme',
                            theme: theme === 'dark' ? 'github-dark' : 'github-light'
                        };
                        utterances.contentWindow.postMessage(message, 'https://utteranc.es');
                    }
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

}

// 初始化文章详情页
const postDetail = new PostDetail();

// 分享功能
function share(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
} 