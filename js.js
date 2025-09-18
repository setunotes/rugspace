// ===== DOM ELEMENTS =====
const categoryButtons = document.querySelectorAll('.category-btn');
const collectionItems = document.querySelectorAll('.collection-item');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const header = document.querySelector('.header');
const patternLines = document.querySelectorAll('.pattern-line');
const actionButtons = document.querySelectorAll('.action-btn');
const diamond = document.querySelector('.pattern-diamond');

// ===== CATEGORY FILTERING =====
function setupCategoryFiltering() {
  categoryButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected category
      const selectedCategory = this.getAttribute('data-category');
      
      // Filter items
      collectionItems.forEach(function(item) {
        const itemCategory = item.getAttribute('data-category');
        
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
      
      // Trigger animation for visible items
      animateOnScroll();
    });
  });
}

// ===== HEADER SCROLL EFFECT =====
function setupHeaderScrollEffect() {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
  });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== ANIMATION ON SCROLL =====
function animateOnScroll() {
  collectionItems.forEach(function(item) {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && !item.classList.contains('hidden')) {
      item.style.animationPlayState = 'running';
    }
  });
}

function setupScrollAnimations() {
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
}

// ===== SEARCH FUNCTIONALITY =====
function performSearch() {
  const query = searchInput.value.trim();
  if (query) {
    // Redirect to collections page with search parameter
    window.location.href = 'collections.html?search=' + encodeURIComponent(query);
  }
}

function setupSearch() {
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

// ===== INTERACTIVE EFFECTS =====
function setupInteractiveEffects() {
  // Animate the rug pattern
  patternLines.forEach(function(line, index) {
    line.style.animationDelay = (index * 0.5) + 's';
  });
  
  // Add click effect to action buttons
  actionButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });
}

// ===== DYNAMIC PATTERN EFFECTS =====
function setupPatternEffects() {
  setInterval(function() {
    if (Math.random() > 0.7) { // 30% chance
      const colors = ['#d4af37', '#f4e4aa', '#c48137'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      diamond.style.background = randomColor;
      patternLines.forEach(function(line) {
        line.style.background = randomColor;
      });
      
      // Reset after 2 seconds
      setTimeout(function() {
        diamond.style.background = '#d4af37';
        patternLines.forEach(function(line) {
          line.style.background = '#d4af37';
        });
      }, 2000);
    }
  }, 5000);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  setupCategoryFiltering();
  setupHeaderScrollEffect();
  setupSmoothScrolling();
  setupScrollAnimations();
  setupSearch();
  setupInteractiveEffects();
  setupPatternEffects();
});

// Mobile Navigation Toggle
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navMenu = document.getElementById('navMenu');

if (mobileNavToggle && navMenu) {
  mobileNavToggle.addEventListener('click', function() {
    navMenu.classList.toggle('mobile-active');
    
    // Change hamburger icon
    if (navMenu.classList.contains('mobile-active')) {
      this.innerHTML = '✕';
    } else {
      this.innerHTML = '☰';
    }
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      navMenu.classList.remove('mobile-active');
      mobileNavToggle.innerHTML = '☰';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
      navMenu.classList.remove('mobile-active');
      mobileNavToggle.innerHTML = '☰';
    }
  });
}
