/**
 * Main JavaScript logic for Peter Rodionov Official Website
 * Features: Mobile Nav Drawer, Header Scroll state, Interactive Accordions, Scroll Reveal, Form Validation, Glow Physics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Drawer Toggle (Universal support for stage header)
  const mobileToggle = document.querySelector('.stage-mobile-toggle') || document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.stage-mobile-drawer') || document.querySelector('.mobile-nav-drawer');
  const mobileBackdrop = document.querySelector('.stage-mobile-backdrop');

  function toggleDrawer() {
    const isOpen = mobileDrawer?.classList.toggle('open');
    mobileToggle?.classList.toggle('active', isOpen);
    mobileBackdrop?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    mobileToggle?.classList.remove('active');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  mobileBackdrop?.addEventListener('click', closeDrawer);

  // Close on link click inside drawer
  const drawerLinks = mobileDrawer?.querySelectorAll('a');
  drawerLinks?.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. High-End Precision Scroll Reveal with Intersection Observer
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Subtle Cursor Glow Physics only on small interactive bento cards (NOT on hero)
  const glowCards = document.querySelectorAll('.airy-card, .media-quote-card');
  glowCards.forEach(card => {
    card.classList.add('interactive-hover-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 6. Media Filter System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const mediaCards = document.querySelectorAll('.media-filter-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      mediaCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 7. Interactive Form Handlers (Mock with validation & success state)
  const contactForms = document.querySelectorAll('.contact-form-async');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Отправка...';
      }

      setTimeout(() => {
        form.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--accent-emerald); border-radius: var(--radius-md); padding: 32px; text-align: center;">
            <div style="font-size: 2.5rem; color: var(--accent-emerald); margin-bottom: 12px;">✓</div>
            <h3 style="color: #ffffff; margin-bottom: 8px;">Сообщение успешно отправлено!</h3>
            <p style="color: var(--text-secondary); margin: 0 auto;">Пресс-служба и секретариат Петра Петровича Родионова свяжутся с вами в ближайшее рабочее время.</p>
          </div>
        `;
      }, 1000);
    });
  });
});
