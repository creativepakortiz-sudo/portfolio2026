// ── i18n ──────────────────────────────────────────────────────────────────
var currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var val = el.getAttribute('data-' + lang);
    if (val !== null) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    var val = el.getAttribute('data-' + lang);
    if (val !== null) el.innerHTML = val;
  });
  // Desktop dual buttons: highlight active + move slider
  var btnEn = document.getElementById('desktop-btn-en');
  var btnEs = document.getElementById('desktop-btn-es');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');
  if (btnEs) btnEs.classList.toggle('active', lang === 'es');
  var slider = document.getElementById('langSlider');
  var activeBtn = lang === 'en' ? btnEn : btnEs;
  if (slider && activeBtn) {
    var pad = parseFloat(getComputedStyle(activeBtn.parentElement).paddingLeft) || 3;
    slider.style.width = activeBtn.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + (activeBtn.offsetLeft - pad) + 'px)';
  }
  // Mobile dual buttons: highlight active + move slider
  var mobileBtnEn = document.getElementById('mobile-btn-en');
  var mobileBtnEs = document.getElementById('mobile-btn-es');
  if (mobileBtnEn) mobileBtnEn.classList.toggle('active', lang === 'en');
  if (mobileBtnEs) mobileBtnEs.classList.toggle('active', lang === 'es');
  var mobileSlider = document.getElementById('langSliderMobile');
  var mobileActiveBtn = lang === 'en' ? mobileBtnEn : mobileBtnEs;
  if (mobileSlider && mobileActiveBtn) {
    var mpad = parseFloat(getComputedStyle(mobileActiveBtn.parentElement).paddingLeft) || 3;
    mobileSlider.style.width = mobileActiveBtn.offsetWidth + 'px';
    mobileSlider.style.transform = 'translateX(' + (mobileActiveBtn.offsetLeft - mpad) + 'px)';
  }
}

function toggleLang(lang) {
  currentLang = lang !== undefined ? lang : (currentLang === 'en' ? 'es' : 'en');
  localStorage.setItem('lang', currentLang);
  applyLang(currentLang);
}

document.addEventListener('DOMContentLoaded', function() {
  applyLang(currentLang);
  // Init desktop slider without transition on first render
  var slider = document.getElementById('langSlider');
  if (slider) {
    slider.style.transition = 'none';
    applyLang(currentLang);
    requestAnimationFrame(function() { slider.style.transition = ''; });
  }
  // Init mobile slider without transition on first render
  var mobileSlider = document.getElementById('langSliderMobile');
  if (mobileSlider) {
    mobileSlider.style.transition = 'none';
    applyLang(currentLang);
    requestAnimationFrame(function() { mobileSlider.style.transition = ''; });
  }
});

// ── Tabs
function switchTab(btn,tabId){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));btn.classList.add('active');document.getElementById('tab-'+tabId).classList.add('active')}

// Reveal on scroll
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Nav shadow: add .is-sticky once nav-identity has scrolled out
(function() {
  var nav = document.getElementById('nav');
  var identity = document.getElementById('navIdentity');
  if (!nav || !identity) return;
  function update() {
    nav.classList.toggle('is-sticky', window.scrollY >= identity.offsetHeight);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Case study modal ──────────────────────────────────────────────────────
function openCaseStudy(url) {
  var modal = document.getElementById('csModal');
  var frame = document.getElementById('csFrame');
  frame.src = url;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCaseStudy() {
  var modal = document.getElementById('csModal');
  var frame = document.getElementById('csFrame');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(function() { frame.src = ''; }, 350);
}
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('csModal');
  if (!modal) return;
  modal.addEventListener('click', function(e) { if (e.target === this) closeCaseStudy(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeCaseStudy(); });
});
