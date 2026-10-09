/**
 * ATHMEASE NATURE CURE CLINIC
 * Client interaction & motion script
 * Kolathur, Chennai
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initTreatmentIndex();
  initScrollReveals();
  initSmoothScroll();
});

/**
 * Header scroll state
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close on backdrop click
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/**
 * Editorial Treatment Index (Signature Interaction)
 * Switches active treatment on hover or click and cross-fades preview image
 */
function initTreatmentIndex() {
  const treatmentItems = document.querySelectorAll('.treatment-item');
  const previewImages = document.querySelectorAll('.treatment-preview-img');
  const previewCaption = document.querySelector('.treatment-preview-caption span');

  if (!treatmentItems.length || !previewImages.length) return;

  function setActiveTreatment(index) {
    treatmentItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('is-active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      }
    });

    previewImages.forEach((img, i) => {
      if (i === index) {
        img.classList.add('is-visible');
      } else {
        img.classList.remove('is-visible');
      }
    });

    if (previewCaption && treatmentItems[index]) {
      const title = treatmentItems[index].querySelector('.treatment-title')?.textContent.trim();
      const num = treatmentItems[index].querySelector('.treatment-num')?.textContent.trim();
      if (title && num) {
        previewCaption.textContent = `${num} — ${title}`;
      }
    }
  }

  treatmentItems.forEach((item, index) => {
    // Desktop hover
    item.addEventListener('mouseenter', () => {
      setActiveTreatment(index);
    });

    // Mobile / Keyboard click
    item.addEventListener('click', () => {
      setActiveTreatment(index);
    });

    // Keyboard navigation
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveTreatment(index);
      }
    });
  });
}

/**
 * Intersection Observer Scroll Reveal
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scrolling for internal anchor jumps
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
