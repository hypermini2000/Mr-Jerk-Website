// Navigation scroll effect
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Lightbox
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => observer.observe(el));

// Catering Form — Formspree submission
const cateringForm = document.getElementById('cateringForm');
const formStatus = document.getElementById('cateringFormStatus');

if (cateringForm) {
  cateringForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = cateringForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.textContent = '';

    const data = new FormData(cateringForm);

    try {
      const res = await fetch('https://formspree.io/f/mrjerk-catering', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        formStatus.style.color = '#86efac';
        formStatus.textContent = '\u2713 Request sent! We will contact you within 24 hours.';
        cateringForm.reset();
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      formStatus.style.color = '#fca5a5';
      formStatus.textContent = 'Something went wrong. Please call us at 416-491-3593.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get My Custom Quote';
    }
  });
}
