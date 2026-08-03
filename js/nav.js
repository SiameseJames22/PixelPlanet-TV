// js/nav.js
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle Navbar "Sign In" button on index.html
    const navSignInBtn = document.getElementById('navSignInBtn');
    if (navSignInBtn) {
        navSignInBtn.addEventListener('click', () => {
            // Scroll smoothly down to the auth form
            document.querySelector('.auth-wrapper').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 2. Sidebar Navigation Routing & Active States
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.nav-menu li a');

    sidebarLinks.forEach(link => {
        // Get the filename the link points to
        const linkPath = link.getAttribute('href');

        // If the link matches the current page URL, make it active
        if (linkPath === currentPath) {
            // Remove active class from all
            document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
            // Add to current
            link.parentElement.classList.add('active');
        }
    });

    // 3. Sidebar Mobile Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            if (sidebar.style.transform === 'translateX(0px)') {
                sidebar.style.transform = 'translateX(-100%)';
            } else {
                sidebar.style.transform = 'translateX(0px)';
            }
        });
    }
});
