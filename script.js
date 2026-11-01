const D=DATA,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
const vt=f=>document.startViewTransition?document.startViewTransition(f):(f(),null);
const chips=a=>a.map((t,i)=>`<span class="sk" style="--d:${-i*.7}s">${esc(t)}</span>`).join("");
document.title=`${D.name} | Portfolio`;
$("#name").setAttribute("aria-label",D.name);
$("#name").innerHTML=[...D.name].map((c,i)=>`<span aria-hidden="true" style="--i:${i}">${esc(c)}</span>`).join("");
$("#tag").textContent=D.tagline;$("#abt").textContent=D.about;
$("#b1").textContent=D.badges[0];$("#b2").textContent=D.badges[1];
$$(".dl").forEach(a=>{a.href=D.resume;a.setAttribute("download","")});
$("#p2").src=D.photos[1];$("#p3").src=D.photos[2];
$("#stats").innerHTML = D.stats.map(s => `
  ${s.detail ? `
    <button type="button" class="stat stat-expand" aria-expanded="false">
      <b data-n="${s.n}" data-s="${s.s || ""}">0</b>
      <span class="stat-label">${esc(s.l)}</span>
      <span class="stat-more">${esc(s.detail)}</span>
    </button>
  ` : `
    <div class="stat">
      <b data-n="${s.n}" data-s="${s.s || ""}">0</b>
      <span class="stat-label">${esc(s.l)}</span>
    </div>
  `}
`).join("");
/* Interactive achievement cards */

$$(".stat-expand").forEach(card => {

  // Expand when hovering on desktop
  card.addEventListener("pointerenter", () => {
    if (matchMedia("(hover: hover)").matches) {
      card.classList.add("is-open");
      card.setAttribute("aria-expanded", "true");
    }
  });

  // Collapse when cursor leaves, unless clicked
  card.addEventListener("pointerleave", () => {
    if (card.dataset.pinned !== "true") {
      card.classList.remove("is-open");
      card.setAttribute("aria-expanded", "false");
    }
  });

  // Click to keep expanded or collapse
  card.addEventListener("click", () => {
    const pinned = card.dataset.pinned !== "true";

    card.dataset.pinned = String(pinned);
    card.classList.toggle("is-open", pinned);
    card.setAttribute("aria-expanded", String(pinned));
  });

});
$("#tech").innerHTML=chips(D.tech);$("#soft").innerHTML=chips(D.soft);
$("#tl").innerHTML=D.journey.map((j,i)=>`<div class="it reveal" style="--d:${i*.08}s"><small>${esc(j.tag)}</small><h3>${esc(j.title)}</h3><p>${esc(j.place)}${j.text?"<br>"+esc(j.text):""}</p></div>`).join("");
$("#pj").innerHTML=D.projects.map((p,i)=>`<button class="card pj reveal" data-i="${i}" style="--d:${i*.1}s"><div class="cover" style="--c1:${p.colors[0]};--c2:${p.colors[1]}">${p.icon}</div><span class="tag">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc.slice(0,95))}…</p></button>`).join("");
$("#ld").innerHTML=D.leadership.map((l,i)=>`<div class="card reveal" style="--d:${i*.1}s"><div class="ic">${l.icon}</div><h3>${esc(l.title)}</h3><p>${esc(l.text)}</p></div>`).join("");
const C=D.contact,L=[["Email","mailto:"+C.email,C.email],["Call","tel:"+C.phone.replace(/\s/g,""),C.phone],["LinkedIn",C.linkedin,"LinkedIn"],["GitHub",C.github,"GitHub"]];
$("#links").innerHTML=L.filter(l=>l[2]&&l[1].length>7).map(l=>`<a href="${esc(l[1])}" target="_blank" rel="noopener">${esc(l[2])}</a>`).join("")+(C.location?`<span>${esc(C.location)}</span>`:"");
$("#copy").onclick=e=>{navigator.clipboard?.writeText(C.email);e.target.textContent="Copied";setTimeout(()=>e.target.textContent="Copy email",1800)};
$("#foot").textContent=`© ${new Date().getFullYear()} ${D.name}`;
/* VERTICAL SVG NAVIGATION */

const sec = [
  ["home", "Home", `<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/></svg>`],

  ["about", "About", `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`],

  ["skills", "Skills", `
<svg viewBox="0 0 24 24">
  <path d="M10 2h4l.6 2.4 1.5.6 2.2-1.1 2.8 2.8-1.1 2.2.6 1.5L22 11v2l-2.4.6-.6 1.5 1.1 2.2-2.8 2.8-2.2-1.1-1.5.6L13 22h-2l-.6-2.4-1.5-.6-2.2 1.1-2.8-2.8 1.1-2.2-.6-1.5L2 13v-2l2.4-.6.6-1.5-1.1-2.2 2.8-2.8 2.2 1.1 1.5-.6L10 2Z"/>
  <circle cx="12" cy="12" r="3.2"/>
</svg>`],
  ["journey", "Journey", `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>`],

  ["projects", "Projects", `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v6"/></svg>`],

  ["leadership", "Leadership", `<svg viewBox="0 0 24 24"><path d="m2 8 5 4 5-8 5 8 5-4-2 12H4L2 8Z"/><path d="M4 20h16"/></svg>`],

  ["contact", "Contact", `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`]
];

