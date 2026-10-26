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
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
})();
