// Enhanced JS for navigation toggle, year, and contact form feedback
(function () {
  // Mobile nav toggle with class-based show/hide
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    const mq = window.matchMedia('(max-width: 720px)');
    const applyMode = () => {
      if (mq.matches) {
        nav.style.display = 'none';
        nav.dataset.mobile = 'true';
      } else {
        nav.style.display = 'flex';
        nav.dataset.mobile = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      }
    };
    applyMode();
    mq.addEventListener('change', applyMode);

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      const isMobile = nav.dataset.mobile === 'true';
      if (isMobile) nav.style.display = expanded ? 'none' : 'flex';
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (!expanded) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.style.display = 'none';
      }
    });

    // Close menu when a nav link is clicked (mobile)
    nav.addEventListener('click', (e) => {
      const isMobile = nav.dataset.mobile === 'true';
      if (!isMobile) return;
      const target = e.target;
      if (target && (target.closest && target.closest('a'))) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.style.display = 'none';
      }
    });
  }

  // Dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form (client-side only demo)
  const form = document.getElementById('contact-form');
  const statusEl = document.querySelector('.form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();

      if (!name || !email || !message) {
        setStatus('Please fill in all fields.', true);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('Please enter a valid email.', true);
        return;
      }

      // Simulate submission
      setStatus('Sending...', false);
      setTimeout(() => {
        setStatus('Thanks! Your message has been sent & Please contact through phone number.', false);
        form.reset();
      }, 700);
    });
  }

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? '#ff8080' : '#9fb0c0';
  }
})();
