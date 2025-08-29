document.addEventListener("DOMContentLoaded", function() {

    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;

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

                // 搜尋功能需要 search-index.json，我們只處理開關
                if (searchToggle && searchOverlay && searchClose) {
                    searchToggle.addEventListener('click', function() {
                        searchOverlay.classList.add('is-open');
                        searchInput.focus();
                    });

                    searchClose.addEventListener('click', function() {
                        searchOverlay.classList.remove('is-open');
                    });
                }

                // ---- 搜尋功能核心邏輯 (如果您有 search-index.json 的話) ----
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
                        console.warn(error.message); // 如果找不到 search-index.json，只在 console 提示，不影響網站運作
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