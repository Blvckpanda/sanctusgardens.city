/* =====================================================================
   Sanctus Gardens City — Form Handler
   Real form submissions via Web3Forms (configure ACCESS_KEY below)
   ===================================================================== */

// --- CONFIG ---
// Get your free access key at https://web3forms.com
// REPLACE THE EMPTY STRING BELOW with your actual Web3Forms access key:
// const WEB3FORMS_ACCESS_KEY = 'your-key-here';
const WEB3FORMS_ACCESS_KEY = '';

// Web3Forms endpoint (do not change unless using a different provider)
const ENDPOINT = 'https://api.web3forms.com/submit';

// Thank-you page redirect
const THANK_YOU_URL = 'thank-you.html';

// --- Form Handler ---
const SGC_FORMS = (() => {
  // --- CONFIG ---
  // Using global WEB3FORMS_ACCESS_KEY from top of file
  const ENDPOINT = 'https://api.web3forms.com/submit';
  const ACCESS_KEY = WEB3FORMS_ACCESS_KEY;

  // --- HELPERS ---
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function serializeForm(form) {
    const data = {};
    $$('input, select, textarea', form).forEach(el => {
      if (el.name && el.type !== 'checkbox') data[el.name] = el.value;
      if (el.name && el.type === 'checkbox') {
        if (el.checked) data[el.name] = el.value || 'on';
      }
    });
    return data;
  }

  function showStatus(form, msg) {
    const el = form.querySelector('.form-status');
    if (!el) return;
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
  }

  // --- DEMO MODE (no API key) ---
  function demoSuccess(form) {
    form.classList.remove('sending');
    form.classList.add('is-success');
    const success = form.querySelector('.form-success');
    if (success) {
      success.style.display = 'block';
      form.querySelector('.form-body')?.style.setProperty('display', 'none');
    }
    // If no inline success div, redirect to thank-you page
    if (!success) {
      setTimeout(() => { window.location.href = 'thank-you.html'; }, 400);
    }
  }

  // --- SUBMIT ---
  async function submitForm(form) {
    const btn = form.querySelector('button[type="submit"]');
    const origHTML = btn ? btn.innerHTML : '';

    showStatus(form, '');
    form.classList.add('sending');
    if (btn) btn.disabled = true;

    try {
      // Demo mode: skip the API call, simulate success
      if (isDemo) {
        if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
        demoSuccess(form);
        return;
      }

      const payload = serializeForm(form);

      // For Web3Forms, inject the access key if not already in the form
      if (ENDPOINT.includes('web3forms') && ACCESS_KEY && !payload.access_key) {
        payload.access_key = ACCESS_KEY;
      }

      // Add a redirect so the user lands on thank-you after success
      if (!payload.redirect) {
        payload.redirect = window.location.origin + '/thank-you.html';
      }

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (res.ok && json.success) {
        form.classList.remove('sending');
        form.classList.add('is-success');
        const success = form.querySelector('.form-success');
        if (success) {
          success.style.display = 'block';
          form.querySelector('.form-body')?.style.setProperty('display', 'none');
        }
        if (btn) btn.innerHTML = origHTML;
        if (btn) btn.disabled = false;

        // Fire analytics event
        if (window.posthog) {
          posthog.capture('form_submit', {
            form_id: form.id || 'unknown',
            form_name: form.getAttribute('data-name') || 'unknown'
          });
        }

        // If no inline success message, redirect after brief delay
        if (!success) {
          setTimeout(() => { window.location.href = 'thank-you.html'; }, 600);
        }
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      form.classList.remove('sending');
      if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
      showStatus(form, 'Something went wrong. Please email us directly at invest@sanctusgardens.city or try again.');
      console.error('Form error:', err);
    }
  }

  // Check if running in demo mode (no real API key)
  const isDemo = !ACCESS_KEY;

  if (isDemo) {
    console.warn('SGC Forms: Running in DEMO mode — no Web3Forms key configured. Get a free key at https://web3forms.com and set WEB3FORMS_ACCESS_KEY at top of forms.js');
  }

  // --- INIT ---
  function init() {
    $$('.sgc-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        submitForm(form);
      });
    });
  }

  return { init, submitForm };
})();

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SGC_FORMS.init());
} else {
  SGC_FORMS.init();
}
