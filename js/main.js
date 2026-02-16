// ============================================
// 网站核心功能 - main.js
// 包含：登录检查、文章加载、游戏加载、统计功能等
// ============================================

// ---------- 全局变量 ----------
// 从 localStorage 读取 GitHub Token
const GITHUB_TOKEN = localStorage.getItem('github_token') || '';

// ---------- 登录相关 ----------

/**
 * 检查用户是否已登录
 * @returns {boolean} 是否已登录且未过期
 */
function checkLogin() {
    const access = localStorage.getItem('site_access');
    const expire = localStorage.getItem('access_expire');
    
    // 如果未登录或已过期
    if (access !== 'granted' || !expire || Date.now() > parseInt(expire)) {
        localStorage.removeItem('site_access');
        localStorage.removeItem('access_expire');
        localStorage.removeItem('login_time');
        return false;
    }
    return true;
}

/**
 * 页面登录保护
 * 在需要登录的页面调用，未登录跳转到登录页
 */
function protectPage() {
    if (!checkLogin()) {
        window.location.href = '/taipingdiguo/login.html';
    }
}

/**
 * 退出登录
 */
function logout() {
    localStorage.removeItem('site_access');
    localStorage.removeItem('access_expire');
    localStorage.removeItem('login_time');
    window.location.href = '/taipingdiguo/login.html';
}

/**
 * 更新页面上的用户状态显示
 */
function updateUserStatus() {
    const userDiv = document.getElementById('userStatus');
    if (!userDiv) return;
    
    if (checkLogin()) {
        const loginTime = localStorage.getItem('login_time') || '未知';
        userDiv.innerHTML = `
            <span class="user-badge">已登录</span>
            <button onclick="logout()" class="btn-logout">退出</button>
        `;
    } else {
        userDiv.innerHTML = `<a href="/taipingdiguo/login.html" class="login-link">登录</a>`;
    }
}

// ---------- 文章相关 ----------

/**
 * 加载文章列表到首页
 */
async function loadArticles() {
    const articleList = document.getElementById('articleList');
    if (!articleList) return;
    
    try {
        // 调用 GitHub API 获取 Issues
        const response = await fetch(
            `https://api.github.com/repos/${CONFIG.github.username}/${CONFIG.github.repo}/issues?labels=post&state=open&sort=created&direction=desc`
        );
        
        if (!response.ok) {
            throw new Error('加载失败');
        }
        
        const articles = await response.json();
        
        if (articles.length === 0) {
            articleList.innerHTML = '<p class="empty-message">还没有文章，快来<a href="/taipingdiguo/submit.html">发布第一篇</a>吧！</p>';
            return;
        }
        
        // 生成文章列表HTML
        let html = '';
        articles.forEach(article => {
            // 从文章内容中提取第一张图片作为缩略图
            const imageMatch = article.body.match(/!\[.*?\]\((.*?)\)/);
            const thumbnail = imageMatch ? imageMatch[1] : null;
            
            // 提取纯文本预览（去掉Markdown图片语法）
            const preview = article.body
                .replace(/!\[.*?\]\(.*?\)/g, '[图片]')
                .replace(/[#*`>]/g, '')
                .substring(0, 120) + (article.body.length > 120 ? '...' : '');
            
            html += `
                <div class="article-card" onclick="location.href='/taipingdiguo/article.html?id=${article.number}'">
                    ${thumbnail ? `<div class="article-thumbnail"><img src="${thumbnail}" alt="缩略图" onerror="this.style.display='none'"></div>` : ''}
                    <div class="article-info">
                        <h3><a href="/taipingdiguo/article.html?id=${article.number}">${article.title}</a></h3>
                        <p class="article-preview">${preview}</p>
                        <div class="article-meta">
                            <span>👤 ${article.user.login}</span>
                            <span>📅 ${new Date(article.created_at).toLocaleDateString()}</span>
                            <span>💬 ${article.comments}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        articleList.innerHTML = html;
        
        // 更新文章总数统计
        const totalPostsEl = document.getElementById('totalPosts');
        if (totalPostsEl) {
            totalPostsEl.textContent = articles.length;
        }
        
    } catch (error) {
        console.error('加载文章失败:', error);
        if (articleList) {
            articleList.innerHTML = '<p class="error-message">加载失败，请刷新页面重试</p>';
        }
    }
}

// ---------- 游戏相关 ----------

/**
 * 加载游戏列表到侧边栏
 */
function loadGames() {
    const gameList = document.getElementById('gameList');
    if (!gameList) return;
    
    let html = '';
    
    // 遍历配置中的游戏
    CONFIG.games.forEach(game => {
        if (game.enabled) {
            html += `
                <div class="game-card">
                    <div class="game-icon">${game.thumbnail}</div>
                    <div class="game-info">
                        <h4>${game.name}</h4>
                        <p class="game-description">${game.description}</p>
                        <a href="${game.url}" target="_blank" class="btn-play" 
                           onclick="return confirm('即将跳转到游戏页面，确定吗？')">
                           开始游戏
                        </a>
                    </div>
                </div>
            `;
        }
    });
    
    gameList.innerHTML = html;
}

// ---------- 统计相关 ----------

/**
 * 计算网站上线天数
 */
async function calculateOnlineDays() {
    const daysEl = document.getElementById('onlineDays');
    if (!daysEl) return;
    
    try {
        const response = await fetch(
            `https://api.github.com/repos/${CONFIG.github.username}/${CONFIG.github.repo}`
        );
        const data = await response.json();
        
        const created = new Date(data.created_at);
        const today = new Date();
        const diffTime = Math.abs(today - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        daysEl.textContent = diffDays;
    } catch (error) {
        daysEl.textContent = '?';
    }
}

// ---------- 工具函数 ----------

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ 已复制到剪贴板');
    }).catch(() => {
        // 备用方法
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ 已复制到剪贴板');
    });
}

// ---------- 页面初始化 ----------
// 这个函数会在每个页面加载时调用
document.addEventListener('DOMContentLoaded', function() {
    // 更新用户状态
    updateUserStatus();
    
    // 根据不同页面加载不同内容
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/taipingdiguo/' || path === '/taipingdiguo') {
        // 首页：加载文章和游戏
        loadArticles();
        loadGames();
        calculateOnlineDays();
    }
    
    if (path.includes('article.html')) {
        // 文章详情页的加载在 article.html 里单独处理
    }
    
    if (path.includes('submit.html')) {
        // 投稿页需要检查登录
        protectPage();
    }
});

// 暴露全局函数
window.logout = logout;
window.copyToClipboard = copyToClipboard;
