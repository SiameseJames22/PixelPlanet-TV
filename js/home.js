document.addEventListener('DOMContentLoaded', () => {
    // 1. Session Check & Profile Setup
    const userDataStr = localStorage.getItem('pixelPlanetUser') || sessionStorage.getItem('pixelPlanetUser');
    if (!userDataStr) { window.location.href = 'index.html'; return; }
    
    const userData = JSON.parse(userDataStr);
    let displayUsername = localStorage.getItem('pixelPlanetUsername') || userData.email.split('@')[0];
    const firstLetter = displayUsername.charAt(0).toUpperCase();
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstLetter}&background=6c5ce7&color=fff&font-size=0.5&bold=true`;

    // Populate Images and Text
    document.getElementById('topbarProfilePic').src = avatarUrl;
    document.getElementById('dropdownProfilePic').src = avatarUrl;
    document.getElementById('dropdownUsername').textContent = displayUsername;
    document.getElementById('dropdownRole').textContent = userData.isAdmin ? 'Administrator' : 'Member';

    if (userData.isAdmin) {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
    }

    // 2. Dropdown Logic (Notifications & Profile)
    const notifToggle = document.getElementById('notifToggle');
    const notifDropdown = document.getElementById('notifDropdown');
    const notifDot = document.getElementById('notifDot');
    
    const profileToggle = document.getElementById('topbarProfilePic');
    const profileDropdown = document.getElementById('profileDropdown');

    // Toggle Notifications
    notifToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
        profileDropdown.classList.add('hidden'); // Close the other one
        if (notifDot) notifDot.style.display = 'none'; // Clear notification dot
    });

    // Toggle Profile
    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('hidden');
        notifDropdown.classList.add('hidden'); // Close the other one
    });

    // Close dropdowns if clicking anywhere else
    document.addEventListener('click', () => {
        notifDropdown.classList.add('hidden');
        profileDropdown.classList.add('hidden');
    });

    // Logout Action
    document.getElementById('dropdownLogout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('pixelPlanetUser');
        sessionStorage.removeItem('pixelPlanetUser');
        window.location.href = 'index.html';
    });

    // 3. Video Rendering Logic ("Ghost Town" vs Categories)
    // When you start adding videos via Admin panel, this array will hold them. 
    // Right now it's empty, which triggers the Ghost Town.
    const activeVideos = []; 
    const recentlyWatchedVideoName = "Cyberpunk: Edge of the Web"; // Dynamic variable for later

    const renderVideos = () => {
        const container = document.getElementById('videoRowsContainer');
        
        // EMPTY STATE
        if (activeVideos.length === 0) {
            container.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 350px; color: var(--text-secondary); font-size: 1.3rem; font-weight: bold; letter-spacing: 0.5px;">
                    Its a ghost town around here..
                </div>
            `;
            return;
        }

        // POPULATED STATE (The 5 Categories)
        container.innerHTML = `
            <div class="video-category"><h2>Your Suggestions</h2><div class="video-row" id="row-suggestions"></div></div>
            <div class="video-category"><h2>Top Favourites</h2><div class="video-row" id="row-favourites"></div></div>
            <div class="video-category"><h2>Daily</h2><div class="video-row" id="row-daily"></div></div>
            <div class="video-category"><h2>Newly Added</h2><div class="video-row" id="row-new"></div></div>
            <div class="video-category"><h2>Want Another Like ${recentlyWatchedVideoName}?, Watch These!</h2><div class="video-row" id="row-similar"></div></div>
        `;
        
        // Later: Logic to loop through activeVideos and append to these rows goes here
    };

    renderVideos();
});

// Modal Logic
window.openPlayer = function() {
    document.getElementById('playerModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
window.closePlayer = function() {
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('mainVideoPlayer');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    if(video) video.pause();
}
