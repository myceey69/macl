const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleIcon = themeToggle.querySelector('i');
const themeToggleLabel = themeToggle.querySelector('.theme-toggle-label');

function updateThemeToggle(isLightMode) {
  document.body.classList.toggle('light-theme', isLightMode);
  document.body.classList.toggle('dark-theme', !isLightMode);
  themeToggle.setAttribute('aria-pressed', String(isLightMode));
  themeToggle.setAttribute('aria-label', isLightMode ? 'Switch to dark mode' : 'Switch to light mode');
  themeToggleIcon.className = isLightMode ? 'fas fa-moon' : 'fas fa-sun';
  themeToggleLabel.textContent = isLightMode ? 'Dark' : 'Light';
}

const savedTheme = localStorage.getItem('portfolio-theme');
updateThemeToggle(savedTheme === 'light');

themeToggle.addEventListener('click', () => {
  const isLightMode = !document.body.classList.contains('light-theme');
  updateThemeToggle(isLightMode);
  localStorage.setItem('portfolio-theme', isLightMode ? 'light' : 'dark');
});

function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
  navbar.classList.remove('nav-hidden');
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  navLinks.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
  navbar.classList.remove('nav-hidden');
});

navLinkItems.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (href && href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    closeMenu();
  });
});

let lastScrollY = window.scrollY;

function updateNavbarState() {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  navbar.classList.toggle('scrolled', currentScrollY > 24);

  if (currentScrollY <= 24 || document.body.classList.contains('nav-open')) {
    navbar.classList.remove('nav-hidden');
  } else if (scrollDelta > 4) {
    navbar.classList.add('nav-hidden');
  } else if (scrollDelta < -4) {
    navbar.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', updateNavbarState, { passive: true });
updateNavbarState();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('section, .project-card, .timeline-item, .leadership-card, .skill-card, .metric').forEach((element) => {
  element.classList.add('fade-in');
  observer.observe(element);
});

const sections = [...document.querySelectorAll('header[id], section[id]')];

function updateActiveLink() {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 110)
    .at(-1);

  navLinkItems.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', Boolean(current && href === `#${current.id}`));
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
