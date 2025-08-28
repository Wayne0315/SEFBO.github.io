// 這是一個在網頁內容載入後執行的函數
document.addEventListener("DOMContentLoaded", function() {

    // 找到 header 和 footer 的佔位符
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // 使用 fetch 功能去讀取 header.html 的內容
    fetch('header.html')
        .then(response => response.text()) // 將回應轉成文字
        .then(data => {
            // 將讀取到的 HTML 內容塞進佔位符裡
            headerPlaceholder.innerHTML = data;
        });

    // 同樣地，讀取 footer.html 的內容
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            // 將讀取到的 HTML 內容塞進佔位符裡
            footerPlaceholder.innerHTML = data;
        });
});