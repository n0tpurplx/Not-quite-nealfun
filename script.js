// Navigation
function navigateTo(toolId) {
    // Hide all tool views
    document.querySelectorAll('.tool-view').forEach(view => {
        view.classList.add('hidden');
    });

    // Hide grid if going to a tool
    if (toolId !== 'home') {
        document.querySelector('.tools-grid').style.display = 'none';
    } else {
        document.querySelector('.tools-grid').style.display = 'grid';
    }

    // Show selected tool
    if (toolId !== 'home') {
        document.getElementById(toolId).classList.remove('hidden');
    }
}

// ==================== COIN FLIP ====================
function flipCoin() {
    const coin = document.getElementById('coin');
    const result = document.getElementById('coin-result');
    
    coin.classList.remove('flip');
    void coin.offsetWidth; // Trigger reflow
    coin.classList.add('flip');

    // Random result after animation
    setTimeout(() => {
        const isHeads = Math.random() > 0.5;
        result.textContent = isHeads ? '🎉 Heads!' : '🎉 Tails!';
        result.style.color = isHeads ? '#fbbf24' : '#a5b4fc';
    }, 600);
}

// ==================== PASSWORD STRENGTH ====================
document.getElementById('password-input')?.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength() {
    const password = document.getElementById('password-input').value;
    const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    const metCount = Object.values(criteria).filter(v => v).length;
    const strength = password.length === 0 ? 0 : (metCount / 5) * 100;
    
    // Update strength bar
    const strengthBar = document.getElementById('strength-bar');
    strengthBar.style.width = strength + '%';

    // Update strength text
    const strengthText = document.getElementById('strength-text');
    if (password.length === 0) {
        strengthText.textContent = 'Enter a password to check strength';
        strengthText.style.color = '#cbd5e1';
    } else if (strength <= 40) {
        strengthText.textContent = '🔴 Very Weak';
        strengthText.style.color = '#ef4444';
    } else if (strength <= 60) {
        strengthText.textContent = '🟡 Weak';
        strengthText.style.color = '#f59e0b';
    } else if (strength <= 80) {
        strengthText.textContent = '🟢 Good';
        strengthText.style.color = '#fbbf24';
    } else {
        strengthText.textContent = '✅ Strong';
        strengthText.style.color = '#10b981';
    }

    // Update criteria list
    const criteriaList = document.getElementById('strength-criteria');
    criteriaList.innerHTML = `
        <p class="${criteria.length ? 'met' : ''}">
            ${criteria.length ? '✓' : '✗'} At least 8 characters
        </p>
        <p class="${criteria.uppercase ? 'met' : ''}">
            ${criteria.uppercase ? '✓' : '✗'} Uppercase letters
        </p>
        <p class="${criteria.lowercase ? 'met' : ''}">
            ${criteria.lowercase ? '✓' : '✗'} Lowercase letters
        </p>
        <p class="${criteria.numbers ? 'met' : ''}">
            ${criteria.numbers ? '✓' : '✗'} Numbers
        </p>
        <p class="${criteria.special ? 'met' : ''}">
            ${criteria.special ? '✓' : '✗'} Special characters
        </p>
    `;
}

// ==================== COLOR MIXER ====================
function updateColor() {
    const r = document.getElementById('red').value;
    const g = document.getElementById('green').value;
    const b = document.getElementById('blue').value;

    document.getElementById('red-value').textContent = r;
    document.getElementById('green-value').textContent = g;
    document.getElementById('blue-value').textContent = b;

    const color = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('color-preview').style.backgroundColor = color;
    document.getElementById('color-code').textContent = color;
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    document.getElementById('red').value = r;
    document.getElementById('green').value = g;
    document.getElementById('blue').value = b;

    updateColor();
}

// Initialize color
updateColor();

// ==================== JOKE GENERATOR ====================
const jokes = [
    { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
    { setup: "What do you call a fake noodle?", punchline: "An impasta!" },
    { setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field!" },
    { setup: "What do you call a sleeping bull?", punchline: "A dozer!" },
    { setup: "How do you organize a space party?", punchline: "You planet!" },
    { setup: "Did you hear about the claustrophobic astronaut?", punchline: "He just needed a little space!" },
    { setup: "What's the best thing about Switzerland?", punchline: "I don't know, but the flag is a big plus!" },
    { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" },
    { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear!" },
    { setup: "Why did the coffee file a police report?", punchline: "It got mugged!" },
    { setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved!" },
    { setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts!" },
    { setup: "What's orange and sounds like a parrot?", punchline: "A carrot!" },
    { setup: "Why did the mathematics teacher call in sick?", punchline: "Because she had a vector!" },
    { setup: "What do you call a man with a rubber toe?", punchline: "Roberto!" }
];

function generateJoke() {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const jokeDisplay = document.getElementById('joke-display');
    
    jokeDisplay.textContent = joke.setup;
    jokeDisplay.style.minHeight = '150px';

    setTimeout(() => {
        jokeDisplay.textContent = joke.setup + '\n\n' + joke.punchline;
    }, 1500);
}

// ==================== TEXT MIRROR ====================
function mirrorText() {
    const input = document.getElementById('mirror-input').value;
    const output = input.split('').reverse().join('');
    document.getElementById('mirror-output').value = output;
}

// ==================== EMOJI RAIN ====================
const emojis = ['🎉', '😄', '🎊', '⭐', '💫', '✨', '🌟', '🎈', '🎁', '💝', '🌈', '🦄', '🐉', '🎮', '🍕', '🍔', '🍟', '❤️', '💜', '💙'];

function startEmojiRain() {
    const container = document.getElementById('rain-container');
    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.className = 'emoji-drop';
            
            const left = Math.random() * 100;
            const duration = 2 + Math.random() * 1;
            
            emoji.style.left = left + '%';
            emoji.style.animationDuration = duration + 's';
            emoji.style.animationDelay = '0s';
            
            container.appendChild(emoji);

            setTimeout(() => emoji.remove(), duration * 1000);
        }, i * 100);
    }
}