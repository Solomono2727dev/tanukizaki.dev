// Light / Dark Mode
const themeToggle = document.getElementById("themeToggle");
const body = document.body;


if (localStorage.getItem("theme") === "dark") {
body.classList.add("dark");
themeToggle.textContent = "☀️";
}


themeToggle.addEventListener("click", () => {
body.classList.toggle("dark");
const isDark = body.classList.contains("dark");
themeToggle.textContent = isDark ? "☀️" : "🌙";
localStorage.setItem("theme", isDark ? "dark" : "light");
});


// Fetch Discord Member Count
fetch("https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true")
.then(res => res.json())
.then(data => {
document.getElementById("memberCount").textContent = `${data.approximate_member_count} Members`;
})
.catch(() => {
document.getElementById("memberCount").textContent = "Unable to load";
});

