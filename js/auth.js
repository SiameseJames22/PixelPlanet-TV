document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const toggleText = document.getElementById('toggleText');
    const toggleAuthModeBtn = document.getElementById('toggleAuthMode');
    const authSubtitle = document.getElementById('authSubtitle');
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
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Toggle Between Login and Sign Up (Safely updating text without destroying the element)
    if (toggleAuthModeBtn) {
        toggleAuthModeBtn.addEventListener('click', () => {
            isLoginMode = !isLoginMode;

            if (isLoginMode) {
                authSubtitle.textContent = "Welcome back!";
                submitBtn.textContent = "Sign In";
                toggleText.firstChild.textContent = "Don't have an account? ";
                toggleAuthModeBtn.textContent = "Sign Up";
                
                signupOnlyFields.forEach(field => field.style.display = 'none');
                loginOnlyFields.forEach(field => field.style.display = 'block');
            } else {
                authSubtitle.textContent = "Create an account to start watching.";
                submitBtn.textContent = "Sign Up";
                toggleText.firstChild.textContent = "Already have an account? ";
                toggleAuthModeBtn.textContent = "Sign In";
                
                signupOnlyFields.forEach(field => {
                    field.style.display = 'block';
                    field.style.animation = 'fadeIn 0.4s ease-out forwards';
                });
                loginOnlyFields.forEach(field => field.style.display = 'none');
            }
        });
    }

    // Handle Form Submission
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;

            // Basic validation
            if (email === '' || password === '') {
                alert('Please fill out all required fields.');
                return;
            }

            // Sign-up Specific Logic
            if (!isLoginMode) {
                const usernameInput = document.getElementById('username');
                const username = usernameInput ? usernameInput.value.trim() : '';
                const confirmInput = document.getElementById('confirmPassword');
                const confirm = confirmInput ? confirmInput.value : '';
                
                // Mock "Taken Username" check
                const takenUsernames = ['admin', 'pixelplanet', 'james', 'robloxworld'];
                if (takenUsernames.includes(username.toLowerCase())) {
                    alert("That username is already taken! Please choose another one.");
                    return;
                }

                if (password !== confirm) {
                    alert("Passwords do not match!");
                    return;
                }
                
                // Save username for the profile picture later
                localStorage.setItem('pixelPlanetUsername', username);
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
                // Redirects to the main dashboard
                window.location.href = 'home.html'; 
            }, 1500);
        });
    }
});