/* Generate navigation */

$("#nav").innerHTML = sec.map(([id, title, icon]) => `
  <a href="#${id}" aria-label="${title}" title="${title}">
    <span class="nav-icon">${icon}</span>
    <span class="nav-label">${title}</span>
  </a>
`).join("");

/* Active section detection */

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    $$("#nav a").forEach(a => {
      a.classList.toggle(
        "on",
        a.hash === "#" + entry.target.id
      );
    });
  });
}, {
  rootMargin: "-45% 0px -50% 0px"
});

sec.forEach(([id]) => {
  spy.observe($("#" + id));
});
/* typing */
let ri=0,ci=0,dl=0;const tp=$("#typed");
(function tick(){const r=D.roles[ri];ci+=dl?-1:1;tp.textContent=r.slice(0,ci);let t=dl?35:75;
 if(!dl&&ci==r.length){dl=1;t=1400}else if(dl&&!ci){dl=0;ri=(ri+1)%D.roles.length;t=300}setTimeout(tick,t)})();
/* hero photo: morphs between photos */
let pi=0;const hp=$("#hp");D.photos.forEach(s=>{new Image().src=s});hp.src=D.photos[0];
const next=()=>{pi=(pi+1)%D.photos.length;vt(async()=>{hp.src=D.photos[pi];await hp.decode().catch(()=>{})})};
$("#photo").onclick=next;$("#photo").onkeydown=e=>(e.key=="Enter"||e.key==" ")&&(e.preventDefault(),next());
/* reveal + counters */
const count=b=>{const n=+b.dataset.n,f=String(n).includes(".")?1:0,t0=performance.now();(function s(t){const p=Math.min((t-t0)/1400,1);b.textContent=(n*(1-Math.pow(1-p,3))).toFixed(f)+(p==1?b.dataset.s:"");p<1&&requestAnimationFrame(s)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");io.unobserve(e.target);$$("[data-n]",e.target).forEach(count)}),{threshold:0,rootMargin:"0px 0px -8% 0px"});
$$(".reveal").forEach(el=>io.observe(el));
/* scroll bar */
addEventListener("scroll",()=>$(".bar").style.setProperty("--p",scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)),{passive:true});
/* glow + tilt (mouse only) */
if(matchMedia("(hover:hover)").matches){
 const g=$(".glow");addEventListener("pointermove",e=>{g.style.setProperty("--x",e.clientX+"px");g.style.setProperty("--y",e.clientY+"px")});
 $$(".pj").forEach(c=>{c.onpointermove=e=>{const r=c.getBoundingClientRect();c.style.setProperty("--ry",((e.clientX-r.left)/r.width-.5)*10+"deg");c.style.setProperty("--rx",-((e.clientY-r.top)/r.height-.5)*10+"deg")};c.onpointerleave=()=>{c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")}})}
/* project card morphs into a dialog */
const md=$("#modal"),mb=$("#mbox");let cur=null;
$$(".pj").forEach(c=>c.onclick=()=>{const p=D.projects[c.dataset.i];cur=c;c.style.viewTransitionName="pj";
 vt(()=>{c.style.viewTransitionName="";mb.innerHTML=`<button class="x" aria-label="Close">✕</button><div class="cover" style="--c1:${p.colors[0]};--c2:${p.colors[1]}">${p.icon}</div><span class="tag">${esc(p.tag)}</span><h3 class="h" style="font-size:1.7rem;margin:6px 0 12px">${esc(p.title)}</h3><p class="lead">${esc(p.desc)}</p><div class="tags">${p.stack.map(s=>`<i>${esc(s)}</i>`).join("")}</div><div class="cta">${p.live?`<a class="btn pri" href="${esc(p.live)}" target="_blank" rel="noopener">Live demo</a>`:""}${p.code?`<a class="btn" href="${esc(p.code)}" target="_blank" rel="noopener">Source code</a>`:""}</div>`;
  mb.style.viewTransitionName="pj";md.hidden=false;document.body.style.overflow="hidden";$(".x",mb).onclick=close;$(".x",mb).focus()})});
function close(){if(md.hidden)return;const c=cur;c.style.viewTransitionName="";
 const t=vt(()=>{mb.style.viewTransitionName="";md.hidden=true;document.body.style.overflow="";c.style.viewTransitionName="pj"});
 t?t.finished.finally(()=>c.style.viewTransitionName=""):c.style.viewTransitionName=""}
md.onclick=e=>e.target==md&&close();addEventListener("keydown",e=>e.key=="Escape"&&close());
