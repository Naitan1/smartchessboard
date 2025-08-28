const NUM_PARTICLES = 40;
const particlesContainer = document.getElementById("particles");
const particles = [];

for (let i = 0; i < NUM_PARTICLES; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size
    const size = Math.random() * 2 + 1; // 1px to 3px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;

    // Random float direction and speed
    const x = (Math.random() - 0.5) * 100; // horizontal drift
    const y = -100 - Math.random() * 200; // upward drift
    const duration = 30 + Math.random() * 40;

    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
    particles.push({ el: particle, baseX: x });
}

let realMouseX = 0;    // actual cursor position normalized [-0.5..0.5]
let smoothMouseX = 0;  // smoothed cursor position used for animation
const easing = 0.1;    // smaller = slower smoothing, bigger = faster

document.addEventListener("mousemove", (e) => {
    realMouseX = e.clientX / window.innerWidth - 0.5;
});

function updateParticles() {
    // Smoothly interpolate smoothMouseX towards realMouseX
    smoothMouseX += (realMouseX - smoothMouseX) * easing;

    particles.forEach(({ el, baseX }) => {
        const bend = smoothMouseX * 60; // stronger bending (60px max)
        el.style.setProperty('--x', `${baseX + bend}px`);
    });

    requestAnimationFrame(updateParticles);
}

updateParticles();
