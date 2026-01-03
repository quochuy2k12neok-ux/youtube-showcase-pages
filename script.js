import { videos, shorts, categories } from './data.js';

// DOM Elements
const videoContainer = document.getElementById('video-container');
const categoryBar = document.getElementById('category-bar');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const btnHome = document.getElementById('btn-home');
const btnShorts = document.getElementById('btn-shorts');

let currentMode = 'home'; // 'home' hoặc 'shorts'

// --- 1. HÀM RENDER (HIỂN THỊ) ---

// Render Video Dài
function renderVideos(list) {
    videoContainer.className = 'video-grid'; // Set Grid cho video ngang
    videoContainer.innerHTML = list.map(v => `
        <div class="video-card">
            <div class="thumb-wrapper">
                <img src="${v.thumbnail}" class="thumb-img">
                <span class="duration">${v.duration}</span>
                <video src="${v.preview}" class="preview-video" muted loop></video>
            </div>
            <div class="info-wrapper">
                <div class="avatar-circle">${v.channel[0]}</div>
                <div class="details">
                    <h3 class="title">${v.title}</h3>
                    <p class="channel">${v.channel} <i class="fas fa-check-circle"></i></p>
                    <p class="meta">${v.views} views • ${v.time}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    setupHoverEffect();
}

// Render Shorts
function renderShorts(list) {
    videoContainer.className = 'shorts-grid'; // Set Grid cho video dọc
    videoContainer.innerHTML = list.map(s => `
        <div class="shorts-card">
            <img src="${s.thumbnail}" class="shorts-thumb">
            <div class="shorts-info">
                <h3 class="shorts-title">${s.title}</h3>
                <p class="shorts-views">${s.views} views</p>
            </div>
            <div class="shorts-overlay">
                <i class="fas fa-play"></i>
            </div>
        </div>
    `).join('');
}

// Render Categories
function renderCategories() {
    categoryBar.innerHTML = categories.map(cat => 
        `<button class="chip" onclick="filterCategory('${cat}')">${cat}</button>`
    ).join('');
}

// --- 2. TÍNH NĂNG TÌM KIẾM ---

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    
    if (currentMode === 'home') {
        const filtered = videos.filter(v => 
            v.title.toLowerCase().includes(query) || 
            v.channel.toLowerCase().includes(query)
        );
        renderVideos(filtered);
    } else {
        const filtered = shorts.filter(s => 
            s.title.toLowerCase().includes(query)
        );
        renderShorts(filtered);
    }
}

// --- 3. XỬ LÝ SỰ KIỆN ---

// Chuyển Tab Home/Shorts
btnHome.addEventListener('click', () => {
    currentMode = 'home';
    btnHome.classList.add('active');
    btnShorts.classList.remove('active');
    categoryBar.style.display = 'flex'; // Hiện thanh lọc
    renderVideos(videos);
});

btnShorts.addEventListener('click', () => {
    currentMode = 'shorts';
    btnShorts.classList.add('active');
    btnHome.classList.remove('active');
    categoryBar.style.display = 'none'; // Ẩn thanh lọc ở Shorts
    renderShorts(shorts);
});

// Tìm kiếm khi click hoặc Enter
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Hiệu ứng Hover Video
function setupHoverEffect() {
    document.querySelectorAll('.thumb-wrapper').forEach(wrap => {
        const vid = wrap.querySelector('video');
        wrap.addEventListener('mouseenter', () => vid.play());
        wrap.addEventListener('mouseleave', () => {
            vid.pause();
            vid.currentTime = 0;
        });
    });
}

// Khởi chạy lần đầu
renderCategories();
renderVideos(videos);
// Gắn hàm lọc category vào window để HTML gọi được
window.filterCategory = (cat) => {
    if (cat === 'Tất cả') renderVideos(videos);
    else renderVideos(videos.filter(v => v.category === cat));
};
