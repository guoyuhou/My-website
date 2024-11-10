export function initTOC() {
    const articleContent = document.querySelector('.article-content');
    const headings = articleContent.querySelectorAll('h2, h3');
    
    if (headings.length === 0) return;

    // 创建目录容器
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc-container';
    tocContainer.innerHTML = `
        <h3 class="toc-title">目录</h3>
        <ul class="toc-list"></ul>
    `;

    const tocList = tocContainer.querySelector('.toc-list');

    // 生成目录项
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;

        const li = document.createElement('li');
        li.className = 'toc-item';
        li.innerHTML = `
            <a href="#${id}" class="toc-link">
                ${heading.textContent}
            </a>
        `;
        tocList.appendChild(li);
    });

    document.body.appendChild(tocContainer);

    // 监听滚动，高亮当前章节
    const tocLinks = tocContainer.querySelectorAll('.toc-link');
    
    window.addEventListener('scroll', () => {
        const fromTop = window.scrollY + 100;

        tocLinks.forEach(link => {
            const section = document.querySelector(link.hash);
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
} 