/* Final polished script: animations (GSAP), sfx, resume (jsPDF),
   projects injection, theme switch, canvas glitch + performance modes.
*/
(() => {
  // ---------- helpers ----------
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const rand = (a,b) => Math.random()*(b-a)+a;

  // ---------- state ----------
  let soundOn = true;
  const perfSelect = $('#perfSelect');

  // ---------- Audio (WebAudio) ----------
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ac = AudioContext ? new AudioContext() : null;
  function sfxTone(freq=440, dur=0.05, type='sine', vol=0.04){
    if(!ac || !soundOn) return;
    if(ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g); g.connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + dur);
  }

  // attach sound controls
  $('#soundToggle').addEventListener('change', (e) => {
    soundOn = e.target.checked;
    sfxTone(220,0.03,'sine',0.01);
  });

  // small hover + click sfx on interactive items
  $$('a, .btn, .cta').forEach(el=>{
    el.addEventListener('mouseenter', () => sfxTone(520 + Math.random()*240, 0.04, 'square', 0.02));
    el.addEventListener('click', () => sfxTone(300 + Math.random()*320, 0.06, 'triangle', 0.03));
  });

  // ---------- Projects data & injection ----------
  const projects = [
    { title: 'sihprototype', desc: 'SIH hackathon prototype — interactive demo and prototype code.', url: 'https://github.com/SGSShaurya5497/sihprototype' },
    { title: 'glitch-playground', desc: 'Creative experiments with canvas and shaders.', url:'#' },
    { title: 'retrowave-terminal', desc: 'ASCII / terminal-inspired tinkering.', url:'#' },
    { title: 'ai-artboard', desc: 'Generative brush experiments (in progress).', url:'#' },
  ];

  const projectsRow = $('#projectsRow');

  function createCardHTML(p){
    return `
      <article class="project-card" role="article">
        <div class="project-thumb">${p.title}</div>
        <div class="project-meta">
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
          <a class="small-link" href="${p.url}" target="_blank" rel="noopener">view</a>
        </div>
      </article>
    `;
  }

  // initially show first two (stagger animate)
  function renderInitialProjects(){
    const initial = projects.slice(0,2);
    projectsRow.innerHTML = initial.map(createCardHTML).join('');
    // stagger appearance with GSAP if available
    if(window.gsap){
      gsap.from('.project-card', {y:40, opacity:0, stagger:0.12, duration:0.9, ease:'expo.out'});
    } else {
      // fallback simple CSS pop-ins
      $$('.project-card').forEach((el,i)=> {
        el.style.opacity = 0;
        setTimeout(()=> el.style.transition='all .6s cubic-bezier(.2,.9,.2,1)', i*120, () => {el.style.opacity=1});
      });
    }
    $('#statProjects').textContent = projects.length;
  }
  renderInitialProjects();

  // "show more" inserts the rest and animates
  $('#moreProjects').addEventListener('click', () => {
    const extra = projects.slice(2);
    projectsRow.insertAdjacentHTML('beforeend', extra.map(createCardHTML).join(''));
    // animate newly added
    if(window.gsap){
      gsap.from(projectsRow.querySelectorAll('.project-card'), {y:40, opacity:0, stagger:0.08, duration:0.7, ease:'power3.out'});
    }
    $('#moreProjects').disabled = true;
    $('#moreProjects').textContent = 'loaded';
  });

  // ---------- Resume generation (jsPDF) ----------
  // using jspdf UMD loaded from CDN. This creates a clean PDF.
  async function generateResume(){
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit:'pt', format:'A4' });
      const left = 40, top = 50;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('Shaurya Singh — Resume', left, top);
      doc.setFontSize(12);
      doc.setFont('Helvetica', 'normal');
      let y = top + 30;
      doc.text('Skills:', left, y);
      y += 16;
      doc.text('- HTML, CSS, JavaScript, Node.js, Python', left+10, y);
      y += 16;
      doc.text('- Cybersecurity, AI, Creative Coding, UI/UX', left+10, y);
      y += 26;
      doc.text('Projects:', left, y);
      y += 16;
      projects.forEach(p => {
        doc.text(`• ${p.title} — ${p.desc}`, left+10, y);
        y += 14;
      });
      y += 8;
      doc.text('Contact:', left, y);
      y += 16;
      doc.text('LinkedIn: https://linkedin.com/in/sinxshaurya', left+10, y);
      y += 14;
      doc.text('GitHub: https://github.com/SGSShaurya5497', left+10, y);
      // generate blob and download
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Shaurya_Singh_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      // tiny success sfx
      sfxTone(420, 0.08, 'sine', 0.04);
    } catch (err) {
      console.error('resume error', err);
      alert('Resume generation failed — check console.');
    }
  }
  $('#downloadResume').addEventListener('click', generateResume);

  // ---------- contact form (fake send) ----------
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    sfxTone(360,0.06,'sawtooth',0.04);
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'sent ✓';
    setTimeout(()=> btn.textContent = 'send', 1400);
    e.target.reset();
  });

  // ---------- theme switch (glitch <-> cyber) ----------
  $('#themeSwitch').addEventListener('click', () => {
    const body = document.body;
    const isCyber = body.classList.contains('theme-cyber');
    body.classList.toggle('theme-cyber', !isCyber);
    body.classList.toggle('theme-glitch', isCyber);
    $('#themeSwitch').setAttribute('aria-pressed', String(!isCyber));
    $('#themeSwitch').textContent = !isCyber ? 'cyber mode' : 'glitch mode';
    sfxTone(520, 0.06, 'square', 0.03);
    // quick palette animation with GSAP if available
    if(window.gsap){
      gsap.fromTo('.hero-title', {scale:1.02}, {scale:1, duration:0.6, ease:'elastic.out(1,0.6)'});
    }
  });

  // ---------- sticky header on scroll ----------
  const header = $('#siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 80);
  });

  // ---------- Animation: GSAP entrances ----------
  window.addEventListener('load', () => {
    // disable heavy sequences if reduced-motion
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(window.gsap && !reduced){
      gsap.from('.hero-title', {y:80, opacity:0, duration:1.1, ease:'expo.out'});
      gsap.from('.hero-sub', {y:30, opacity:0, delay:0.12, duration:0.8});
      gsap.from('.cta', {y:18, opacity:0, stagger:0.06, duration:0.7, delay:0.2});
      gsap.from('.hero-stats .stat', {y:18, opacity:0, stagger:0.08, duration:0.8, delay:0.3});
      gsap.from('.about-left, .about-right', {y:30, opacity:0, stagger:0.08, duration:0.9, delay:0.5});
    }
  });

  // ---------- Canvas glitch / noise (optimized) ----------
  const canvas = $('#bg-canvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  window.addEventListener('resize', () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; });

  let lastFrame = 0;
  function drawFrame(t){
    ctx.clearRect(0,0,W,H);
    // subtle background gradient
    const g = ctx.createLinearGradient(0,0,W,H);
    if(document.body.classList.contains('theme-cyber')){
      g.addColorStop(0, 'rgba(0,10,20,0.3)');
      g.addColorStop(1, 'rgba(2,2,8,0.45)');
    } else {
      g.addColorStop(0, 'rgba(6,4,8,0.25)');
      g.addColorStop(1, 'rgba(2,2,8,0.45)');
    }
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

    // occasional bars & lines (perf-level dependent)
    const perf = perfSelect.value || 'med';
    const chance = perf === 'high' ? 0.045 : perf === 'med' ? 0.03 : 0.015;

    if(Math.random() < chance){
      const barH = 4 + Math.random()*60;
      const y = Math.random()*(H - barH);
      const offset = (Math.random()>0.5?1:-1) * (6 + Math.random()*80);
      try {
        const slice = ctx.getImageData(0, y, W, barH);
        ctx.putImageData(slice, offset, y);
        ctx.fillStyle = 'rgba(255,0,120,0.04)';
        ctx.fillRect(0,y,W,barH);
        // tiny sfx for bars if sound on
        sfxTone(180 + Math.random()*360, 0.02, 'triangle', 0.001);
      } catch(e){}
    }

    // faint noise tile
    const w = Math.min(200, Math.max(128, Math.floor(W/6)));
    const h = Math.min(200, Math.max(128, Math.floor(H/6)));
    const id = ctx.createImageData(w, h);
    for(let i=0;i<id.data.length;i+=4){
      const v = Math.floor(Math.random()*8);
      id.data[i]=v; id.data[i+1]=v; id.data[i+2]=v; id.data[i+3]=24;
    }
    ctx.putImageData(id, 0, 0);

    // color streaks occasionally on high perf
    if(perf === 'high' && Math.random() < 0.03){
      ctx.fillStyle = `rgba(0,255,209,${0.02 + Math.random()*0.06})`;
      ctx.fillRect(0, Math.random()*(H-4), W, 1 + Math.random()*3);
    }

    requestAnimationFrame(drawFrame);
  }
  requestAnimationFrame(drawFrame);

  // ---------- Accessibility / reduced motion ---------- 
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    perfSelect.value = 'low';
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // ---------- Smooth anchor scroll micro-sfx ----------
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); sfxTone(320,0.03,'sine',0.02); }
    });
  });

  // expose small debug object
  window.gc = { sfxTone, generateResume };

})();
