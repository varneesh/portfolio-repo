const D=DATA,root=document.documentElement,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
let lite=matchMedia("(prefers-reduced-motion:reduce)").matches||(navigator.hardwareConcurrency||4)<=2||(navigator.deviceMemory||4)<=2;
const setLite=()=>{lite=true;root.classList.add("lite")};lite&&root.classList.add("lite");
const vt=f=>(!lite&&document.startViewTransition)?document.startViewTransition(f):(f(),null);
/* content */
document.title=`${D.name} | Portfolio`;
$("#ini").textContent=D.initials;$("#lg").textContent=D.name;
$("#big").innerHTML=[..."PORTFOLIO"].map((c,i)=>`<span aria-hidden="true" style="--i:${i}">${c}</span>`).join("");
$("#nm").textContent=D.name+".";$("#role").textContent=D.role;$("#tag").textContent=D.tagline;
$("#hp").src=D.hero;$("#cap").textContent=D.caption;$("#abt").textContent=D.about;$("#quote").textContent=D.quote;
$$(".dl").forEach(a=>{a.href=D.resume;a.setAttribute("download","")});
$("#stats").innerHTML=D.stats.map(s=>`<div class="stat"><b data-n="${s.n}" data-s="${s.s||""}">0</b><span>${esc(s.l)}</span></div>`).join("");
$("#frs").innerHTML=D.photos.map(p=>`<div class="fr"><img src="${p[0]}" loading="lazy" decoding="async" alt=""><img src="${p[1]}" loading="lazy" decoding="async" alt=""><i>${esc(p[2])}</i></div>`).join("");
const chips=a=>a.map(t=>`<span>${esc(t)}</span>`).join("");$("#tech").innerHTML=chips(D.tech);$("#soft").innerHTML=chips(D.soft);
const card=(x,i,tag)=>`<div class="cd rv" style="--d:${i*.07}s"><span class="pl">${esc(x.tag)}</span><h3>${esc(x.title)}</h3><p>${esc(x.place||x.text)}${x.place&&x.text?"<br>"+esc(x.text):""}</p></div>`;
$("#tl").innerHTML=D.journey.map(card).join("");$("#ld").innerHTML=D.leadership.map(card).join("");
const cats=["All",...new Set(D.projects.map(p=>p.cat))];
$("#fl").innerHTML=cats.map((c,i)=>`<button class="ch${i?"":" on"}" data-c="${esc(c)}">${esc(c)} (${i?D.projects.filter(p=>p.cat==c).length:D.projects.length})</button>`).join("");
$("#pj").innerHTML=D.projects.map((p,i)=>`<button class="cd pj rv" data-i="${i}" data-c="${esc(p.cat)}" style="--d:${i*.07}s"><span class="pl">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc.slice(0,100))}…</p><div class="tg">${p.stack.map(s=>`<i>${esc(s)}</i>`).join("")}</div></button>`).join("");
$("#fl").onclick=e=>{const b=e.target.closest(".ch");if(!b)return;$$(".ch").forEach(x=>x.classList.toggle("on",x==b));$$(".pj").forEach(p=>p.hidden=b.dataset.c!="All"&&p.dataset.c!=b.dataset.c)};
const C=D.contact,L=[["mailto:"+C.email,C.email],["tel:"+C.phone.replace(/\s/g,""),C.phone],[C.linkedin,"LinkedIn"],[C.github,"GitHub"]];
$("#cl").innerHTML=L.filter(l=>l[0]&&l[0].length>7&&!/^(mailto|tel):$/.test(l[0])).map(l=>`<a href="${esc(l[0])}" target="_blank" rel="noopener">${esc(l[1])}</a>`).join("")+(C.location?`<span>${esc(C.location)}</span>`:"");
$("#copy").onclick=e=>{navigator.clipboard?.writeText(C.email);e.target.textContent="Copied";setTimeout(()=>e.target.textContent="Copy email",1800)};
$("#foot").textContent=`© ${new Date().getFullYear()} ${D.name.toUpperCase()}`;
/* rotating info card */
const info=$("#info");let ci=0;const showCard=()=>{const c=D.cards[ci];info.innerHTML=`<small>0${ci+1}.</small><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p>`};showCard();
setInterval(()=>{if(document.hidden)return;info.classList.add("sw");setTimeout(()=>{ci=(ci+1)%D.cards.length;showCard();info.classList.remove("sw")},lite?0:300)},4500);
/* nav + scroll spy */
const sec=[["home","Home"],["about","About"],["skills","Skills"],["journey","Journey"],["projects","Projects"],["leadership","Leadership"]];
$("#links").innerHTML=sec.map(([i,t])=>`<a href="#${i}">${t}</a>`).join("");
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;$$("#links a").forEach(a=>{const on=a.hash=="#"+e.target.id;a.classList.toggle("on",on);on&&$("#links").scrollTo({left:a.offsetLeft-60})})}),{rootMargin:"-45% 0px -50% 0px"});
sec.forEach(([i])=>spy.observe($("#"+i)));
/* reveal + counters */
const count=b=>{const n=+b.dataset.n,f=String(n).includes(".")?1:0,t0=performance.now();(function s(t){const p=Math.min((t-t0)/1200,1);b.textContent=(n*(1-Math.pow(1-p,3))).toFixed(f)+(p==1?b.dataset.s:"");p<1&&requestAnimationFrame(s)})(t0)};
const els=[...$$(".rv"),$("#stats")];
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");io.unobserve(e.target);$$("[data-n]",e.target).forEach(count)}),{rootMargin:"0px 0px -6% 0px"});els.forEach(el=>io.observe(el))}
else els.forEach(el=>{el.classList.add("in");$$("[data-n]",el).forEach(b=>b.textContent=b.dataset.n+b.dataset.s)});
/* scroll beam (one write per frame) */
let tick=0;addEventListener("scroll",()=>{if(tick)return;tick=requestAnimationFrame(()=>{tick=0;$(".beam").style.setProperty("--p",scrollY/Math.max(1,root.scrollHeight-innerHeight))})},{passive:true});
/* floating cursors: one loop, positions are a function of time, so low FPS never slows the motion */
const cur=$("#cur"),cols=["#ff3b2f","#ffb43a","#34d6b0","#6d7cff","#ff7ab6","#4cc9f0","#c1ff4d","#ffffff"],items=[];
for(let i=0;i<12;i++){const el=document.createElementNS("http://www.w3.org/2000/svg","svg");el.setAttribute("viewBox","0 0 20 20");el.innerHTML=`<path d="M2 1l15 8-6.5 2L8 18z" fill="${cols[i%8]}" stroke="#000" stroke-width="1"/>`;cur.appendChild(el);
 items.push({el,x:innerWidth/2,y:innerHeight/2,cx:Math.random(),cy:Math.random(),rx:40+Math.random()*120,ry:30+Math.random()*90,sa:.15+Math.random()*.25,sb:.12+Math.random()*.25,p:Math.random()*6.3,f:i<5,ox:(Math.random()-.5)*160,oy:30+Math.random()*90})}
