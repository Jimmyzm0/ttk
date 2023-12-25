function loadCSV() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('请先选择一个CSV文件！');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const wishes = text.split('\n');
        wishes.forEach((wish, index) => {
            setTimeout(() => {
                createDanmu(wish);
            }, index * 1000); // 每条祝福间隔1秒
        });
    };
    reader.readAsText(file);
}

function createDanmu(text) {
    const danmu = document.createElement('div');
    danmu.classList.add('danmu');
    danmu.textContent = text;
    danmu.style.top = Math.random() * 380 + 'px'; // 随机高度
    danmu.style.left = '100%';
    danmu.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // 随机颜色

    const danmuContainer = document.getElementById('danmuContainer');
    danmuContainer.appendChild(danmu);

    const speed = Math.random() * 10 + 5; // 随机速度
    const move = () => {
        const currentLeft = parseFloat(danmu.style.left);
        if (currentLeft < -danmu.offsetWidth) {
            danmuContainer.removeChild(danmu);
        } else {
            danmu.style.left = currentLeft - speed + 'px';
            requestAnimationFrame(move);
        }
    };
    requestAnimationFrame(move);
}
