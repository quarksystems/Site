
function getLang(){ return localStorage.getItem('lang') || 'es'; }
function setLang(l){ localStorage.setItem('lang', l); document.documentElement.lang = l; markActive(); }
function toggleLang(){ setLang(getLang()==='es'?'en':'es'); }
function markActive(){ const here = location.pathname.split('/').pop() || 'index.html'; document.querySelectorAll('nav a[data-page]').forEach(a=>a.classList.toggle('active', a.dataset.page===here)); }

document.addEventListener('DOMContentLoaded', ()=>{
  document.documentElement.lang = getLang();
  markActive();
  const hero = document.querySelector('.hero.reveal');
  if(hero){
    hero.addEventListener('mousemove', (e)=>{
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left)/r.width)*100; const y = ((e.clientY - r.top)/r.height)*100;
      hero.style.setProperty('--mx', x+'%'); hero.style.setProperty('--my', y+'%');
    });
  }
});

function openMail(e){ e.preventDefault(); const name = encodeURIComponent(document.getElementById('name').value.trim()); const email = encodeURIComponent(document.getElementById('email').value.trim()); const msg = encodeURIComponent(document.getElementById('msg').value.trim()); const subject = encodeURIComponent("Inquiry from Quark‑Systems site"); const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\n${decodeURIComponent(msg)}`); window.location.href = `mailto:contacto.quark.systems@gmail.com?subject=${subject}&body=${body}`; }
