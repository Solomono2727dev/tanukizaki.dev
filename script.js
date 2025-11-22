// Smooth Scroll (already enabled in CSS but ensuring JS support for older browsers)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Dark Mode Toggle
const themeSwitch = document.getElementById("themeSwitch");
themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

// Scroll Animations
const fadeElements = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.3 });

fadeElements.forEach(el => observer.observe(el));


// Webhook for Contact Form
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const webhookURL = "YOUR_WEBHOOK_URL_HERE";

    const data = {
        embeds: [{
            title: "New Contact Form Submission",
            color: 3447003,
            fields: [
                { name: "Name", value: document.getElementById('name').value },
                { name: "Email", value: document.getElementById('email').value },
                { name: "Message", value: document.getElementById('message').value }
            ]
        }]
    };

    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        formMessage.textContent = "Message sent!";
        form.reset();

    } catch (err) {
        formMessage.textContent = "Error sending message!";
    }
});
