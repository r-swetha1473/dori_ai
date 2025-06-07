// Resources page functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resourceCards = document.querySelectorAll('.resource-card');
  const categoryCards = document.querySelectorAll('.category-card');
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  // Filter functionality
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      const filter = tab.getAttribute('data-filter');
      
      // Show/hide resource cards based on filter
      resourceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Category card click functionality
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      
      // Update active filter tab
      filterTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-filter') === category) {
          tab.classList.add('active');
        }
      });
      
      // Filter resources
      resourceCards.forEach(resourceCard => {
        if (resourceCard.getAttribute('data-category') === category) {
          resourceCard.style.display = 'block';
          resourceCard.style.animation = 'fadeIn 0.5s ease';
        } else {
          resourceCard.style.display = 'none';
        }
      });
      
      // Scroll to resources section
      document.querySelector('.resources-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Search functionality
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    resourceCards.forEach(card => {
      const title = card.querySelector('.resource-title').textContent.toLowerCase();
      const description = card.querySelector('.resource-description').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.resource-tag')).map(tag => tag.textContent.toLowerCase());
      
      const matches = title.includes(searchTerm) || 
                     description.includes(searchTerm) || 
                     tags.some(tag => tag.includes(searchTerm));
      
      if (matches || searchTerm === '') {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Download button functionality
  const downloadBtns = document.querySelectorAll('.download-btn');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const resourceTitle = this.closest('.resource-card').querySelector('.resource-title').textContent;
      
      // Simulate download
      alert(`Downloading: ${resourceTitle}`);
      
      // In a real application, this would trigger an actual download
      // window.open('/path/to/resource.pdf', '_blank');
    });
  });

  // Share button functionality
  const shareBtns = document.querySelectorAll('.share-btn');
  shareBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const resourceCard = this.closest('.resource-card');
      const resourceTitle = resourceCard.querySelector('.resource-title').textContent;
      const resourceUrl = window.location.href;
      
      // Simple share functionality (in real app, would use Web Share API or social sharing)
      if (navigator.share) {
        navigator.share({
          title: resourceTitle,
          url: resourceUrl
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${resourceTitle} - ${resourceUrl}`).then(() => {
          alert('Resource link copied to clipboard!');
        });
      }
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('.newsletter-input').value;
      
      if (email && email.includes('@')) {
        alert('Thank you for subscribing! You will receive notifications about new resources.');
        this.querySelector('.newsletter-input').value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
});