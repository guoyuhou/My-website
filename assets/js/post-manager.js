class PostManager {
    constructor() {
        this.posts = [];
        this.postsPath = '../posts/content/metadata.json';
        this.categories = new Set();
    }

    async init() {
        try {
            await this.loadPosts();
            this.processPosts();
        } catch (error) {
            console.error('Failed to initialize PostManager:', error);
            throw error;
        }
    }

    async loadPosts() {
        try {
            const response = await fetch(this.postsPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.posts = data.articles.map(article => ({
                ...article,
                description: article.summary,
                cover: article.cover || '../assets/images/default-cover.jpg',
                contentPath: article.path
            }));
        } catch (error) {
            console.error('Error loading posts:', error);
            throw error;
        }
    }

    processPosts() {
        // 处理文章数据
        this.posts = this.posts.map(post => ({
            ...post,
            date: new Date(post.date),
            url: this.generatePostUrl(post)
        }));

        // 按日期排序（最新的在前）
        this.posts.sort((a, b) => b.date - a.date);

        // 收集所有分类
        this.posts.forEach(post => {
            if (post.category) {
                this.categories.add(post.category);
            }
        });
    }

    generatePostUrl(post) {
        // 根据文章标题生成 URL 友好的字符串
        const slug = post.title
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return `/posts/detail.html?id=${post.id}`;
    }

    getAllPosts() {
        return this.posts;
    }

    getRecentPosts(count = 5) {
        return this.posts.slice(0, count);
    }

    getPostById(id) {
        return this.posts.find(post => post.id === id);
    }

    getPostsByCategory(category) {
        return category === 'all' 
            ? this.posts 
            : this.posts.filter(post => post.category === category);
    }

    searchPosts(query) {
        const searchTerm = query.toLowerCase();
        return this.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.description.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm)
        );
    }

    getCategories() {
        return Array.from(this.categories);
    }

    getNextPost(currentId) {
        const currentIndex = this.posts.findIndex(post => post.id === currentId);
        return currentIndex > 0 ? this.posts[currentIndex - 1] : null;
    }

    getPreviousPost(currentId) {
        const currentIndex = this.posts.findIndex(post => post.id === currentId);
        return currentIndex < this.posts.length - 1 ? this.posts[currentIndex + 1] : null;
    }

    getRelatedPosts(post, count = 3) {
        return this.posts
            .filter(p => 
                p.id !== post.id && 
                (p.category === post.category || 
                 p.tags.some(tag => post.tags.includes(tag)))
            )
            .slice(0, count);
    }

    async getPostContent(post) {
        try {
            const response = await fetch(post.contentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading post content:', error);
            throw error;
        }
    }

    formatDate(date) {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    createPostCard(post) {
        return `
            <article class="post-card">
                <img src="${post.cover}" alt="${post.title}" 
                     onerror="this.src='../assets/images/default-cover.jpg'"
                     loading="lazy">
                <div class="post-content">
                    <div class="post-meta">
                        <span class="category">
                            <i class="fas fa-folder"></i> ${post.category}
                        </span>
                        <span class="date">
                            <i class="fas fa-calendar"></i> ${this.formatDate(post.date)}
                        </span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <a href="${post.url}" class="read-more">
                        阅读更多 <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }

    handleError(error) {
        console.error('PostManager Error:', error);
        return {
            title: '加载失败',
            description: '文章加载失败，请稍后重试',
            error: true
        };
    }
} 