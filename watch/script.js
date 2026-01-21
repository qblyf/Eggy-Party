class WatchBlindBox {
    constructor() {
        this.ponies = [
            // 普通 (60%)
            { id: 1, name: "快乐蛋仔", rarity: "common", emoji: "😊", image: "../assets/images/01.webp" },
            { id: 2, name: "彩虹蛋仔", rarity: "common", emoji: "🌈", image: "../assets/images/02.webp" },
            { id: 3, name: "星星蛋仔", rarity: "common", emoji: "⭐", image: "../assets/images/03.webp" },
            { id: 4, name: "爱心蛋仔", rarity: "common", emoji: "💖", image: "../assets/images/04.webp" },
            { id: 5, name: "花朵蛋仔", rarity: "common", emoji: "🌸", image: "../assets/images/05.webp" },
            { id: 6, name: "音符蛋仔", rarity: "common", emoji: "🎵", image: "../assets/images/06.webp" },
            
            // 稀有 (30%)
            { id: 7, name: "月亮蛋仔", rarity: "rare", emoji: "🌙", image: "../assets/images/11.webp" },
            { id: 8, name: "太阳蛋仔", rarity: "rare", emoji: "☀️", image: "../assets/images/12.webp" },
            { id: 9, name: "云朵蛋仔", rarity: "rare", emoji: "☁️", image: "../assets/images/13.webp" },
            { id: 10, name: "糖果蛋仔", rarity: "rare", emoji: "🍬", image: "../assets/images/14.webp" },
            
            // 超稀有 (9%)
            { id: 11, name: "派对蛋仔", rarity: "super-rare", emoji: "🎉", image: "../assets/images/21.webp" },
            { id: 12, name: "魔法蛋仔", rarity: "super-rare", emoji: "🪄", image: "../assets/images/22.webp" },
            
            // 传说 (1%)
            { id: 13, name: "黄金蛋仔", rarity: "legendary", emoji: "🥇", image: "../assets/images/161.webp" }
        ];

        this.gameData = this.loadData();
        this.isDrawing = false;
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        // 绑定元素
        this.blindBox = document.getElementById('blindBox');
        this.drawBtn = document.getElementById('drawBtn');
        this.collectionGrid = document.getElementById('collectionGrid');
        this.swipeContainer = document.getElementById('swipeContainer');
        
        // 弹窗元素
        this.resultModal = document.getElementById('resultModal');
        this.modalBackdrop = document.getElementById('modalBackdrop');
        this.modalContent = document.getElementById('modalContent');
        this.modalCloseBtn = document.getElementById('modalCloseBtn');
        this.resultImage = document.getElementById('resultImage');
        this.resultName = document.getElementById('resultName');
        this.resultRarity = document.getElementById('resultRarity');
        this.resultCount = document.getElementById('resultCount');
        this.resultStars = document.getElementById('resultStars');
        
        // 绑定事件
        this.drawBtn.addEventListener('click', () => this.draw());
        this.blindBox.addEventListener('click', () => this.draw());
        
        // 弹窗关闭事件
        if (this.modalCloseBtn) {
            this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.modalBackdrop) {
            this.modalBackdrop.addEventListener('click', () => this.closeModal());
        }
        
        // 筛选按钮
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.updateCollection();
            });
        });
        
        // 初始化滑动功能
        this.initSwipe();
        
        // 页面指示器点击
        document.querySelectorAll('.page-indicator .dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const page = parseInt(dot.dataset.page);
                this.switchPage(page);
            });
        });
        
        this.updateUI();
        
        // 注册 Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        }
    }

    initSwipe() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let currentPage = 0;
        
        this.swipeContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.swipeContainer.style.transition = 'none';
        });
        
        this.swipeContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            const currentTranslate = currentPage * -50;
            const newTranslate = currentTranslate + (diff / window.innerWidth * 50);
            
            // 限制滑动范围
            if (newTranslate > 0 || newTranslate < -50) return;
            
            this.swipeContainer.style.transform = `translateX(${newTranslate}%)`;
        });
        
        this.swipeContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = currentX - startX;
            const threshold = window.innerWidth * 0.3; // 30% 的屏幕宽度
            
            this.swipeContainer.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentPage === 1) {
                    // 向右滑，回到第一页
                    this.switchPage(0);
                } else if (diff < 0 && currentPage === 0) {
                    // 向左滑，到第二页
                    this.switchPage(1);
                } else {
                    // 回弹
                    this.switchPage(currentPage);
                }
            } else {
                // 回弹
                this.switchPage(currentPage);
            }
        });
        
        // 鼠标事件（用于电脑测试）
        let mouseDown = false;
        
        this.swipeContainer.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            mouseDown = true;
            this.swipeContainer.style.transition = 'none';
            e.preventDefault();
        });
        
        this.swipeContainer.addEventListener('mousemove', (e) => {
            if (!mouseDown) return;
            
            currentX = e.clientX;
            const diff = currentX - startX;
            const currentTranslate = currentPage * -50;
            const newTranslate = currentTranslate + (diff / window.innerWidth * 50);
            
            if (newTranslate > 0 || newTranslate < -50) return;
            
            this.swipeContainer.style.transform = `translateX(${newTranslate}%)`;
        });
        
        this.swipeContainer.addEventListener('mouseup', (e) => {
            if (!mouseDown) return;
            mouseDown = false;
            
            const diff = currentX - startX;
            const threshold = window.innerWidth * 0.3;
            
            this.swipeContainer.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentPage === 1) {
                    this.switchPage(0);
                } else if (diff < 0 && currentPage === 0) {
                    this.switchPage(1);
                } else {
                    this.switchPage(currentPage);
                }
            } else {
                this.switchPage(currentPage);
            }
        });
        
        this.swipeContainer.addEventListener('mouseleave', () => {
            if (mouseDown) {
                mouseDown = false;
                this.swipeContainer.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                this.switchPage(currentPage);
            }
        });
        
        // 保存当前页面
        this.getCurrentPage = () => currentPage;
        this.setCurrentPage = (page) => { currentPage = page; };
    }

    switchPage(page) {
        this.setCurrentPage(page);
        
        if (page === 0) {
            this.swipeContainer.classList.remove('show-collection');
        } else {
            this.swipeContainer.classList.add('show-collection');
        }
        
        // 更新指示器
        document.querySelectorAll('.page-indicator .dot').forEach((dot, index) => {
            if (index === page) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    loadData() {
        try {
            const saved = localStorage.getItem('watchBlindBox');
            return saved ? JSON.parse(saved) : { collection: {}, totalDraws: 0 };
        } catch {
            return { collection: {}, totalDraws: 0 };
        }
    }

    saveData() {
        try {
            localStorage.setItem('watchBlindBox', JSON.stringify(this.gameData));
        } catch {}
    }

    getRandomPony() {
        const rand = Math.random();
        const bonus = this.gameData.totalDraws > 50 ? 0.005 : 0;
        
        let rarity;
        if (rand < 0.01 + bonus) rarity = 'legendary';
        else if (rand < 0.10) rarity = 'super-rare';
        else if (rand < 0.40) rarity = 'rare';
        else rarity = 'common';
        
        const available = this.ponies.filter(p => p.rarity === rarity);
        return available[Math.floor(Math.random() * available.length)];
    }

    async draw() {
        if (this.isDrawing) return;
        
        this.isDrawing = true;
        this.drawBtn.disabled = true;
        this.drawBtn.innerHTML = '<span class="loading"></span>';
        
        // 动画
        this.blindBox.classList.add('opening');
        
        // 关闭之前的弹窗（如果有）
        if (this.resultModal) {
            this.resultModal.classList.remove('show');
        }
        
        await this.sleep(600);
        
        // 抽取
        const pony = this.getRandomPony();
        const isNew = !this.gameData.collection[pony.id];
        
        // 更新数据
        this.gameData.totalDraws++;
        if (!this.gameData.collection[pony.id]) {
            this.gameData.collection[pony.id] = { ...pony, count: 0 };
        }
        this.gameData.collection[pony.id].count++;
        this.saveData();
        
        // 显示结果
        this.showResult(pony, isNew);
        
        // 检查成就
        if (pony.rarity === 'legendary') {
            this.showAchievement('🏆 传说降临！');
        } else if (isNew) {
            this.showAchievement('✨ 新蛋仔！');
        }
        
        // 更新UI
        this.updateUI();
        
        // 重置
        setTimeout(() => {
            this.blindBox.classList.remove('opening');
            this.isDrawing = false;
            this.drawBtn.disabled = false;
            this.drawBtn.innerHTML = '<span class="btn-text">抽取盲盒</span>';
        }, 1500);
    }

    showResult(pony, isNew) {
        console.log('showResult called', pony.name, isNew);
        
        // 安全检查
        if (!this.modalContent) {
            console.error('Modal content not found');
            return;
        }
        
        // 获取弹窗卡片
        const modalCard = this.modalContent.querySelector('.modal-card');
        if (!modalCard) {
            console.error('Modal card not found');
            return;
        }
        
        console.log('Modal elements found, setting content...');
        
        // 清除之前的样式
        modalCard.className = 'modal-card';
        
        // 添加稀有度样式
        if (pony.rarity === 'legendary') {
            modalCard.classList.add('legendary');
        }
        
        // 设置图片或emoji
        if (pony.image) {
            this.resultImage.innerHTML = `<img src="${pony.image}" alt="${pony.name}" onerror="this.parentElement.textContent='${pony.emoji}'">`;
        } else {
            this.resultImage.textContent = pony.emoji;
        }
        
        this.resultName.textContent = pony.name;
        this.resultRarity.textContent = this.getRarityText(pony.rarity);
        this.resultRarity.className = `card-rarity rarity-${pony.rarity}`;
        this.resultCount.textContent = `拥有 ${this.gameData.collection[pony.id].count} 个`;
        
        // 设置星星
        if (this.resultStars) {
            this.resultStars.textContent = this.getStarRating(pony.rarity);
        }
        
        // 如果是新角色，添加特殊标识
        const existingBadge = modalCard.querySelector('.new-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        if (isNew) {
            const newBadge = document.createElement('div');
            newBadge.className = 'new-badge';
            newBadge.textContent = 'NEW!';
            modalCard.appendChild(newBadge);
        }
        
        // 显示弹窗
        if (this.resultModal) {
            console.log('Showing modal...');
            this.resultModal.classList.add('show');
            console.log('Modal classes:', this.resultModal.className);
        } else {
            console.error('resultModal not found');
        }
        
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
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

    closeModal() {
        if (this.resultModal) {
            this.resultModal.classList.remove('show');
        }
        document.body.style.overflow = '';
    }

    getRarityText(rarity) {
        const map = {
            'common': '普通',
            'rare': '稀有',
            'super-rare': '超稀有',
            'legendary': '传说'
        };
        return map[rarity] || rarity;
    }

    updateUI() {
        // 更新统计
        document.getElementById('drawCount').textContent = this.gameData.totalDraws;
        
        const collection = Object.values(this.gameData.collection);
        const totalCount = collection.reduce((sum, item) => sum + item.count, 0);
        const uniqueCount = collection.length;
        const completionRate = Math.round((uniqueCount / this.ponies.length) * 100);
        
        document.getElementById('totalUnique').textContent = uniqueCount;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
        
        // 更新收藏页面的统计
        const totalCollected2 = document.getElementById('totalCollected2');
        const totalUnique2 = document.getElementById('totalUnique2');
        const completionRate2 = document.getElementById('completionRate2');
        
        if (totalCollected2) totalCollected2.textContent = totalCount;
        if (totalUnique2) totalUnique2.textContent = uniqueCount;
        if (completionRate2) completionRate2.textContent = `${completionRate}%`;
        
        this.updateCollection();
    }

    updateCollection() {
        this.collectionGrid.innerHTML = '';
        
        const filtered = this.currentFilter === 'all' 
            ? this.ponies 
            : this.ponies.filter(p => p.rarity === this.currentFilter);
        
        filtered.forEach(pony => {
            const collected = this.gameData.collection[pony.id];
            const div = document.createElement('div');
            
            if (collected) {
                div.className = `collection-item rarity-${pony.rarity}`;
                
                let imageHtml = pony.emoji;
                if (pony.image) {
                    imageHtml = `<img src="${pony.image}" alt="${pony.name}" onerror="this.parentElement.textContent='${pony.emoji}'">`;
                }
                
                div.innerHTML = `
                    <div class="item-image">${imageHtml}</div>
                    <div class="item-name">${pony.name}</div>
                    <div class="item-count">×${collected.count}</div>
                `;
            } else {
                div.className = 'collection-item undiscovered';
                div.innerHTML = `
                    <div class="item-image">❓</div>
                    <div class="item-name">未发现</div>
                    <div class="item-count">?</div>
                `;
            }
            
            this.collectionGrid.appendChild(div);
        });
    }

    showAchievement(text) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement';
        achievement.textContent = text;
        document.body.appendChild(achievement);
        setTimeout(() => achievement.remove(), 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.game = new WatchBlindBox();
});
