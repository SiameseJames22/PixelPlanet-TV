document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Authentication & Admin Check ---
    const userDataStr = localStorage.getItem('pixelPlanetUser') || sessionStorage.getItem('pixelPlanetUser');
    
    if (!userDataStr) {
        // Not logged in, send back to login
        window.location.href = 'index.html';
        return;
    }

    const userData = JSON.parse(userDataStr);
    
    // Set Profile Picture initial based on email
    const username = userData.email.split('@')[0];
    document.getElementById('topbarProfilePic').src = `https://ui-avatars.com/api/?name=${username}&background=6c5ce7&color=fff`;

    // Unlock Admin Features
    if (userData.isAdmin) {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = 'block';
            el.classList.remove('hidden'); // For buttons
        });
        console.log("Admin privileges active.");
    }

    // Logout Logic
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('pixelPlanetUser');
        sessionStorage.removeItem('pixelPlanetUser');
        window.location.href = 'index.html';
    });


    // --- 2. Dynamic Video Data Generation ---
    // In a real app, this data would come from Firebase Firestore
    const mockVideos = [
        { id: 'v1', title: "Building a Custom PC in 2026", user: "TechMaster", views: "1.2M", time: "2 days ago", thumb: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&auto=format", duration: "14:20", progress: 0 },
        { id: 'v2', title: "Surviving 100 Days in Minecraft Hardcore", user: "BlockKing", views: "4.5M", time: "1 week ago", thumb: "https://images.unsplash.com/photo-1607513746994-51f730a44832?w=500&auto=format", duration: "1:42:10", progress: 45 },
        { id: 'v3', title: "Why The Metaverse Failed", user: "DigitalDoc", views: "890K", time: "3 hours ago", thumb: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&auto=format", duration: "22:15", progress: 0 },
        { id: 'v4', title: "The Best Speedrun Ever", user: "SpeedyGamer", views: "2.1M", time: "5 days ago", thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format", duration: "55:01", progress: 0 },
        { id: 'v5', title: "Lofi Hip Hop Radio - Beats to Relax/Study to", user: "ChillVibes", views: "15K watching", time: "LIVE", thumb: "https://images.unsplash.com/photo-1516280440502-a28a38a719c8?w=500&auto=format", duration: "LIVE", progress: 0 },
        { id: 'v6', title: "Top 10 Horror Games of the Year", user: "ScareTactics", views: "650K", time: "1 month ago", thumb: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format", duration: "18:40", progress: 0 }
    ];

    const rowsConfig = [
        { title: "Continue Watching", type: "history" },
        { title: `Daily "For You"`, type: "mixed" },
        { title: "Trending", type: "popular" },
        { title: "Recently Uploaded", type: "new" },
        { title: "Because You Watched Minecraft", type: "category" }
    ];

    const container = document.getElementById('videoRowsContainer');

    rowsConfig.forEach((row, index) => {
        // Shuffle videos for variety
        const shuffled = [...mockVideos].sort(() => 0.5 - Math.random());
        
        const rowHTML = `
            <div class="video-row-container">
                <div class="row-header">
                    <h2 class="row-title">${row.title}</h2>
                    <div style="display:flex; gap:0.5rem;">
                        <button class="scroll-btn" onclick="scrollRow('row-${index}', -300)"><i class="fa-solid fa-chevron-left"></i></button>
                        <button class="scroll-btn" onclick="scrollRow('row-${index}', 300)"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
                <div class="video-row" id="row-${index}">
                    ${shuffled.map(vid => `
                        <div class="video-card" onclick="openPlayer('${vid.title}')">
                            <div class="thumbnail-container">
                                <img src="${vid.thumb}" loading="lazy" alt="${vid.title}">
                                <span class="duration">${vid.duration}</span>
                                ${row.type === 'history' || vid.progress > 0 ? `<div class="progress-bar-mini"><div class="progress-mini-filled" style="width: ${vid.progress || Math.random()*80}%;"></div></div>` : ''}
                            </div>
                            <div class="video-info">
                                <img src="https://ui-avatars.com/api/?name=${vid.user}&background=random" class="uploader-pic">
                                <div class="video-details">
                                    <h4>${vid.title}</h4>
                                    <p>${vid.user}</p>
                                    <p>${vid.views} • ${vid.time}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    <!-- Add extra dummy cards to enable scrolling -->
                    ${shuffled.map(vid => `
                        <div class="video-card" onclick="openPlayer('${vid.title}')">
                            <div class="thumbnail-container">
                                <img src="${vid.thumb}" loading="lazy" alt="${vid.title}">
                                <span class="duration">${vid.duration}</span>
                            </div>
                            <div class="video-info">
                                <img src="https://ui-avatars.com/api/?name=${vid.user}&background=random" class="uploader-pic">
                                <div class="video-details">
                                    <h4>${vid.title}</h4>
                                    <p>${vid.user}</p>
                                    <p>${vid.views} • ${vid.time}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML += rowHTML;
    });

});

// --- 3. UI Helpers ---
// Row Scrolling function (Global so buttons can access it)
window.scrollRow = function(rowId, amount) {
    const row = document.getElementById(rowId);
    row.scrollBy({ left: amount, behavior: 'smooth' });
};

// Open/Close Video Player Modal
window.openPlayer = function(title = "Cyberpunk: Edge of the Web") {
    document.getElementById('playerTitle').innerText = title;
    const modal = document.getElementById('playerModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Auto-play the dummy video
    const video = document.getElementById('mainVideoPlayer');
    if(video) video.play();
};

window.closePlayer = function() {
    const modal = document.getElementById('playerModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling

    // Pause video
    const video = document.getElementById('mainVideoPlayer');
    if(video) video.pause();
};
