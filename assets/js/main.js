document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    setupThemeToggle();
    
    // 移动端菜单
    setupMobileMenu();
    
    // 只在首页加载最新文章
    if (document.querySelector('.posts-grid')) {
        loadRecentPosts();
    }

    loadSkills();
    setupScrollAnimations();
});

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.setAttribute(
            'data-theme',
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
        localStorage.setItem('theme', document.body.getAttribute('data-theme'));
    });
}

function setupMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

async function loadRecentPosts() {
    try {
        const postManager = new PostManager();
        await postManager.init();
        const recentPosts = await postManager.getRecentPosts(3); // 获取最新的3篇文章
        
        const postsGrid = document.querySelector('.posts-grid');
        if (postsGrid) {
            postsGrid.innerHTML = recentPosts.map(post => `
                <article class="post-card fade-in">
                    <a href="/posts/detail.html?id=${post.id}">
                        <img src="${post.cover}" alt="${post.title}" 
                             onerror="this.src='/assets/images/default-cover.jpg'">
                        <div class="post-content">
                            <h3>${post.title}</h3>
                            <p class="date">${post.date}</p>
                            <p>${post.summary}</p>
                        </div>
                    </a>
                </article>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load recent posts:', error);
        const postsGrid = document.querySelector('.posts-grid');
        if (postsGrid) {
            postsGrid.innerHTML = `
                <div class="error-message">
                    <p>加载最新文章失败，请稍后重试</p>
                </div>
            `;
        }
    }
}

function loadSkills() {
    const skills = [
        {
            icon: 'fa-code',
            title: 'Web 开发',
            description: '精通 HTML5, CSS3, JavaScript 等前端技术'
        },
        {
            icon: 'fa-mobile-alt',
            title: '响应式设计',
            description: '创建适配各种设备的现代化网页'
        },
        {
            icon: 'fa-server',
            title: '后端开发',
            description: '熟悉 Node.js, Python 等后端技术'
        },
        {
            icon: 'fa-database',
            title: '数据库',
            description: '掌握 MySQL, MongoDB 等数据库技术'
        }
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsGrid.innerHTML = skills.map((skill, index) => `
            <div class="skill-card" style="animation-delay: ${index * 0.1}s">
                <i class="fas ${skill.icon} skill-icon"></i>
                <h3>${skill.title}</h3>
                <p>${skill.description}</p>
            </div>
        `).join('');
    }
}

// 添加滚动动画
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.post-card, .skill-card').forEach(el => {
        observer.observe(el);
    });
} 