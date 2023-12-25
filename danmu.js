document.addEventListener("DOMContentLoaded", function() {
    const danmuContainer = document.getElementById('danmu-container');
    const interval = 2000; // 每 2 秒出現一條彈幕

    fetch('danmu.csv')
        .then(response => response.text())
        .then(text => {
            const danmus = text.split("\n");
            danmus.forEach((danmu, index) => {
                setTimeout(() => {
                    createDanmu(danmu);
                }, index * interval);
            });
        });

    function createDanmu(text) {
        const danmuDiv = document.createElement('div');
        danmuDiv.classList.add('danmu');
        danmuDiv.textContent = text;
        danmuContainer.appendChild(danmuDiv);

        const screenWidth = window.innerWidth;
        danmuDiv.style.top = `${Math.random() * window.innerHeight}px`;
        danmuDiv.style.left = `${screenWidth}px`;

        // 動畫
        const duration = 10000; // 10秒過屏
        danmuDiv.style.transition = `transform ${duration}ms linear`;
        danmuDiv.style.transform = `translateX(-${screenWidth + danmuDiv.offsetWidth}px)`;

        // 移除彈幕
        setTimeout(() => {
            danmuDiv.remove();
        }, duration);
    }
});
