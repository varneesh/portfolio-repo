history.scrollRestoration="manual";
const D=DATA,root=document.documentElement,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
let lite=matchMedia("(prefers-reduced-motion:reduce)").matches||(navigator.hardwareConcurrency||4)<=2||(navigator.deviceMemory||4)<=2;
lite&&root.classList.add("lite");
const vt=f=>(!lite&&document.startViewTransition)?document.startViewTransition(f):(f(),null);
/* ---------- content (all text comes from data.js) ---------- */
document.title=`${D.name} | Portfolio`;
$("#ini").textContent=D.initials;$("#lg").textContent=D.name;
$("#big").innerHTML=[..."PORTFOLIO"].map((c,i)=>`<span aria-hidden="true" style="--i:${i}">${c}</span>`).join("");
$("#nm").textContent=D.name+".";$("#role").textContent=D.role;$("#tag").textContent=D.tagline;
$("#hp").src=D.hero;$("#cap").textContent=D.caption;$("#abt").textContent=D.about;$("#quote").textContent=D.quote;
$$(".dl").forEach(a=>{a.href=D.resume;a.setAttribute("download","")});
$("#stats").innerHTML=D.stats.map(s=>`<div class="stat"><b data-n="${s.n}" data-s="${s.s||""}">0</b><span>${esc(s.l)}</span></div>`).join("");
$("#frs").innerHTML=D.photos.map(p=>`<div class="fr"><img src="${p[0]}" loading="lazy" decoding="async" alt=""><img src="${p[1]}" loading="lazy" decoding="async" alt=""><i>${esc(p[2])}</i></div>`).join("");
const chips=a=>a.map(t=>`<span>${esc(t)}</span>`).join("");$("#tech").innerHTML=chips(D.tech);$("#soft").innerHTML=chips(D.soft);
const card=x=>`<div class="cd"><span class="pl">${esc(x.tag)}</span><h3>${esc(x.title)}</h3><p>${esc(x.place||x.text)}${x.place&&x.text?"<br>"+esc(x.text):""}</p></div>`;
$("#tl").innerHTML=D.journey.map(card).join("");$("#ld").innerHTML=D.leadership.map(card).join("");
const cats=["All",...new Set(D.projects.map(p=>p.cat))];
$("#fl").innerHTML=cats.map((c,i)=>`<button class="ch${i?"":" on"}" data-c="${esc(c)}">${esc(c)} (${i?D.projects.filter(p=>p.cat==c).length:D.projects.length})</button>`).join("");
$("#pj").innerHTML=D.projects.map((p,i)=>`<button class="cd pj" data-i="${i}" data-c="${esc(p.cat)}"><span class="pl">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc.slice(0,100))}…</p><div class="tg">${p.stack.map(s=>`<i>${esc(s)}</i>`).join("")}</div></button>`).join("");
$("#fl").onclick=e=>{const b=e.target.closest(".ch");if(!b)return;$$(".ch").forEach(x=>x.classList.toggle("on",x==b));$$(".pj").forEach(p=>p.hidden=b.dataset.c!="All"&&p.dataset.c!=b.dataset.c)};
const C=D.contact,L=[["mailto:"+C.email,C.email],["tel:"+C.phone.replace(/\s/g,""),C.phone],[C.linkedin,"LinkedIn"],[C.github,"GitHub"]];
$("#cl").innerHTML=L.filter(l=>l[0]&&l[0].length>7&&!/^(mailto|tel):$/.test(l[0])).map(l=>`<a href="${esc(l[0])}" target="_blank" rel="noopener">${esc(l[1])}</a>`).join("")+(C.location?`<span>${esc(C.location)}</span>`:"");
$("#copy").onclick=e=>{navigator.clipboard?.writeText(C.email);e.target.textContent="Copied";setTimeout(()=>e.target.textContent="Copy email",1800)};
$("#foot").textContent=`© ${new Date().getFullYear()} ${D.name.toUpperCase()}`;$("#rp").onclick=()=>{scrollTo(0,0);location.reload()};
const info=$("#info");let ci=0;const showCard=()=>{const c=D.cards[ci];info.innerHTML=`<small>0${ci+1}.</small><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p>`};showCard();
setInterval(()=>{if(document.hidden)return;info.classList.add("sw");setTimeout(()=>{ci=(ci+1)%D.cards.length;showCard();info.classList.remove("sw")},lite?0:300)},4500);
const sec=[["home","Home"],["about","About"],["skills","Skills"],["journey","Journey"],["projects","Projects"],["leadership","Leadership"]];
$("#links").innerHTML=sec.map(([i,t])=>`<a href="#${i}">${t}</a>`).join("");
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;$$("#links a").forEach(a=>{const on=a.hash=="#"+e.target.id;a.classList.toggle("on",on);on&&$("#links").scrollTo({left:a.offsetLeft-60})})}),{rootMargin:"-45% 0px -50% 0px"});
sec.forEach(([i])=>spy.observe($("#"+i)));
let tick=0;addEventListener("scroll",()=>{if(tick)return;tick=requestAnimationFrame(()=>{tick=0;$(".beam").style.setProperty("--p",scrollY/Math.max(1,root.scrollHeight-innerHeight))})},{passive:true});
const count=b=>{const n=+b.dataset.n,f=String(n).includes(".")?1:0,t0=performance.now();(function s(t){const p=Math.min((t-t0)/1200,1);b.textContent=(n*(1-Math.pow(1-p,3))).toFixed(f)+(p==1?b.dataset.s:"");p<1&&requestAnimationFrame(s)})(t0)};
/* ---------- cursors: they ambient-drift, and they BUILD the page live ---------- */
const names=D.agents||["UI","Dev","Copy","Motion","SEO","QA"],cols=["#18c4ff","#7c5cff","#00ffa3","#ff5ca8","#ffd23f","#ffffff","#4cc9f0","#c1ff4d","#ff9f43","#a29bfe","#fd79a8","#55efc4"],cur=$("#cur"),items=[];
let W=innerWidth,H=innerHeight,px=-1,py=-1,last=0,ema=16,slow=0,run0=false;
cols.forEach((col,i)=>{const el=document.createElement("div");el.className="cu";el.style.setProperty("--c",col);
 el.innerHTML=`<svg viewBox="0 0 20 20"><path d="M2 1l15 8-6.5 2L8 18z" fill="${col}" stroke="#000"/></svg>${i<names.length?`<b>${esc(names[i])}</b>`:""}`;cur.appendChild(el);
 items.push({el,x:Math.random()*W,y:Math.random()*H,busy:0,cx:Math.random(),cy:Math.random(),rx:40+Math.random()*120,ry:30+Math.random()*90,sa:.15+Math.random()*.25,sb:.12+Math.random()*.25,p:Math.random()*6.3,f:i>=6&&i<11,ox:(Math.random()-.5)*160,oy:30+Math.random()*90})});
