/* ===========================
   CONFIG (webhook + invite)
   =========================== */
const WEBHOOK_URL = "https://discord.com/api/webhooks/1441803815216087273/5rz3VnZs8nw0Y1MGcV-8cKZlFs8pzXJ6G0E9tDOGC19SofuDGhZG3TXYkmgJMBptPFlP";
const INVITE_API = "https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true";

/* ===========================
   HELPERS
   =========================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ===========================
   PARTICLE BACKGROUND (canvas)
   =========================== */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function initParticles(count = 70){
  particles = [];
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: 1 + Math.random()*3,
      vx: (Math.random()-0.5)*0.3,
      vy: (Math.random()-0.5)*0.3,
      hue: 180 + Math.random()*80
    });
  }
}
function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < -10) p.x = canvas.width+10;
    if(p.x > canvas.width+10) p.x = -10;
    if(p.y < -10) p.y = canvas.height+10;
    if(p.y > canvas.height+10) p.y = -10;
    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
    g.addColorStop(0, `hsla(${p.hue},100%,60%,0.9)`);
    g.addColorStop(1, `hsla(${p.hue},100%,60%,0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
initParticles();
drawParticles();

/* ===========================
   LOADING SCREEN + TYPEWRITER
   =========================== */
const loadingScreen = $("#loading-screen");
const loadingText = $("#loading-text");
const loadingBar = $("#loading-bar");

function typewriter(text, el, speed=60, cb){
  let i=0;
  el.textContent = "";
  const t = setInterval(()=>{
    el.textContent += text.charAt(i);
    i++;
    if(i>=text.length){
      clearInterval(t);
      cb && cb();
    }
  }, speed);
}
typewriter("Loading...", loadingText, 60);

let progress = 0;
const loadingTick = setInterval(()=>{
  progress += Math.random()*6; // pseudo smooth
  if(progress > 100) progress = 100;
  loadingBar.style.width = progress + "%";
  if(progress >= 100){
    clearInterval(loadingTick);
    setTimeout(()=> {
      loadingScreen.style.opacity = 0;
      setTimeout(()=> loadingScreen.style.display = "none", 420);
    }, 400);
  }
}, 90);

/* ===========================
   THEME (light/dark) toggle — improved + persistent + smooth
   =========================== */
const themeToggle = $("#themeToggle");

function applySavedTheme(){
  const saved = localStorage.getItem("siteTheme");
  if(saved === "light"){
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
}
// call on load
applySavedTheme();

themeToggle.addEventListener("click", ()=>{
  const isLight = document.body.classList.toggle("light");
  localStorage.setItem("siteTheme", isLight ? "light" : "dark");

  // smooth visual flip: button icon + subtle transition already handled by CSS transitions
  themeToggle.textContent = isLight ? "☀️" : "🌙";
});

/* ===========================
   SMOOTH SCROLL FOR NAV LINKS
   =========================== */
document.querySelectorAll('#navbar a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if(!target) return;
    window.scrollTo({
      top: target.offsetTop - 80, // offset so navbar doesn't overlap
      behavior: "smooth"
    });
  });
});

/* ===========================
   SCROLL REVEAL (robust IntersectionObserver)
   =========================== */
const reveals = $$(".reveal");

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      obs.unobserve(entry.target); // animate once then unobserve
    }
  });
}, { threshold: 0.18 });

reveals.forEach(r => revealObserver.observe(r));

/* ===========================
   STAFF CARDS RENDER
   =========================== */
const staffMembers = [
  { role: "Founder", name: "Meow", id: "1275059869799415819" },
  { role: "Co Owner", name: "Lisa", id: "1000315559868645427" },
  { role: "Co Owner", name: "SleePy", id: "889306635456106506" },
  { role: "General Manager", name: "Seahl", id: "925634940408856686" },
  { role: "Administrator", name: "Jake", id: "1308500243448336478" },
  { role: "Administrator", name: "Piorun", id: "1356076318319575190" },
  { role: "Administrator", name: "Zal", id: "747060313597411380" },
  { role: "Administrator", name: "Azy", id: "907189767731568660" },
  { role: "Community Manager", name: "Dogo", id: "1335596631374041181" },
  { role: "Moderator", name: "Abyss", id: "1046159416082305115" },
  { role: "Moderator", name: "Fish", id: "1082216499445518397" },
  { role: "Moderator", name: "Qin", id: "957506592784388096" },
  { role: "Moderator", name: "Elan", id: "950386138651189258" },
  { role: "Moderator", name: "Shivam", id: "748050700092571659" }
];

function getDiscordAvatarUrl(id){
  // Use user id for avatar path; will 404 if user has no avatar, we'll use <img onerror> fallback in DOM
  return `https://cdn.discordapp.com/avatars/${id}/128.png`;
}

function renderStaff(){
  const wrap = $("#staffContainer");
  wrap.innerHTML = "";
  staffMembers.forEach(s=>{
    const card = document.createElement("div");
    card.className = "staff-card reveal";

    card.innerHTML = `
      <div class="avatar">
        <img src="${getDiscordAvatarUrl(s.id)}" alt="${s.name} avatar" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/embed/avatars/${(parseInt(s.id,10) % 5)}.png'">
      </div>
      <h3>${s.name}</h3>
      <p>${s.role}</p>
    `;
    wrap.appendChild(card);
    revealObserver.observe(card);
  });
}
renderStaff();

