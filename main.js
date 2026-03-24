let stars = 5;

const activities = {
    abc: {
        title: "Find the Apple!",
        options: [
            { type: 'img', src: 'apple.png', correct: true },
            { type: 'img', src: 'banana.png', correct: false },
            { type: 'emoji', content: '🍇', correct: false },
            { type: 'emoji', content: '🍊', correct: false }
        ]
    },
    numbers: {
        title: "Find the Number 3!",
        options: [
            { type: 'emoji', content: '3️⃣', correct: true },
            { type: 'emoji', content: '1️⃣', correct: false },
            { type: 'emoji', content: '4️⃣', correct: false },
            { type: 'emoji', content: '2️⃣', correct: false }
        ]
    }
};

function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function startActivity(type) {
    const activity = activities[type];
    if (!activity) return;

    document.getElementById('activity-title').innerText = activity.title;
    const container = document.getElementById('activity-options');
    container.innerHTML = '';

    // Create 2 rows of 2 options
    for (let i = 0; i < 2; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.display = 'flex';
        row.style.justifyContent = 'space-around';
        row.style.width = '100%';
        row.style.marginBottom = '20px';

        for (let j = 0; j < 2; j++) {
            const index = i * 2 + j;
            const option = activity.options[index];
            const card = document.createElement('div');
            card.className = 'category-card';
            card.style.width = '120px';
            
            if (option.type === 'img') {
                const img = document.createElement('img');
                img.src = option.src;
                img.className = 'icon-large';
                img.style.width = '100px';
                card.appendChild(img);
            } else {
                const emoji = document.createElement('div');
                emoji.style.fontSize = '60px';
                emoji.innerText = option.content;
                card.appendChild(emoji);
            }

            card.onclick = () => {
                if (option.correct) {
                    handleCorrect();
                } else {
                    handleWrong(card);
                }
            };
            row.appendChild(card);
        }
        container.appendChild(row);
    }

    navigateTo('activity');
}

function handleCorrect() {
    stars++;
    document.getElementById('star-count').innerText = stars;
    document.body.style.backgroundColor = 'var(--grass-green)';
    setTimeout(() => {
        document.body.style.backgroundColor = 'var(--bg-blue)';
        navigateTo('reward');
    }, 500);
}

function handleWrong(element) {
    element.style.transition = 'transform 0.1s';
    element.style.transform = 'translateX(10px)';
    setTimeout(() => {
        element.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 100);
    }, 100);
    element.style.opacity = '0.5';
}

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('onboarding');
});
