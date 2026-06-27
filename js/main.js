/* =========================================================
   ANP Ar Condicionado — Interações
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP = '5511947219058';

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: sombra ao rolar ---------- */
  var header = document.getElementById('header');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 20);
    if (toTop) toTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Voltar ao topo ---------- */
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  var navClose = document.getElementById('navClose');
  var navBackdrop = document.getElementById('navBackdrop');

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    if (navBackdrop) navBackdrop.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function closeNav() { setNav(false); }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('open'));
    });
    if (navClose) navClose.addEventListener('click', closeNav);
    if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Contador de stats ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ---------- Nav ativo conforme seção ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav__link');
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Lightbox (galeria de trabalhos + cases) ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var group = [];
  var current = 0;

  function showLb(i) {
    if (!group.length) return;
    current = (i + group.length) % group.length;
    var it = group[current];
    lbImg.src = it.src;
    lbImg.alt = it.alt || '';
    lbCaption.textContent = it.cap || '';
  }
  function openLb(arr, i) {
    group = arr;
    showLb(i);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

  if (lb) {
    /* Galeria de trabalhos */
    var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
    var galleryGroup = galleryItems.map(function (item) {
      var img = item.querySelector('img');
      var cap = item.querySelector('figcaption');
      return { src: img.src, alt: img.alt, cap: cap ? cap.textContent : '' };
    });
    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openLb(galleryGroup, i); });
    });

    /* Cases de sucesso — cada card abre a galeria da sua obra */
    document.querySelectorAll('.case').forEach(function (card) {
      var shots = Array.prototype.slice.call(card.querySelectorAll('.case__shots span')).map(function (s) {
        return { src: s.getAttribute('data-src'), alt: s.getAttribute('data-alt'), cap: s.getAttribute('data-cap') };
      });
      card.addEventListener('click', function () { if (shots.length) openLb(shots, 0); });
    });

    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', function () { showLb(current - 1); });
    lbNext.addEventListener('click', function () { showLb(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') showLb(current - 1);
      if (e.key === 'ArrowRight') showLb(current + 1);
    });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = (form.nome.value || '').trim();
      var telefone = (form.telefone.value || '').trim();
      var assunto = form.assunto.value || '';
      var mensagem = (form.mensagem.value || '').trim();

      if (!nome || !telefone) {
        if (!nome) form.nome.focus();
        else form.telefone.focus();
        return;
      }

      var texto = 'Olá! Meu nome é ' + nome + '.';
      texto += '\nServiço: ' + assunto + '.';
      if (mensagem) texto += '\n' + mensagem;
      texto += '\nTelefone para contato: ' + telefone + '.';

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto);
      window.open(url, '_blank', 'noopener');
    });
  }
})();