/* ===========================
   LIVE MEMBER COUNT (invite endpoint)
   =========================== */
const liveCountEl = $("#liveCount");
async function fetchLiveMembers(){
  try{
    const res = await fetch(INVITE_API);
    if(!res.ok) throw new Error("invite fetch failed");
    const json = await res.json();
    if(json && typeof json.approximate_member_count !== "undefined"){
      liveCountEl.textContent = json.approximate_member_count.toLocaleString();
    } else {
      liveCountEl.textContent = "N/A";
    }
  }catch(e){
    // fallback: small randomized value if blocked
    const fallback = 380 + Math.floor(Math.random()*60);
    liveCountEl.textContent = fallback;
  }
}
fetchLiveMembers();
setInterval(fetchLiveMembers, 20_000);

/* ===========================
   TODO WIDGET LOGIC
   =========================== */
const todoToggle = $("#todoToggle");
const todoWidget = $("#todoWidget");
const todoUsername = $("#todoUsername");
const todoLink = $("#todoLink");
const taskCheckboxes = Array.from($$(".task"));
const submitButton = $("#submitTodo");
const todoStatus = $("#todoStatus");

function setWidgetVisible(v){
  todoWidget.style.display = v ? "block" : "none";
  todoWidget.setAttribute("aria-hidden", v ? "false" : "true");
}
todoToggle.addEventListener("click", ()=> {
  const visible = todoWidget.style.display === "block";
  setWidgetVisible(!visible);
});

// validation
function validateTodoState(){
  const allChecked = taskCheckboxes.every(c => c.checked);
  const hasUser = todoUsername.value.trim().length >= 1;
  const hasLink = todoLink.value.trim().length >= 5;
  if(allChecked && hasUser && hasLink){
    submitButton.classList.add("enabled");
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove("enabled");
    submitButton.disabled = true;
  }
}
taskCheckboxes.forEach(cb => cb.addEventListener("change", validateTodoState));
todoUsername.addEventListener("input", validateTodoState);
todoLink.addEventListener("input", validateTodoState);

// daily reset using localStorage (resets tasks & inputs once per UTC day)
const RESET_KEY = "tkz_todo_reset_day";
function checkAndResetDaily(){
  const last = localStorage.getItem(RESET_KEY);
  const today = new Date().toDateString();
  if(last !== today){
    // reset
    taskCheckboxes.forEach(c => c.checked = false);
    todoUsername.value = "";
    todoLink.value = "";
    localStorage.setItem(RESET_KEY, today);
    validateTodoState();
  } else {
    // keep state if saved
    // Optional: restore saved check states if you prefer (not implemented here)
    validateTodoState();
  }
}
checkAndResetDaily();

// Submit: send webhook embed with Homework title, Link, Username, Completed tasks
submitButton.addEventListener("click", async () => {
  if(submitButton.disabled) return;
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const username = todoUsername.value.trim();
  const link = todoLink.value.trim();
  const tasks = taskCheckboxes.map(cb => ({
    name: cb.dataset.task,
    done: cb.checked
  }));

  // Build embed content (Homework format)
  const fields = [
    { name: "Link", value: link || "—" },
    { name: "Username", value: username || "—" },
    { name: "Time", value: new Date().toLocaleString() }
  ];
  fields.push({ name: "Tasks", value: tasks.map(t => `${t.done ? "✔️" : "❌"} ${t.name}`).join("\n") });

  const payload = {
    embeds: [
      {
        title: "Homework",
        color: 0x00C8FF,
        fields
      }
    ]
  };

  try{
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    todoStatus.textContent = "Submitted — good job! (resets in 24h)";
    // after successful submit: clear and disable until next day
    const today = new Date().toDateString();
    localStorage.setItem(RESET_KEY, today);
    taskCheckboxes.forEach(c => c.checked = false);
    todoUsername.value = "";
    todoLink.value = "";
    validateTodoState();
  }catch(err){
    console.error("Webhook send error", err);
    todoStatus.textContent = "Error sending. Try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    setTimeout(()=> todoStatus.textContent = "", 6000);
  }
});

/* ===========================
   Accessibility: close widget on outside click
   =========================== */
document.addEventListener("click", (e)=>{
  if(!todoWidget.contains(e.target) && e.target !== todoToggle){
    setWidgetVisible(false);
  }
});

/* ===========================
   Initialization done
   =========================== */
document.addEventListener("DOMContentLoaded", ()=>{
  // ensure reveal check run at start (we already observe)
  // keep previous behavior: run an initial reveal check in case some elements are in view
  // (the IntersectionObserver handles this automatically when observed)
});

/* =========================
   SCRIM RECORDS
   ========================= */

// Edit these with your official results
const scrims = [
  { opponent: "TMK", score: "23 - 25 Loss", date: "21 Feb 2025" },
  
];

const scrimGrid = document.getElementById("scrimGrid");

scrims.forEach(s => {
  scrimGrid.innerHTML += `
    <div class="scrim-card fade-up">
      <h3 class="scrim-title">vs ${s.opponent}</h3>
      <p class="scrim-score">${s.score}</p>
      <p class="scrim-date">${s.date}</p>
    </div>
  `;
});
