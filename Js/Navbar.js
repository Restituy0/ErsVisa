document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  let lastScrollTop = 0;

  function onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      menu.classList.add('hidden');
    } else {
      menu.classList.remove('hidden');
    }

    if (scrollTop > 50) {
      navMenu.classList.add('scrolled');
      menu.classList.add('scrolled');
    } else {
      navMenu.classList.remove('scrolled');
      menu.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener('scroll', onScroll);

  // Toggle hamburguesa
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menu.classList.toggle('border');
  });
});