// ============================================
// 网站配置文件
// 修改这里的内容就能改变整个网站
// ============================================

const CONFIG = {
    // GitHub 仓库信息（必填）
    github: {
        username: 'ZGNhit',           // GitHub 用户名
        repo: 'taipingdiguo',               // 仓库名称
    },

    // 网站基本信息（按需修改）
    site: {
        title: '太平地国',              // 网站标题
        subtitle: '神册残躯',       // 网站副标题
        description: '一群贵物罢了',   // 网站描述
    },

    // 游戏入口配置（在这里增加/修改游戏）
    games: [
        {
            id: 1,
            name: 'Gal地国：神册物语',              // 游戏名称
            description: '一作',  // 游戏简介
            url: 'https://taipingdiguo.itch.io/galdg1',  // 游戏跳转链接
            thumbnail: '🎮',                  // 图标
            enabled: true                     // 是否启用
        },
        {
            id: 2,
            name: 'Gal地国：杯与祭',
            description: '二作',
            url: 'https://taipingdiguo.itch.io/galdg2',
            thumbnail: '🎲',
            enabled: true
        },
        // {
        //     id: 3,
        //     name: '新游戏',
        //     description: '新游戏简介',
        //     url: 'https://itch.io/embed/3',
        //     thumbnail: '🕹️',
        //     enabled: true
        // }
    ],

    // 关于页面内容
    about: {
        title: '关于本站',           // 关于页面标题
        content: `                  // 关于页面内容
            
        showOnMenu: true            // 是否在菜单显示
    },

    // 密码设置（登录验证用）
    passwords: {
        fileUrl: 'https://raw.githubusercontent.com/ZGNhit/taipingdiguo/main/data/passwords.json',  // 密码文件地址
        expireDays: 365               // 登录有效期（天）
    },

    // 主题颜色（可以随意修改）
    theme: {
        primary: '#667eea',          // 主色调
        secondary: '#764ba2',        // 辅助色
        background: '#f5f5f5',       // 背景色
        text: '#333333'              // 文字颜色
    }
};

// 自动生成密码文件的完整URL（不用改）

CONFIG.passwords.fileUrl = `https://raw.githubusercontent.com/${CONFIG.github.username}/${CONFIG.github.repo}/main/data/passwords.json`;

