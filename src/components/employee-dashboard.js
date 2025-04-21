import { LitElement, html, css } from 'lit';
import './employee-list.js';
import './employee-table.js';

export class EmployeeDashboard extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 32px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f8f9fa;
      min-height: 100vh;
      box-sizing: border-box;
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .dashboard-title {
      font-size: 32px;
      color: #ff6b35;
      margin: 0;
      font-weight: 600;
    }

    .dashboard-layout {
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin-top: 24px;
    }

    .section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #ff6b35;
    }

    .section-title {
      font-size: 24px;
      color: #ff6b35;
      margin: 0;
      font-weight: 600;
    }

    .views-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    @media (max-width: 1200px) {
      .views-container {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      :host {
        padding: 16px;
      }

      .section {
        padding: 16px;
      }
    }
  `;

  static properties = {
    employees: { type: Array },
  };

  constructor() {
    super();
    this.loadEmployees();
  }

  handleEmployeeUpdate() {
    // Reload employees from localStorage to ensure we have the latest data
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.requestUpdate();
  }

  loadEmployees() {
    // Always load fresh data from localStorage
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
  }

  render() {
    return html`
      <div class="dashboard-header">
        <h1 class="dashboard-title">Employee Management Dashboard</h1>
      </div>

      <div class="dashboard-layout">
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">Employee Management</h2>
          </div>
          <employee-list
            @employee-updated=${this.handleEmployeeUpdate}
          ></employee-list>
        </div>

        <div class="views-container">
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">List View</h2>
            </div>
            <employee-list
              .employees=${this.employees}
              .isMainList=${false}
              .forceViewType=${'list'}
              @employee-updated=${this.handleEmployeeUpdate}
            ></employee-list>
          </div>

          <div class="section">
            <div class="section-header">
              <h2 class="section-title">Table View</h2>
            </div>
            <employee-list
              .employees=${this.employees}
              .isMainList=${false}
              .forceViewType=${'table'}
              @employee-updated=${this.handleEmployeeUpdate}
            ></employee-list>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-dashboard', EmployeeDashboard); 