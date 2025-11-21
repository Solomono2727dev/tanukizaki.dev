// ===== FAKE LOADING BAR & TYPEWRITER =====
const loaderBar = document.getElementById('loader-bar');
const pageLoader = document.getElementById('page-loader');
const loaderText = document.getElementById('loader-text');

let progress = 0;
let dots = '';
const fakeLoad = setInterval(() => {
    progress += Math.random() * 6;
    if(progress > 100) progress = 100;
    loaderBar.style.width = progress + '%';

    // Typewriter dots animation
    dots += '.';
    if(dots.length > 3) dots = '';
    loaderText.textContent = `Loading${dots}`;

    if(progress >= 100){
        clearInterval(fakeLoad);
        setTimeout(()=>pageLoader.style.display='none', 300);
        animateHero();
        revealOnScroll(); // make scroll animations work
    }
}, 120);

// ===== HERO TEXT ANIMATION =====
function animateHero(){
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const subText = document.querySelector('.sub-text');
    const heroBtn = document.querySelector('.hero-btn');

    [title, subtitle, subText, heroBtn].forEach((el,i)=>{
        el.style.transition = `opacity 1s ease ${i*0.3}s`;
        el.style.opacity = 1;
    });
}

// ===== LIGHT / DARK MODE =====
const themeToggle = document.getElementById('theme-toggle');
if(localStorage.getItem('theme')==='light'){
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode')?'☀️':'🌙';
    localStorage.setItem('theme', document.body.classList.contains('light-mode')?'light':'dark');
});

// ===== STAFF CARDS =====
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
staff.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'staff-card';
    card.innerHTML = `<img src="https://cdn.discordapp.com/embed/avatars/${m.id % 5}.png" alt="${m.name}"><h3>${m.name}</h3><p>${m.role}</p>`;
    staffContainer.appendChild(card);
});

// ===== SCROLL REVEAL =====
function revealOnScroll(){
    const reveals = document.querySelectorAll('.reveal');
    const trigger = window.innerHeight * 0.85;
    reveals.forEach(el=>{
        const top = el.getBoundingClientRect().top;
        if(top < trigger){
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }
    });
}
window.addEventListener('scroll', revealOnScroll);

// ===== LIVE MEMBER WIDGET =====
fetch("https://discord.com/api/v9/invites/TVJdth4fsu?with_counts=true")
.then(res=>res.json())
.then(data=>{
    document.getElementById('member-count').textContent = data.approximate_member_count;
})
.catch(()=>document.getElementById('member-count').textContent="N/A");
