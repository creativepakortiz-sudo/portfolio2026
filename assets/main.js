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
    slider.style.width = activeBtn.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + activeBtn.offsetLeft + 'px)';
  }
  // Mobile dual buttons: highlight active + move slider (same logic)
  var mobileBtnEn = document.getElementById('mobile-btn-en');
  var mobileBtnEs = document.getElementById('mobile-btn-es');
  if (mobileBtnEn) mobileBtnEn.classList.toggle('active', lang === 'en');
  if (mobileBtnEs) mobileBtnEs.classList.toggle('active', lang === 'es');
  var mobileSlider = document.getElementById('langSliderMobile');
  var mobileActiveBtn = lang === 'en' ? mobileBtnEn : mobileBtnEs;
  if (mobileSlider && mobileActiveBtn) {
    mobileSlider.style.width = mobileActiveBtn.offsetWidth + 'px';
    mobileSlider.style.transform = 'translateX(' + mobileActiveBtn.offsetLeft + 'px)';
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

// Nav shadow on scroll
window.addEventListener('scroll',()=>{const n=document.getElementById('nav');const hero=document.getElementById('home');const heroMid=hero?(hero.offsetTop+hero.offsetHeight/2):window.innerHeight/2;n.style.boxShadow=window.scrollY>heroMid?'0 8px 32px rgba(0,0,0,.08)':'none';
  // Hide sticky CTA when 200px from bottom of page
  const cta=document.getElementById('mobileCta');if(cta){const distFromBottom=document.body.scrollHeight-window.scrollY-window.innerHeight;cta.style.opacity=distFromBottom<200?'0':'1';cta.style.pointerEvents=distFromBottom<200?'none':'auto';}
});

// Mobile nav top-row hide on scroll, show after 3s idle or on scroll up
(function(){
  var topRow=document.querySelector('.nav-mobile-top');
  if(!topRow)return;
  var lastY=window.scrollY;
  var hideTimer=null;
  var isMobile=function(){return window.innerWidth<=768;};

  function showTopRow(){topRow.classList.remove('hidden');}
  function hideTopRow(){topRow.classList.add('hidden');}
  function resetTimer(){
    clearTimeout(hideTimer);
    hideTimer=setTimeout(showTopRow,3000);
  }

  window.addEventListener('scroll',function(){
    if(!isMobile())return;
    var y=window.scrollY;
    if(y<=10){showTopRow();clearTimeout(hideTimer);lastY=y;return;}
    if(y<lastY){// scroll up
      showTopRow();clearTimeout(hideTimer);
    }else if(y>lastY){// scroll down
      hideTopRow();resetTimer();
    }
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
