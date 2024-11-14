// 使用立即执行函数避免全局污染
const PostManager = (function() {
    let instance;

    class PostManagerClass {
        constructor() {
            if (instance) {
                return instance;
            }
            this.posts = [];
            this.initialized = false;
            instance = this;
        }

        async init() {
            if (this.initialized) return;
            
            try {
                const response = await fetch('/posts/content/metadata.json');
                if (!response.ok) throw new Error('Failed to fetch posts metadata');
                const data = await response.json();
                this.posts = data.articles;
                this.initialized = true;
            } catch (error) {
                console.error('Error initializing PostManager:', error);
                throw error;
            }
        }

        getAllPosts() {
            return this.posts;
        }

        getRecentPosts(count = 3) {
            return this.posts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, count);
        }

        getCategories() {
            return [...new Set(this.posts.map(post => post.category))];
        }

        getPostById(id) {
            return this.posts.find(post => post.id === id);
        }
    }

    return new PostManagerClass();
})();

// 导出为全局变量
window.postManager = PostManager; 