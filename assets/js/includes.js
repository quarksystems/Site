
async function include(selector, url){
  const host = document.querySelector(selector);
  if(!host) return;
  try{
    const res = await fetch(url, { headers: { 'Content-Type': 'text/html' }});
    const html = await res.text();
    host.innerHTML = html;

    // Año dinámico
    const y = host.querySelector('#year');
    if (y) y.textContent = new Date().getFullYear();

    // Menú móvil
    const burger = host.querySelector('.burger');
    const nav = host.querySelector('.site-nav');
    if (burger && nav){
      burger.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  } catch(err){
    console.error('Error incluyendo', url, err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  include('#header', '/partials/header.html');
  include('#footer', '/partials/footer.html');

  // Scroll Glow (IntersectionObserver) en home
  const sectionIds = ['inicio','diferenciales','catalogo','contacto'];
  const linkSel = (id) => `.site-nav a.nav-link[href$="#${id}"]`;

  function initScrollGlow(){
    const tryInit = () => {
      const links = sectionIds.map(id => document.querySelector(linkSel(id))).filter(Boolean);
      if (links.length === 0) return false;
      const opts = { root:null, rootMargin:'0px', threshold:0.45 };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const link = document.querySelector(linkSel(id));
          if (!link) return;
          if (entry.isIntersecting) {
            document.querySelectorAll('.site-nav a.nav-link').forEach(a => a.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      }, opts);
      sectionIds.forEach(id => { const sec = document.getElementById(id); if (sec) observer.observe(sec); });
      return true;
    };
    const ok = tryInit(); if (!ok) setTimeout(tryInit, 100);
  }
  initScrollGlow();
});
