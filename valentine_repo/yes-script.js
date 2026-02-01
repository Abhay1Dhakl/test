// Floating hearts canvas animation
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class FloatingHeart {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 30 + 20;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            { r: 255, g: 107, b: 157 }, // Pink
            { r: 196, g: 113, b: 237 }, // Purple
            { r: 255, g: 193, b: 227 }, // Light Pink
            { r: 255, g: 215, b: 0 }    // Gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Reset when heart goes off screen
        if (this.y < -50 || this.x < -50 || this.x > canvas.width + 50) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Draw heart shape
        const size = this.size;
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;

        ctx.beginPath();
        ctx.moveTo(0, size / 4);
        ctx.bezierCurveTo(-size / 2, -size / 4, -size, size / 8, 0, size);
        ctx.bezierCurveTo(size, size / 8, size / 2, -size / 4, 0, size / 4);
        ctx.fill();

        ctx.restore();
    }
}

// Create hearts
const hearts = [];
for (let i = 0; i < 30; i++) {
    hearts.push(new FloatingHeart());
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });

    requestAnimationFrame(animateHearts);
}

animateHearts();

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Confetti celebration on page load
function createCelebrationConfetti() {
    const colors = ['#ff6b9d', '#c471ed', '#ffc1e3', '#ffd700', '#f0d9ff'];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = Math.random() * 15 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '1';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            document.body.appendChild(confetti);

            const duration = Math.random() * 3000 + 2000;
            const xMovement = (Math.random() - 0.5) * 200;

            confetti.animate([
                {
                    transform: `translate(0, 0) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform: `translate(${xMovement}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => confetti.remove(), duration);
        }, i * 30);
    }
}

// Trigger celebration on load
window.addEventListener('load', () => {
    setTimeout(createCelebrationConfetti, 500);
});

// Interactive sparkle effect on mouse move
let lastSparkleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 100) {
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = now;
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = Math.random() * 20 + 15 + 'px';
    sparkle.style.zIndex = '9999';

    document.body.appendChild(sparkle);

    sparkle.animate([
        {
            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
            opacity: 1
        },
        {
            transform: `translate(-50%, -100px) scale(1) rotate(${Math.random() * 360}deg)`,
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    setTimeout(() => sparkle.remove(), 1000);
}

// Add typing effect to messages
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Observe message texts and add typing effect
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
            entry.target.dataset.typed = 'true';
            // Messages already visible through CSS animation, just add extra effects
        }
    });
}, observerOptions);

document.querySelectorAll('.message-text').forEach(text => {
    observer.observe(text);
});
