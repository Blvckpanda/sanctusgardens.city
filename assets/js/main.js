/* =====================================================================
   Sanctus Gardens City — Core JS
   Canvas particle hero, smooth scroll, reveals, masterplan,
   panorama, modals, drawer, accordion, forms
   ===================================================================== */

/* ---------- Progressive enhancement: mark JS active ---------- */
document.documentElement.classList.add('js-enabled');

/* ---------- Canvas particle engine (NEOM-style hero) ---------- */
function initHeroParticles(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const MAX = 80;

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = 0.8 + Math.random() * 2.2;
      this.dx = (Math.random() - 0.5) * 0.3;
      this.dy = -0.1 - Math.random() * 0.2;
      this.alpha = 0.15 + Math.random() * 0.35;
      this.hue = Math.random() > 0.7 ? 1 : 0; // gold if hue=1
    }
    update() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.y < -10 || this.x < -10 || this.x > w + 10) this.reset();
      if (this.y > h + 10) this.y = -10;
    }
    draw() {
      if (this.hue) {
        ctx.fillStyle = `rgba(220, 192, 122, ${this.alpha})`;
      } else {
        ctx.fillStyle = `rgba(200, 220, 210, ${this.alpha * 0.8})`;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < MAX; i++) {
      const p = new Particle();
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      particles.push(p);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    // draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.strokeStyle = `rgba(220, 220, 210, ${0.03 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', resize);
}

/* ---------- Run particle engine on any hero canvas ---------- */
const heroCanvas = document.querySelector('.hero__canvas');
if (heroCanvas) initHeroParticles(heroCanvas);

/* ---------- Header solid state + mobile nav ---------- */
const header = document.querySelector('.site-header');
const body = document.body;

function updateHeader() {
  if (!header) return;
  const scrolled = window.scrollY > 10;
  header.classList.toggle('is-solid', scrolled);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    body.classList.toggle('nav-open');
  });
  // Close on mobile link click
  document.querySelectorAll('.mobile-nav__link').forEach(a => {
    a.addEventListener('click', () => body.classList.remove('nav-open'));
  });
}

/* ---------- Reveal animations ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Stagger groups */
document.querySelectorAll('.reveal-stagger').forEach(group => {
  Array.from(group.children).forEach(c => {
    if (!c.classList.contains('reveal')) c.classList.add('reveal');
  });
  revealObserver.observe(group);
});

/* ---------- Masterplan ---------- */
const masterplan = document.querySelector('.masterplan');
const stage = masterplan ? masterplan.querySelector('.masterplan__stage') : null;
const svgWrap = masterplan ? masterplan.querySelector('.svg-stage') : null;

if (masterplan && stage && svgWrap) {
  let scale = 1, x = 0, y = 0;
  let isDragging = false, startX = 0, startY = 0;

  function setTransform() {
    svgWrap.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  // Hover on districts
  const districts = masterplan.querySelectorAll('.district');
  masterplan.addEventListener('pointermove', e => {
    const hit = e.target.closest('.district');
    districts.forEach(d => d.classList.toggle('is-hover', d === hit));
    masterplan.classList.toggle('has-hover', !!hit);
  });

  // Click districts -> open drawer
  districts.forEach(d => {
    d.addEventListener('click', e => {
      e.stopPropagation();
      const id = d.getAttribute('data-district');
      if (id && window.SGC_DISTRICTS) openDrawer(id);
    });
  });

  // Tooltip
  const tooltip = masterplan.querySelector('.masterplan__tooltip');
  if (tooltip) {
    districts.forEach(d => {
      d.addEventListener('mouseenter', () => {
        tooltip.querySelector('span').textContent = d.getAttribute('data-tag') || '';
        tooltip.querySelector('h6').textContent = d.getAttribute('data-name') || '';
        tooltip.classList.add('is-visible');
      });
      d.addEventListener('mousemove', e => {
        const r = masterplan.getBoundingClientRect();
        tooltip.style.left = (e.clientX - r.left) + 'px';
        tooltip.style.top = (e.clientY - r.top) + 'px';
      });
      d.addEventListener('mouseleave', () => tooltip.classList.remove('is-visible'));
    });
  }

  // Zoom
  const zoomIn = masterplan.querySelector('.mp-zoom-in');
  const zoomOut = masterplan.querySelector('.mp-zoom-out');
  const resetBtn = masterplan.querySelector('.mp-reset');
  function zoomBy(delta) {
    scale = Math.min(2.4, Math.max(1, scale * delta));
    setTransform();
  }
  zoomIn?.addEventListener('click', () => zoomBy(1.15));
  zoomOut?.addEventListener('click', () => zoomBy(0.87));
  resetBtn?.addEventListener('click', () => { scale = 1; x = 0; y = 0; setTransform(); });

  // Pan
  stage.addEventListener('pointerdown', e => {
    isDragging = true;
    startX = e.clientX - x;
    startY = e.clientY - y;
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => {
    if (!isDragging) return;
    x = e.clientX - startX;
    y = e.clientY - startY;
    setTransform();
  });
  stage.addEventListener('pointerup', e => {
    isDragging = false;
    stage.releasePointerCapture(e.pointerId);
  });
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    zoomBy(e.deltaY > 0 ? 0.92 : 1.08);
  }, { passive: false });
}

