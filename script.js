/* ------------------ STAFF CONFIG ------------------ */
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

function discordAvatar(id) {
    return `https://cdn.discordapp.com/avatars/${id}/${id}.png?size=256`;
}

const staffContainer = document.getElementById("staff-container");

staff.forEach(member => {
    const card = document.createElement("div");
    card.className = "staff-card";

    card.innerHTML = `
        <img src="${discordAvatar(member.id)}" onerror="this.src='https://cdn.discordapp.com/embed/avatars/1.png'">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
    `;

    staffContainer.appendChild(card);
});

/* ------------------ LIGHT / DARK MODE ------------------ */
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

/* ------------------ MEMBER COUNT ------------------ */
fetch("https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true")
.then(res => res.json())
.then(data => {
    document.getElementById("memberCount").textContent = data.approximate_member_count;
})
.catch(() => {
    document.getElementById("memberCount").textContent = "Error";
});

/* ------------------ SCROLL REVEAL ------------------ */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ------------------ LOADER ------------------ */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => document.getElementById("loader").style.display = "none", 600);
    }, 200);
};
