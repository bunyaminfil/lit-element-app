import { LitElement, html, css } from 'lit';

export class AddEmployeeModal extends LitElement {
  static styles = css`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal {
      background: white;
      border-radius: 12px;
      padding: 32px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      max-height: 90vh;
      overflow-y: auto;
      animation: modalEnter 0.3s ease;
    }

    .form-container {
      padding: 0 16px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: -16px -16px 32px -16px;
      padding: 0 16px;
    }

    .form-group {
      margin-bottom: 24px;
      position: relative;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #ff6b35;
      font-weight: 500;
      font-size: 14px;
      padding-left: 4px;
    }

    input, select {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      color: #333;
      transition: all 0.2s ease;
      background: white;
      box-sizing: border-box;
    }

    input::placeholder {
      color: #999;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #ff6b35;
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }

    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 40px;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin: 32px -16px -16px -16px;
      padding: 24px 16px 0;
      border-top: 1px solid #eee;
    }

    .submit-button {
      background-color: #ff6b35;
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .submit-button:hover {
      background-color: #e85a2c;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(255, 107, 53, 0.2);
    }

    .cancel-button {
      background-color: white;
      color: #666;
      border: 1.5px solid #ddd;
      padding: 12px 32px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .cancel-button:hover {
      background-color: #f5f5f5;
      border-color: #ccc;
    }

    .error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }

    @keyframes modalEnter {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 480px) {
      .modal {
        padding: 24px;
      }

      .modal-actions {
        flex-direction: column-reverse;
      }

      .submit-button, .cancel-button {
        width: 100%;
        justify-content: center;
      }
    }
  `;

  static properties = {
    show: { type: Boolean },
    editMode: { type: Boolean },
    employeeData: { type: Object },
  };

  constructor() {
    super();
    this.show = false;
    this.editMode = false;
    this.employeeData = null;
    this.departments = ['Analytics', 'Tech'];
    this.positions = ['Junior', 'Medior', 'Senior'];
  }

  closeModal() {
    this.show = false;
    this.editMode = false;
    this.employeeData = null;
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  openForEdit(employee) {
    this.editMode = true;
    this.employeeData = { ...employee };
    this.show = true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employee = Object.fromEntries(formData.entries());
    
    if (this.editMode) {
      employee.id = this.employeeData.id;
      this.dispatchEvent(new CustomEvent('update', { detail: employee }));
    } else {
      this.dispatchEvent(new CustomEvent('submit', { detail: employee }));
    }
    
    this.closeModal();
  }

  render() {
    if (!this.show) return '';

    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    const eighteenYearsAgoStr = eighteenYearsAgo.toISOString().split('T')[0];

    return html`
      <div class="modal-overlay" @click=${this.closeModal}>
        <div class="modal" @click=${(e) => e.stopPropagation()}>
          <div class="form-container">
            <div class="modal-header">
              <h3 class="modal-title">${this.editMode ? 'Edit Employee' : 'Add New Employee'}</h3>
              <button class="close-button" @click=${this.closeModal}>×</button>
            </div>
            <form @submit=${this.handleSubmit}>
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" 
                       value=${this.editMode ? this.employeeData.firstName : ''}
                       required>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" 
                       value=${this.editMode ? this.employeeData.lastName : ''}
                       required>
              </div>
              <div class="form-group">
                <label for="dateOfEmployment">Date of Employment</label>
                <input type="date" id="dateOfEmployment" name="dateOfEmployment" 
                       value=${this.editMode ? this.employeeData.dateOfEmployment : ''}
                       required>
              </div>
              <div class="form-group">
                <label for="dateOfBirth">Date of Birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" 
                       value=${this.editMode ? this.employeeData.dateOfBirth : ''}
                       max=${eighteenYearsAgoStr}
                       required>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" 
                       pattern="[+][0-9]{2,3} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
                       placeholder="+90 530 123 45 67"
                       value=${this.editMode ? this.employeeData.phone : ''}
                       required>
              </div>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" 
                       value=${this.editMode ? this.employeeData.email : ''}
                       ?readonly=${this.editMode}
                       required>
                ${this.editMode ? html`
                  <small style="color: #666; font-size: 12px;">Email cannot be changed</small>
                ` : ''}
              </div>
              <div class="form-group">
                <label for="department">Department</label>
                <select id="department" name="department" required>
                  <option value="">Select Department</option>
                  ${this.departments.map(dept => html`
                    <option value=${dept} 
                            ?selected=${this.editMode && this.employeeData.department === dept}>
                      ${dept}
                    </option>
                  `)}
                </select>
              </div>
              <div class="form-group">
                <label for="position">Position</label>
                <select id="position" name="position" required>
                  <option value="">Select Position</option>
                  ${this.positions.map(pos => html`
                    <option value=${pos}
                            ?selected=${this.editMode && this.employeeData.position === pos}>
                      ${pos}
                    </option>
                  `)}
                </select>
              </div>
              <div class="modal-actions">
                <button type="button" class="cancel-button" @click=${this.closeModal}>Cancel</button>
                <button type="submit" class="submit-button">
                  ${this.editMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('add-employee-modal', AddEmployeeModal); 