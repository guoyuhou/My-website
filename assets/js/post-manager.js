class PostManager {
    constructor() {
        this.posts = [];
        this.initialized = false;
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

window.postManager = new PostManager(); 
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
        // 生成文章详情页的URL
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
            if (!post || !post.path) {
                throw new Error('Invalid post data');
            }
            
            // 修改路径构建方式，确保以 / 开头
            const contentPath = post.path.startsWith('/') 
                ? post.path 
                : `/posts/content/${post.path}`;
                
            console.log('Loading post from:', contentPath);
            
            const response = await fetch(contentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            
            // 提取 Markdown 文件的元数据和内容
            const { content: markdownContent } = this.parseMarkdown(content);
            return markdownContent;
        } catch (error) {
            console.error('Error loading post content:', error);
            throw error;
        }
    }

    // 添加 Markdown 解析方法
    parseMarkdown(content) {
        const lines = content.split('\n');
        let inFrontMatter = false;
        let markdown = [];
        let metadata = {};

        for (let line of lines) {
            if (line.trim() === '---') {
                inFrontMatter = !inFrontMatter;
                continue;
            }

            if (inFrontMatter) {
                const [key, ...values] = line.split(':');
                if (key && values.length) {
                    metadata[key.trim()] = values.join(':').trim();
                }
            } else {
                markdown.push(line);
            }
        }

        return {
            metadata,
            content: markdown.join('\n')
        };
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