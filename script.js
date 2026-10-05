/**
 * ==========================================================================
 * SULAV DHITAL — PERSONAL PORTFOLIO INTERACTIVE LOGIC
 * Features:
 * 1. Sticky Navigation & Scroll Spy
 * 2. Mobile Drawer Navigation
 * 3. 3D Perspective Parallax Tilt
 * 4. Portfolio Category Filtering
 * 5. Full-Screen Interactive Lightbox with Keyboard Controls
 * 6. Contact Form Validation & Feedback Toast
 * 7. Dynamic Footer Year & Back-to-Top
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR
  // ------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 2. STICKY HEADER & SCROLL SPY
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    // Add background blur styling when scrolled
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active navigation link detection
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 3. MOBILE HAMBURGER MENU & DRAWER
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    mobileDrawer.setAttribute('aria-hidden', !isOpen);

    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    mobileDrawer.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && 
          !mobileDrawer.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. 3D PERSPECTIVE PARALLAX TILT EFFECT
  // ------------------------------------------------------------------------
  // Applies a realistic 3D cursor-tracking tilt to interactive cards
  const canHover = window.matchMedia('(hover: hover)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !prefersReducedMotion) {
    const tiltElements = document.querySelectorAll('.tilt-card');

    tiltElements.forEach(card => {
      const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 7; // degrees

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -maxTilt;
        const rotateY = ((cardX - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. GRAPHIC DESIGN PORTFOLIO FILTERING
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 6. FULL-SCREEN LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTools = document.getElementById('lightboxTools');
  const lightboxDesc = document.getElementById('lightboxDesc');

  let visibleCards = [];
  let currentActiveIndex = 0;

  const getVisibleCards = () => {
    return galleryCards.filter(card => !card.classList.contains('hidden'));
  };

  const populateLightbox = (index) => {
    visibleCards = getVisibleCards();
    if (visibleCards.length === 0) return;

    if (index < 0) index = visibleCards.length - 1;
    if (index >= visibleCards.length) index = 0;
    currentActiveIndex = index;

    const activeCard = visibleCards[currentActiveIndex];
    const imgEl = activeCard.querySelector('.card-media img');
    const metaTag = activeCard.querySelector('.meta-tag');
    const titleEl = activeCard.querySelector('.card-title');
    const toolsEl = activeCard.querySelector('.card-tools');
    const descEl = activeCard.querySelector('.card-desc');

    // Populate data
    lightboxImg.src = imgEl ? imgEl.getAttribute('src') : '';
    lightboxImg.alt = imgEl ? imgEl.getAttribute('alt') : '';
    lightboxCategory.textContent = metaTag ? metaTag.textContent : 'Graphic Design';
    lightboxTitle.textContent = titleEl ? titleEl.textContent : 'Design Artwork';
    lightboxTools.textContent = toolsEl ? toolsEl.textContent : 'Adobe Photoshop';
    lightboxDesc.textContent = descEl ? descEl.textContent : '';
    lightboxCounter.textContent = `${currentActiveIndex + 1} / ${visibleCards.length}`;
  };

  const openLightbox = (card) => {
    visibleCards = getVisibleCards();
    currentActiveIndex = visibleCards.indexOf(card);
    if (currentActiveIndex === -1) currentActiveIndex = 0;

    populateLightbox(currentActiveIndex);

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // lock background scrolling
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Card click triggers lightbox
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      openLightbox(card);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      populateLightbox(currentActiveIndex - 1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      populateLightbox(currentActiveIndex + 1);
    });
  }

  // Keyboard navigation for Lightbox & Esc to close
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      populateLightbox(currentActiveIndex - 1);
    } else if (e.key === 'ArrowRight') {
      populateLightbox(currentActiveIndex + 1);
    }
  });

  // ------------------------------------------------------------------------
  // 7. CONTACT FORM VALIDATION & INTERACTIVE FEEDBACK
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userMessage = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitBtn');
  const formStatusAlert = document.getElementById('formStatusAlert');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, errorEl, condition, errorMessage) => {
    if (!condition) {
      input.classList.add('invalid');
      errorEl.textContent = errorMessage;
      return false;
    } else {
      input.classList.remove('invalid');
      errorEl.textContent = '';
      return true;
    }
  };

  if (contactForm) {
    // Real-time input cleaning
    userName.addEventListener('input', () => {
      if (userName.value.trim().length >= 2) {
        userName.classList.remove('invalid');
        nameError.textContent = '';
      }
    });

    userEmail.addEventListener('input', () => {
      if (emailRegex.test(userEmail.value.trim())) {
        userEmail.classList.remove('invalid');
        emailError.textContent = '';
      }
    });

    userMessage.addEventListener('input', () => {
      if (userMessage.value.trim().length >= 8) {
        userMessage.classList.remove('invalid');
        messageError.textContent = '';
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(
        userName,
        nameError,
        userName.value.trim().length >= 2,
        'Please enter your name (at least 2 characters).'
      );

      const isEmailValid = validateField(
        userEmail,
        emailError,
        emailRegex.test(userEmail.value.trim()),
        'Please enter a valid email address.'
      );

      const isMessageValid = validateField(
        userMessage,
        messageError,
        userMessage.value.trim().length >= 8,
        'Please write a short message (at least 8 characters).'
      );

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
      }

      // If valid, show loading state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending message...</span>';

      // Check if form has a Formspree endpoint or is demo mode
      const formAction = contactForm.getAttribute('action');

      if (formAction && formAction.startsWith('https://formspree.io')) {
        // Send via AJAX to Formspree
        const formData = new FormData(contactForm);
        fetch(formAction, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            handleSuccess();
          } else {
            handleError('Could not send message through form service. Please email directly.');
          }
        })
        .catch(err => {
          handleError('Network error. Please email directly at sulavdhital134@gmail.com');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        });
      } else {
        // Front-end simulation demonstration
        setTimeout(() => {
          handleSuccess();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }, 800);
      }

      function handleSuccess() {
        formStatusAlert.className = 'form-status-alert success';
        formStatusAlert.textContent = '✓ Thank you! Your message has been prepared successfully. Sulav will get back to you shortly!';
        formStatusAlert.style.display = 'block';

        showToast('Message sent successfully! 🎉', 'success');
        contactForm.reset();

        setTimeout(() => {
          formStatusAlert.style.display = 'none';
        }, 6000);
      }

      function handleError(msg) {
        formStatusAlert.className = 'form-status-alert error';
        formStatusAlert.textContent = msg;
        formStatusAlert.style.display = 'block';
        showToast(msg, 'error');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------------------
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '⚡' : 'ℹ️'}</span>
      <span class="toast-text">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // ------------------------------------------------------------------------
  // 9. BACK TO TOP SMOOTH SCROLL
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
