import { LitElement, html, css } from 'lit';

export class ConfirmPopup extends LitElement {
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
    }

    .modal {
      background: white;
      border-radius: 8px;
      padding: 24px;
      width: 90%;
      max-width: 430px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .modal-title {
      font-size: 20px;
      color: #333;
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      color: #666;
      cursor: pointer;
      padding: 4px;
    }

    .close-button:hover {
      color: #333;
    }

    .modal-content {
      margin-bottom: 24px;
      color: #666;
    }

    .modal-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .proceed-button {
      background-color: #ff6b35;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .proceed-button:hover {
      background-color: #e85a2c;
    }

    .cancel-button {
      background-color: white;
      color: #666;
      border: 1px solid #ddd;
      padding: 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .cancel-button:hover {
      background-color: #f5f5f5;
    }
  `;

  static properties = {
    show: { type: Boolean },
    title: { type: String },
    message: { type: String }
  };

  constructor() {
    super();
    this.show = false;
    this.title = 'Are you sure?';
    this.message = '';
  }

  closeModal() {
    this.show = false;
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  handleProceed() {
    this.dispatchEvent(new CustomEvent('proceed'));
    this.show = false;
  }

  render() {
    if (!this.show) return '';

    return html`
      <div class="modal-overlay" @click=${this.closeModal}>
        <div class="modal" @click=${(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h3 class="modal-title">${this.title}</h3>
            <button class="close-button" @click=${this.closeModal}>×</button>
          </div>
          <div class="modal-content">
            ${this.message}
          </div>
          <div class="modal-actions">
            <button class="proceed-button" @click=${this.handleProceed}>
              Proceed
            </button>
            <button class="cancel-button" @click=${this.closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-popup', ConfirmPopup); 