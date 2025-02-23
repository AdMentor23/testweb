// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    createHexagonGrid();
    createBackgroundAnimation();
});

// Background Animation
function createHexagonGrid() {
    const grid = document.querySelector('.hexagon-grid');
    const hexSize = 40;
    const rows = Math.ceil(window.innerHeight / hexSize);
    const cols = Math.ceil(window.innerWidth / hexSize);
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';
            hex.style.left = `${c * hexSize * 1.5}px`;
            hex.style.top = `${r * hexSize * 0.866}px`;
            grid.appendChild(hex);
        }
    }
}

// Modal Handling
const modal = document.getElementById('registerModal');
const registerBtn = document.querySelector('.register-btn');
const registerForm = document.getElementById('registerForm');

registerBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form submission
    const formData = new FormData(registerForm);
    const userData = Object.fromEntries(formData.entries());
    console.log('User Data:', userData);
    
    // Generate user code
    const userCode = 'AST-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Show success message
    showNotification(`Welcome to Astralis! Your code is: ${userCode}`);
    modal.style.display = 'none';
});

// Quote Interaction
const quoteButtons = document.querySelectorAll('.quote-btn');
quoteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isOnPoint = button.classList.contains('on-point');
        handleQuoteInteraction(isOnPoint);
    });
});

function handleQuoteInteraction(isOnPoint) {
    const message = isOnPoint ? 
        "Thanks for your positive feedback!" : 
        "We appreciate your honesty.";
    showNotification(message);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update the background animation with bouncing circles
class BouncingCircle {
    constructor(x, y, vx, vy, size, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
    }

    update(width, height) {
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x < 0 || this.x > width) {
            this.vx *= -1;
            this.x = this.x < 0 ? 0 : width;
        }
        if (this.y < 0 || this.y > height) {
            this.vy *= -1;
            this.y = this.y < 0 ? 0 : height;
        }
    }

    draw(ctx) {
        // Main circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}33`;
        ctx.fill();
        
        // Digital ring effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 5, 0, Math.PI * 2);
        ctx.strokeStyle = `${this.color}4D`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function createBackgroundAnimation() {
    const canvas = document.createElement('canvas');
    canvas.className = 'background-canvas';
    document.querySelector('.background-animation').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const circles = [];
    const ballCount = 15;
    const ballSize = 20;
    const speed = 2;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function init() {
        resizeCanvas();
        circles.length = 0;
        
        for (let i = 0; i < ballCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const vx = (Math.random() - 0.5) * speed;
            const vy = (Math.random() - 0.5) * speed;
            const color = i % 2 === 0 ? '#00BFB3' : '#F7F7F7';
            
            circles.push(new BouncingCircle(x, y, vx, vy, ballSize, color));
        }
    }
    
    function drawConnections() {
        for (let i = 0; i < circles.length; i++) {
            for (let j = i + 1; j < circles.length; j++) {
                const dx = circles[i].x - circles[j].x;
                const dy = circles[i].y - circles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(circles[i].x, circles[i].y);
                    ctx.lineTo(circles[j].x, circles[j].y);
                    ctx.strokeStyle = `rgba(0, 191, 179, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#00BFB333';
        ctx.lineWidth = 0.5;
        const gridSize = 50;
        
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Update and draw circles
        circles.forEach(circle => {
            circle.update(canvas.width, canvas.height);
            circle.draw(ctx);
        });
        
        // Draw connections
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', init);
    init();
    animate();
} 