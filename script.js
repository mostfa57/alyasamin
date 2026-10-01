'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
  navigation?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'فتح القائمة');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
      card.setAttribute('tabindex', visible ? '0' : '-1');
      card.setAttribute('aria-hidden', String(!visible));
    });
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.dataset.title || '';
    lightboxCaption.textContent = card.dataset.title || '';
    lightbox.showModal();
  });
});

lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox?.addEventListener('close', () => {
  if (lightboxImage) lightboxImage.src = '';
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.intro-grid, .service-item, .project-card, .contact-card');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
