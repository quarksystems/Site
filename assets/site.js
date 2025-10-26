// Quark‑Systems v5.1 JS (foco: menú, idioma, mailto)
function getLang(){ return localStorage.getItem('lang') || 'es'; }
function setLang(l){ localStorage.setItem('lang', l); document.documentElement.lang = l; markActive(); }
function toggleLang(){ setLang(getLang()==='es' ? 'en' : 'es'); }

// Marca activo en el menú (soporta nombres con espacios)
function markActive(){
  const here = decodeURIComponent((location.pathname.split('/').pop() || 'index.html')).toLowerCase();
  document.querySelectorAll('nav a[data-page]').forEach(a=>{
    const page = decodeURIComponent(a.dataset.page || '').toLowerCase();
    a.classList.toggle('active', page === here);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.documentElement.lang = getLang();
  markActive();
  const nav = document.getElementById('nav');
  const btn = nav && nav.querySelector('.menu-btn');
  if(btn){ btn.addEventListener('click', ()=> nav.classList.toggle('open')); }
  // cerrar el menú mobile al navegar
  nav && nav.addEventListener('click', e=>{ if(e.target.closest('a')) nav.classList.remove('open'); });
});

// Mailto del formulario de Contacto
function openMail(e){
  e.preventDefault();
  const v = id => encodeURIComponent(((document.getElementById(id)||{}).value)||'');
  const subject = encodeURIComponent('Inquiry from Quark‑Systems site');
  const body = encodeURIComponent(`Name: ${decodeURIComponent(v('name'))}\nEmail: ${decodeURIComponent(v('email'))}\n\n${decodeURIComponent(v('msg'))}`);
  window.location.href = `mailto:contacto.quark.systems@gmail.com?subject=${subject}&body=${body}`;
}