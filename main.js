

document.addEventListener("DOMContentLoaded", function() {


     function initializeFormValidation() {
        const requiredFields = document.querySelectorAll('.floating-label-form [required]');

        requiredFields.forEach(field => {
            // 1. 當使用者離開輸入框時 (blur)
            field.addEventListener('blur', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup) {
                    // 檢查輸入框是否無效 (例如：空值)
                    if (!this.checkValidity()) {
                        formGroup.classList.add('has-error');
                    } else {
                        formGroup.classList.remove('has-error');
                    }
                }
            });

            // 2. 當使用者正在輸入時 (input)，即時移除錯誤狀態
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
    // 呼叫新函式來執行功能
    initializeFormValidation();

    // --- 【1】動態載入 Header 和 Footer ---
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

    // --- 【2】初始化所有 Header 相關的功能 ---
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

    // --- 【3】初始化頁面滾動動畫 ---
    const animatedItems = document.querySelectorAll('.project-feature, .team-profile, .fade-in-up');    if (animatedItems.length > 0) {
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

    // --- 【4】初始化平滑滾動功能 ---
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

    // --- 【5】【關鍵】初始化所有 Swiper 輪播 ---

    // 初始化 Hero Slider
    // 檢查頁面上是否有 .hero-slider 元素，避免在沒有該輪播的頁面報錯
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
  
}); // DOMContentLoaded 事件監聽器結束