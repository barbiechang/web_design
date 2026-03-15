document.addEventListener("DOMContentLoaded", () => {
    
    // --- LOAD COMPONENTS ---
    const loadComponent = (id, path, callback) => {
        const el = document.getElementById(id);
        if (el) {
            fetch(path)
                .then(res => res.text())
                .then(data => {
                    el.innerHTML = data;
                    if (callback) callback();
                })
                .catch(err => console.error(`Error loading ${path}:`, err));
        }
    };

    loadComponent("navbar-placeholder", "components/navbar.html", () => {
        initMobileMenu();
    });
    loadComponent("collection-placeholder", "components/collection.html", initVideoHover);
    loadComponent("faq-footer-placeholder", "components/faq_footer.html", initFAQ);

    document.addEventListener('click', (e) => {
        const langBtn = e.target.closest('#lang-btn');
        const langMenu = document.getElementById('lang-menu');
        
        if (langBtn) {
            e.stopPropagation();
            langMenu.classList.toggle('show');
            console.log("Language button clicked!");
        } else if (langMenu && !e.target.closest('.lang-wrapper')) {
            langMenu.classList.remove('show');
        }

        if (e.target.dataset.lang) {
            e.preventDefault();
            const newLang = e.target.dataset.lang;
            document.getElementById('lang-btn').innerHTML = `${newLang} <i class='bx bx-chevron-down'></i>`;
            langMenu.classList.remove('show');
        }
    });

    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const nav = document.getElementById('nav-content');
        const menuIcon = document.getElementById('menu-icon');

        if (menuBtn && nav) {
            menuBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
                if (nav.classList.contains('active')) {
                    menuIcon.classList.replace('bx-menu', 'bx-x');
                    document.body.style.overflow = 'hidden';
                } else {
                    menuIcon.classList.replace('bx-x', 'bx-menu');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    // --- VIDEO HOVER ---
    function initVideoHover() {
        const wrappers = document.querySelectorAll('.img-wrapper');
        wrappers.forEach(wrapper => {
            const video = wrapper.querySelector('.hover-video');
            if (video) {
                video.muted = true;
                wrapper.addEventListener('mouseenter', () => video.play().catch(() => {}));
                wrapper.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });
    }

    function initFAQ() {
        document.addEventListener('click', (e) => {
            const header = e.target.closest('.accordion-header');
            if (header) {
                const content = header.nextElementSibling;
                content.classList.toggle('show');
                const icon = header.querySelector('i');
                if (icon) {
                    icon.classList.toggle('bx-chevron-up');
                    icon.classList.toggle('bx-chevron-down');
                }
            }
        });
    }
});