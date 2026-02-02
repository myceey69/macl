// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const skillCards = document.querySelectorAll('.skill-card');
const hobbyCards = document.querySelectorAll('.hobby-card');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(18, 18, 18, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(18, 18, 18, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scrolling for navigation links
navLinksItems.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Skill cards interaction
skillCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) rotateX(5deg)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotateX(0)';
  });
  
  // Add click interaction for mobile
  card.addEventListener('click', function() {
    const skill = this.dataset.skill;
    showSkillDetails(skill);
  });
});

// Hobby cards interaction
hobbyCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.hobby-icon');
    icon.style.transform = 'rotate(360deg) scale(1.2)';
  });
  
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.hobby-icon');
    icon.style.transform = 'rotate(0) scale(1)';
  });
});

// Typing effect for hero name
function typeWriter() {
  const nameElement = document.querySelector('.name');
  const text = nameElement.textContent;
  nameElement.textContent = '';
  let index = 0;
  
  function type() {
    if (index < text.length) {
      nameElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  
  setTimeout(type, 1000);
}

// Particle effect for hero section
function createParticles() {
  const hero = document.querySelector('.hero');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #00fff7;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      animation: float-particle ${5 + Math.random() * 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    hero.appendChild(particle);
  }
}

// Add particle animation to CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes float-particle {
    0% {
      opacity: 0;
      transform: translateY(100px) scale(0);
    }
    10% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    90% {
      opacity: 1;
      transform: translateY(-100px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-200px) scale(0);
    }
  }
`;
document.head.appendChild(particleStyle);

// Skill details modal
function showSkillDetails(skill) {
  const skillDetails = {
    programming: {
      title: 'Programming Languages',
      description: 'Proficient in multiple programming languages with experience in building scalable applications.',
      technologies: ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Go']
    },
    web: {
      title: 'Web Development',
      description: 'Full-stack development experience with modern frameworks and best practices.',
      technologies: ['React', 'Vue.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL']
    },
    tools: {
      title: 'Tools & Technologies',
      description: 'Experienced with modern development tools and cloud platforms.',
      technologies: ['Git', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Agile']
    }
  };
  
  const details = skillDetails[skill];
  if (details) {
    createModal(details.title, details.description, details.technologies);
  }
}

// Modal creation
function createModal(title, description, technologies) {
  // Remove existing modal if any
  const existingModal = document.querySelector('.modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p>${description}</p>
        <div class="modal-tech">
          ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
  
  // Add modal styles
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      opacity: 0;
      animation: fadeIn 0.3s forwards;
    }
    
    .modal-content {
      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
      border: 1px solid rgba(0, 255, 247, 0.3);
      border-radius: 15px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      transform: scale(0.8);
      animation: scaleIn 0.3s forwards;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .modal-header h3 {
      color: #00fff7;
      margin: 0;
    }
    
    .modal-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    
    .modal-close:hover {
      color: #ff3cac;
    }
    
    .modal-body p {
      color: #b3b3b3;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .modal-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tech-tag {
      background: rgba(0, 255, 247, 0.1);
      color: #00fff7;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      border: 1px solid rgba(0, 255, 247, 0.3);
    }
    
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    
    @keyframes scaleIn {
      to { transform: scale(1); }
    }
  `;
  
  if (!document.querySelector('#modal-styles')) {
    modalStyle.id = 'modal-styles';
    document.head.appendChild(modalStyle);
  }
  
  document.body.appendChild(modal);
  
  // Close modal functionality
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => modal.remove(), 300);
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    }
  });
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
  @keyframes fadeOut {
    to { 
      opacity: 0;
      transform: scale(0.8);
    }
  }
`;
document.head.appendChild(fadeOutStyle);

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00fff7, #ff3cac);
    z-index: 1001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  createParticles();
  createScrollProgress();
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effect to social links
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) rotate(360deg)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotate(0)';
  });
});

// Console welcome message
console.log('%c🚀 Welcome to Mario Chong Loo\'s Portfolio!', 'color: #00fff7; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion and modern web technologies', 'color: #ff3cac; font-size: 14px;');
