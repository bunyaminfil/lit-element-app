import { LitElement, html, css } from 'lit';

export class EmployeeTable extends LitElement {
  static styles = css`
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
  `;

  static properties = {
    employees: { type: Array },
  };

  constructor() {
    super();
    this.employees = [];
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" class="checkbox" /></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Employment</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.employees.map(
              (employee) => html`
                <tr>
                  <td><input type="checkbox" class="checkbox" /></td>
                  <td>${employee.firstName}</td>
                  <td>${employee.lastName}</td>
                  <td>${employee.dateOfEmployment}</td>
                  <td>${employee.dateOfBirth}</td>
                  <td>${employee.phone}</td>
                  <td>${employee.email}</td>
                  <td>${employee.department}</td>
                  <td>${employee.position}</td>
                  <td class="actions">
                    <button class="edit-button" @click=${() => this.handleEdit(employee)}>✏️</button>
                    <button class="delete-button" @click=${() => this.handleDelete(employee)}>🗑️</button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  handleEdit(employee) {
    this.dispatchEvent(new CustomEvent('edit', { detail: employee }));
  }

  handleDelete(employee) {
    this.dispatchEvent(new CustomEvent('delete', { detail: employee }));
  }
}

customElements.define('employee-table', EmployeeTable); 