/* ---------- District data (for drawer + district page) ---------- */
window.SGC_DISTRICTS = {
  residential: {
    tag: 'Residential District',
    title: 'Waterfront Living Quarters',
    desc: 'Low-density waterfront estates, mid-rise garden apartments, and townhomes organized around quiet courts and pocket parks.',
    infra: 'Underground utilities, EV-ready parking, district cooling-ready lots, fiber to every unit.',
    tags: ['Waterfront', 'Family Homes', 'Garden Apartments', 'Townhomes'],
    opps: ['Freehold land plots (600-1,200 m²)', 'Pre-construction pricing', 'Bulk acquisition (10+ units)', 'Design + Build packages']
  },
  commercial: {
    tag: 'Commercial & Business District',
    title: "Port Harcourt's New Business Address",
    desc: 'Grade-A offices, hybrid work hubs, boutique hotels, and lifestyle retail facing a central civic plaza.',
    infra: 'Raised floors, 1.8kW/m² power density, chilled beam HVAC, 24/7 security, backup generation.',
    tags: ['Grade-A Office', 'Retail', 'Hotel', 'Civic Plaza'],
    opps: ['Office floors (500-2,500 m²)', 'Ground-floor retail (80-300 m²)', 'Hotel operator partnership', 'Naming rights for plaza']
  },
  leisure: {
    tag: 'Leisure & Recreation District',
    title: 'The Waterfront Quarter',
    desc: 'A car-light promenade linking marinas, parks, restaurants, and cultural venues.',
    infra: 'Wide shaded promenades, kayak launch, event power/water hooks, public Wi-Fi.',
    tags: ['Marina', 'Parks', 'Restaurants', 'Events'],
    opps: ['F&B pads (120-400 m²)', 'Marina slips (ownership/lease)', 'Event programming partnership', 'Wellness operator']
  },
  innovation: {
    tag: 'Innovation & Research District',
    title: 'The Delta Lab',
    desc: 'Applied research and light tech make-up. Prototyping labs, incubator spaces, and demonstration sites.',
    infra: '3-phase power, high-bay labs (6m), loading bays, fiber redundancy.',
    tags: ['Labs', 'Incubator', 'Climate-Tech', 'Training'],
    opps: ['Lab suites (400-1,500 m²)', 'Incubator equity partnership', 'Corporate innovation floors']
  },
  landmark: {
    tag: 'Landmark District',
    title: 'Sanctus Tower & The Conservatory',
    desc: "The city's symbolic core: a 325m+ landmark tower and an adjacent glasshouse conservatory.",
    infra: 'High-speed vertical transport, event levels, sky lobby, MEP rooftop.',
    tags: ['Iconic', 'Observation', 'Hospitality', 'Civic'],
    opps: ['Observation concession', 'Restaurant/operator RFP', 'Event licensing']
  }
};

/* ---------- Drawer ---------- */
const drawer = document.querySelector('.drawer');
const drawerClose = document.querySelector('.drawer__close');
const scrim = document.querySelector('.scrim');

function openDrawer(id) {
  if (!drawer) return;
  const data = window.SGC_DISTRICTS[id];
  if (!data) return;

  drawer.querySelector('.drawer__sub').textContent = data.tag;
  drawer.querySelector('.drawer__title').textContent = data.title;
  drawer.querySelector('.drawer__text').innerHTML =
    `<p>${data.desc}</p>${data.infra ? `<p style="margin-top:0.8rem"><strong>Infrastructure:</strong> ${data.infra}</p>` : ''}`;

  const chips = drawer.querySelector('.drawer__chips');
  chips.innerHTML = data.tags.map(t => `<span class="chip">${t}</span>`).join('');

  const list = drawer.querySelector('.drawer__list');
  list.innerHTML = data.opps.map(o => `<li><span>${o}</span></li>`).join('');

  drawer.classList.add('is-open');
  scrim?.classList.add('is-open');
  body.classList.add('drawer-open');
}

