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
async function loadRecentPosts() {
    const postManager = new PostManager();
    await postManager.init();
    const recentPosts = await postManager.getRecentPosts(3); // 获取最新的3篇文章
    
    const postsGrid = document.querySelector('.posts-grid');
    if (postsGrid) {
        postsGrid.innerHTML = recentPosts.map(post => `
            <article class="post-card fade-in">
                <a href="/posts/detail.html?id=${post.id}">
                    <img src="${post.cover}" alt="${post.title}">
                    <div class="post-content">
                        <h3>${post.title}</h3>
                        <p class="date">${post.date}</p>
                        <p>${post.summary}</p>
                    </div>
                </a>
            </article>
        `).join('');
    }
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