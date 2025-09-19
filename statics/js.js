// ===== DOM ELEMENTS =====
const categoryButtons = document.querySelectorAll('.category-btn');
const collectionItems = document.querySelectorAll('.collection-item');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const header = document.querySelector('.header');
const patternLines = document.querySelectorAll('.pattern-line');
const actionButtons = document.querySelectorAll('.action-btn');
const diamond = document.querySelector('.pattern-diamond');

// Utility: safe addEventListener
function on(el, evt, handler, opts) {
  if (el) el.addEventListener(evt, handler, opts);
}

// ===== CATEGORY FILTERING =====
function setupCategoryFiltering() {
  if (!categoryButtons.length || !collectionItems.length) return;
  categoryButtons.forEach(function (button) {
    on(button, 'click', function () {
      categoryButtons.forEach(function (btn) { btn.classList.remove('active'); });
      this.classList.add('active');

      const selectedCategory = this.getAttribute('data-category');
      collectionItems.forEach(function (item) {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
      animateOnScroll();
    });
  });
}

// ===== HEADER SCROLL EFFECT =====
function setupHeaderScrollEffect() {
  if (!header) return;
  on(window, 'scroll', function () {
    header.style.background =
      window.scrollY > 100 ? 'rgba(26, 26, 26, 0.98)' : 'rgba(26, 26, 26, 0.95)';
  });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    on(anchor, 'click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== ANIMATION ON SCROLL =====
function animateOnScroll() {
  if (!collectionItems.length) return;
  collectionItems.forEach(function (item) {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible && !item.classList.contains('hidden')) {
      item.style.animationPlayState = 'running';
    }
  });
}

function setupScrollAnimations() {
  on(window, 'scroll', animateOnScroll);
  on(window, 'load', animateOnScroll);
}

// ===== SEARCH FUNCTIONALITY =====
function performSearch() {
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = 'collections.html?search=' + encodeURIComponent(query);
  }
}

function setupSearch() {
  if (!searchBtn || !searchInput) return; // prevent null addEventListener
  on(searchBtn, 'click', performSearch);
  on(searchInput, 'keypress', function (e) {
    if (e.key === 'Enter') performSearch();
  });
}

// ===== INTERACTIVE EFFECTS =====
function setupInteractiveEffects() {
  if (patternLines.length) {
    patternLines.forEach(function (line, index) {
      line.style.animationDelay = index * 0.5 + 's';
    });
  }
  if (actionButtons.length) {
    actionButtons.forEach(function (button) {
      on(button, 'click', function () {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
      });
    });
  }
}

// ===== DYNAMIC PATTERN EFFECTS =====
function setupPatternEffects() {
  if (!diamond && !patternLines.length) return;
  setInterval(function () {
    if (Math.random() > 0.7) {
      const colors = ['#d4af37', '#f4e4aa', '#c48137'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      if (diamond) diamond.style.background = randomColor;
      patternLines.forEach(function (line) { line.style.background = randomColor; });

      setTimeout(function () {
        if (diamond) diamond.style.background = '#d4af37';
        patternLines.forEach(function (line) { line.style.background = '#d4af37'; });
      }, 2000);
    }
  }, 5000);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
  setupCategoryFiltering();
  setupHeaderScrollEffect();
  setupSmoothScrolling();
  setupScrollAnimations();
  setupSearch();              // now null-safe
  setupInteractiveEffects();
  setupPatternEffects();
});

// Mobile Navigation Toggle
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navMenu = document.getElementById('navMenu');

if (mobileNavToggle && navMenu) {
  on(mobileNavToggle, 'click', function () {
    navMenu.classList.toggle('mobile-active');
    this.innerHTML = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    on(link, 'click', function () {
      navMenu.classList.remove('mobile-active');
      mobileNavToggle.innerHTML = '☰';
    });
  });

  on(document, 'click', function (e) {
    if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
      navMenu.classList.remove('mobile-active');
      mobileNavToggle.innerHTML = '☰';
    }
  });
}
