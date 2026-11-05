/* Teqnikal Studios — GA4 event tracking.
 * Sends only fixed, non-personal values (event names, button labels, the
 * contact form's dropdown category, the package price). Never reads or sends
 * name, business, email, phone or message fields.
 */
(function () {
  'use strict';
  if (window.__tsAnalytics) return;
  window.__tsAnalytics = true;

  var CONTACT_ENDPOINT = 'n8n.teqnikalstudios.com/webhook/teqnikal-contact';
  var NEED_OPTIONS = ['A new website', 'Website management', 'Business automation', 'TEQNIKAL OS demo', 'Something custom'];
  var lastNeed = 'unknown';

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function cleanLabel(el) {
    return (el.textContent || '').replace(/[↗↑×]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
  }

  function sectionOf(el) {
    var s = el.closest('section[id], header, footer');
    if (!s) return 'page';
    return s.id || s.tagName.toLowerCase();
  }

  // Free website preview: matches a dropdown option containing "preview".
  function isPreviewNeed(need) { return /preview/i.test(need) && !/os demo/i.test(need); }

  // 1. Remember the dropdown category (only) when the contact form is submitted.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.elements) return;
    var sel = form.elements.namedItem('need');
    var v = sel && sel.value ? String(sel.value) : '';
    lastNeed = (NEED_OPTIONS.indexOf(v) > -1 || isPreviewNeed(v)) ? v : 'other';
  }, true);

  // 2. Count a lead only after the webhook confirms success.
  var origFetch = window.fetch;
  if (typeof origFetch === 'function') {
    window.fetch = function (input, init) {
      var p = origFetch.apply(this, arguments);
      try {
        var url = String((input && input.url) || input || '');
        var method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
        if (method === 'POST' && url.indexOf(CONTACT_ENDPOINT) > -1) {
          var need = lastNeed;
          p.then(function (res) {
            if (!res || !res.ok) return;
            return res.clone().json().then(function (data) {
              if (!data || !data.ok) return;
              track('generate_lead', { form_name: 'contact', lead_type: need });
              if (isPreviewNeed(need)) track('free_preview_request', { method: 'contact_form' });
            });
          }).catch(function () {});
        }
      } catch (err) { /* never break the site */ }
      return p;
    };
  }

  // 3. Button clicks.
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var label = cleanLabel(el);

    // Get Started -> Stripe Checkout
    if (/^https:\/\/(buy|checkout)\.stripe\.com\//i.test(href)) {
      var priceEl = el.closest('.price');
      var strong = priceEl && priceEl.querySelector('strong');
      var value = strong ? parseFloat(strong.textContent.replace(/[^0-9.]/g, '')) : NaN;
      track('get_started_click', { link_text: label, section: sectionOf(el) });
      var params = { currency: 'USD', items: [{ item_id: 'website-setup', item_name: 'Website Setup', quantity: 1 }] };
      if (!isNaN(value)) { params.value = value; params.items[0].price = value; }
      track('begin_checkout', params);
      return;
    }

    // Any element tagged for a free preview request (future CTA hook).
    if (el.getAttribute('data-track') === 'free-preview') {
      track('free_preview_request', { method: 'cta', link_text: label });
      return;
    }

    // Other calls to action that lead to the contact form.
    if (el.classList.contains('button') && href === '#contact') {
      track('cta_click', { link_text: label, section: sectionOf(el) });
    }
  }, true);
})();
