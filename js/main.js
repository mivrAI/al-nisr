// Al Nisr Premium Website JS
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll
  const nav = document.querySelector('.an-navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Scroll animations
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => obs.observe(el));
  }

  // Counter animation
  document.querySelectorAll('[data-count]').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current + suffix;
          }, 25);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // Product filter
  document.querySelectorAll('.product-filters .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.product-filters .btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      document.querySelectorAll('.product-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // Quote form steps
  const nextBtns = document.querySelectorAll('.btn-next-step');
  const prevBtns = document.querySelectorAll('.btn-prev-step');
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.querySelector('.quote-step-panel.active');
      const next = current.nextElementSibling;
      if (next && next.classList.contains('quote-step-panel')) {
        current.classList.remove('active');
        next.classList.add('active');
        updateStepIndicators();
      }
    });
  });
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.querySelector('.quote-step-panel.active');
      const prev = current.previousElementSibling;
      if (prev && prev.classList.contains('quote-step-panel')) {
        current.classList.remove('active');
        prev.classList.add('active');
        updateStepIndicators();
      }
    });
  });

  function updateStepIndicators() {
    const panels = document.querySelectorAll('.quote-step-panel');
    const circles = document.querySelectorAll('.quote-step-circle');
    panels.forEach((panel, i) => {
      if (circles[i]) {
        circles[i].classList.remove('active', 'done');
        if (panel.classList.contains('active')) circles[i].classList.add('active');
        else if (i < [...panels].findIndex(p => p.classList.contains('active'))) circles[i].classList.add('done');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