drawerClose?.addEventListener('click', closeDrawer);
scrim?.addEventListener('click', closeDrawer);
function closeDrawer() {
  drawer?.classList.remove('is-open');
  scrim?.classList.remove('is-open');
  body.classList.remove('drawer-open');
}

/* ---------- Panorama ---------- */
document.querySelectorAll('.panorama').forEach(pano => {
  const scene = pano.querySelector('.panorama__scene');
  const progress = pano.querySelector('.panorama__progress i');
  if (!scene) return;
  let dragging = false, lastX = 0, pos = 0;

  pano.addEventListener('pointerdown', e => {
    dragging = true; lastX = e.clientX;
    pano.setPointerCapture(e.pointerId);
    pano.classList.add('dragging');
  });
  pano.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX; pos += dx;
    const max = scene.offsetWidth - pano.clientWidth;
    pos = Math.max(-max/2, Math.min(max/2, pos));
    scene.style.transform = `translateX(${pos}px)`;
    if (progress) progress.style.width = `${50 + (pos / Math.max(max/2,1)) * 50}%`;
  });
  pano.addEventListener('pointerup', e => {
    dragging = false;
    pano.releasePointerCapture(e.pointerId);
    pano.classList.remove('dragging');
  });
});

/* ---------- Modal (gated invest info) ---------- */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('is-open');
  body.classList.add('modal-open');
}
function closeModal(modal) {
  if (typeof modal === 'string') modal = document.getElementById(modal);
  modal?.classList.remove('is-open');
  body.classList.remove('modal-open');
}
window.openModal = openModal;
window.closeModal = closeModal;

document.querySelectorAll('.modal').forEach(modal => {
  modal.querySelector('.modal__scrim')?.addEventListener('click', () => closeModal(modal));
  modal.querySelector('.modal__close')?.addEventListener('click', () => closeModal(modal));

  const form = modal.querySelector('.unlock-form');
  const locked = modal.querySelector('.modal__locked');
  const unlocked = modal.querySelector('.modal__unlocked');
  if (!form || !locked || !unlocked) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    form.closest('.modal__body')?.classList.add('sending');
    setTimeout(() => {
      form.closest('.modal__body')?.classList.remove('sending');
      locked.style.display = 'none';
      unlocked.style.display = 'grid';
    }, 900);
  });
});

/* ---------- Consultation forms ---------- */
document.querySelectorAll('.consult-form').forEach(form => {
  const success = form.querySelector('.form-success');
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.classList.add('sending');
    setTimeout(() => {
      form.classList.remove('sending');
      form.reset();
      if (success) { form.style.display = 'none'; success.style.display = 'block'; }
      else { window.location.href = 'thank-you.html'; }
    }, 900);
  });
});

/* ---------- Accordion ---------- */
document.querySelectorAll('.acc').forEach(acc => {
  acc.addEventListener('click', e => {
    const item = e.target.closest('.acc__item');
    if (!item) return;
    const isOpen = item.classList.contains('is-open');
    acc.querySelectorAll('.acc__item').forEach(it => {
      it.classList.remove('is-open');
      const panel = it.querySelector('.acc__panel');
      if (panel) panel.style.maxHeight = '0';
    });
    if (!isOpen) {
      item.classList.add('is-open');
      const panel = item.querySelector('.acc__panel');
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

/* ---------- District page loader ---------- */
(function loadDistrict() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id || !window.location.pathname.endsWith('district.html')) return;

  const d = window.SGC_DISTRICTS[id];
  if (!d) return;

  document.title = d.title + ' - Sanctus Gardens City';
  const g = (el) => document.getElementById(el);

  g('district-label') && (g('district-label').textContent = id.charAt(0).toUpperCase() + id.slice(1));
  g('district-title') && (g('district-title').textContent = d.title);
  g('district-sub') && (g('district-sub').textContent = d.desc.replace(/<[^>]*>/g, ''));
  g('district-eyebrow') && (g('district-eyebrow').textContent = d.tag);
  g('district-heading') && (g('district-heading').textContent = d.title);
  g('district-lead') && (g('district-lead').textContent = d.desc.replace(/<[^>]*>/g, ''));
  g('district-badge') && (g('district-badge').textContent = d.tags[0] || d.tag);
  g('district-crumbs') && (g('district-crumbs').innerHTML =
    '<a href="index.html">Home</a><span>/</span><a href="masterplan.html">Masterplan</a><span>/</span><span>' + d.tag + '</span>');
  g('district-opps') && (g('district-opps').innerHTML =
    d.opps.map(o => '<div class="pillar"><h3>' + o.split('(')[0].trim() + '</h3><p class="soft mt-1">' + o + '</p></div>').join(''));
})();

console.log('SGC site loaded - ' + new Date().toLocaleDateString());