$("#av").innerHTML=cols.slice(0,5).map(c=>`<i style="--c:${c}"></i>`).join("");$("#ag").textContent=`${items.length} agents`;
addEventListener("resize",()=>{W=innerWidth;H=innerHeight},{passive:true});

 // Desktop: track the real mouse. Touch devices: set the cursor group at each tap.
addEventListener("pointermove",e=>{
  if(e.pointerType==="mouse"){
    px=e.clientX;
    py=e.clientY;
  }
},{passive:true});

addEventListener("pointerdown",e=>{
  if(e.pointerType==="touch"){
    px=e.clientX;
    py=e.clientY;
  }
},{passive:true});

function loop(t){
  if(lite||document.hidden){
    run0=false;
    return;
  }

  requestAnimationFrame(loop);

  const dt=Math.min(t-last,100);
  last=t;
  ema+=(dt-ema)*.05;

  if(ema>48){
    if(++slow>90)return setLite();
  }else{
    slow=0;
  }

  const k=1-Math.pow(.002,dt/1000);
  const s=t/1000;

  // Only desktop mouse-follow behavior is enabled.
  const fol=px>=0&&
    !root.classList.contains("building")&&
    matchMedia("(hover: hover) and (pointer: fine)").matches;

  for(const c of items){
    if(c.busy)continue;

    const tx=c.f&&fol
      ?px+c.ox
      :c.cx*W+Math.sin(s*c.sa+c.p)*c.rx;

    const ty=c.f&&fol
      ?py+c.oy
      :c.cy*H+Math.cos(s*c.sb+c.p)*c.ry;

    c.x+=(tx-c.x)*k;
    c.y+=(ty-c.y)*k;

    c.el.style.transform=
      `translate3d(${c.x}px,${c.y}px,0) rotate(-12deg)`;
  }
}

