const CONFIG = {
    // 1. GitHub 仓库信息
    github: {
        username: 'ZGNhit',
        repo: 'taipingdiguo', 
    },

    submission: {
        part1: 'Z2hwX296WEp0WWpZNXRuVHJ', 
        part2: 'CT2o1QXZCNjF2UDFMWHZXejFhMndtSg==', 
        enabled: true
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
        content: '欢迎来到太平地国。这里是分享游戏和贵物心得的地方。',
        showOnMenu: true
    },

    // 5. 密码设置
    passwords: {
        expireDays: 365,
        fileUrl: 'https://raw.githubusercontent.com/ZGNhit/taipingdiguo/main/data/passwords.json'
    },

    // 6. 主题颜色
    theme: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#f5f5f5',
        text: '#333333'
    }
};

// 保持变量一致性
console.log("CONFIG 加载成功，当前密码路径:", CONFIG.passwords.fileUrl);




