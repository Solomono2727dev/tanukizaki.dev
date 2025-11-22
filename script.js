/* =========================
   LOADING SCREEN
   ========================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 600);
  }, 1500);
});

/* =========================
   SMOOTH THEME SWITCH
   ========================= */
const themeToggle = document.getElementById("themeToggle");

function applySavedTheme() {
  const saved = localStorage.getItem("siteTheme");
  if (saved === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
}
applySavedTheme();

themeToggle.addEventListener("click", () => {
  document.body.style.transition = "background 0.6s, color 0.6s";

  const isLight = document.body.classList.toggle("light");
  localStorage.setItem("siteTheme", isLight ? "light" : "dark");

  themeToggle.textContent = isLight ? "☀️" : "🌙";
});

/* =========================
   STAFF CARDS
   ========================= */
const staff = [
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

const staffGrid = document.getElementById("staffGrid");

staff.forEach(s => {
  staffGrid.innerHTML += `
    <div class="staff-card fade-up">
      <img src="https://cdn.discordapp.com/avatars/${s.id}/${s.id}.png?size=256"
           onerror="this.src='https://cdn.discordapp.com/embed/avatars/1.png'">
      <h3>${s.name}</h3>
      <p>${s.role}</p>
    </div>`;
});

/* =========================
   HOMEWORK SUBMIT (WEBHOOK)
   ========================= */
const webhookURL = "https://discord.com/api/webhooks/1441803815216087273/5rz3VnZs8nw0Y1MGcV-8cKZlFs8pzXJ6G0E9tDOGC19SofuDGhZG3TXYkmgJMBptPFlP";

const submitBtn = document.getElementById("submitHW");
const checkboxes = document.querySelectorAll(".chk");
const linkInput = document.getElementById("linkInput");
const usernameInput = document.getElementById("usernameInput");

function validateHW() {
  const allChecked = [...checkboxes].every(c => c.checked);
  const linkFilled = linkInput.value.trim() !== "";
  const userFilled = usernameInput.value.trim() !== "";

  if (allChecked && linkFilled && userFilled) {
    submitBtn.classList.add("enabled");
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.remove("enabled");
    submitBtn.disabled = true;
  }
}

checkboxes.forEach(c => c.addEventListener("change", validateHW));
linkInput.addEventListener("input", validateHW);
usernameInput.addEventListener("input", validateHW);

submitBtn.addEventListener("click", async () => {
  const payload = {
    embeds: [{
      title: "Homework Submission",
      color: 0x0094ff,
      fields: [
        { name: "Username", value: usernameInput.value },
        { name: "Link", value: linkInput.value },
        { name: "Completed Tasks", value: "All tasks completed ✔" }
      ]
    }]
  };

  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  alert("Submitted successfully!");
});

/* =========================
   REALTIME DISCORD API MEMBER COUNT
   ========================= */
async function fetchMembers() {
  try {
    const res = await fetch("https://discord.com/api/v9/invites/tanukizaki?with_counts=true");
    const data = await res.json();
    document.getElementById("memberCount").textContent =
      data.approximate_member_count + " Members";
  } catch {
    document.getElementById("memberCount").textContent = "Unavailable";
  }
}
fetchMembers();

/* =========================
   SCROLL ANIMATIONS
   ========================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
});

document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
