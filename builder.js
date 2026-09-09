const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const KEY='launchforge_project_v1';
const defaults={name:'My Business',cta:'Get Started',email:'',credits:25,site:null};

let project=(()=>{
  try{
    return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}
  }catch(e){
    return {...defaults}
  }
})();

const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({
  '&':'&amp;',
  '<':'&lt;',
  '>':'&gt;',
  '"':'&quot;',
  "'":'&#039;'
}[m]));

function save(){
  localStorage.setItem(KEY,JSON.stringify(project));
  if($('#previewStatus')) $('#previewStatus').textContent='Saved';
}

function make(prompt){
  let t=prompt.toLowerCase();

  let s={
    name:'Nova Business',
    headline:'Turn More Visitors Into Customers',
    sub:'A modern business website built to look professional and generate inquiries.',
    services:['Premium Service','Fast Support','Custom Solutions'],
    about:'Professional service, clear communication and a customer-first experience.',
    testimonial:'Professional, responsive and easy to work with.',
    cta:project.cta||'Get Started',
    accent:'#6d5dfc',
    showPricing:false
  };

  if(t.includes('clean')){
    Object.assign(s,{
      name:'BrightNest Cleaning',
      headline:'A Cleaner Home. More Time For You.',
      sub:'Reliable residential cleaning for busy homeowners.',
      services:['Recurring Cleaning','Deep Cleaning','Move In / Move Out']
    });
  }
  else if(t.includes('coach')){
    Object.assign(s,{
      name:'Elevate Coaching',
      headline:'Build The Business You Know You Can Lead.',
      sub:'Practical coaching for ambitious professionals ready for focused growth.',
      services:['1:1 Coaching','Growth Strategy','Accountability']
    });
  }
  else if(t.includes('photo')){
    Object.assign(s,{
      name:'Northlight Studio',
      headline:'Moments That Still Feel Alive Years Later.',
      sub:'Natural photography for people, brands and events.',
      services:['Portraits','Events','Brand Photography']
    });
  }
  else if(t.includes('restaurant')||t.includes('food')){
    Object.assign(s,{
      name:'Ember & Stone',
      headline:'Good Food. Made To Be Remembered.',
      sub:'Fresh ingredients, bold flavor and a dining experience worth returning for.',
      services:['Lunch','Dinner','Private Events']
    });
  }
  else if(t.includes('car')||t.includes('auto')||t.includes('detail')){
    Object.assign(s,{
      name:'PrimeShine Mobile Detailing',
      headline:'Your Car. Showroom Ready.',
      sub:'Premium mobile detailing delivered to your home or workplace.',
      services:['Exterior Detail','Interior Reset','Full Detail']
    });
  }

  return s;
}

function modify(prompt){
  let s={
    ...project.site,
    services:[...(project.site?.services||[])]
  };

  let t=prompt.toLowerCase();

  if(t.includes('premium'))
    s.sub='A premium experience built around quality, trust and exceptional service.';

  if(t.includes('headline'))
    s.headline='A Better Way To Choose Quality.';

  if(t.includes('pricing'))
    s.showPricing=true;

  if(t.includes('testimonial'))
    s.testimonial='Professional, responsive and genuinely easy to work with. Highly recommended.';

  if(t.includes('blue'))
    s.accent='#2563eb';

  if(t.includes('green'))
    s.accent='#059669';

  if(t.includes('orange'))
    s.accent='#ea580c';

  if(t.includes('purple')||t.includes('violet'))
    s.accent='#6d5dfc';

  if(t.includes('booking')||t.includes('book now'))
    s.cta='Book Now';

  return s;
}

