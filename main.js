document.addEventListener("DOMContentLoaded", function() {

    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;

                // ---【新增】標示當前頁面連結的邏輯 ---
                function highlightActiveLink() {
                    const navLinks = document.querySelectorAll('#main-nav a');
                    // 取得當前頁面的檔案名稱，例如 "contact.html"
                    const currentPage = window.location.pathname.split('/').pop();

                    navLinks.forEach(link => {
                        const linkPage = link.getAttribute('href');

                        // 如果連結的 href 與當前頁面檔案名稱相符，就加上 active-link class
                        // 特別處理首頁 (當 currentPage 為空或 "index.html" 時)
                        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                            link.classList.add('active-link');
                        }
                    });
                }
                highlightActiveLink();
                // --- 新增邏輯結束 ---


                // ---- 漢堡選單邏輯 ----
                const menuToggle = document.getElementById('menu-toggle');
                const mainNav = document.getElementById('main-nav');
                if (menuToggle && mainNav) {
                    menuToggle.addEventListener('click', function() {
                        mainNav.classList.toggle('is-open');
                        menuToggle.classList.toggle('is-active'); 
                    });
                }

                // ---- 搜尋視窗邏輯 ----
                const searchToggle = document.getElementById('search-toggle');
                const searchOverlay = document.getElementById('search-overlay');
                const searchClose = document.getElementById('search-close');
                const searchInput = document.getElementById('search-input');
                const searchResultsContainer = document.getElementById('search-results');

                if (searchToggle && searchOverlay && searchClose) {
                    searchToggle.addEventListener('click', function() {
                        searchOverlay.classList.add('is-open');
                        searchInput.focus();
                    });

                    searchClose.addEventListener('click', function() {
                        searchOverlay.classList.remove('is-open');
});
                }

                // ---- 搜尋功能核心邏輯 ----
                let searchData = [];
                fetch('search-index.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Search index not found');
                        }
                        return response.json();
                    })
                    .then(data => {
                        searchData = data;
                        if (searchInput) {
                            searchInput.addEventListener('input', function(e) {
                                const query = e.target.value.toLowerCase().trim();
                                searchResultsContainer.innerHTML = '';
                                if (query.length < 2) return;

                                const results = searchData.filter(item => 
                                    item.title.toLowerCase().includes(query) || 
                                    item.content.toLowerCase().includes(query)
                                );

                                if (results.length > 0) {
                                    results.forEach(result => {
                                        const resultElement = document.createElement('div');
                                        resultElement.className = 'result-item';
                                        const snippet = result.content.substring(0, 120) + '...';
                                        resultElement.innerHTML = `
                                            <a href="${result.url}">
                                                <h4>${result.title}</h4>
                                                <p>${snippet}</p>
                                            </a>`;
                                        searchResultsContainer.appendChild(resultElement);
                                    });
                                } else {
                                    searchResultsContainer.innerHTML = '<div class="no-results">No results found.</div>';
                                }
                            });
                        }
                    })
                    .catch(error => {
                        console.warn(error.message);
                    });
            });
    }

    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            });
    }
});