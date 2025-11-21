// DARK MODE
const toggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
document.body.classList.add("dark");
toggle.textContent = "☀️";
}
toggle.onclick = () => {
document.body.classList.toggle("dark");
const isDark = document.body.classList.contains("dark");
toggle.textContent = isDark ? "☀️" : "🌙";
localStorage.setItem("theme", isDark ? "dark" : "light");
};


// DISCORD MEMBER COUNT
fetch("https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true")
.then(r => r.json())
.then(d => {
document.getElementById("memberCount").textContent = `${d.approximate_member
