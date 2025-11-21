// LOADING SCREEN
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 500);
    }, 800);
});

// LIGHT/DARK MODE
document.getElementById("themeToggle").addEventListener("change", function () {
    document.body.classList.toggle("light");
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
function revealElements() {
    for (let el of reveals) {
        let rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) el.classList.add("visible");
    }
}
window.addEventListener("scroll", revealElements);
revealElements();

// LIVE MEMBER COUNT (DISCORD API)
async function loadMembers() {
    try {
        const res = await fetch("https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true");
        const data = await res.json();
        document.getElementById("memberCount").innerText = data.approximate_member_count;
    } catch {
        document.getElementById("memberCount").innerText = "Error";
    }
}
loadMembers();
setInterval(loadMembers, 30000);

// STAFF LIST (PFPS AUTO-LOAD)
const staff = [
    { id: "1413961391211024457", name: "Meow", role: "Founder" },
    { id: "000000000000000000", name: "Staff 2", role: "Admin" },
    { id: "000000000000000000", name: "Staff 3", role: "Mod" }
];

staff.forEach(user => {
    const grid = document.getElementById("staffGrid");

    const box = document.createElement("div");
    box.className = "staff-box";

    box.innerHTML = `
        <h3>${user.name}</h3>
        <p>${user.role}</p>
        <small>ID: ${user.id}</small>
    `;

    grid.appendChild(box);
});
