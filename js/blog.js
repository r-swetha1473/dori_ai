// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      // Show/hide blog cards based on filter
      blogCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('.newsletter-input').value;
      
      // Simple validation
      if (email && email.includes('@')) {
        alert('Thank you for subscribing! You will receive our latest updates.');
        this.querySelector('.newsletter-input').value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // Add reading time calculation
  const blogPosts = document.querySelectorAll('.blog-card');
  blogPosts.forEach(post => {
    const excerpt = post.querySelector('.blog-card-excerpt');
    if (excerpt) {
      const wordCount = excerpt.textContent.split(' ').length;
      const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
      const timeElement = post.querySelector('.blog-card-meta .fas.fa-clock').parentElement;
      if (timeElement && !timeElement.textContent.includes('min read')) {
        timeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
      }
    }
  });
});