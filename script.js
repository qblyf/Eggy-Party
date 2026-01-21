class BlindBoxGame {
    constructor() {
        this.ponies = [
            // 普通角色 (60%)
            {
                id: 1,
                name: "快乐蛋仔",
                rarity: "common",
                emoji: "😊",
                color: "#FFD700",
                image: "assets/images/01.webp",
                description: "永远开心的蛋仔，带来欢乐"
            },
            {
                id: 2,
                name: "彩虹蛋仔",
                rarity: "common",
                emoji: "🌈",
                color: "#FF6B9D",
                image: "assets/images/02.webp",
                description: "五彩斑斓的蛋仔，充满活力"
            },
            {
                id: 3,
                name: "星星蛋仔",
                rarity: "common",
                emoji: "⭐",
                color: "#87CEEB",
                image: "assets/images/03.webp",
                description: "闪闪发光的蛋仔，充满梦想"
            },
            {
                id: 4,
                name: "爱心蛋仔",
                rarity: "common",
                emoji: "💖",
                color: "#FF69B4",
                image: "assets/images/04.webp",
                description: "充满爱心的蛋仔，温暖可爱"
            },
            {
                id: 5,
                name: "花朵蛋仔",
                rarity: "common",
                emoji: "🌸",
                color: "#FFA07A",
                image: "assets/images/05.webp",
                description: "像花儿一样美丽的蛋仔"
            },
            {
                id: 6,
                name: "音符蛋仔",
                rarity: "common",
                emoji: "🎵",
                color: "#DDA0DD",
                image: "assets/images/06.webp",
                description: "热爱音乐的蛋仔，节奏大师"
            },

            // 稀有角色 (30%)
            {
                id: 7,
                name: "月亮蛋仔",
                rarity: "rare",
                emoji: "🌙",
                color: "#B0C4DE",
                image: "assets/images/11.webp",
                description: "安静的月亮蛋仔，夜晚的守护者"
            },
            {
                id: 8,
                name: "太阳蛋仔",
                rarity: "rare",
                emoji: "☀️",
                color: "#FFD700",
                image: "assets/images/12.webp",
                description: "阳光灿烂的蛋仔，充满正能量"
            },
            {
                id: 9,
                name: "云朵蛋仔",
                rarity: "rare",
                emoji: "☁️",
                color: "#F0F8FF",
                image: "assets/images/13.webp",
                description: "轻飘飘的云朵蛋仔，自由自在"
            },
            {
                id: 10,
                name: "糖果蛋仔",
                rarity: "rare",
                emoji: "🍬",
                color: "#FFB6C1",
                image: "assets/images/14.webp",
                description: "甜蜜的糖果蛋仔，带来好心情"
            },

            // 超稀有角色 (9%)
            {
                id: 11,
                name: "派对蛋仔",
                rarity: "super-rare",
                emoji: "🎉",
                color: "#FF6B9D",
                image: "assets/images/21.webp",
                description: "派对之王蛋仔，欢乐无限"
            },
            {
                id: 12,
                name: "魔法蛋仔",
                rarity: "super-rare",
                emoji: "🪄",
                color: "#9370DB",
                image: "assets/images/22.webp",
                description: "拥有神秘力量的魔法蛋仔"
            },

            // 传说角色 (1%)
            {
                id: 13,
                name: "黄金蛋仔",
                rarity: "legendary",
                emoji: "🥇",
                color: "linear-gradient(45deg, #FFD700, #FFA500)",
                image: "assets/images/161.webp",
                description: "传说中的黄金蛋仔，稀有至极"
            }
        ];

        this.gameData = this.loadGameData();
        this.isDrawing = false;
        this.currentFilter = 'all';

        this.initializeElements();
        this.bindEvents();
        this.initializeParticles();
        this.updateUI();
    }

    initializeElements() {
        // 盲盒元素
        this.blindBox = document.getElementById('blindBox');
        this.drawBtn = document.getElementById('drawBtn');
        this.drawCount = document.getElementById('drawCount');

        // 结果展示元素
        this.resultDisplay = document.getElementById('resultDisplay');
        this.resultCard = document.getElementById('resultCard');
        this.resultImage = document.getElementById('resultImage');
        this.resultName = document.getElementById('resultName');
        this.resultRarity = document.getElementById('resultRarity');
        this.resultDescription = document.getElementById('resultDescription');
        this.resultStars = document.getElementById('resultStars');

        // 收藏展示元素
        this.collectionGrid = document.getElementById('collectionGrid');
        this.totalCollected = document.getElementById('totalCollected');
        this.totalUnique = document.getElementById('totalUnique');
        this.completionRate = document.getElementById('completionRate');
        this.progressFill = document.getElementById('progressFill');

        // 其他元素
        this.luckyValue = document.getElementById('luckyValue');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        // 盲盒点击事件
        this.drawBtn.addEventListener('click', () => this.drawBlindBox());
        this.blindBox.addEventListener('click', () => this.drawBlindBox());

        // 筛选按钮事件
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filterCollection(btn.dataset.filter));
        });

        // 盲盒悬停效果
        this.blindBox.addEventListener('mouseenter', () => {
            if (!this.isDrawing) {
                this.createFloatingParticles(this.blindBox);
            }
        });

        // 添加键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isDrawing) {
                e.preventDefault();
                this.drawBlindBox();
            }
        });
    }

    initializeParticles() {
        this.createBackgroundParticles();
        this.createFloatingTexts();
    }

    createBackgroundParticles() {
        const particlesBg = document.getElementById('particlesBg');
        if (!particlesBg) return;

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
                particle.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 1.5 + 0.5}rem;
                    opacity: ${Math.random() * 0.6 + 0.2};
                    animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 5}s;
                    pointer-events: none;
                `;
                particlesBg.appendChild(particle);
            }, i * 200);
        }
    }

    createFloatingTexts() {
        const texts = ['魔法', '友谊', '彩虹', '梦想', '希望', '勇气'];
        const container = document.body;

        setInterval(() => {
            if (Math.random() < 0.3) {
                const text = document.createElement('div');
                text.textContent = texts[Math.floor(Math.random() * texts.length)];
                text.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 80 + 10}%;
                    top: 100%;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1.2rem;
                    font-weight: 600;
                    pointer-events: none;
                    z-index: 0;
                    animation: floatUp 8s ease-out forwards;
                `;
                container.appendChild(text);

                setTimeout(() => text.remove(), 8000);
            }
        }, 3000);
    }

    createFloatingParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const emoji = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
            particle.textContent = emoji;

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 3;

            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 1000;
                animation: particleFloat 2s ease-out forwards;
            `;

            document.body.appendChild(particle);

            // 动画移动
            setTimeout(() => {
                particle.style.transform = `translate(${Math.cos(angle) * velocity * 50}px, ${Math.sin(angle) * velocity * 50 - 50}px)`;
                particle.style.opacity = '0';
            }, 10);

            setTimeout(() => particle.remove(), 2000);
        }
    }

    filterCollection(filter) {
        this.currentFilter = filter;

        // 更新按钮状态
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.updateCollectionDisplay();
    }

    loadGameData() {
        const savedData = localStorage.getItem('blindBoxGameData');
        if (savedData) {
            return JSON.parse(savedData);
        }

        return {
            collection: {},
            totalDraws: 0,
            lastDraw: null,
            achievements: []
        };
    }

    saveGameData() {
        localStorage.setItem('blindBoxGameData', JSON.stringify(this.gameData));
    }

    getRandomPony() {
        const random = Math.random();
        let rarity;

        // 调整概率，增加一些运气成分
        const luckyBonus = this.calculateLuckyBonus();

        if (random < 0.01 + luckyBonus.legendary) {
            rarity = 'legendary';
        } else if (random < 0.10 + luckyBonus.superRare) {
            rarity = 'super-rare';
        } else if (random < 0.40 + luckyBonus.rare) {
            rarity = 'rare';
        } else {
            rarity = 'common';
        }

        const availablePonies = this.ponies.filter(pony => pony.rarity === rarity);
        return availablePonies[Math.floor(Math.random() * availablePonies.length)];
    }

    calculateLuckyBonus() {
        const drawCount = this.gameData.totalDraws;
        const uniqueCount = Object.keys(this.gameData.collection).length;

        return {
            legendary: drawCount > 50 ? 0.005 : 0,
            superRare: uniqueCount > 8 ? 0.02 : 0.01,
            rare: drawCount > 20 ? 0.05 : 0
        };
    }

    calculateLuckyValue() {
        const drawCount = this.gameData.totalDraws;
        const uniqueCount = Object.keys(this.gameData.collection).length;

        if (drawCount < 10) return '新手';
        if (drawCount < 30) return '探索者';
        if (drawCount < 50) return '收藏家';
        if (uniqueCount >= 10) return '大师';
        if (uniqueCount >= 12) return '传奇';
        return '幸运星';
    }

    async drawBlindBox() {
        if (this.isDrawing) return;

        this.isDrawing = true;
        this.drawBtn.disabled = true;

        // 添加开箱动画
        this.blindBox.classList.add('opening');
        this.resultCard.classList.remove('show');
        this.createFloatingParticles(this.blindBox);

        // 模拟开箱过程
        await this.sleep(800);

        // 添加期待感动画
        this.addSuspenseAnimation();
        await this.sleep(700);

        // 获取随机角色
        const pony = this.getRandomPony();
        const isNew = !this.gameData.collection[pony.id];

        // 更新游戏数据
        this.gameData.totalDraws++;
        if (!this.gameData.collection[pony.id]) {
            this.gameData.collection[pony.id] = {
                ...pony,
                count: 0
            };
        }
        this.gameData.collection[pony.id].count++;
        this.gameData.lastDraw = pony;

        // 检查成就
        this.checkAchievements(pony, isNew);

        // 保存数据
        this.saveGameData();

        // 显示结果
        this.showResult(pony, isNew);

        // 更新UI
        this.updateUI();

        // 特殊效果
        if (pony.rarity === 'legendary') {
            this.createSpecialEffect('legendary');
        } else if (isNew) {
            this.createSpecialEffect('new');
        }

        // 重置状态
        setTimeout(() => {
            this.blindBox.classList.remove('opening');
            this.isDrawing = false;
            this.drawBtn.disabled = false;
        }, 2000);
    }

    addSuspenseAnimation() {
        const dots = ['⬛', '⬛', '⬛'];
        let currentDot = 0;

        const interval = setInterval(() => {
            currentDot = (currentDot + 1) % 3;
            this.resultImage.textContent = dots[currentDot];
        }, 200);

        setTimeout(() => clearInterval(interval), 600);
    }

    showResult(pony, isNew = false) {
        // 清除之前的稀有度样式
        this.resultCard.className = 'mlp-card result-card';

        // 添加稀有度样式
        this.resultCard.classList.add(`rarity-${pony.rarity}-card`);

        // 设置卡片内容 - 支持真实图片
        if (pony.image) {
            this.resultImage.innerHTML = `<img src="${pony.image}" alt="${pony.name}" onerror="this.style.display='none'; this.parentElement.textContent='${pony.emoji}';">`;
        } else {
            this.resultImage.textContent = pony.emoji;
        }
        this.resultImage.style.background = 'transparent';
        this.resultName.textContent = pony.name;
        this.resultRarity.textContent = this.getRarityText(pony.rarity);
        this.resultDescription.textContent = pony.description;

        // 添加星星评级
        this.resultStars.textContent = this.getStarRating(pony.rarity);

        // 如果是新角色，添加特殊标识
        if (isNew) {
            const newBadge = document.createElement('div');
            newBadge.textContent = 'NEW!';
            newBadge.style.cssText = `
                position: absolute;
                top: -10px;
                left: -10px;
                background: #4CAF50;
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
                z-index: 100;
                animation: newBadgeBounce 1s ease-out;
            `;
            this.resultCard.appendChild(newBadge);

            setTimeout(() => newBadge.remove(), 3000);
        }

        // 显示卡片
        this.resultCard.classList.add('show');
    }

    getStarRating(rarity) {
        const ratings = {
            'common': '⭐',
            'rare': '⭐⭐',
            'super-rare': '⭐⭐⭐',
            'legendary': '⭐⭐⭐⭐'
        };
        return ratings[rarity] || '⭐';
    }

    createSpecialEffect(type) {
        const colors = {
            new: ['#4CAF50', '#8BC34A', '#CDDC39'],
            legendary: ['#FFD700', '#FFA500', '#FF6347']
        };

        const selectedColors = colors[type] || colors.new;
        const effectCount = type === 'legendary' ? 20 : 10;

        for (let i = 0; i < effectCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const color = selectedColors[Math.floor(Math.random() * selectedColors.length)];

                particle.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    width: 8px;
                    height: 8px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    box-shadow: 0 0 10px ${color};
                `;

                document.body.appendChild(particle);

                const angle = (Math.PI * 2 * i) / effectCount;
                const velocity = 5 + Math.random() * 5;

                setTimeout(() => {
                    particle.style.transform = `translate(${Math.cos(angle) * velocity * 100}px, ${Math.sin(angle) * velocity * 100}px)`;
                    particle.style.opacity = '0';
                }, 10);

                setTimeout(() => particle.remove(), 1500);
            }, i * 50);
        }
    }

    checkAchievements(pony, isNew) {
        const achievements = [];
        const totalDraws = this.gameData.totalDraws;
        const uniqueCount = Object.keys(this.gameData.collection).length;

        if (totalDraws === 1) {
            achievements.push('第一次抽卡');
        }
        if (totalDraws === 10) {
            achievements.push('初级收藏家 - 抽取10次');
        }
        if (totalDraws === 50) {
            achievements.push('资深收藏家 - 抽取50次');
        }
        if (isNew && uniqueCount === this.ponies.length) {
            achievements.push('完全收藏 - 收集所有角色！');
        }
        if (pony.rarity === 'legendary') {
            achievements.push('传说降临 - 获得传说角色！');
        }

        achievements.forEach(achievement => {
            this.showAchievement(achievement);
        });
    }

    showAchievement(text) {
        const achievement = document.createElement('div');
        achievement.textContent = `🏆 ${text}`;
        achievement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.5);
            z-index: 1000;
            animation: achievementSlide 3s ease-out forwards;
        `;

        document.body.appendChild(achievement);
        setTimeout(() => achievement.remove(), 3000);
    }

    getRarityText(rarity) {
        const rarityMap = {
            'common': '普通',
            'rare': '稀有',
            'super-rare': '超稀有',
            'legendary': '传说'
        };
        return rarityMap[rarity] || rarity;
    }

    updateUI() {
        // 更新抽取次数和幸运值
        this.drawCount.textContent = this.gameData.totalDraws;
        this.luckyValue.textContent = this.calculateLuckyValue();

        // 更新统计信息
        const collection = Object.values(this.gameData.collection);
        const totalCount = collection.reduce((sum, item) => sum + item.count, 0);
        const uniqueCount = collection.length;
        const completionRate = Math.round((uniqueCount / this.ponies.length) * 100);

        this.totalCollected.textContent = totalCount;
        this.totalUnique.textContent = uniqueCount;
        this.completionRate.textContent = `${completionRate}%`;
        this.progressFill.style.width = `${completionRate}%`;

        // 更新收藏展示
        this.updateCollectionDisplay();
    }

    updateCollectionDisplay() {
        this.collectionGrid.innerHTML = '';

        const filteredPonies = this.currentFilter === 'all'
            ? this.ponies
            : this.ponies.filter(pony => pony.rarity === this.currentFilter);

        filteredPonies.forEach(pony => {
            const collected = this.gameData.collection[pony.id];
            const div = document.createElement('div');
            div.className = 'mlp-card collection-item';

            if (collected) {
                // 添加稀有度样式
                div.classList.add(`rarity-${pony.rarity}-card`);

                // 支持真实图片，如果图片加载失败则回退到emoji
                let imageContent = pony.emoji;
                if (pony.image) {
                    imageContent = `<img src="${pony.image}" alt="${pony.name}" onerror="this.style.display='none'; this.parentElement.textContent='${pony.emoji}';">`;
                }

                div.innerHTML = `
                    <div class="mlp-card-header">Eggy Party</div>
                    <div class="mlp-card-image">${imageContent}</div>
                    <div class="mlp-card-name">${pony.name}</div>
                    <div class="mlp-card-rarity">${this.getRarityText(pony.rarity)} ×${collected.count}</div>
                `;

                // 添加点击事件显示详情
                div.addEventListener('click', () => this.showPonyDetails(collected));
            } else {
                // 未发现的卡片样式
                div.className = 'mlp-card collection-item undiscovered-card';
                div.innerHTML = `
                    <div class="mlp-card-header">???</div>
                    <div class="mlp-card-image">❓</div>
                    <div class="mlp-card-name">未发现</div>
                    <div class="mlp-card-rarity">?</div>
                `;
                div.style.opacity = '0.6';
                div.style.filter = 'grayscale(100%)';
            }

            this.collectionGrid.appendChild(div);
        });
    }

    showPonyDetails(pony) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            text-align: center;
            max-width: 300px;
            animation: modalAppear 0.3s ease-out;
        `;

        modal.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 20px;">${pony.emoji}</div>
            <h3 style="color: #333; margin-bottom: 10px;">${pony.name}</h3>
            <p style="color: ${this.getRarityColor(pony.rarity)}; font-weight: bold; margin-bottom: 15px;">
                ${this.getRarityText(pony.rarity)}
            </p>
            <p style="color: #666; margin-bottom: 20px;">${pony.description}</p>
            <p style="color: #999; margin-bottom: 20px;">拥有数量：${pony.count}</p>
            <button onclick="this.parentElement.remove()" style="
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-weight: bold;
            ">关闭</button>
        `;

        document.body.appendChild(modal);

        // 点击背景关闭
        setTimeout(() => {
            const backdrop = document.createElement('div');
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1999;
            `;
            backdrop.onclick = () => {
                backdrop.remove();
                modal.remove();
            };
            document.body.appendChild(backdrop);
        }, 100);
    }

    getRarityColor(rarity) {
        const colors = {
            'common': '#95a5a6',
            'rare': '#3498db',
            'super-rare': '#9b59b6',
            'legendary': '#f39c12'
        };
        return colors[rarity] || '#333';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    resetGame() {
        if (confirm('确定要重置游戏吗？所有收集进度将会丢失！')) {
            this.gameData = {
                collection: {},
                totalDraws: 0,
                lastDraw: null,
                achievements: []
            };
            this.saveGameData();
            this.updateUI();
            this.resultCard.classList.remove('show');
        }
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.game = new BlindBoxGame();

    // 添加调试用的重置按钮（可选）
    if (window.location.search.includes('debug=true')) {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '重置游戏';
        resetBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: red;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
        `;
        resetBtn.onclick = () => window.game.resetGame();
        document.body.appendChild(resetBtn);
    }
});

// 添加额外的CSS动画
const additionalCSS = `
@keyframes floatUp {
    0% { transform: translateY(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh); opacity: 0; }
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes particleFloat {
    0% { opacity: 1; transform: scale(1) translate(0, 0); }
    100% { opacity: 0; transform: scale(0.5) translate(var(--tx, 0), var(--ty, -100px)); }
}

@keyframes achievementSlide {
    0% { transform: translateX(400px); opacity: 0; }
    20% { transform: translateX(0); opacity: 1; }
    80% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(400px); opacity: 0; }
}

@keyframes modalAppear {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

@keyframes newBadgeBounce {
    0% { transform: scale(0) rotate(-45deg); }
    50% { transform: scale(1.2) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); }
}
`;

// 动态添加CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);