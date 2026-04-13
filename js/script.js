// script.js

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking on a link
navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
    }
});

// Visitor hit counter using CountAPI
function updateVisitorCount() {
    const counter = document.getElementById('visitor-count');
    if (!counter) return;

    const namespace = 'nudge4good-visitor-counter';
    const key = 'site-footer-hits';
    const url = `https://api.countapi.xyz/hit/${namespace}/${key}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && typeof data.value === 'number') {
                counter.textContent = data.value.toLocaleString();
            } else {
                counter.textContent = 'N/A';
            }
        })
        .catch(() => {
            counter.textContent = 'N/A';
        });
}

updateVisitorCount();

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .feature-card, .benefit-card, .collab-card, .benefit-item, .case-card, .team-card, .contact-item, .point, .phase, .diagram-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});