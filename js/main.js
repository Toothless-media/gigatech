/* ==============================================
   Gigatech Solutions — Main JavaScript
   Handles: mobile nav, active nav links, contact form
   ============================================== */

(function () {
  'use strict';

  /* ------------------------------------------
     Mobile Navigation Toggle
  ------------------------------------------ */
  const toggle  = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (toggle && navMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('open');
      navMenu.classList.toggle('open', !isOpen);
      toggle.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close mobile nav when a link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) {
        navMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ------------------------------------------
     Active Navigation Highlighting
     Marks the current page's nav link as active
  ------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });


  /* ------------------------------------------
     Contact Form — Static site demo handler
     Replace the form action with your endpoint
     (e.g., Formspree, Netlify Forms, etc.)
     to process real submissions.
  ------------------------------------------ */
  const contactForm    = document.getElementById('contact-form');
  const formContainer  = document.getElementById('form-container');
  const formSuccess    = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic client-side validation
      const requiredFields = contactForm.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(function (field) {
        // Reset prior state
        field.style.borderColor = '';

        if (!field.value.trim()) {
          field.style.borderColor = '#dc2626';
          valid = false;
        }

        // Simple email format check
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            field.style.borderColor = '#dc2626';
            valid = false;
          }
        }
      });

      if (!valid) return;

      // -----------------------------------------------
      // To process real form submissions, replace this
      // block with a fetch() call to your form endpoint.
      //
      // Example (Formspree):
      //   const formData = new FormData(contactForm);
      //   fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //     method: 'POST',
      //     body: formData,
      //     headers: { 'Accept': 'application/json' }
      //   }).then(() => showSuccess());
      // -----------------------------------------------

      showSuccess();
    });

    function showSuccess() {
      if (formContainer && formSuccess) {
        formContainer.style.display = 'none';
        formSuccess.classList.add('visible');
      }
    }
  }

})();
