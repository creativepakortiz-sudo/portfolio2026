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
  // Desktop toggle: shows the opposite lang
  var toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'en' ? 'ES' : 'EN';
  // Mobile buttons: highlight active
  var btnEn = document.getElementById('mobile-btn-en');
  var btnEs = document.getElementById('mobile-btn-es');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');
  if (btnEs) btnEs.classList.toggle('active', lang === 'es');
  document.getElementById('hamburger').setAttribute('aria-label', lang === 'es' ? 'Abrir menú' : 'Toggle menu');
}

function toggleLang(lang) {
  currentLang = lang !== undefined ? lang : (currentLang === 'en' ? 'es' : 'en');
  localStorage.setItem('lang', currentLang);
  applyLang(currentLang);
}

document.addEventListener('DOMContentLoaded', function() { applyLang(currentLang); });

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