document.addEventListener('DOMContentLoaded', () => {
    // Select all links in the sidebar
    const navLinks = document.querySelectorAll('.nav-menu a, .sidebar-footer a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            const href = link.getAttribute('href');
            
            // Ignore empty links or same-page anchor tags
            if(!href || href === '#' || href === 'home.html') return; 
            
            e.preventDefault(); // Stop normal click
            
            try {
                // Ping the server to see if the HTML file actually exists
                const response = await fetch(href, { method: 'HEAD' });
                
                if (response.ok) {
                    window.location.href = href; // File exists, go to it!
                } else {
                    window.location.href = '404.html'; // File missing, trigger 404!
                }
            } catch (error) {
                // If the check completely fails (like a network error), default to 404
                window.location.href = '404.html';
            }
        });
    });
});
