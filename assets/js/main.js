// 主题切换功能
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 检查本地存储中的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // 移动端菜单切换
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    loadRecentPosts();
    loadSkills();
});

// 加载最新文章
function loadRecentPosts() {
    const posts = [
        {
            title: "构建现代化的个人博客",
            date: "2024-03-15",
            summary: "如何使用现代Web技术构建个人博客网站...",
            image: "assets/images/blog-1.jpg"
        },
        {
            title: "JavaScript 最佳实践",
            date: "2024-03-10",
            summary: "探讨JavaScript开发中的常见模式和最佳实践...",
            image: "assets/images/blog-2.jpg"
        },
        // 可以添加更多文章
    ];

    const postsGrid = document.querySelector('.posts-grid');
    posts.forEach(post => {
        const postElement = createPostCard(post);
        postsGrid.appendChild(postElement);
    });
}

function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'post-card fade-in';
    article.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
            <h3>${post.title}</h3>
            <p class="date">${post.date}</p>
            <p>${post.summary}</p>
        </div>
    `;
    return article;
}

// 加载技能展示
function loadSkills() {
    const skills = [
        { name: "前端开发", icon: "fa-code", description: "HTML5, CSS3, JavaScript" },
        { name: "后端开发", icon: "fa-server", description: "Node.js, Python, Java" },
        { name: "数据库", icon: "fa-database", description: "MySQL, MongoDB" },
        { name: "开发工具", icon: "fa-tools", description: "Git, Docker, VS Code" }
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach(skill => {
        const skillElement = createSkillCard(skill);
        skillsGrid.appendChild(skillElement);
    });
}

function createSkillCard(skill) {
    const div = document.createElement('div');
    div.className = 'skill-card fade-in';
    div.innerHTML = `
        <i class="fas ${skill.icon}"></i>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
    `;
    return div;
} 