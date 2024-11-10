export function initShare() {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'share-container';
    
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    shareContainer.innerHTML = `
        <h4 class="share-title">分享文章</h4>
        <div class="share-buttons">
            <a class="share-button" href="https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}" target="_blank" title="分享到 Twitter">
                <i class="fab fa-twitter"></i>
            </a>
            <a class="share-button" href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" title="分享到 Facebook">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a class="share-button" href="http://service.weibo.com/share/share.php?url=${currentUrl}&title=${title}" target="_blank" title="分享到微博">
                <i class="fab fa-weibo"></i>
            </a>
            <button class="share-button" onclick="copyLink()" title="复制链接">
                <i class="fas fa-link"></i>
            </button>
        </div>
    `;

    document.querySelector('.article-content').appendChild(shareContainer);
}

// 复制链接功能
window.copyLink = function() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert('链接已复制到剪贴板！'))
        .catch(err => console.error('复制失败：', err));
} 