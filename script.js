const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  navLinks.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
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

function updateNavbarState() {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
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
