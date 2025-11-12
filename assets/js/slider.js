// slider.js — Carrusel simple, accesible y con autoplay (home)
(function(){
  function initSlider(root){
    const track = root.querySelector('.slider__track');
    const slides = Array.from(root.querySelectorAll('.slide'));
    const btnPrev = root.querySelector('.slider__btn--prev');
    const btnNext = root.querySelector('.slider__btn--next');
    const dotsWrap = root.querySelector('.slider__dots');
    const autoplay = root.dataset.autoplay === 'true';
    const intervalMs = parseInt(root.dataset.interval||'5000',10);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let index = 0, timer = null, isPointerDown = false, startX = 0, deltaX = 0;

    // Dots
    const dots = slides.map((_,i)=>{
      const b = document.createElement('button');
      b.className = 'slider__dot';
      b.type = 'button';
      b.setAttribute('aria-label', `Ir a la diapositiva ${i+1}`);
      b.addEventListener('click', ()=>go(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function update(){
      const x = -index * root.clientWidth;
      track.style.transform = `translateX(${x}px)`;
      slides.forEach((s,i)=>{
        const active = i===index;
        s.setAttribute('aria-hidden', active?'false':'true');
        s.tabIndex = active?0:-1;
      });
      dots.forEach((d,i)=>d.setAttribute('aria-current', i===index?'true':'false'));
    }

    function next(){ index = (index+1) % slides.length; update(); }
    function prev(){ index = (index-1+slides.length) % slides.length; update(); }
    function go(i){ index = i%slides.length; update(); }

    function start(){ if(autoplay && !prefersReduced){ stop(); timer = setInterval(next, intervalMs); } }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } }

    // Resize handler
    const ro = new ResizeObserver(()=>update());
    ro.observe(root);

    // Buttons & keyboard
    btnNext.addEventListener('click', ()=>{ next(); stop(); });
    btnPrev.addEventListener('click', ()=>{ prev(); stop(); });
    root.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowRight'){ next(); stop(); }
      if(e.key==='ArrowLeft'){ prev(); stop(); }
    });

    // Pointer/touch swipe
    track.addEventListener('pointerdown', (e)=>{
      isPointerDown = true; startX = e.clientX; deltaX = 0; track.setPointerCapture(e.pointerId); stop();
    });
    track.addEventListener('pointermove', (e)=>{
      if(!isPointerDown) return; deltaX = e.clientX - startX;
      const x = -index * root.clientWidth + deltaX; track.style.transform = `translateX(${x}px)`;
    });
    function endSwipe(){
      if(!isPointerDown) return; isPointerDown = false;
      const threshold = root.clientWidth * 0.15;
      if(deltaX > threshold) prev(); else if(deltaX < -threshold) next(); else update();
      start();
    }
    track.addEventListener('pointerup', endSwipe);
    track.addEventListener('pointercancel', endSwipe);
    track.addEventListener('pointerleave', endSwipe);

    // Pause on hover/focus
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    // ARIA roles
    root.setAttribute('role','region');
    root.setAttribute('aria-roledescription','carrusel');

    update();
    start();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.slider').forEach(initSlider);
  });
})();
