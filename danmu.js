document.addEventListener("DOMContentLoaded", function() {
    const danmuContainer = document.getElementById('danmu-container');

    fetch('danmu.csv')
        .then(response => response.text())
        .then(text => {
            const danmus = parseCSV(text);
            danmus.forEach(danmu => {
                setTimeout(() => {
                    createDanmu(danmu.text);
                }, danmu.timestamp);
            });
        });

    function parseCSV(csvText) {
        const lines = csvText.split("\n");
        return lines.map(line => {
            const [timestamp, text] = line.split(",");
            return { timestamp: parseInt(timestamp, 10), text: text.trim() };
        });
    }

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