function loop(t){if(lite||document.hidden){run0=false;return}requestAnimationFrame(loop);
 const dt=Math.min(t-last,100);last=t;ema+=(dt-ema)*.05;if(ema>48){if(++slow>90)return setLite()}else slow=0;
 const k=1-Math.pow(.002,dt/1000),s=t/1000,fol=px>=0&&!root.classList.contains("building");
 for(const c of items){if(c.busy)continue;const tx=c.f&&fol?px+c.ox:c.cx*W+Math.sin(s*c.sa+c.p)*c.rx,ty=c.f&&fol?py+c.oy:c.cy*H+Math.cos(s*c.sb+c.p)*c.ry;
  c.x+=(tx-c.x)*k;c.y+=(ty-c.y)*k;c.el.style.transform=`translate3d(${c.x}px,${c.y}px,0) rotate(-12deg)`}}
const go=()=>{if(!lite&&!run0){run0=true;last=performance.now();requestAnimationFrame(loop)}};
document.addEventListener("visibilitychange",()=>!document.hidden&&go());go();
/* ---------- the live build ---------- */
const TXT=".eb,h2,.lead,blockquote,.hi,.nm,#role";
const HERO=[[".nav",200],[".big",450],[".hi",900],[".nm",1200],[".pt",1500],["#role",1900],[".hl .lead",2300],[".info",2500],[".hl .cta",2800],[".stats",3200]];
const targets=$$(".sec .eb,.sec h2,.sec .lead,.sec blockquote,.sec .chips,.frs,.sec .cd,.fl,.pls,.ct .cta");
let built=0,total=HERO.length+targets.length,heroLeft=HERO.length,stopped=false,SP=1,timers=[],io=null,slot=0,st=0;
const T=(f,ms)=>{const id=setTimeout(()=>!stopped&&f(),ms);timers.push(id)};
const tb=$("#tb"),wl=$("#wl");
function tbUpdate(){$("#ly").textContent=`${built} / ${total} layers`;$("#tbp").style.setProperty("--q",Math.min(1,built/total));
 if(built>=total&&!tb.classList.contains("fin")){$("#ag").textContent="Page complete";setTimeout(()=>tb.classList.add("fin"),2200)}}
function reveal(el){el.classList.add("bs");el.classList.remove("bh");el.classList.contains("big")&&el.classList.add("go");$$("[data-n]",el).forEach(count);setTimeout(()=>el.classList.remove("bs"),700)}
function wire(r){const w=document.createElement("div");w.className="wire";w.style.cssText=`left:${r.left+scrollX}px;top:${r.top+scrollY}px;width:${r.width}px;height:${r.height}px`;w.innerHTML=`<i></i><i></i><i></i><i></i><u>${Math.round(r.width)} × ${Math.round(r.height)}</u>`;wl.appendChild(w);return w}
const pick=()=>items.slice(0,6).find(c=>!c.busy)||items[Math.floor(Math.random()*6)];
function mv(c,x,y){x=Math.max(2,Math.min(W-24,x));y=Math.max(2,Math.min(H-24,y));c.x=x;c.y=y;c.el.style.transform=`translate3d(${x}px,${y}px,0) rotate(-12deg)`}
function typeIn(el,cb){const full=el._f||(el._f=el.textContent),dur=Math.min(2200,Math.max(500,full.length*30))*SP,t0=performance.now();
 (function step(){if(stopped)return;const n=Math.min(full.length,Math.floor((performance.now()-t0)/dur*full.length));
  el.innerHTML=esc(full.slice(0,n))+`<span class="g">${esc(full.slice(n))}</span>`;
  if(n<full.length)T(step,40);else{el.textContent=full;cb()}})()}
function runEl(el,done){if(el._d||stopped)return;el._d=1;
 const r=el.getBoundingClientRect(),end=()=>{built++;tbUpdate();done&&done()};
 if(r.width<2||r.bottom<0||r.top>innerHeight){reveal(el);return end()}
 const c=pick(),S=SP,tx=el.matches(TXT),w=wire(r);c.busy++;c.el.classList.add("tr");mv(c,r.left,r.top);
 const fin=()=>{reveal(el);w.classList.add("out");T(()=>w.remove(),450*S);if(--c.busy<=0){c.busy=0;T(()=>c.el.classList.remove("tr"),600*S)}end()};
 T(()=>{w.classList.add("on");mv(c,r.right-10,r.bottom-8)},480*S);
 T(()=>{w.classList.add("sel");if(tx){reveal(el);typeIn(el,fin)}else T(fin,260*S)},980*S)}
