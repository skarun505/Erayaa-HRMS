import { db } from '../core/database.js';
import { authService } from '../core/auth.js';

export function renderProfile() {
  const container = document.createElement('div');
  const currentUser = authService.getCurrentUser();

  // Get employee data
  const users = db.get('users') || [];
  const employee = users.find(u => u.id === currentUser.userId) || {};

  // Get leave balance
  const leaveBalances = db.get('leaveBalances') || [];
  const userLeave = leaveBalances.find(l => l.userId === currentUser.userId) || {
    casual: { total: 12, used: 3, balance: 9 },
    sick: { total: 10, used: 2, balance: 8 },
    privilege: { total: 15, used: 5, balance: 10 }
  };

  // Calculate experience
  const joiningDate = new Date(employee.joiningDate || '2023-01-15');
  const today = new Date();
  const experienceMonths = Math.floor((today - joiningDate) / (1000 * 60 * 60 * 24 * 30));
  const experienceYears = Math.floor(experienceMonths / 12);
  const remainingMonths = experienceMonths % 12;

  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">My Profile</h1>
      <p class="page-subtitle">View and manage your personal information</p>
    </div>

    <div class="grid grid-3 gap-6">
      <!-- Profile Card -->
      <div class="card" style="text-align: center; padding: 2rem;">
        <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white;">
          ${employee.name ? employee.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 style="margin-bottom: 0.25rem;">${employee.name || 'Employee'}</h2>
        <p class="text-muted" style="margin-bottom: 0.5rem;">${employee.designation || 'Designation'}</p>
        <span class="badge badge-primary">${employee.department || 'Department'}</span>
        
        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border);">
          <div class="text-sm text-muted">Employee ID</div>
          <div style="font-weight: 600; font-size: 1.1rem;">${employee.employeeId || currentUser.userId}</div>
        </div>
        
        <div style="margin-top: 1rem;">
          <span class="badge badge-success">Active</span>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="card col-span-2" style="padding: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <h3 style="font-size: 1.25rem;">Personal Information</h3>
          <button class="btn btn-secondary btn-sm" onclick="window.editProfile()">Edit</button>
        </div>
        
        <div class="grid grid-2" style="gap: 2rem;">
          <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem;">Full Name</div>
            <div style="font-weight: 600; font-size: 1.1rem;">${employee.name || 'Not provided'}</div>
          </div>
          <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem;">Email Address</div>
            <div style="font-weight: 600; font-size: 1.1rem;">${employee.email || currentUser.email || 'Not provided'}</div>
          </div>
          <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem;">Mobile Number</div>
            <div style="font-weight: 600; font-size: 1.1rem;">${employee.mobile || '+91 98765 43210'}</div>
          </div>
          <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem;">Date of Birth</div>
            <div style="font-weight: 600; font-size: 1.1rem;">${employee.dob || 'January 15, 1995'}</div>
          </div>
          <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem;">Gender</div>
            <div style="font-weight: 600; font-size: 1.1rem;">${employee.gender || 'Male'}</div>
          </div>
          <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem;">Blood Group</div>
            <div style="font-weight: 600; font-size: 1.1rem;">${employee.bloodGroup || 'O+'}</div>
          </div>
          <div class="col-span-2" style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem;">Address</div>
            <div style="font-weight: 600; font-size: 1.1rem;">${employee.address || '123, Tech Park Road, Electronic City, Bangalore - 560100'}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-2 gap-6 mt-6">
      <!-- Employment Details -->
      <div class="card">
        <h3 class="mb-4">Employment Details</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Employee ID</span>
            <span style="font-weight: 500;">${employee.employeeId || currentUser.userId}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Department</span>
            <span style="font-weight: 500;">${employee.department || 'Engineering'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Designation</span>
            <span style="font-weight: 500;">${employee.designation || 'Software Developer'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Joining Date</span>
            <span style="font-weight: 500;">${new Date(employee.joiningDate || '2023-01-15').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Experience</span>
            <span style="font-weight: 500;">${experienceYears} Year${experienceYears !== 1 ? 's' : ''} ${remainingMonths} Month${remainingMonths !== 1 ? 's' : ''}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Reporting Manager</span>
            <span style="font-weight: 500;">${employee.manager || 'Sarah Connor'}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span class="text-muted">Work Location</span>
            <span style="font-weight: 500;">${employee.location || 'Bangalore Office'}</span>
          </div>
        </div>
      </div>

      <!-- Leave Balance -->
      <div class="card">
        <h3 class="mb-4">Leave Balance</h3>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Casual Leave</span>
              <span style="font-weight: 600;">${userLeave.casual?.balance || 9} / ${userLeave.casual?.total || 12}</span>
            </div>
            <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${((userLeave.casual?.balance || 9) / (userLeave.casual?.total || 12)) * 100}%; background: #3b82f6; border-radius: 4px;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Sick Leave</span>
              <span style="font-weight: 600;">${userLeave.sick?.balance || 8} / ${userLeave.sick?.total || 10}</span>
            </div>
            <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${((userLeave.sick?.balance || 8) / (userLeave.sick?.total || 10)) * 100}%; background: #f59e0b; border-radius: 4px;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Privilege Leave</span>
              <span style="font-weight: 600;">${userLeave.privilege?.balance || 10} / ${userLeave.privilege?.total || 15}</span>
            </div>
            <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${((userLeave.privilege?.balance || 10) / (userLeave.privilege?.total || 15)) * 100}%; background: #10b981; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border); text-align: center;">
          <div class="text-sm text-muted">Total Available</div>
          <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">
            ${(userLeave.casual?.balance || 9) + (userLeave.sick?.balance || 8) + (userLeave.privilege?.balance || 10)} Days
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-2 gap-6 mt-6">
      <!-- Bank Details -->
      <div class="card">
        <h3 class="mb-4">Bank Details</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Bank Name</span>
            <span style="font-weight: 500;">HDFC Bank</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Account Number</span>
            <span style="font-weight: 500;">XXXX XXXX 4521</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">IFSC Code</span>
            <span style="font-weight: 500;">HDFC0001234</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span class="text-muted">PAN Number</span>
            <span style="font-weight: 500;">ABCDE1234F</span>
          </div>
        </div>
      </div>

      <!-- Emergency Contact -->
      <div class="card">
        <h3 class="mb-4">Emergency Contact</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Name</span>
            <span style="font-weight: 500;">Rahul Sharma</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Relationship</span>
            <span style="font-weight: 500;">Brother</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
            <span class="text-muted">Phone</span>
            <span style="font-weight: 500;">+91 99887 76655</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span class="text-muted">Address</span>
            <span style="font-weight: 500;">Same as above</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
}

// Global handler for edit profile
window.editProfile = function () {
  alert('Profile edit functionality coming soon!\n\nIn a production system, this would open a form to update your personal details which would then be sent to HR for approval.');
};
