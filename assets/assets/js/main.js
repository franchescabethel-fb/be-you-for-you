/* =========================================================
   BE YOU FOR YOU — shared site interactions
   Sticky nav state, mobile menu, scroll-reveal, form UX.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky nav ---------- */
  var nav = document.querySelector('.site-nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('active'); });
  }

  /* ---------- Forms: Formspree-ready with graceful inline success ----------
     Every <form data-form> in this site posts to a Formspree endpoint.
     Replace data-endpoint="https://formspree.io/f/REPLACE_ME" in each HTML
     file with your real Formspree form ID (matches the existing BYFY stack:
     Formspree -> Zapier -> Google Sheets). If JS fails for any reason the
     form still submits normally via its action attribute. */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var endpoint = form.getAttribute('data-endpoint') || form.getAttribute('action');
    var successBox = form.parentElement.querySelector('.form-success');

    form.addEventListener('submit', function (e) {
      if (!endpoint || endpoint.indexOf('REPLACE_ME') !== -1) {
        // No real endpoint wired yet — prevent a broken submit, show a friendly note.
        e.preventDefault();
        if (successBox) {
          successBox.textContent = 'Form is ready to wire up — add your Formspree endpoint to activate submissions.';
          successBox.classList.add('show');
        }
        return;
      }
      e.preventDefault();
      var data = new FormData(form);
      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          if (successBox) {
            successBox.textContent = 'Thank you! We’ll be in touch soon.';
            successBox.classList.add('show');
          }
        } else {
          if (successBox) {
            successBox.textContent = 'Something went wrong — please try again or email beyouforyou@shopmonets.com directly.';
            successBox.classList.add('show');
          }
        }
      }).catch(function () {
        if (successBox) {
          successBox.textContent = 'Something went wrong — please try again or email beyouforyou@shopmonets.com directly.';
          successBox.classList.add('show');
        }
      });
    });
  });

  /* ---------- Current-page nav highlight ---------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('current');
    }
  });

});
