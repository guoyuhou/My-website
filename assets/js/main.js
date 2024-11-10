// 导入所需模块
import { initNavbar } from './components/navbar.js';
import { initTOC } from './components/toc.js';
import { initShare } from './components/share.js';

// 初始化函数
function init() {
    initNavbar();
    
    // 如果是文章页面，初始化文章相关功能
    if (document.querySelector('.article-content')) {
        initTOC();
        initShare();
    }
}

// 当 DOM 加载完成后执行初始化
document.addEventListener('DOMContentLoaded', init); 