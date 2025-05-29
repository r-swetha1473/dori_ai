// DOM Elements
const header = document.querySelector('.main-header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
const faqItems = document.querySelectorAll('.faq-item');

// Handle scroll event for sticky header
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });
}

// Handle dropdown menus for mobile
dropdownItems.forEach(item => {
  const link = item.querySelector('a');
  
  // For mobile: touch on parent link opens submenu instead of navigating
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      item.classList.toggle('active');
      
      // Close other open dropdowns
      dropdownItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    }
  });
});

// Handle FAQ accordion
if (faqItems.length > 0) {
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // If clicked item wasn't open, open it
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

// Add animation classes on scroll
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .unique-card, .use-case-card, .development-card');
  
  const animateOnScroll = () => {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
      
      if (isVisible) {
        element.classList.add('animate-fade-in');
      }
    });
  };
  
  // Initial check on page load
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') !== '#') {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navList.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          navList.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    }
  });
});
