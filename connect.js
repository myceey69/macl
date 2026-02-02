// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const contactCards = document.querySelectorAll('.contact-card');

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

// Contact cards interaction
contactCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.contact-icon');
    icon.style.transform = 'rotate(360deg) scale(1.2)';
  });
  
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.contact-icon');
    icon.style.transform = 'rotate(0) scale(1)';
  });
  
  // Add click interaction for mobile
  card.addEventListener('click', function() {
    const btn = this.querySelector('.contact-btn');
    if (btn) {
      btn.click();
    }
  });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  // Validate form
  if (!validateForm(data)) {
    return;
  }
  
  // Show loading state
  const submitBtn = contactForm.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual form submission)
  setTimeout(() => {
    // Create mailto link
    const mailtoLink = `mailto:mariochong113@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success notification
    showNotification('Message sent successfully! Check your email client.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Form validation
function validateForm(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (errors.length > 0) {
    showNotification(errors[0], 'error');
    return false;
  }
  
  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
  notificationText.textContent = message;
  notification.className = 'notification show';
  
  if (type === 'error') {
    notification.style.borderColor = '#ff3cac';
    notification.querySelector('i').style.color = '#ff3cac';
  } else {
    notification.style.borderColor = '#00fff7';
    notification.querySelector('i').style.color = '#00fff7';
  }
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

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

// Observe all sections and cards
document.querySelectorAll('section, .contact-card, .info-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// Add hover effect to form inputs
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
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

// Add typing effect to page title
function typeWriter() {
  const titleElement = document.querySelector('.page-title');
  if (!titleElement) return;
  
  const text = titleElement.textContent;
  titleElement.textContent = '';
  let index = 0;
  
  function type() {
    if (index < text.length) {
      titleElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  
  setTimeout(type, 500);
}

// Create floating particles for visual effect
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const particleCount = 30;
  
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  createParticles();
  
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
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Add hover effect to info cards
document.querySelectorAll('.info-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('i');
    icon.style.transform = 'scale(1.2) rotate(10deg)';
  });
  
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('i');
    icon.style.transform = 'scale(1) rotate(0)';
  });
});

// Console welcome message
console.log('%c📧 Contact Page - Mario Chong Loo', 'color: #00fff7; font-size: 20px; font-weight: bold;');
console.log('%cReady to connect and collaborate!', 'color: #ff3cac; font-size: 14px;');
