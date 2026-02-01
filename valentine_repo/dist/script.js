// Sparkles effect
const canvas = document.getElementById('sparkles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Sparkle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
        this.growing = Math.random() > 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.growing) {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 1) this.growing = false;
        } else {
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0) this.growing = true;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff6b9d';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const sparkles = [];
for (let i = 0; i < 100; i++) {
    sparkles.push(new Sparkle());
}

function animateSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
    });
    requestAnimationFrame(animateSparkles);
}

animateSparkles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Button interactions
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Yes button - redirect to yes page
yesBtn.addEventListener('click', () => {
    // Add celebration effect
    createConfetti();
    setTimeout(() => {
        window.location.href = 'yes.html';
    }, 1000);
});

// No button - moves away from cursor
let noBtnClicks = 0;
const messages = [
    "Are you sure? 🥺",
    "Please reconsider... 💔",
    "Just click Yes! 😊",
    "You know you want to... 💕"
];

function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Make Yes button bigger each time
    const currentScale = 1 + (noBtnClicks * 0.1);
    yesBtn.style.transform = `scale(${currentScale})`;
    
    noBtnClicks++;
}

// Move button on hover
noBtn.addEventListener('mouseenter', moveButton);

// Move button on touch (mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

// Prevent clicking the No button
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

// Confetti effect for Yes button
function createConfetti() {
    const colors = ['#ff6b9d', '#c471ed', '#ffc1e3', '#f0d9ff'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '1';
        
        document.body.appendChild(confetti);

        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 5 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let opacity = 1;

        const animate = () => {
            x += vx;
            y += vy + 2; // gravity
            opacity -= 0.01;

            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };

        animate();
    }
}

// Add some interactive cursor effect
document.addEventListener('mousemove', (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '20px';
    heart.style.zIndex = '9999';
    heart.style.animation = 'cursorHeart 1s ease-out forwards';
    
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
});

// Add cursor heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorHeart {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Throttle cursor effect for performance
let lastHeartTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastHeartTime > 200) {
        createCursorHeart(e);
        lastHeartTime = now;
    }
});

function createCursorHeart(e) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '20px';
    heart.style.zIndex = '9999';
    heart.style.animation = 'cursorHeart 1s ease-out forwards';
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}
