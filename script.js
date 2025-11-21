// Staff Data
const staff=[
{role:"Founder",name:"Meow",id:"1275059869799415819"},
{role:"Co Owner",name:"Lisa",id:"1000315559868645427"},
{role:"Co Owner",name:"SleePy",id:"889306635456106506"},
{role:"General Manager",name:"Seahl",id:"925634940408856686"},
{role:"Administrator",name:"Jake",id:"1308500243448336478"},
{role:"Administrator",name:"Piorun",id:"1356076318319575190"},
{role:"Administrator",name:"Zal",id:"747060313597411380"},
{role:"Administrator",name:"Azy",id:"907189767731568660"},
{role:"Community Manager",name:"Dogo",id:"1335596631374041181"},
{role:"Moderator",name:"Abyss",id:"1046159416082305115"},
{role:"Moderator",name:"Fish",id:"1082216499445518397"},
{role:"Moderator",name:"Qin",id:"957506592784388096"},
{role:"Moderator",name:"Elan",id:"950386138651189258"},
{role:"Moderator",name:"Shivam",id:"748050700092571659"}
];

// Staff Cards
const container=document.getElementById("staff-container");
function discordAvatar(id){return `https://cdn.discordapp.com/avatars/${id}/128.png`;}
function discordDefaultAvatar(id){return `https://cdn.discordapp.com/embed/avatars/${id%5}.png`;}
staff.forEach(member=>{
    const card=document.createElement("div");
    card.className="staff-card";
    const avatarUrl = discordAvatar(member.id);
    card.innerHTML=`<img src="${avatarUrl}" onerror="this.onerror=null;this.src='${discordDefaultAvatar(member.id)}';"><h3>${member.name}</h3><p>${member.role}</p>`;
    container.appendChild(card);
});

// Light/Dark Mode
const themeToggle=document.getElementById("themeToggle");
if(localStorage.getItem("theme")==="light"){document.body.classList.add("light-mode");themeToggle.textContent="☀️";}
themeToggle.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode");
    themeToggle.textContent = document.body.classList.contains("light-mode")?"☀️":"🌙";
    localStorage.setItem("theme", document.body.classList.contains("light-mode")?"light":"dark");
});

// Scroll Animations
const sections=document.querySelectorAll(".section");
window.addEventListener("scroll",()=>{
    sections.forEach(sec=>{
        const top=sec.getBoundingClientRect().top;
        if(top<window.innerHeight-100){sec.classList.add("visible");}
    });
});

// Loader with Typewriter
const loader=document.getElementById("loader"), progress=document.getElementById("loaderProgress"), loadingText=document.getElementById("loadingText");
let width=0;
const fakeLoad=setInterval(()=>{
    width+=Math.random()*4;
    if(width>100) width=100;
    progress.style.width = width+"%";
    let dots = ".".repeat(Math.floor(width/10)%4);
    loadingText.textContent = "Loading"+dots;
    if(width>=100){
        clearInterval(fakeLoad);
        loader.style.opacity=0;
        setTimeout(()=>{ loader.style.display="none"; sections.forEach(s=>s.classList.add("visible")); },500);
    }
},50);

// Real-time Discord Member Count
async function updateMembers(){
    try{
        const res=await fetch("https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true");
        const data=await res.json();
        document.getElementById("liveMembers").textContent=data.approximate_member_count;
    }catch(err){console.log(err);}
}
updateMembers();
setInterval(updateMembers,15000);

// Animated Gradient Background
const canvas = document.getElementById("bgCanvas"), ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<100;i++){
    particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3+1,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5});
}
function animateBg(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>canvas.width)p.dx*=-1;
        if(p.y<0||p.y>canvas.height)p.dy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        const gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);
        gradient.addColorStop(0,"#5865f2");
        gradient.addColorStop(1,"rgba(88,101,242,0)");
        ctx.fillStyle=gradient;
        ctx.fill();
    });
    requestAnimationFrame(animateBg);
}
animateBg();
window.addEventListener("resize",()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
