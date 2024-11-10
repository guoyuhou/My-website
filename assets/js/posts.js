class BlogPosts {
    constructor() {
        this.postManager = new PostManager();
        this.currentPage = 1;
        this.postsPerPage = 9;
        this.currentCategory = 'all';
        this.searchTerm = '';
    }

    async init() {
        await this.postManager.init();
        this.setupEventListeners();
        await this.renderPosts();
        this.renderCategories();
        this.renderPagination();
    }

    async renderPosts() {
        try {
            let posts;
            if (this.searchTerm) {
                posts = await this.postManager.searchArticles(this.searchTerm);
            } else {
                posts = await this.postManager.getArticlesByCategory(this.currentCategory);
            }

            const container = document.querySelector('.posts-container');
            if (!posts.length) {
                container.innerHTML = `
                    <div class="no-posts">
                        <p>暂无文章</p>
                    </div>
                `;
                return;
            }

            const start = (this.currentPage - 1) * this.postsPerPage;
            const paginatedPosts = posts.slice(start, start + this.postsPerPage);

            container.innerHTML = paginatedPosts.map(post => `
                <article class="post-card fade-in">
                    <a href="/posts/detail.html?id=${post.id}">
                        <img src="${post.cover}" alt="${post.title}">
                        <div class="post-content">
                            <h3>${post.title}</h3>
                            <p class="date">${post.date}</p>
                            <p>${post.summary}</p>
                            <div class="tags">
                                ${post.tags.map(tag => 
                                    `<span class="tag">${tag}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </a>
                </article>
            `).join('');
        } catch (error) {
            console.error('Failed to render posts:', error);
            const container = document.querySelector('.posts-container');
            container.innerHTML = `
                <div class="error-message">
                    <p>加载文章失败，请稍后重试</p>
                </div>
            `;
        }
    }

    renderCategories() {
        const categories = this.postManager.getCategories();
        const container = document.querySelector('.categories');
        
        container.innerHTML = `
            <button class="category-btn ${this.currentCategory === 'all' ? 'active' : ''}" 
                    data-category="all">
                全部
            </button>
            ${categories.map(category => `
                <button class="category-btn ${this.currentCategory === category ? 'active' : ''}" 
                        data-category="${category}">
                    ${category}
                </button>
            `).join('')}
        `;
    }

    setupEventListeners() {
        // 搜索功能
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.renderPosts();
            this.renderPagination();
        });

        // 分类筛选
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.currentPage = 1;
                this.renderPosts();
                this.renderPagination();
            });
        });
    }

    renderPagination() {
        const filteredPosts = this.filterPosts();
        const totalPages = Math.ceil(filteredPosts.length / this.postsPerPage);
        const pagination = document.querySelector('.pagination');

        let paginationHTML = '';
        if (totalPages > 1) {
            paginationHTML += `
                <button ${this.currentPage === 1 ? 'disabled' : ''} 
                        onclick="blogPosts.changePage(${this.currentPage - 1})">
                    上一页
                </button>
            `;

            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += `
                    <button class="${this.currentPage === i ? 'active' : ''}"
                            onclick="blogPosts.changePage(${i})">
                        ${i}
                    </button>
                `;
            }

            paginationHTML += `
                <button ${this.currentPage === totalPages ? 'disabled' : ''} 
                        onclick="blogPosts.changePage(${this.currentPage + 1})">
                    下一页
                </button>
            `;
        }

        pagination.innerHTML = paginationHTML;
    }

    changePage(page) {
        this.currentPage = page;
        this.renderPosts();
        this.renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 初始化博客文章
const blogPosts = new BlogPosts(); 

document.addEventListener('DOMContentLoaded', () => {
    blogPosts.init();
});