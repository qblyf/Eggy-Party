# 图标制作指南

## 需要的图标

PWA 需要两个尺寸的图标：
- `icon-192.png` (192x192 像素)
- `icon-512.png` (512x512 像素)

## 快速制作方法

### 方法一：在线工具（推荐）

1. **访问 Favicon Generator**
   - 网址：https://realfavicongenerator.net/
   - 或：https://www.favicon-generator.org/

2. **上传图片**
   - 上传一张蛋仔图片或 emoji 截图
   - 建议使用正方形图片

3. **生成并下载**
   - 选择 Android Chrome 选项
   - 下载生成的图标
   - 重命名为 `icon-192.png` 和 `icon-512.png`

### 方法二：使用 Emoji

1. **截图 Emoji**
   - 在电脑上打开一个大号的 🥚 emoji
   - 截图保存

2. **调整尺寸**
   - 使用在线工具：https://www.iloveimg.com/resize-image
   - 分别调整为 192x192 和 512x512
   - 保存为 PNG 格式

### 方法三：使用设计工具

使用 Canva / Figma / Photoshop：
1. 创建 512x512 画布
2. 添加蛋仔相关图案
3. 导出为 PNG
4. 再创建 192x192 版本

## 临时方案

如果暂时没有图标，可以：

1. **使用纯色背景**
   - 创建一个渐变色正方形
   - 添加 🥚 emoji 文字
   - 导出为 PNG

2. **使用现有图片**
   - 从 `assets/images/` 选一张
   - 裁剪为正方形
   - 调整尺寸

## 放置位置

将生成的图标放在 `watch/` 目录下：
```
watch/
├── icon-192.png
├── icon-512.png
├── index.html
├── style.css
└── ...
```

## 测试图标

1. 部署网站后
2. 在手机浏览器打开
3. 点击"添加到主屏幕"
4. 查看图标是否正确显示
