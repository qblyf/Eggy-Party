# 🥚 Eggy Party - 蛋仔派对抽盲盒

一个有趣的蛋仔角色收集盲盒游戏，包含桌面版和小天才手表优化版。

## 🎮 两个版本

### 桌面版
- 适合电脑、平板、大屏手机
- 丰富的动画效果
- 双栏布局
- 📂 位置：根目录 `index.html`

### 小天才手表版 ⭐
- 专为小天才儿童手表优化
- PWA 支持，可安装到桌面
- 离线可用
- 适配小屏幕和圆形屏幕
- 📂 位置：`watch/` 目录

## 🚀 快速开始

### 桌面版
```bash
# 直接打开
open index.html

# 或启动服务器
python3 -m http.server 8080
```

### 小天才手表版
```bash
# 进入 watch 目录
cd watch

# 阅读快速开始指南
open START-HERE.md

# 本地测试
open test.html
```

## 📱 在小天才手表上使用

### 方法1：扫码打开（推荐）
1. 部署到 Vercel 或 GitHub Pages
2. 生成二维码
3. 手表扫一扫
4. 开始玩！

### 方法2：发送链接
1. 家长APP发送链接
2. 手表点击打开

### 方法3：添加到桌面
1. 首次打开后
2. 选择"添加到主屏幕"
3. 像APP一样使用

详细说明请查看：`watch/小天才使用指南.md`

## 🌐 在线演示

### GitHub Pages
部署后访问：`https://qblyf.github.io/Eggy-Party/`

**桌面版：** `https://qblyf.github.io/Eggy-Party/`  
**手表版：** `https://qblyf.github.io/Eggy-Party/watch/`

## 📦 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/qblyf/Eggy-Party)

1. 点击上方按钮
2. 登录 Vercel
3. 部署完成
4. 获得网址

详细步骤：`watch/DEPLOY.md`

## ✨ 特色功能

### 游戏功能
- 🎁 13个可爱蛋仔角色
- ⭐ 4种稀有度（普通/稀有/超稀有/传说）
- 💾 自动保存进度
- 📊 收藏系统和统计
- 🎯 完成度追踪

### 手表版特色
- ✅ 适配小屏幕（240-320px）
- ✅ 圆形屏幕优化
- ✅ PWA 支持
- ✅ 离线可用
- ✅ 可安装到桌面
- ✅ 性能优化

## 📚 文档

### 手表版文档
- [START-HERE.md](watch/START-HERE.md) - 快速开始
- [小天才使用指南.md](watch/小天才使用指南.md) - 如何在手表上打开
- [DEPLOY.md](watch/DEPLOY.md) - 部署教程
- [本地测试.md](watch/本地测试.md) - 测试指南
- [完成清单.md](watch/完成清单.md) - 检查清单

### 其他文档
- [小天才手表版说明.md](小天才手表版说明.md) - 版本对比
- [版本对比.txt](watch/版本对比.txt) - 详细对比

## 🛠️ 技术栈

- HTML5 + CSS3 + JavaScript
- PWA (Progressive Web App)
- Service Worker
- LocalStorage
- 响应式设计

## 📱 支持的设备

### 完美支持
- ✅ 小天才儿童手表
- ✅ 其他儿童手表
- ✅ 智能手表
- ✅ 手机浏览器
- ✅ 平板电脑
- ✅ 电脑浏览器

## 🎯 游戏说明

### 如何玩
1. 点击盲盒或按钮抽取蛋仔
2. 收集不同的蛋仔角色
3. 查看收藏和完成度
4. 目标：收集所有13个蛋仔

### 稀有度
- **普通** (60%) - 常见蛋仔
- **稀有** (30%) - 比较少见
- **超稀有** (9%) - 很难得到
- **传说** (1%) - 超级稀有的黄金蛋仔！

## 📂 项目结构

```
Eggy-Party/
├── 桌面版
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│
└── watch/                    # 小天才手表版
    ├── index.html
    ├── style.css
    ├── script.js
    ├── manifest.json
    ├── sw.js
    ├── test.html
    ├── check.html
    └── 📖 文档/
```

## 🔧 本地开发

```bash
# 克隆仓库
git clone https://github.com/qblyf/Eggy-Party.git
cd Eggy-Party

# 桌面版
open index.html

# 手表版
cd watch
open test.html

# 或启动服务器
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 📝 开发计划

- [ ] 添加更多蛋仔角色
- [ ] 增加音效
- [ ] 添加成就系统
- [ ] 支持多语言
- [ ] 添加分享功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

qblyf

## 🙏 致谢

感谢所有喜欢蛋仔派对的小朋友们！

---

**提示**: 
- 桌面版在根目录
- 手表版在 `watch/` 目录
- 推荐小天才手表用户使用手表版
- 详细文档请查看 `watch/START-HERE.md`

🥚 祝你玩得开心！✨
