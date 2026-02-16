// ============================================
// 网站配置文件 - 太平地国
// ============================================

const CONFIG = {
    // 1. GitHub 仓库信息
    github: {
        username: 'ZGNhit',
        // 关键修正：必须写全名，否则投稿会报 404
        repo: 'taipingdiguo.github.io', 
    },

    // 2. 网站基本信息
    site: {
        title: '太平地国',
        subtitle: '神册残躯',
        description: '一群贵物罢了',
    },

    // 3. 游戏入口配置
    games: [
        {
            id: 1,
            name: 'Gal地国：神册物语',
            description: '一作',
            url: 'https://taipingdiguo.itch.io/galdg1',
            thumbnail: '🎮',
            enabled: true
        },
        {
            id: 2,
            name: 'Gal地国：杯与祭',
            description: '二作',
            url: 'https://taipingdiguo.itch.io/galdg2',
            thumbnail: '🎲',
            enabled: true
        }
    ],

    // 4. 关于页面内容
    about: {
        title: '关于本站',
        // 关键修正：使用了反引号 `` 确保支持多行文字，且必须在末尾闭合
        content: `欢迎来到太平地国。这里是分享游戏和贵物心得的地方。
        目前网站支持投稿和在线游玩。`,
        showOnMenu: true
    },

    // 5. 密码设置
    passwords: {
        expireDays: 365,
        // 下方会自动拼接完整 URL，此处留空即可
        fileUrl: '' 
    },

    // 6. 主题颜色
    theme: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#f5f5f5',
        text: '#333333'
    }
};

// 7. 自动生成路径 (这部分非常重要，main.js 依赖它读取密码文件)
CONFIG.passwords.fileUrl = `https://raw.githubusercontent.com/${CONFIG.github.username}/${CONFIG.github.repo}/main/data/passwords.json`;

// 确保在控制台能看到配置已加载（调试用）
console.log("CONFIG loaded successfully:", CONFIG);
