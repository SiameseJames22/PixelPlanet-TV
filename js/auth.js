import { submitAuthForm, loginWithGoogle } from './firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const toggleAuthModeBtn = document.getElementById('toggleAuthMode');
    const authSubtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const signupOnlyFields = document.querySelectorAll('.signup-only');

    let isLoginMode = true;

    // Toggle Password Visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Toggle Login / Sign Up UI Mode
    if (toggleAuthModeBtn) {
        toggleAuthModeBtn.addEventListener('click', () => {
            isLoginMode = !isLoginMode;

            if (isLoginMode) {
                authSubtitle.textContent = "Welcome back!";
                submitBtn.textContent = "Sign In";
                toggleText.innerHTML = `Don't have an account? <span class="accent-link" id="toggleAuthMode">Sign Up</span>`;
                signupOnlyFields.forEach(f => f.style.display = 'none');
            } else {
                authSubtitle.textContent = "Create an account to start watching.";
                submitBtn.textContent = "Sign Up";
                toggleText.innerHTML = `Already have an account? <span class="accent-link" id="toggleAuthMode">Sign In</span>`;
                signupOnlyFields.forEach(f => f.style.display = 'block');
            }
            
            // Re-bind listener to the newly generated inner HTML link
            document.getElementById('toggleAuthMode').addEventListener('click', toggleAuthModeBtn.click);
        });
    }

    // Handle Form Submit (Email / Password)
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const usernameInput = document.getElementById('username');
            const username = usernameInput ? usernameInput.value.trim() : '';

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            
            try {
                await submitAuthForm(email, password, isLoginMode, username);
            } catch (err) {
                submitBtn.innerHTML = isLoginMode ? "Sign In" : "Sign Up";
            }
        });
    }

    // Handle Google Continue Buttons
    const googleBtns = document.querySelectorAll('.btn-social');
    googleBtns.forEach(btn => {
        if (btn.textContent.includes('Google')) {
            btn.addEventListener('click', async () => {
                await loginWithGoogle();
            });
        }
    });
});
