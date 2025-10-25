<script>
function getLang(){ return localStorage.getItem('lang') || 'es'; }
function setLang(l){ localStorage.setItem('lang', l); document.documentElement.lang = l; markActive(); }
function toggleLang(){ setLang(getLang()==='es'?'en':'es'); }

function markActive(){
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('nav a[data-page]').forEach(a=>{
    const page = (a.dataset.page || '').toLowerCase();
    a.classList.toggle('active', page===here);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.documentElement.lang = getLang();
  markActive();
});

function openMail(e){
  e.preventDefault();
  const name = encodeURIComponent((document.getElementById('name')||{}).value||'');
  const email = encodeURIComponent((document.getElementById('email')||{}).value||'');
  const msg = encodeURIComponent((document.getElementById('msg')||{}).value||'');
  const subject = encodeURIComponent('Inquiry from Quark‑Systems site');
  const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\n${decodeURIComponent(msg)}`);
  window.location.href = `mailto:contacto.quark.systems@gmail.com?subject=${subject}&body=${body}`;
}
</script>