let W=innerWidth,H=innerHeight,px=-1,py=-1,last=0,ema=16,slow=0,run=false;
addEventListener("resize",()=>{W=innerWidth;H=innerHeight},{passive:true});
addEventListener("pointermove",e=>{if(e.pointerType=="mouse"){px=e.clientX;py=e.clientY}},{passive:true});
function loop(t){if(lite||document.hidden){run=false;return}requestAnimationFrame(loop);
 const dt=Math.min(t-last,100);last=t;ema+=(dt-ema)*.05;if(ema>48){if(++slow>90)return setLite()}else slow=0;
 const k=1-Math.pow(.002,dt/1000),s=t/1000;
 for(const c of items){const tx=c.f&&px>=0?px+c.ox:c.cx*W+Math.sin(s*c.sa+c.p)*c.rx,ty=c.f&&px>=0?py+c.oy:c.cy*H+Math.cos(s*c.sb+c.p)*c.ry;
  c.x+=(tx-c.x)*k;c.y+=(ty-c.y)*k;c.el.style.transform=`translate3d(${c.x}px,${c.y}px,0) rotate(-12deg)`}}
const go=()=>{if(!lite&&!run){run=true;last=performance.now();requestAnimationFrame(loop)}};
document.addEventListener("visibilitychange",()=>!document.hidden&&go());go();
/* frame-rate probe: a device under ~40 fps gets the lite mode automatically */
addEventListener("load",()=>setTimeout(()=>{let n=0,t0=0;const f=t=>{if(!t0)t0=t;if(++n<40)requestAnimationFrame(f);else if((n-1)*1000/(t-t0)<40)setLite()};requestAnimationFrame(f)},400));
/* project card morphs into a dialog */
const md=$("#modal"),mb=$("#mbox");let cu=null;
$$(".pj").forEach(c=>c.onclick=()=>{const p=D.projects[c.dataset.i];cu=c;c.style.viewTransitionName="pj";
 vt(()=>{c.style.viewTransitionName="";mb.innerHTML=`<button class="x" aria-label="Close">✕</button><span class="pl">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p class="lead">${esc(p.desc)}</p><div class="tg">${p.stack.map(s=>`<i>${esc(s)}</i>`).join("")}</div><div class="cta">${p.live?`<a class="btn pri" href="${esc(p.live)}" target="_blank" rel="noopener">Live demo</a>`:""}${p.code?`<a class="btn" href="${esc(p.code)}" target="_blank" rel="noopener">Source code</a>`:""}</div>`;
  mb.style.viewTransitionName="pj";md.hidden=false;document.body.style.overflow="hidden";$(".x",mb).onclick=close;$(".x",mb).focus()})});
function close(){if(md.hidden)return;const c=cu;const t=vt(()=>{mb.style.viewTransitionName="";md.hidden=true;document.body.style.overflow="";c.style.viewTransitionName="pj"});
 t?t.finished.finally(()=>c.style.viewTransitionName=""):c.style.viewTransitionName=""}
md.onclick=e=>e.target==md&&close();addEventListener("keydown",e=>e.key=="Escape"&&close());
