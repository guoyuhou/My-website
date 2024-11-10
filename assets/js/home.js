class HomePage {
    constructor() {
        this.postManager = new PostManager();
        this.recentPostsCount = 3; // 显示最新的3篇文章
        this.skills = [
            {
                icon: 'fa-brands fa-js',
                name: 'JavaScript',
                description: '熟练掌握现代JavaScript，包括ES6+特性、异步编程、模块化开发等',
                level: 90
            },
            {
                icon: 'fa-brands fa-react',
                name: 'React',
                description: '熟悉React生态系统，包括Hooks、Redux、React Router等',
                level: 85
            },
            {
                icon: 'fa-brands fa-node-js',
                name: 'Node.js',
                description: '掌握Node.js后端开发，包括Express、数据库集成等',
                level: 80
            },
            {
                icon: 'fa-solid fa-database',
                name: '数据库',
                description: '熟练使用MySQL、MongoDB等数据库，了解数据库设计和优化',
                level: 75
            },
            {
                icon: 'fa-brands fa-python',
                name: 'Python',
                description: '掌握Python编程，包括数据分析、网络爬虫等应用开发',
                level: 85
            },
            {
                icon: 'fa-solid fa-cloud',
                name: '云服务',
                description: '熟悉云服务部署，包括Docker容器化、CI/CD等',
                level: 70
            }
        ];
    }

    async init() {
        try {
            await this.postManager.init();
            await this.renderRecentPosts();
            this.renderSkills();
            this.setupScrollAnimation();
        } catch (error) {
            console.error('Failed to initialize homepage:', error);
            this.handleError();
        }
    }

    async renderRecentPosts() {
        const container = document.querySelector('.posts-grid');
        const recentPosts = this.postManager.getRecentPosts(this.recentPostsCount);
        
        if (recentPosts.length) {
            container.innerHTML = recentPosts.map(post => this.createPostCard(post)).join('');
            this.setupScrollAnimation();
        } else {
            container.innerHTML = '<div class="no-posts">暂无文章</div>';
        }
    }

    createPostCard(post) {
        return `
            <article class="post-card">
                <img src="${post.cover}" alt="${post.title}" onerror="this.src='/assets/images/default-cover.jpg'">
                <div class="post-content">
                    <div class="post-meta">
                        <span class="date">
                            <i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}
                        </span>
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

    renderSkills() {
        const container = document.querySelector('.skills-grid');
        container.innerHTML = this.skills.map(skill => this.createSkillCard(skill)).join('');
    }

    createSkillCard(skill) {
        return `
            <div class="skill-card">
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
                <div class="skill-level">
                    <div class="skill-progress" style="width: 0%"></div>
                </div>
            </div>
        `;
    }

    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // 如果是技能卡片，还要动画显示进度条
                    if (entry.target.classList.contains('skill-card')) {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        const skill = this.skills.find(s => 
                            s.name === entry.target.querySelector('h3').textContent
                        );
                        if (progressBar && skill) {
                            setTimeout(() => {
                                progressBar.style.width = `${skill.level}%`;
                            }, 200);
                        }
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.post-card, .skill-card').forEach(card => {
            observer.observe(card);
        });
    }

    handleError() {
        const container = document.querySelector('.posts-grid');
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>加载文章失败，请稍后重试</p>
                <button onclick="location.reload()">重新加载</button>
            </div>
        `;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const homePage = new HomePage();
    homePage.init();
}); 