/* ---------------------------
      LIGHT / DARK MODE
----------------------------*/
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

/* ---------------------------
  SCROLL ANIMATIONS
----------------------------*/
function revealOnScroll() {
    document.querySelectorAll(".fade-in").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ---------------------------
      STAFF TEAM
----------------------------*/

const staffData = [
    { role: "Founder",       name: "Meow",   id: "1275059869799415819" },
    { role: "Co Owner",      name: "Lisa",   id: "1000315559868645427" },
    { role: "Co Owner",      name: "SleePy", id: "889306635456106506" },
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
    { role: "Moderator", name: "Shivam", id: "748050700092571659" },
];

const staffGrid = document.querySelector(".staff-grid");

staffData.forEach(staff => {
    const img = `https://cdn.discordapp.com/avatars/${staff.id}/${staff.id}.png?size=512`;

    staffGrid.innerHTML += `
        <div class="staff-card fade-in">
            <img src="https://cdn.discordapp.com/avatars/${staff.id}/${staff.id}.png?size=512" 
                 onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'" />
            <h3>${staff.name}</h3>
            <p>${staff.role}</p>
        </div>
    `;
});

/* ---------------------------
   LIVE DISCORD MEMBER COUNT
----------------------------*/

async function loadMemberCount() {
    const invite = "TVJdth4fsu";

    try {
        const res = await fetch(`https://discord.com/api/v10/invites/${invite}?with_counts=true`);
        const data = await res.json();

        document.getElementById("memberCount").textContent =
            data.approximate_member_count || "Unavailable";

    } catch {
        document.getElementById("memberCount").textContent = "Unavailable";
    }
}

loadMemberCount();
