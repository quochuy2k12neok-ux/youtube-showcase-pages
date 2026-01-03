import { projects, categories } from './data.js';

const videoGrid = document.getElementById('video-grid');
const categoryBar = document.getElementById('category-bar');

// 1. Render Category Chips
function initCategories() {
    categories.forEach(cat => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.innerText = cat;
        chip.onclick = () => filterProjects(cat);
        categoryBar.appendChild(chip);
    });
}

// 2. Render Project Cards
function renderProjects(data) {
    videoGrid.innerHTML = data.map(item => `
        <div class="video-card">
            <div class="thumb-container">
                <img src="${item.thumbnail}" class="thumb-img">
                <video src="${item.preview}" class="preview-video" muted loop></video>
            </div>
            <div class="v-info">
                <img src="${item.avatar}" class="v-avatar">
                <div>
                    <h3 class="v-title">${item.title}</h3>
                    <div class="v-meta">
                        ${item.channel} <i class="fas fa-check-circle" style="font-size: 12px;"></i><br>
                        ${item.views} lượt xem • ${item.time}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    setupVideoPreview();
}

// 3. Logic Hover Preview
function setupVideoPreview() {
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
        const video = card.querySelector('video');
        card.addEventListener('mouseenter', () => video.play());
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// 4. Logic Filter
function filterProjects(category) {
    if (category === "Tất cả") {
        renderProjects(projects);
    } else {
        const filtered = projects.filter(p => p.category === category);
        renderProjects(filtered);
    }
}

// Khởi tạo ứng dụng
initCategories();
renderProjects(projects);
