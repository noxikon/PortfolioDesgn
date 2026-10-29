document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобильное / Планшетное меню
  const burgerBtn = document.getElementById('burgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__actions a');

  function toggleMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', open);
  }

  if (burgerBtn) burgerBtn.addEventListener('click', () => toggleMenu(true));
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  // 2. Эффект печатной машинки (Typewriter) из прототипа Figma
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const fullText = typewriterEl.getAttribute('data-text') || '';
    const contentSpan = typewriterEl.querySelector('.typewriter__content');
    let isTyping = false;

    function runTypewriter() {
      if (isTyping) return;
      isTyping = true;
      contentSpan.textContent = '';
      let index = 0;

      // Небольшая пауза перед началом печати (мигание каретки)
      setTimeout(() => {
        const interval = setInterval(() => {
          contentSpan.textContent += fullText.charAt(index);
          index++;
          if (index >= fullText.length) {
            clearInterval(interval);
            isTyping = false;
          }
        }, 45);
      }, 600);
    }

    // Запуск при появлении блока в области видимости и по клику
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runTypewriter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(typewriterEl);
    typewriterEl.addEventListener('click', runTypewriter);
  }
});