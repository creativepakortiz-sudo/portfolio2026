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
  document.getElementById('hamburger').setAttribute('aria-label', lang === 'es' ? 'Abrir menú' : 'Toggle menu');
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

// Detect when nav-primary becomes sticky using IntersectionObserver
(function() {
  var nav = document.getElementById('nav');
  var cta = document.getElementById('mobileCta');
  if (!nav) return;

  // Sentinel: invisible element placed just above the nav inside the hero
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;height:1px;width:100%;pointer-events:none;';
  nav.parentElement.insertBefore(sentinel, nav);

  var observer = new IntersectionObserver(function(entries) {
    var isSticky = !entries[0].isIntersecting;
    nav.classList.toggle('is-sticky', isSticky);

    if (cta && window.innerWidth <= 768) {
      var distFromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight;
      var show = isSticky && distFromBottom > 200;
      cta.style.opacity = show ? '1' : '0';
      cta.style.pointerEvents = show ? 'auto' : 'none';
    }
  }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

  observer.observe(sentinel);

  // Also update CTA on scroll for the distFromBottom check
  window.addEventListener('scroll', function() {
    if (!cta || window.innerWidth > 768) return;
    var isSticky = nav.classList.contains('is-sticky');
    var distFromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight;
    var show = isSticky && distFromBottom > 200;
    cta.style.opacity = show ? '1' : '0';
    cta.style.pointerEvents = show ? 'auto' : 'none';
  }, { passive: true });
})();

// Mobile nav top-row (nav-identity) hide on scroll, show after 3s idle or on scroll up
(function(){
  var topRow=document.getElementById('navIdentity');
  if(!topRow)return;
  var lastY=window.scrollY;
  var hideTimer=null;
  var isMobile=function(){return window.innerWidth<=768;};
  function showTopRow(){topRow.style.opacity='1';topRow.style.pointerEvents='';}
  function hideTopRow(){topRow.style.opacity='0';topRow.style.pointerEvents='none';}
  function resetTimer(){clearTimeout(hideTimer);hideTimer=setTimeout(showTopRow,3000);}
  window.addEventListener('scroll',function(){
    if(!isMobile())return;
    var y=window.scrollY;
    if(y<=10){showTopRow();clearTimeout(hideTimer);lastY=y;return;}
    if(y<lastY){showTopRow();clearTimeout(hideTimer);}
    else if(y>lastY){hideTopRow();resetTimer();}
    lastY=y;
  },{passive:true});
})();

// Hamburger menu
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
function toggleMenu(open){
  hamburger.classList.toggle('open',open);
  mobileMenu.classList.toggle('open',open);
  hamburger.setAttribute('aria-expanded',String(open));
  document.body.style.overflow=open?'hidden':'';
}
hamburger.addEventListener('click',()=>toggleMenu(!hamburger.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});
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
