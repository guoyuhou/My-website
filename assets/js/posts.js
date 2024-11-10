class BlogPosts {
    constructor() {
        this.postManager = new PostManager();
        this.currentPage = 1;
        this.postsPerPage = 9;
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.posts = [];
    }

    async init() {
        try {
            await this.postManager.init();
            this.posts = await this.postManager.getAllPosts();
            this.setupEventListeners();
            await this.renderPosts();
            this.renderCategories();
            this.setupIntersectionObserver();
        } catch (error) {
            console.error('Failed to initialize blog posts:', error);
            this.handleError();
        }
    }

    setupEventListeners() {
        // 搜索功能
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', this.debounce(() => {
            this.searchTerm = searchInput.value;
            this.currentPage = 1;
            this.renderPosts();
        }, 300));

        // 分类切换
        document.querySelector('.categories').addEventListener('click', (e) => {
            if (e.target.classList.contains('category-tag')) {
                document.querySelectorAll('.category-tag').forEach(tag => {
                    tag.classList.remove('active');
                });
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 1;
                this.renderPosts();
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.post-card').forEach(card => {
            observer.observe(card);
        });
    }

    async renderPosts() {
        try {
            const container = document.querySelector('.posts-container');
            const filteredPosts = this.filterPosts();
            if (!filteredPosts) {
                throw new Error('Failed to filter posts');
            }
            const start = (this.currentPage - 1) * this.postsPerPage;
            const end = start + this.postsPerPage;
            const postsToShow = filteredPosts.slice(start, end);

            container.innerHTML = postsToShow.length ? postsToShow.map(post => this.createPostCard(post)).join('') 
                : '<div class="no-posts">没有找到相关文章</div>';

            this.renderPagination(filteredPosts.length);
            this.setupIntersectionObserver();
        } catch (error) {
            console.error('Error rendering posts:', error);
            this.handleError();
        }
    }

    filterPosts() {
        return this.posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                post.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesCategory = this.currentCategory === 'all' || post.category === this.currentCategory;
            return matchesSearch && matchesCategory;
        });
    }

    renderCategories() {
        const categories = ['all', ...new Set(this.posts.map(post => post.category))];
        const container = document.querySelector('.categories');
        
        container.innerHTML = categories.map(category => `
            <div class="category-tag ${category === this.currentCategory ? 'active' : ''}" 
                 data-category="${category}">
                ${category === 'all' ? '全部' : category}
            </div>
        `).join('');
    }

    renderPagination(totalPosts) {
        const totalPages = Math.ceil(totalPosts / this.postsPerPage);
        const container = document.querySelector('.pagination');
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="blogPosts.changePage(${this.currentPage - 1})">
                上一页
            </button>
            <span>${this.currentPage} / ${totalPages}</span>
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="blogPosts.changePage(${this.currentPage + 1})">
                下一页
            </button>
        `;
    }

    changePage(page) {
        this.currentPage = page;
        this.renderPosts();
        window.scrollTo({
            top: document.querySelector('.posts-container').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    createPostCard(post) {
        return `
            <article class="post-card">
                <img src="${post.cover}" alt="${post.title}" onerror="this.src='/assets/images/default-cover.jpg'">
                <div class="post-content">
                    <div class="post-meta">
                        <span><i class="fas fa-folder"></i> ${post.category}</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.summary}</p>
                    <a href="${this.postManager.generatePostUrl(post)}" class="read-more">
                        阅读更多 <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }

    handleError() {
        const container = document.querySelector('.posts-container');
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>加载文章失败，请稍后重试</p>
                <button onclick="location.reload()">重新加载</button>
            </div>
        `;
    }

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
    }
}

// 初始化
let blogPosts;
document.addEventListener('DOMContentLoaded', () => {
    blogPosts = new BlogPosts();
    blogPosts.init();
});