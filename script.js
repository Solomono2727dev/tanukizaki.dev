// ===== STAFF DATA =====
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

// ===== DISCORD AVATAR =====
function discordDefaultAvatar(id) {
    return `https://cdn.discordapp.com/embed/avatars/${id % 5}.png`;
}

const container = document.getElementById("staff-container");

staff.forEach(member => {
    const card = document.createElement("div");
    card.className = "staff-card";
    card.innerHTML = `
        <img src="${discordDefaultAvatar(member.id)}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
    `;
    container.appendChild(card);
});

// ===== LIGHT / DARK MODE =====
const themeToggle = document.getElementById("themeToggle");
if(localStorage.getItem("theme") === "light") document.body.classList.add("light-mode");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

// ===== FAKE LOADING SCREEN =====
const loader = document.getElementById("loader");
const loadingText = document.getElementById("loadingText");
const loaderProgress = document.getElementById("loaderProgress");

let progress = 0;
let dots = 0;

const interval = setInterval(() => {
    progress += Math.random() * 5; // smooth
    if(progress >= 100) progress = 100;
    loaderProgress.style.width = progress + "%";

    // Typewriter dots
    dots = (dots + 1) % 4;
    loadingText.textContent = "Loading" + ".".repeat(dots);

    if(progress === 100){
        clearInterval(interval);
        loader.style.display = "none";
        showHeroSections();
    }
}, 100);

// ===== SHOW HERO AND SECTIONS =====
function showHeroSections() {
    document.querySelectorAll(".section, footer").forEach(el => {
        el.classList.remove("hidden");
    });

    // Animate hero text and buttons
    const heroElements = document.querySelectorAll("#hero .title, #hero .subtitle, #hero .subtext, #hero .btn");
    heroElements.forEach((el, i) => {
        setTimeout(()=>{ el.classList.add("fade-in"); }, i*300);
    });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("fade-in");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".section, footer").forEach(el => observer.observe(el));
