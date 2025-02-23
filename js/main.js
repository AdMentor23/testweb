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