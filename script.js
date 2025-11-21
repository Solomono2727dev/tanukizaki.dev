// ========== LOADING SCREEN ==========
const loader = document.getElementById('page-loader');
const loaderBar = document.getElementById('loader-bar');

let progress = 0;
const loadInterval = setInterval(() => {
    progress += Math.random() * 10;
    if(progress > 100) progress = 100;
    loaderBar.style.width = progress + '%';
    if(progress >= 100){
        clearInterval(loadInterval);
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 400);
            // Animate hero texts after loading
            animateHero();
        }, 300);
    }
}, 150);

// ========== HERO TEXT ANIMATION ==========
function animateHero(){
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const subText = document.querySelector('.sub-text');
    const heroBtn = document.querySelector('.hero-btn');

    [title, subtitle, subText, heroBtn].forEach((el, i) => {
        el.style.transition = `opacity 1s ease ${i*0.3}s`;
        el.style.opacity = 1;
    });
}

// ========== LIGHT / DARK MODE ==========
const themeToggle = document.getElementById('theme-toggle');
if(localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// ========== STAFF CARDS ==========
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

const staffContainer = document.getElementById('staff-container');

function discordDefaultAvatar(id){ return `https://cdn.discordapp.com/embed/avatars/${id % 5}.png`; }

staff.forEach(member => {
    const card = document.createElement('div');
    card.className = 'staff-card';
    card.innerHTML = `
        <img src="${discordDefaultAvatar(member.id)}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
    `;
    staffContainer.appendChild(card);
});

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < triggerBottom){
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s ease-out';
        } else {
            el.style.opacity = 0;
            el.style.transform = 'translateY(50px)';
        }
    });
});

// ========== LIVE MEMBER WIDGET ==========
fetch("https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true")
.then(res=>res.json())
.then(data=>{
    document.getElementById('member-count').textContent = data.approximate_member_count;
})
.catch(()=> document.getElementById('member-count').textContent = "N/A");
