// Quark‑Systems site.js (refactor seguro)
const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
let audioCtx=null, gainNode=null;
function ensureAudio(){ if(prefersReduced) return null; const Ctx=window.AudioContext||window.webkitAudioContext; if(!Ctx) return null; if(!audioCtx) try{audioCtx=new Ctx();}catch(e){return null;} return audioCtx; }
function blip(){ const ctx=ensureAudio(); if(!ctx||ctx.state==='suspended') return; if(!gainNode){ gainNode=ctx.createGain(); gainNode.connect(ctx.destination);} const o=ctx.createOscillator(); const g=ctx.createGain(); o.type='sine'; o.frequency.setValueAtTime(800, ctx.currentTime); g.gain.setValueAtTime(0.08, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime+0.08); o.connect(g); g.connect(gainNode); o.start(); o.stop(ctx.currentTime+0.09); }
function createParticles(){ if(prefersReduced) return; const header=document.querySelector('header'); if(!header||header.querySelector('.floating-particles')) return; const c=document.createElement('div'); c.className='floating-particles'; for(let i=0;i<9;i++){ const p=document.createElement('div'); p.className='particle'; c.appendChild(p);} header.appendChild(c); }
function typeWriter(){ if(prefersReduced) return; const el=document.querySelector('.brand-name'); if(!el) return; const text=el.textContent.trim(); el.textContent=''; el.style.minWidth=el.getBoundingClientRect().width+'px'; let i=0; const t=setInterval(()=>{ if(i<text.length){ el.textContent+=text.charAt(i++);} else { clearInterval(t);} },100); }
function initMobileMenu(){ const nav=document.getElementById('nav'); const btn=nav?.querySelector('.menu-btn'); if(!btn) return; btn.addEventListener('click',()=>{ const open=nav.classList.toggle('open'); btn.setAttribute('aria-expanded', String(open)); blip();}); nav?.addEventListener('click',e=>{ if(e.target.closest('a')){ nav.classList.remove('open'); blip(); }}); const parents=document.querySelectorAll('.has-sub > a'); parents.forEach(a=>a.addEventListener('click',e=>{ if(window.innerWidth<=900){ e.preventDefault(); const sub=a.nextElementSibling; if(sub?.classList.contains('submenu')){ sub.style.display = (sub.style.display==='flex'?'none':'flex'); blip(); }}})); }
function getLang(){ return localStorage.getItem('lang')||'es'; }
function setLang(l){ localStorage.setItem('lang', l); document.documentElement.lang=l; markActive(); blip(); }
function toggleLang(){ setLang(getLang()==='es'?'en':'es'); }
function markActive(){ const here=decodeURIComponent((location.pathname.split('/').pop()||'index.html')).toLowerCase(); document.querySelectorAll('nav a[data-page]').forEach(a=>{ const page=decodeURIComponent(a.dataset.page||'').toLowerCase(); a.classList.toggle('active', page===here);}); }
async function loadPartials(){ const slots=document.querySelectorAll('[data-include]'); await Promise.all([...slots].map(async slot=>{ const url=slot.getAttribute('data-include'); try{ const html=await (await fetch(url)).text(); slot.outerHTML=html; }catch(e){ /* noop */ } })); }
document.addEventListener('DOMContentLoaded', async ()=>{
  await loadPartials();
  document.documentElement.lang=getLang();
  markActive();
  const y=document.getElementById('current-year'); if(y) y.textContent=new Date().getFullYear();
  createParticles();
  if(!sessionStorage.getItem('typingEffectShown')){ setTimeout(typeWriter,600); sessionStorage.setItem('typingEffectShown','true'); }
  document.getElementById('lang-btn')?.addEventListener('click',()=>{ toggleLang(); document.getElementById('lang-btn').setAttribute('aria-pressed', getLang()==='en');});
  document.querySelectorAll('nav a').forEach(a=>a.addEventListener('mouseenter', blip));
  initMobileMenu();
  document.querySelectorAll('a[href^="#"]').forEach(link=>{ link.addEventListener('click', e=>{ const href=link.getAttribute('href'); if(href!=='#'){ const target=document.querySelector(href); if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); } } }); });
});
