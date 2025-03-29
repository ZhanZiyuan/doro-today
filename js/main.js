document.addEventListener('DOMContentLoaded', () => {
    // Function to insert content into the HTML
    function insertContent(config) {
        document.title = config.title;
        document.getElementById('pageTitle').textContent = config.title;
        document.getElementById('drawBtn').textContent = config.buttons.draw;
        document.getElementById('saveBtn').textContent = config.buttons.save;
        document.getElementById('allEndingsBtn').textContent = config.buttons.allEndings;
        document.getElementById('defaultMessage').textContent = config.messages.default;
        document.getElementById('saveMessage').textContent = config.messages.save;

        const footerText = `
            ${config.footer.copyright}
            </br>${config.footer.design}<a href="https://mlink.cc/oppenhaix" target="_blank">${config.footer.designer}</a> | ${config.footer.imagesBy}<a href="https://v.douyin.com/psaSoYU9X50/" target="_blank">${config.footer.imagesSource}</a>
            </br>${config.footer.projectGithub}<a href="https://github.com/OppenHaix/doro-today" target="_blank">${config.footer.githubLinkText}</a>
            </br><a href="https://beian.miit.gov.cn/" target="_blank">${config.footer.icp}</a>
        `;
        document.getElementById('footerText').innerHTML = footerText;
    }

    // Load the config.json file
    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            insertContent(data);
        })
        .catch(error => {
            console.error('Failed to load configuration:', error);
        });

    const cardImg = document.querySelector('.card-img');
    const loader = document.querySelector('.loader');
    const defaultMessage = document.querySelector('#defaultMessage');
    const cardInfo = document.querySelector('.card-info');
    const cardTitle = document.querySelector('.card-title');
    const cardDescription = document.querySelector('.card-description');
    const drawBtn = document.getElementById('drawBtn');
    const saveBtn = document.getElementById('saveBtn');
    const saveMessage = document.getElementById('saveMessage');
    const allEndingsBtn = document.getElementById('allEndingsBtn'); // Add this line

    let lastCardId = null;
    let cards = [];

    // 在标点符号后面插入换行符
    function formatDescription(description) {
        return description.replace(/([，。！？；])/g, '$1\n');
    }

    // 模拟异步请求获取卡片数据
    function fetchCardData(callback) {
        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * cards.length);
            } while (cards[randomIndex].id === lastCardId);

            lastCardId = cards[randomIndex].id;
            callback(cards[randomIndex]);
        }, 30); // 模拟网络延迟
    }

    function drawCard() {
        // 显示加载动画
        cardImg.classList.add('hidden');
        defaultMessage.classList.add('hidden');
        loader.classList.remove('hidden');

        fetchCardData((selectedCard) => {
            // 更新内容
            cardImg.src = selectedCard.image;
            cardTitle.textContent = selectedCard.title;
            cardDescription.textContent = formatDescription(selectedCard.description);

            // 隐藏加载动画，显示图片和信息
            loader.classList.add('hidden');
            cardImg.classList.remove('hidden');
            cardInfo.classList.remove('hidden');
            saveBtn.classList.remove('hidden');
            saveMessage.classList.add('hidden');
        });
    }

    // 显示提示信息
    function showSaveMessage() {
        saveMessage.classList.remove('hidden');
        alert('请长按图片进行保存');
    }

    // 从JSON文件中加载卡片数据
    function loadCards() {
        fetch('cards.json')
            .then(response => response.json())
            .then(data => {
                cards = data;
            })
            .catch(error => {
                console.error('加载卡片数据失败:', error);
            });
    }

    // 事件监听
    drawBtn.addEventListener('click', drawCard);
    saveBtn.addEventListener('click', showSaveMessage);
    allEndingsBtn.addEventListener('click', () => {
        location.href = 'all_endings.html';
    });

    // 初始化页面
    loadCards();

    // 获取模态框元素
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    // 显示模态框，显示完整图片
    cardImg.addEventListener('click', () => {
        modalImage.src = cardImg.src;
        modal.classList.add('show');
    });

    // 关闭模态框
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // 点击模态框外部关闭模态框
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});