function endHero(){if(!root.classList.contains("building"))return;root.classList.remove("building");root.classList.add("live");
 io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const n=performance.now(),d=Math.max(0,slot-n);slot=Math.max(slot,n)+120*SP;T(()=>runEl(e.target),d)}),{rootMargin:"0px 0px -8% 0px"});
 targets.forEach(t=>io.observe(t));addEventListener("scroll",()=>{clearTimeout(st);st=setTimeout(sweep,250)},{passive:true})}
function sweep(){targets.forEach(el=>{if(el._d||el.getBoundingClientRect().bottom>-40)return;el._d=1;io&&io.unobserve(el);reveal(el);built++});tbUpdate()}
function finishAll(){if(stopped)return;stopped=true;timers.forEach(clearTimeout);io&&io.disconnect();
 $$(".bh").forEach(e=>e.classList.remove("bh"));$(".big").classList.add("go");$$(TXT).forEach(e=>{if(e._f)e.textContent=e._f});
 $$(".wire").forEach(w=>w.remove());items.forEach(c=>{c.busy=0;c.el.classList.remove("tr")});
 $$("[data-n]").forEach(b=>b.textContent=b.dataset.n+b.dataset.s);root.classList.remove("building");root.classList.add("live");built=total;tbUpdate()}
const setLite=()=>{lite=true;root.classList.add("lite");finishAll()};
$("#skip").onclick=finishAll;addEventListener("keydown",e=>e.key=="Escape"&&!stopped&&finishAll());
$("#spd").onclick=e=>{SP=SP==1?.5:SP==.5?.25:1;root.style.setProperty("--sp",SP);e.target.textContent=SP==1?"1×":SP==.5?"2×":"4×"};
function probe(){let n=0,t0=0;const f=t=>{if(!t0)t0=t;if(++n<40)requestAnimationFrame(f);else if((n-1)*1000/(t-t0)<40)setLite()};requestAnimationFrame(f)}
if(lite||!("IntersectionObserver"in window)){finishAll()}
else{HERO.forEach(([s])=>$(s).classList.add("bh"));targets.forEach(t=>t.classList.add("bh"));root.classList.add("building");
 Promise.race([document.fonts?.ready,new Promise(r=>setTimeout(r,1500))]).then(()=>{if(stopped)return;
  HERO.forEach(([s,t])=>T(()=>runEl($(s),()=>--heroLeft<=0&&endHero()),t*SP));T(endHero,14000);setTimeout(probe,900)})}
/* ---------- project card morphs into a dialog ---------- */
const md=$("#modal"),mb=$("#mbox");let cu=null;
$$(".pj").forEach(c=>c.onclick=()=>{const p=D.projects[c.dataset.i];cu=c;c.style.viewTransitionName="pj";
 vt(()=>{c.style.viewTransitionName="";mb.innerHTML=`<button class="x" aria-label="Close">✕</button><span class="pl">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p class="lead">${esc(p.desc)}</p><div class="tg">${p.stack.map(s=>`<i>${esc(s)}</i>`).join("")}</div><div class="cta">${p.live?`<a class="btn pri" href="${esc(p.live)}" target="_blank" rel="noopener">Live demo</a>`:""}${p.code?`<a class="btn" href="${esc(p.code)}" target="_blank" rel="noopener">Source code</a>`:""}</div>`;
  mb.style.viewTransitionName="pj";md.hidden=false;document.body.style.overflow="hidden";$(".x",mb).onclick=close;$(".x",mb).focus()})});
function close(){if(md.hidden)return;const c=cu,t=vt(()=>{mb.style.viewTransitionName="";md.hidden=true;document.body.style.overflow="";c.style.viewTransitionName="pj"});
 t?t.finished.finally(()=>c.style.viewTransitionName=""):c.style.viewTransitionName=""}
md.onclick=e=>e.target==md&&close();addEventListener("keydown",e=>e.key=="Escape"&&close());
