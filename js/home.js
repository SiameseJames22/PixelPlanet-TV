document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SETUP PROFILE ---
    const userDataStr = localStorage.getItem('pixelPlanetUser');
    if (!userDataStr) { window.location.href = 'index.html'; return; }
    
    const userData = JSON.parse(userDataStr);
    let displayUsername = localStorage.getItem('pixelPlanetUsername') || userData.email.split('@')[0];
    const avatarUrl = `https://ui-avatars.com/api/?name=${displayUsername.charAt(0)}&background=6c5ce7&color=fff`;

    document.getElementById('topbarProfilePic').src = avatarUrl;
    document.getElementById('dropdownProfilePic').src = avatarUrl;
    document.getElementById('dropdownUsername').textContent = displayUsername;

    if (userData.isAdmin) {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
    }

    // --- 2. DROPDOWNS (NOTIFICATIONS & PROFILE) ---
    const notifToggle = document.getElementById('notifToggle');
    const notifDropdown = document.getElementById('notifDropdown');
    const notifDot = document.getElementById('notifDot');
    
    const profileToggle = document.getElementById('topbarProfilePic');
    const profileDropdown = document.getElementById('profileDropdown');

    notifToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
        profileDropdown.classList.add('hidden'); 
        if (notifDot) notifDot.style.display = 'none'; // Hides red dot on click
    });

    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('hidden');
        notifDropdown.classList.add('hidden');
    });

    document.addEventListener('click', () => {
        notifDropdown.classList.add('hidden');
        profileDropdown.classList.add('hidden');
    });

    document.getElementById('dropdownLogout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('pixelPlanetUser');
        window.location.href = 'index.html';
    });

    // --- 3. GHOST TOWN & CATEGORIES ---
    // If this array is empty, it shows Ghost Town. When you add videos later, add them here.
    const uploadedVideos = []; 
    const recentlyWatched = "Cyberpunk: Edge of the Web"; 

    const container = document.getElementById('videoRowsContainer');

    if (uploadedVideos.length === 0) {
        // Show Ghost Town
        container.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 300px; color: #a0a0b0; font-size: 1.5rem; font-weight: bold;">
                Its a ghost town around here..
            </div>
        `;
    } else {
        // Show the 5 Categories when videos exist
        container.innerHTML = `
            <div class="video-category"><h2 style="margin-bottom: 1rem;">Your Suggestions</h2><div class="video-row" id="row-suggestions"></div></div>
            <div class="video-category"><h2 style="margin-bottom: 1rem;">Top Favourites</h2><div class="video-row" id="row-favourites"></div></div>
            <div class="video-category"><h2 style="margin-bottom: 1rem;">Daily</h2><div class="video-row" id="row-daily"></div></div>
            <div class="video-category"><h2 style="margin-bottom: 1rem;">Newly Added</h2><div class="video-row" id="row-new"></div></div>
            <div class="video-category"><h2 style="margin-bottom: 1rem;">Want Another Like ${recentlyWatched}?, Watch These!</h2><div class="video-row" id="row-similar"></div></div>
        `;
    }
});
