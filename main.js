// === CONTACT DESTINATION: placeholder until Chazak confirms its inbox ===
var CONTACT_EMAIL = "info@chazakmanagement.com"; // PLACEHOLDER — replace with the real address

(function(){
  var nav=document.querySelector('.nav'), btn=document.querySelector('.menu-btn');
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY>40); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  btn.addEventListener('click', function(){ var o=nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
  document.querySelectorAll('.links a').forEach(function(a){ a.addEventListener('click', function(){ nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); }); });

  // collapse service lists on phones
  if (window.matchMedia('(max-width:640px)').matches){
    document.querySelectorAll('.svc-list').forEach(function(d){ d.removeAttribute('open'); });
  }

  // bios
  document.querySelectorAll('.bio-toggle').forEach(function(b){
    b.addEventListener('click', function(){
      var p=b.closest('.person'), o=p.classList.toggle('expanded');
      b.textContent = o ? 'Show less' : 'Read bio'; b.setAttribute('aria-expanded', o);
    });
  });

  // reveal on scroll
  var els=document.querySelectorAll('.section-head, .svc, .person, .value, .mv-card, .serve-item, .why-item, .timeline li, .feature, .about-hebrew, .about-text, .form, .contact-copy');
  if ('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); }, {rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){ el.classList.add('reveal'); io.observe(el); });
  }

  // contact form
  var f=document.getElementById('contact-form'), st=f.querySelector('.form-status');
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var ok=true;
    ['name','email','message'].forEach(function(n){
      var el=f.elements[n], v=el.value.trim(), bad=!v || (n==='email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));
      el.classList.toggle('invalid', bad); if(bad) ok=false;
    });
    if(!ok){ st.textContent='Please fill in your name, a valid email, and a short message.'; return; }
    var g=function(n){return f.elements[n].value.trim();};
    var subject='Project inquiry from '+g('name')+(g('type')?' ('+g('type')+')':'');
    var body='Name: '+g('name')+'\nEmail: '+g('email')+'\nPhone: '+(g('phone')||'-')+'\nProject type: '+(g('type')||'-')+'\n\n'+g('message');
    window.location.href='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    st.textContent='Opening your email app to send your message. Thank you for reaching out.';
  });

  // before / after slider
  document.querySelectorAll('.ba-stage').forEach(function(st){
    var h=st.querySelector('.ba-handle'), pos=50, down=false, sx=0, sy=0, locked=null;
    function set(p){ pos=Math.max(0,Math.min(100,p)); st.style.setProperty('--pos',pos+'%');
      h.setAttribute('aria-valuenow',Math.round(pos)); st.classList.toggle('ba-min',pos<14); st.classList.toggle('ba-max',pos>86); h.setAttribute('aria-valuetext',Math.round(pos)+'% existing site'); }
    function fromX(x){ var r=st.getBoundingClientRect(); set((x-r.left)/r.width*100); }
    st.addEventListener('pointerdown',function(e){ if(e.button>0) return; down=true; sx=e.clientX; sy=e.clientY;
      locked = e.pointerType==='mouse' ? 'x' : null;
      if(locked==='x'){ st.classList.add('dragging'); fromX(e.clientX); try{st.setPointerCapture(e.pointerId);}catch(_){} } });
    st.addEventListener('pointermove',function(e){ if(!down) return;
      if(locked===null){ var dx=Math.abs(e.clientX-sx), dy=Math.abs(e.clientY-sy); if(dx<4&&dy<4) return;
        locked = dx>dy ? 'x' : 'y'; if(locked==='x'){ st.classList.add('dragging'); try{st.setPointerCapture(e.pointerId);}catch(_){} } }
      if(locked==='x'){ fromX(e.clientX); } });
    function up(e){ if(down && locked===null) fromX(e.clientX); down=false; locked=null; st.classList.remove('dragging'); }
    st.addEventListener('pointerup',up); st.addEventListener('pointercancel',function(){ down=false; locked=null; st.classList.remove('dragging'); });
    h.addEventListener('keydown',function(e){ var k=e.key, s=e.shiftKey?10:2;
      if(k==='ArrowLeft'||k==='ArrowDown'){ set(pos-s); e.preventDefault(); } else if(k==='ArrowRight'||k==='ArrowUp'){ set(pos+s); e.preventDefault(); }
      else if(k==='Home'){ set(0); e.preventDefault(); } else if(k==='End'){ set(100); e.preventDefault(); } });
  });
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
})();
