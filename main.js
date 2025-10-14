document.addEventListener("DOMContentLoaded", function() {

    // --- 【1】表單驗證功能 ---
    function initializeFormValidation() {
        const requiredFields = document.querySelectorAll('.floating-label-form [required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup) {
                    if (!this.checkValidity()) {
                        formGroup.classList.add('has-error');
                    } else {
                        formGroup.classList.remove('has-error');
                    }
                }
            });
            field.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('has-error')) {
                    if (this.checkValidity()) {
                        formGroup.classList.remove('has-error');
                    }
                }
            });
        });
    }
    initializeFormValidation();

    // --- 【2】動態載入 Header 和 Footer ---
    function loadHTML(elementId, filePath, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            fetch(filePath)
                .then(response => response.ok ? response.text() : Promise.reject('File not found'))
                .then(data => {
                    element.innerHTML = data;
                    if (callback) callback();
                })
                .catch(error => console.error(`Error loading ${filePath}:`, error));
        }
    }
    loadHTML('header-placeholder', 'header.html', initializeHeaderFeatures);
    loadHTML('footer-placeholder', 'footer.html');

    // --- 【3】初始化所有 Header 相關的功能 ---
    function initializeHeaderFeatures() {
        const navLinks = document.querySelectorAll('#main-nav a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active-link');
            }
        });
        const menuToggle = document.getElementById('menu-toggle');
        const mainNav = document.getElementById('main-nav');
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('is-open');
                menuToggle.classList.toggle('is-active');
            });
        }
    }

    // --- 【4】初始化頁面滾動動畫 ---
    const animatedItems = document.querySelectorAll('.project-feature, .team-profile, .fade-in-up');
    if (animatedItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedItems.forEach(item => observer.observe(item));
    }

    // --- 【5】初始化平滑滾動功能 (for .scroll-down-prompt) ---
    const scrollLinks = document.querySelectorAll('.scroll-down-prompt');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 【6】初始化 Swiper 輪播 ---
    if (document.querySelector('.hero-slider')) {
        const heroSlider = new Swiper('.hero-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    // --- 【7】回到最上方 (Back to Top) 按鈕功能 ---
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        // 偵測滾動事件
        window.addEventListener('scroll', () => {
            // 如果頁面向下滾動超過 300px，就顯示按鈕
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        });
        // 偵測點擊事件
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // 防止 a 標籤的預設跳轉行為
            // 平滑滾動到頁面頂部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

}); // DOMContentLoaded 事件監聽器結束