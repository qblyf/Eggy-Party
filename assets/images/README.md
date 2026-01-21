# 小马宝莉卡片图片索引

## 已创建的SVG卡片图片

### 普通角色 (Common)
1. **Sparkle Hooves** - `common/sparkle-hooves.svg`
   - 主题：闪亮蹄子的可爱小马
   - 颜色：粉色系

2. **Rainbow Dash** - `common/rainbow-dash.svg`
   - 主题：速度飞快的彩虹小马
   - 特征：彩虹鬃毛、闪电标记、翅膀

3. **Pinkie Pie** - `common/pinkie-pie.svg`
   - 主题：热爱派对的欢乐小马
   - 特征：粉色身体、气球装饰

4. **Applejack** - `common/applejack.svg`
   - 主题：诚实可靠的农场小马
   - 特征：牛仔帽、苹果cutie mark

5. **Fluttershy** - `common/fluttershy.svg`
   - 主题：温柔善良的动物朋友
   - 特征：粉色长鬃毛、蝴蝶cutie mark、小鸟朋友

6. **Rarity** - `common/rarity.svg`
   - 主题：追求完美的时尚达人
   - 特征：独角、紫色鬃毛、钻石cutie mark

### 稀有角色 (Rare)
1. **Starlight Glimmer** - `rare/starlight-glimmer.svg`
   - 主题：掌握星光魔法的神秘小马
   - 特征：独角、星光特效、平衡的星星cutie mark

2. **Princess Luna** - `rare/princess-luna.svg`
   - 主题：守护夜晚的月亮公主
   - 特征：深蓝色身体、翅膀、月亮标记、夜空星星

### 超稀有角色 (Super Rare)
1. **Twilight Sparkle** - `super-rare/twilight-sparkle.svg`
   - 主题：智慧与魔法的天角兽
   - 特征：紫色身体、金色独角、翅膀、魔法星星cutie mark

2. **Princess Celestia** - `super-rare/princess-celestia.svg`
   - 主题：太阳的守护者，万马之主
   - 特征：白色身体、金色鬃毛、翅膀、太阳cutie mark、皇冠

### 传说角色 (Legendary)
1. **Friendship Magic** - `legendary/friendship-magic.svg`
   - 主题：友谊的终极魔法，传说级存在
   - 特征：魔法核心、六个主要小马的连接、彩虹光环、脉动效果

## 技术说明

### 图片格式
- 所有图片均为 **SVG** 格式
- 分辨率：400x600px（标准卡片尺寸）
- 支持无损缩放
- 包含渐变、阴影等视觉效果

### 设计特点
1. **统一风格**：所有卡片保持一致的My Little Pony风格
2. **稀有度区分**：不同稀有度有独特的配色方案
3. **角色特征**：每个角色都有其标志性的特征和cutie mark
4. **专业布局**：包含标题栏、角色图片、名称、稀有度信息

### 特殊效果
- **传说卡片**：包含动画效果、脉动光晕、旋转光环
- **稀有卡片**：添加了星光、月亮等魔法元素
- **超稀有卡片**：金色独角、皇家装饰、魔法粒子

## 文件结构
```
assets/images/
├── README.md                 # 本文件
├── preview.html             # 图片预览工具
├── common/                  # 普通角色
│   ├── sparkle-hooves.svg
│   ├── rainbow-dash.svg
│   ├── pinkie-pie.svg
│   ├── applejack.svg
│   ├── fluttershy.svg
│   └── rarity.svg
├── rare/                    # 稀有角色
│   ├── starlight-glimmer.svg
│   └── princess-luna.svg
├── super-rare/              # 超稀有角色
│   ├── twilight-sparkle.svg
│   └── princess-celestia.svg
└── legendary/               # 传说角色
    └── friendship-magic.svg
```

## 使用方法

### 在游戏中使用
图片已自动配置在游戏的JavaScript代码中，无需额外配置。游戏会自动加载对应的图片。

### 预览效果
打开 `preview.html` 文件可以预览所有已创建的卡片图片和加载状态。

### 自定义修改
- 所有SVG图片都是文本格式，可以直接用文本编辑器修改
- 可以调整颜色、添加细节、修改布局
- 保持400x600px的尺寸比例以获得最佳显示效果

## 备注
- 部分角色（如Sunset Shimmer、Princess Cadance）暂未创建，使用emoji作为fallback
- 所有图片都是原创SVG设计，不涉及版权问题
- 可以根据需要继续添加更多角色或更新现有设计