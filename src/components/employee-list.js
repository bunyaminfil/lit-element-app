import { LitElement, html, css } from 'lit';
import './confirm-popup.js';
import './add-employee-modal.js';
import './employee-table.js';

export class EmployeeList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 32px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f8f9fa;
      min-height: 100vh;
      box-sizing: border-box;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .title {
      font-size: 28px;
      color: #ff6b35;
      margin: 0;
      font-weight: 600;
    }

    .header-actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .view-selector {
      display: flex;
      gap: 8px;
      background: #f5f5f5;
      padding: 4px;
      border-radius: 8px;
    }

    .view-button {
      padding: 8px 16px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 6px;
      font-size: 14px;
      color: #666;
      transition: all 0.2s ease;
    }

    .view-button.active {
      background: white;
      color: #ff6b35;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .add-button {
      background-color: #ff6b35;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .add-button:hover {
      background-color: #e85a2c;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(255, 107, 53, 0.2);
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      margin-bottom: 24px;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      min-width: 800px;
    }

    th, td {
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }

    th {
      color: #ff6b35;
      font-weight: 600;
      background: #fff;
      position: sticky;
      top: 0;
      z-index: 1;
      white-space: nowrap;
    }

    td {
      color: #444;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    tr:hover td {
      background-color: #fff5f2;
    }

    .checkbox {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      cursor: pointer;
      accent-color: #ff6b35;
    }

    .actions {
      display: flex;
      gap: 12px;
    }

    .edit-button, .delete-button {
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: all 0.2s ease;
      font-size: 16px;
    }

    .edit-button:hover {
      background: rgba(52, 152, 219, 0.1);
      color: #3498db;
    }

    .delete-button:hover {
      background: rgba(231, 76, 60, 0.1);
      color: #e74c3c;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-top: 32px;
      background: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .page-button {
      padding: 8px 16px;
      border: 1px solid #eee;
      background: white;
      cursor: pointer;
      border-radius: 6px;
      min-width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #666;
      transition: all 0.2s ease;
    }

    .page-button:hover:not([disabled]) {
      border-color: #ff6b35;
      color: #ff6b35;
    }

    .page-button[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
      background: #f5f5f5;
    }

    .page-button.active {
      background: #ff6b35;
      color: white;
      border-color: #ff6b35;
    }

    /* Card view for mobile */
    .card-view {
      display: none;
    }

    @media (max-width: 768px) {
      :host {
        padding: 16px;
      }

      .header {
        padding: 16px;
        margin-bottom: 24px;
      }

      .header-actions {
        flex-direction: column;
      }

      .view-selector {
        width: 100%;
        justify-content: center;
      }

      .table-container {
        display: none;
      }

      .card-view {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      .employee-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
      }

      .employee-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 2px solid #ff6b35;
      }

      .card-name {
        font-size: 18px;
        font-weight: 600;
        color: #ff6b35;
      }

      .card-actions {
        display: flex;
        gap: 8px;
      }

      .card-field {
        display: flex;
        margin-bottom: 12px;
        align-items: center;
      }

      .card-label {
        width: 140px;
        color: #ff6b35;
        font-size: 14px;
        font-weight: 500;
      }

      .card-value {
        flex: 1;
        font-size: 14px;
        color: #444;
      }
    }

    @media (max-width: 480px) {
      .header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .title {
        text-align: center;
      }

      .add-button {
        justify-content: center;
      }

      .card-view {
        grid-template-columns: 1fr;
      }
    }

    .list-view {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .list-item {
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: flex-start;
      gap: 16px;
      transition: all 0.2s ease;
    }

    .list-item:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .list-item-content {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      align-items: start;
    }

    .list-item-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .list-item-label {
      font-size: 12px;
      color: #666;
      font-weight: 500;
    }

    .list-item-value {
      font-size: 14px;
      color: #333;
      word-break: break-word;
    }

    .list-actions {
      display: flex;
      gap: 8px;
      padding-top: 4px;
    }
  `;

  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    totalPages: { type: Number },
    employeeToDelete: { type: Object },
    viewType: { type: String },
    isMainList: { type: Boolean },
    forceViewType: { type: String },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.employeeToDelete = null;
    this.viewType = 'list';
    this.isMainList = true;
    this.forceViewType = null;
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.updateTotalPages();
  }

  handleDelete(employee) {
    this.employeeToDelete = employee;
    const popup = this.shadowRoot.querySelector('confirm-popup');
    if (popup) {
      popup.message = `Selected Employee record of ${employee.firstName} ${employee.lastName} will be deleted`;
      popup.show = true;
    }
  }

  handleEdit(employee) {
    const modal = this.shadowRoot.querySelector('add-employee-modal');
    if (modal) {
      modal.openForEdit(JSON.parse(JSON.stringify(employee)));
    }
  }

  handleProceed() {
    if (this.employeeToDelete) {
      let employees = JSON.parse(localStorage.getItem('employees') || '[]');
      employees = employees.filter(emp => emp.id !== this.employeeToDelete.id);
      localStorage.setItem('employees', JSON.stringify(employees));
      this.employees = [...employees];
      this.updateTotalPages();
      if (this.currentPage > this.totalPages) {
        this.currentPage = Math.max(1, this.totalPages);
      }
      this.employeeToDelete = null;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('employee-updated'));
    }
  }

  handleNewEmployee(e) {
    const newEmployee = e.detail;
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    newEmployee.id = Date.now().toString();
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    this.employees = employees;
    this.updateTotalPages();
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('employee-updated'));
  }

  handleUpdateEmployee(e) {
    const updatedEmployee = e.detail;
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = { ...updatedEmployee };
      localStorage.setItem('employees', JSON.stringify(employees));
      this.employees = [...employees];
      this.updateTotalPages();
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('employee-updated'));
    }
  }

  showAddModal() {
    const modal = this.shadowRoot.querySelector('add-employee-modal');
    if (modal) {
      modal.show = true;
    }
  }

  handleCancel() {
    this.employeeToDelete = null;
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
  }

  getCurrentPageEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.employees.slice(start, end);
  }

  handlePageChange(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.requestUpdate();
    }
  }

  setViewType(type) {
    this.viewType = type;
  }

  getCurrentViewType() {
    return this.forceViewType || this.viewType;
  }

  renderPaginationButtons() {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(html`
      <button 
        class="page-button" 
        ?disabled=${this.currentPage === 1}
        @click=${() => this.handlePageChange(this.currentPage - 1)}
      >&lt;</button>
    `);

    // First page
    if (startPage > 1) {
      buttons.push(html`
        <button class="page-button" @click=${() => this.handlePageChange(1)}>1</button>
        ${startPage > 2 ? html`<span>...</span>` : ''}
      `);
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(html`
        <button 
          class="page-button ${i === this.currentPage ? 'active' : ''}"
          @click=${() => this.handlePageChange(i)}
        >${i}</button>
      `);
    }

    // Last page
    if (endPage < this.totalPages) {
      buttons.push(html`
        ${endPage < this.totalPages - 1 ? html`<span>...</span>` : ''}
        <button 
          class="page-button" 
          @click=${() => this.handlePageChange(this.totalPages)}
        >${this.totalPages}</button>
      `);
    }

    // Next button
    buttons.push(html`
      <button 
        class="page-button" 
        ?disabled=${this.currentPage === this.totalPages}
        @click=${() => this.handlePageChange(this.currentPage + 1)}
      >&gt;</button>
    `);

    return buttons;
  }

  render() {
    const currentViewType = this.getCurrentViewType();

    return html`
      ${this.isMainList ? html`
        <div class="header">
          <h2 class="title">Employee List</h2>
          <div class="header-actions">
            <div class="view-selector">
              <button 
                class="view-button ${this.viewType === 'list' ? 'active' : ''}"
                @click=${() => this.setViewType('list')}
              >
                List View
              </button>
              <button 
                class="view-button ${this.viewType === 'table' ? 'active' : ''}"
                @click=${() => this.setViewType('table')}
              >
                Table View
              </button>
            </div>
            <button class="add-button" @click=${this.showAddModal}>
              <span>Add New</span>
            </button>
          </div>
        </div>
      ` : ''}

      ${currentViewType === 'list' 
        ? html`
            <div class="list-view">
              ${this.getCurrentPageEmployees().map(
                (employee) => html`
                  <div class="list-item">
                    <div class="list-item-content">
                      <div class="list-item-field">
                        <span class="list-item-label">First Name</span>
                        <span class="list-item-value">${employee.firstName}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="list-item-label">Last Name</span>
                        <span class="list-item-value">${employee.lastName}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="list-item-label">Department</span>
                        <span class="list-item-value">${employee.department}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="list-item-label">Position</span>
                        <span class="list-item-value">${employee.position}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="list-item-label">Email</span>
                        <span class="list-item-value">${employee.email}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="list-item-label">Phone</span>
                        <span class="list-item-value">${employee.phone}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="list-item-label">Date of Employment</span>
                        <span class="list-item-value">${employee.dateOfEmployment}</span>
                      </div>
                      <div class="list-item-field">
                        <span class="list-item-label">Date of Birth</span>
                        <span class="list-item-value">${employee.dateOfBirth}</span>
                      </div>
                    </div>
                    ${this.isMainList ? html`
                      <div class="list-actions">
                        <button class="edit-button" @click=${() => this.handleEdit(employee)}>✏️</button>
                        <button class="delete-button" @click=${() => this.handleDelete(employee)}>🗑️</button>
                      </div>
                    ` : ''}
                  </div>
                `
              )}
            </div>
          `
        : html`
            <employee-table 
              .employees=${this.getCurrentPageEmployees()}
              @edit=${(e) => this.handleEdit(e.detail)}
              @delete=${(e) => this.handleDelete(e.detail)}
            ></employee-table>
          `
      }

      ${this.isMainList ? html`
        <confirm-popup
          @proceed=${this.handleProceed}
          @cancel=${this.handleCancel}
        ></confirm-popup>

        <add-employee-modal
          @submit=${this.handleNewEmployee}
          @update=${this.handleUpdateEmployee}
        ></add-employee-modal>

        <div class="pagination">
          ${this.renderPaginationButtons()}
        </div>
      ` : ''}
    `;
  }
}

customElements.define('employee-list', EmployeeList); 