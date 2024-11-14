class BlogPosts {
    constructor() {
        this.currentPage = 1;
        this.postsPerPage = 9;
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.postManager = window.postManager;
    }

    async init() {
        try {
            await this.postManager.init();
            this.setupEventListeners();
            this.renderPosts();
            this.renderCategories();
        } catch (error) {
            console.error('Failed to initialize blog posts:', error);
            this.handleError();
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.currentPage = 1;
                this.renderPosts();
            });
        }

        const categoriesContainer = document.querySelector('.categories');
        if (categoriesContainer) {
            categoriesContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-tag')) {
                    this.currentCategory = e.target.dataset.category;
                    this.currentPage = 1;
                    this.renderPosts();
                    this.updateCategoryUI();
                }
            });
        }
    }

    renderPosts() {
        const postsContainer = document.querySelector('.posts-container');
        if (!postsContainer) return;

        const filteredPosts = this.filterPosts();
        const start = (this.currentPage - 1) * this.postsPerPage;
        const end = start + this.postsPerPage;
        const postsToShow = filteredPosts.slice(start, end);

        postsContainer.innerHTML = postsToShow.length ? 
            postsToShow.map(post => this.createPostCard(post)).join('') :
            '<div class="no-posts">没有找到相关文章</div>';

        this.renderPagination(filteredPosts.length);
    }

    filterPosts() {
        return this.postManager.getAllPosts().filter(post => {
            const matchesSearch = !this.searchTerm || 
                post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                post.summary.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesCategory = this.currentCategory === 'all' || 
                post.category === this.currentCategory;
            return matchesSearch && matchesCategory;
        });
    }

    renderCategories() {
        const categories = ['all', ...new Set(this.postManager.getCategories())];
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
        const postsContainer = document.querySelector('.posts-container');
        if (postsContainer) {
            postsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>加载文章失败，请稍后重试</p>
                    <button onclick="location.reload()">重新加载</button>
                </div>
            `;
        }
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

document.addEventListener('DOMContentLoaded', () => {
    const blogPosts = new BlogPosts();
    blogPosts.init().catch(error => {
        console.error('Failed to initialize blog posts:', error);
    });
});