function siteDoc(s){

  s=s||make('business');

  let a=s.accent||'#6d5dfc';

  let pricing=s.showPricing?`
    <section class="pricing">
      <h2>Simple Pricing</h2>
      <div class="pricecards">
        <article>
          <b>Starter</b>
          <strong>$99</strong>
          <p>Great for getting started.</p>
        </article>

        <article>
          <b>Popular</b>
          <strong>$199</strong>
          <p>Our most complete option.</p>
        </article>

        <article>
          <b>Premium</b>
          <strong>$299</strong>
          <p>For customers who want the best.</p>
        </article>
      </div>
    </section>
  `:'';

  return `
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s.name)}</title>

<style>

*{
  box-sizing:border-box
}

body{
  margin:0;
  font-family:Arial,sans-serif;
  color:#172033
}

header{
  height:68px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 7%;
  border-bottom:1px solid #e7e9ef
}

.brand{
  font-weight:900;
  font-size:20px
}

nav{
  color:#667085;
  font-size:13px
}

nav span{
  margin-left:22px
}

.hero{
  min-height:520px;
  display:grid;
  align-content:center;
  padding:70px 9%;
  background:linear-gradient(130deg,#f7f8fb,#eef1f8)
}

.k{
  font-size:11px;
  letter-spacing:2px;
  color:${a};
  font-weight:900
}

.hero h1{
  font-size:clamp(45px,7vw,80px);
  line-height:1;
  max-width:800px;
  margin:12px 0 20px
}

.hero p{
  font-size:18px;
  color:#657085;
  max-width:620px
}

.cta{
  display:inline-block;
  margin-top:20px;
  padding:12px 17px;
  background:${a};
  color:white;
  border-radius:9px;
  font-weight:800
}

.section,.pricing{
  padding:70px 9%
}

.section h2,.pricing h2{
  font-size:34px
}

.services,.pricecards{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:15px;
  margin-top:28px
}

.services article,.pricecards article{
  border:1px solid #e3e7ee;
  border-radius:14px;
  padding:22px
}

.about{
  background:#101827;
  color:#fff
}

.about p{
  color:#c2cbd8;
  max-width:720px
}

.quote{
  font-size:25px;
  max-width:760px;
  font-weight:650
}

.pricing{
  background:#f7f8fb
}

.pricecards strong{
  display:block;
  font-size:35px;
  margin:10px 0
}

footer{
  padding:30px 9%;
  background:#0b1220;
  color:#9aa7ba
}

@media(max-width:700px){

  header nav{
    display:none
  }

  .services,.pricecards{
    grid-template-columns:1fr
  }

  .hero h1{
    font-size:48px
  }

}

</style>
</head>

<body>

<header>
  <div class="brand">${esc(s.name)}</div>

  <nav>
    <span>Services</span>
    <span>About</span>
    <span>Contact</span>
  </nav>
</header>

<section class="hero">

  <div>

    <div class="k">
      WELCOME TO ${esc(s.name).toUpperCase()}
    </div>

    <h1>${esc(s.headline)}</h1>

    <p>${esc(s.sub)}</p>

    <span class="cta">${esc(s.cta)}</span>

  </div>

</section>

<section class="section">

  <h2>What We Do</h2>

  <div class="services">

    ${s.services.map(x=>`
      <article>
        <b>${esc(x)}</b>
        <p>
          Professional service designed around your goals and needs.
        </p>
      </article>
    `).join('')}

  </div>

</section>

<section class="section about">

  <h2>Why Choose Us</h2>

  <p>${esc(s.about)}</p>

</section>

${pricing}

<section class="section">

  <div class="k">
    CUSTOMER EXPERIENCE
  </div>

  <p class="quote">
    “${esc(s.testimonial)}”
  </p>

</section>

<footer>
  ${esc(s.name)} ·
  ${project.email?esc(project.email):'Built with LaunchForge AI'}
</footer>

</body>
</html>
`;
}

function render(){

  let p=$('#sitePreview');

  if(p)
    p.srcdoc=siteDoc(project.site||make('business'));

  if($('#projectNameSide'))
    $('#projectNameSide').textContent=project.name;

  if($('#credits'))
    $('#credits').textContent=project.credits;

  if($('#projectName'))
    $('#projectName').value=project.name;

  if($('#ctaText'))
    $('#ctaText').value=project.cta;

  if($('#businessEmail'))
    $('#businessEmail').value=project.email;
}

function msg(text,type='ai'){

  let e=document.createElement('div');

  e.className=
    `chat-message ${type==='ai'?'ai-message':'user-message'}`;

  e.innerHTML=`
    <strong>${type==='ai'?'LaunchForge AI':'You'}</strong>
    <p>${esc(text)}</p>
  `;

  $('#chatMessages')?.appendChild(e);

  if($('#chatMessages'))
    $('#chatMessages').scrollTop=$('#chatMessages').scrollHeight;
}

