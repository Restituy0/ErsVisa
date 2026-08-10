/* Navbar behavior: hide on scroll down, show on scroll up, translucent
   background after scrolling, and an accessible hamburger menu.
   Runs after components.js injects the header. */
(function () {
    const menu = document.getElementById('menu');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menu || !menuToggle || !navMenu) return;

    let lastScrollTop = 0;
    let menuOpen = false;

    function onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Don't hide the navbar while the mobile menu is open
        if (!menuOpen) {
            if (scrollTop > lastScrollTop && scrollTop > 120) {
                menu.classList.add('hidden');
            } else {
                menu.classList.remove('hidden');
            }
        }

        menu.classList.toggle('scrolled', scrollTop > 50);

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    function closeMenu(returnFocus) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuOpen = false;
        if (returnFocus) menuToggle.focus();
    }

    function toggleMenu() {
        menuOpen = navMenu.classList.toggle('show');
        menuToggle.classList.toggle('active', menuOpen);
        menuToggle.setAttribute('aria-expanded', String(menuOpen));
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close the mobile menu when a link is clicked
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => closeMenu(false));
    });

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
        if (menuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu(false);
        }
    });

    // Close with Escape and return focus to the toggle button
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) closeMenu(true);
    });
})();
