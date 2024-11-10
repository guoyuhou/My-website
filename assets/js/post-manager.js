class PostManager {
    constructor() {
        this.metadata = null;
        this.cache = new Map();
    }

    async init() {
        await this.loadMetadata();
    }

    async loadMetadata() {
        try {
            const response = await fetch('/posts/content/metadata.json');
            this.metadata = await response.json();
        } catch (error) {
            console.error('Failed to load post metadata:', error);
            this.metadata = { articles: [], categories: [], tags: [] };
        }
    }

    async getArticle(id) {
        // 检查缓存
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }

        const articleMeta = this.metadata.articles.find(article => article.id === id);
        if (!articleMeta) {
            throw new Error('Article not found');
        }

        try {
            const response = await fetch(`/posts/content/${articleMeta.path}`);
            const markdown = await response.text();
            
            const article = {
                ...articleMeta,
                content: markdown
            };

            // 存入缓存
            this.cache.set(id, article);
            return article;
        } catch (error) {
            console.error('Failed to load article:', error);
            throw error;
        }
    }

    async getArticlesByCategory(category) {
        return this.metadata.articles.filter(article => 
            category === 'all' || article.category === category
        );
    }

    async getArticlesByTag(tag) {
        return this.metadata.articles.filter(article => 
            article.tags.includes(tag)
        );
    }

    async searchArticles(keyword) {
        keyword = keyword.toLowerCase();
        return this.metadata.articles.filter(article => 
            article.title.toLowerCase().includes(keyword) ||
            article.summary.toLowerCase().includes(keyword) ||
            article.tags.some(tag => tag.toLowerCase().includes(keyword))
        );
    }

    getCategories() {
        return this.metadata.categories;
    }

    getTags() {
        return this.metadata.tags;
    }
} 