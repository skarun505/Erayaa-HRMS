import { authService } from '../core/auth.js';

export function renderLogin(onLogin) {
  const container = document.createElement('div');
  container.className = 'login-container';

  container.innerHTML = `
    <div class="card login-card">
      <div class="logo-section">
        <img src="/erayaa-logo.png" alt="Erayaa HRMS" style="height: 80px; margin-bottom: 1rem;">
        <div class="logo" style="background: linear-gradient(45deg, #FFD700, #DAA520); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0px 2px 2px rgba(0,0,0,0.1);">Erayaa HRMS</div>
        <p class="text-muted">Enterprise Solution</p>
      </div>

      <form id="login-form">
        <div class="form-group">
          <label for="identifier">Employee ID or Email</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter your Employee ID or Email"
            required
            autofocus
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="form-group">
          <label for="companyCode">Company Code</label>
          <input
            type="text"
            id="companyCode"
            name="companyCode"
            placeholder="Enter company code"
            required
          />
        </div>

        <div id="error-message" class="alert alert-error" style="display: none;"></div>

        <button type="submit" class="btn btn-primary w-full mb-4">
          Sign In
        </button>

        <div class="text-center">
          <a href="#" class="text-sm text-muted" id="forgot-password">
            Forgot Password?
          </a>
        </div>
      </form>

      <div class="mt-4 p-4" style="background: var(--bg-secondary); border-radius: 6px;">
        <p class="text-xs text-muted text-center mb-2"><strong>Demo Credentials:</strong></p>
        <p class="text-xs text-muted">Employee: E001 / emp123 / COMP001</p>
        <p class="text-xs text-muted">Manager: M001 / manager123 / COMP001</p>
        <p class="text-xs text-muted">HR Admin: HR001 / hr123 / COMP001</p>
        <p class="text-xs text-muted">Super Admin: ADMIN / admin123 / COMP001</p>
      </div>
      
      <div class="mt-4 text-center">
        <p class="text-xs text-muted">developed by <a href="https://www.arunkumarsathishkumar.me/" target="_blank" style="color: var(--primary); text-decoration: none;">S.Ak🤍</a></p>
      </div>
    </div>
  `;

  // Handle form submission
  const form = container.querySelector('#login-form');
  const errorMessage = container.querySelector('#error-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const identifier = container.querySelector('#identifier').value;
    const password = container.querySelector('#password').value;
    const companyCode = container.querySelector('#companyCode').value;

    const result = authService.login(identifier, password, companyCode);

    if (result.success) {
      errorMessage.style.display = 'none';
      onLogin(result.user);
    } else {
      errorMessage.textContent = result.error;
      errorMessage.style.display = 'block';
    }
  });

  // Handle forgot password
  const forgotLink = container.querySelector('#forgot-password');
  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Show forgot password dialog
    const email = prompt('Enter your registered email address:');
    const companyCode = prompt('Enter your company code:');

    if (email && companyCode) {
      const result = authService.resetPassword(email, companyCode);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.error);
      }
    }
  });

  return container;
}
