document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const toggleAuthModeBtn = document.getElementById('toggleAuthMode');
    const authSubtitle = document.getElementById('authSubtitle');
    const toggleText = document.getElementById('toggleText');
    const submitBtn = document.getElementById('submitBtn');
    const authForm = document.getElementById('authForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // UI Groups
    const signupOnlyFields = document.querySelectorAll('.signup-only');
    const loginOnlyFields = document.querySelectorAll('.login-only');

    // State
    let isLoginMode = true;

    // Hardcoded Admin List
    const ADMIN_EMAILS = [
        'robloxworld607@gmail.com',
        'jamesw3468@outlook.com'
    ];

    // Toggle Password Visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Toggle Between Login and Sign Up
    toggleAuthModeBtn.addEventListener('click', () => {
        isLoginMode = !isLoginMode;

        if (isLoginMode) {
            authSubtitle.textContent = "Welcome back!";
            submitBtn.textContent = "Sign In";
            toggleText.innerHTML = `Don't have an account? <span class="accent-link" id="toggleAuthMode">Sign Up</span>`;
            
            signupOnlyFields.forEach(field => field.style.display = 'none');
            loginOnlyFields.forEach(field => field.style.display = 'block');
        } else {
            authSubtitle.textContent = "Create an account to start watching.";
            submitBtn.textContent = "Sign Up";
            toggleText.innerHTML = `Already have an account? <span class="accent-link" id="toggleAuthMode">Sign In</span>`;
            
            signupOnlyFields.forEach(field => {
                field.style.display = 'block';
                field.style.animation = 'fadeIn 0.4s ease-out forwards';
            });
            loginOnlyFields.forEach(field => field.style.display = 'none');
        }

        // Re-attach listener due to innerHTML replacement
        document.getElementById('toggleAuthMode').addEventListener('click', toggleAuthModeBtn.click);
    });

    // Handle Form Submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Basic validation
        if(email === '' || password === '') {
            alert('Please fill out all required fields.');
            return;
        }

        if (!isLoginMode) {
            const username = document.getElementById('username').value;
            const confirm = document.getElementById('confirmPassword').value;
            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
            }
            // In a real scenario, this is where you'd send data to Firebase Auth
            console.log("Registering user:", username);
        }

        // Check if user is an Administrator
        let isAdmin = false;
        if (ADMIN_EMAILS.includes(email)) {
            isAdmin = true;
            console.log("Administrator Access Granted.");
        }

        // Save session locally
        const userSession = {
            email: email,
            isAdmin: isAdmin,
            theme: 'dark' // Default theme setting
        };

        if (rememberMe) {
            localStorage.setItem('pixelPlanetUser', JSON.stringify(userSession));
        } else {
            sessionStorage.setItem('pixelPlanetUser', JSON.stringify(userSession));
        }

// Button Animation before redirect
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        
        setTimeout(() => {
            // This actually redirects you to the main dashboard!
            window.location.href = 'home.html'; 
        }, 1500);
    });
});
