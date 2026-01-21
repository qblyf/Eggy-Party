# 小马宝莉真实图片配置指南

## 图片资源获取

你可以从以下合法渠道获取小马宝莉角色图片：

### 官方渠道
- [Hasbro官方网站](https://www.hasbro.com)
- [小马宝莉官方粉丝网站](https://www.hasbro.com/my-little-pony)
- Discovery Family频道官方资源

### 免费图片资源
- [Unsplash](https://unsplash.com) - 搜索 "My Little Pony"
- [Pixabay](https://pixabay.com) - 搜索相关关键词
- [Pexels](https://pexels.com) - 免费高清图片

## 图片要求

### 尺寸规格
- **卡片图片**: 400x400px (正方形)
- **角色图片**: 800x600px (4:3比例)
- **背景图片**: 1920x1080px

### 格式要求
- **格式**: JPG, PNG, WebP
- **质量**: 高清，300dpi以上
- **背景**: 透明或纯色背景为佳

## 主要角色列表

### Mane Six (主角六马)
1. **Twilight Sparkle** (紫罗兰色天角兽)
2. **Rainbow Dash** (天蓝色飞马)
3. **Pinkie Pie** (粉色陆马)
4. **Applejack** (橙色陆马)
5. **Fluttershy** (黄色飞马)
6. **Rarity** (白色独角兽)

### 其他重要角色
- **Spike** (紫色小龙)
- **Princess Celestia** (白天公主)
- **Princess Luna** (黑夜公主)
- **Princess Cadance** (爱心公主)
- **Starlight Glimmer** (星光闪亮)
- **Sunset Shimmer** (日落微光)

## 配置方法

### 1. 创建图片目录结构
```
assets/
├── images/
│   ├── common/
│   │   ├── rainbow-dash.png
│   │   ├── pinkie-pie.png
│   │   └── ...
│   ├── rare/
│   │   ├── starlight-glimmer.png
│   │   └── ...
│   ├── super-rare/
│   │   ├── twilight-sparkle.png
│   │   └── ...
│   └── legendary/
│       └── friendship-magic.png
└── backgrounds/
    ├── ponyville.jpg
    └── equestria.jpg
```

### 2. 更新JavaScript配置
在script.js中更新角色数据：

```javascript
this.ponies = [
    {
        id: 1,
        name: "Rainbow Dash",
        rarity: "common",
        emoji: "🌈",
        color: "#87CEEB",
        image: "assets/images/common/rainbow-dash.png",
        description: "速度飞快的彩虹小马"
    },
    {
        id: 11,
        name: "Twilight Sparkle",
        rarity: "super-rare",
        emoji: "🦄",
        color: "#9370DB",
        image: "assets/images/super-rare/twilight-sparkle.png",
        description: "智慧与魔法的天角兽"
    }
    // ...更多角色
];
```

### 3. 更新CSS显示样式
在style.css中修改：

```css
.mlp-card-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.mlp-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}
```

### 4. 更新显示函数
在showResult函数中：

```javascript
showResult(pony, isNew = false) {
    // 如果有真实图片，使用图片
    if (pony.image) {
        this.resultImage.innerHTML = `<img src="${pony.image}" alt="${pony.name}">`;
    } else {
        // 否则使用emoji
        this.resultImage.textContent = pony.emoji;
    }
    // ...其他代码
}
```

## 版权提醒

- 仅用于个人学习和非商业用途
- 遵循相关图片的版权协议
- 商业使用需要获得Hasbro官方授权
- 建议使用官方提供的免费资源

## 优化建议

1. **图片压缩**: 使用TinyPNG等工具压缩图片大小
2. **懒加载**: 大量图片时使用懒加载技术
3. **CDN加速**: 使用CDN加速图片加载
4. **响应式**: 根据设备屏幕大小提供不同尺寸的图片