async function generate(){

  let input=$('#promptInput');

  let p=(input?.value||'').trim();

  if(!p)
    return;

  msg(p,'user');

  if(input)
    input.value='';

  if($('#previewStatus'))
    $('#previewStatus').textContent='Generating...';

  let generated=null;

  try{

    let r=await fetch('/api/generate',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        prompt:p,
        currentSite:project.site
      })
    });

    if(r.ok){

      let d=await r.json();

      generated=d.site||null;

    }

  }catch(e){}

  if(!generated)
    generated=project.site?modify(p):make(p);

  project.site=generated;

  project.name=generated.name||project.name;

  project.cta=generated.cta||project.cta;

  if(project.credits>0)
    project.credits--;

  save();

  render();

  msg(
    'Done. I updated the website preview. Keep describing any changes you want.'
  );

  if($('#previewStatus'))
    $('#previewStatus').textContent='Ready';
}

function affiliates(){

  let c=window.LAUNCHFORGE_CONFIG?.affiliates||[];

  let g=$('#affiliateGrid');

  if(!g)
    return;

  if(!c.length){

    g.innerHTML=`
      <article class="affiliate-card">
        <h3>Business Tools</h3>
        <p>
          Affiliate recommendations will appear here when your approved
          partner links are added.
        </p>
      </article>
    `;

    return;
  }

  g.innerHTML=c.map(a=>`

    <article class="affiliate-card">

      <div class="eyebrow">
        ${esc(a.category||'BUSINESS TOOL')}
      </div>

      <h3>${esc(a.name)}</h3>

      <p>${esc(a.description)}</p>

      <a
        href="${esc(a.url)}"
        target="_blank"
        rel="sponsored noopener"
      >
        Get Started →
      </a>

    </article>

  `).join('');
}

function exportHTML(){

  let b=new Blob(
    [siteDoc(project.site||make('business'))],
    {type:'text/html'}
  );

  let u=URL.createObjectURL(b);

  let a=document.createElement('a');

  a.href=u;

  a.download=
    (project.name||'launchforge-site')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')+
    '.html';

  document.body.appendChild(a);

  a.click();

  a.remove();

  URL.revokeObjectURL(u);
}

document.addEventListener('DOMContentLoaded',()=>{

  $('#chatForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    generate();
  });

  $$('.prompt-chip').forEach(b=>{

    b.onclick=()=>{

      let i=$('#promptInput');

      if(i)
        i.value=b.dataset.prompt||'';

      generate();

    };

  });

  $$('.side-btn').forEach(b=>{

    b.onclick=()=>{

      $$('.side-btn').forEach(x=>
        x.classList.remove('active')
      );

      b.classList.add('active');

      let p=b.dataset.panel;

      $('#builderPanel')?.classList.toggle(
        'hidden',
        p!=='builder'
      );

      $('#stackPanel')?.classList.toggle(
        'hidden',
        p!=='stack'
      );

      $('#settingsPanel')?.classList.toggle(
        'hidden',
        p!=='settings'
      );

    };

  });

  $('#desktopBtn')?.addEventListener('click',()=>{

    $('#desktopBtn').classList.add('active');

    $('#mobileBtn')?.classList.remove('active');

    $('#sitePreview')?.classList.remove(
      'mobile-preview'
    );

  });

  $('#mobileBtn')?.addEventListener('click',()=>{

    $('#mobileBtn').classList.add('active');

    $('#desktopBtn')?.classList.remove('active');

    $('#sitePreview')?.classList.add(
      'mobile-preview'
    );

  });

  $('#saveBtn')?.addEventListener('click',()=>{

    save();

    render();

  });

  $('#exportBtn')?.addEventListener(
    'click',
    exportHTML
  );

  $('#publishBtn')?.addEventListener('click',()=>{

    alert(
      'Your website is ready to publish. Hosting, custom domains and billing will be connected in the production version.'
    );

  });

  $('#settingsSaveBtn')?.addEventListener('click',()=>{

    project.name=
      $('#projectName')?.value.trim()||
      'My Business';

    project.cta=
      $('#ctaText')?.value.trim()||
      'Get Started';

    project.email=
      $('#businessEmail')?.value.trim()||
      '';

    if(project.site){

      project.site.name=project.name;

      project.site.cta=project.cta;

    }

    save();

    render();

    alert('Project settings saved.');

  });

  affiliates();

  render();

});
