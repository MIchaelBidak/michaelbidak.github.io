/* The Bidak Group — site.js
   Header solidify · mobile menu · nav dropdown · accordion ·
   cursor gradient · reveal-on-scroll. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Sticky header: transparent over hero -> solid white on scroll ---- */
  var header = document.querySelector('.site-header');
  function setHeaderState() {
    if (!header) return;
    if (window.scrollY > 60 || document.body.classList.contains('menu-open')) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }
  }
  window.addEventListener('scroll', setHeaderState, { passive: true });
  setHeaderState();

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      setHeaderState();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
        setHeaderState();
      }
    });
    // Close the overlay when a link inside it is chosen
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Services dropdown: click-toggle (hover handled in CSS) ---- */
  document.querySelectorAll('.nav-drop > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var drop = btn.parentElement;
      var open = drop.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-drop.open').forEach(function (d) {
      d.classList.remove('open');
      var b = d.querySelector('button');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Accordion (first item pre-opened via .open in HTML) ---- */
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.acc-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var icon = btn.querySelector('.acc-icon');
      if (icon) icon.textContent = open ? '−' : '+';
    });
  });

  /* ---- Cursor-following radial gradient on the services grid band ---- */
  var grad = document.querySelector('.grid-gradient');
  if (grad && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    grad.addEventListener('mousemove', function (e) {
      var r = grad.getBoundingClientRect();
      grad.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      grad.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  /* ---- Reveal on scroll ---- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
  }
})();
