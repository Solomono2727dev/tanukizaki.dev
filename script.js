/* ====================== Loader ====================== */
const loader = document.getElementById('page-loader');
window.addEventListener('load', () => {
  // small delay so loader is visible briefly even on fast loads
  setTimeout(() => {
    loader.style.transition = 'opacity .5s ease';
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }, 650);
});

/* ====================== Theme toggle ====================== */
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') document.body.classList.add('light');
if (saved === 'dark') {} // nothing needed, default is dark

themeToggle.addEventListener('change', () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ====================== Reveal on scroll ====================== */
const revealEls = document.querySelectorAll('.reveal');
function reveal() {
  revealEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('resize', reveal);
reveal();

/* ====================== Live Member Count ====================== */
async function updateMembers() {
  const target = document.getElementById('memberCount');
  try {
    const r = await fetch('https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true');
    const j = await r.json();
    // If API provides approximate_member_count, use it, else fallback to presence_count
    const count = j.approximate_member_count ?? j.presence_count ?? null;
    if (count) target.innerText = count;
    else target.innerText = '404';
  } catch (e) {
    target.innerText = '404';
  }
}
updateMembers();
setInterval(updateMembers, 30_000);

/* ====================== Staff grid (safe avatars) ====================== */
const staff = [
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

const grid = document.getElementById('staffGrid');
staff.forEach(s => {
  const el = document.createElement('div');
  el.className = 'staff-box';
  // safest avatar for static site: discord default embed avatars (based on id % 5)
  const avatar = `https://cdn.discordapp.com/embed/avatars/${Number(s.id) % 5}.png`;
  el.innerHTML = `
    <img src="${avatar}" alt="${s.name}" width="86" height="86" style="border-radius:50%;display:block;margin:0 auto 8px;"/>
    <div class="staff-name">${s.name}</div>
    <div class="staff-role">${s.role}</div>
  `;
  grid.appendChild(el);
});
