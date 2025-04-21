/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { AddEmployeeModal } from '../src/components/add-employee-modal.js';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('add-employee-modal', () => {
  test('is defined', () => {
    const el = document.createElement('add-employee-modal');
    assert.instanceOf(el, AddEmployeeModal);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<add-employee-modal></add-employee-modal>`);
    el.show = true;
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <div class="modal-overlay">
        <div class="modal">
          <div class="form-container">
            <div class="modal-header">
              <h3 class="modal-title">Add New Employee</h3>
              <button class="close-button">×</button>
            </div>
            <form onsubmit="return false;">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required value="">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required value="">
              </div>
              <div class="form-group">
                <label for="dateOfEmployment">Date of Employment</label>
                <input type="date" id="dateOfEmployment" name="dateOfEmployment" required value="">
              </div>
              <div class="form-group">
                <label for="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  max="2007-04-21"
                  name="dateOfBirth"
                  required=""
                  type="date"
                  value=""
                >
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" pattern="[+][0-9]{2,3} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}" placeholder="+90 530 123 45 67" required value="">
              </div>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required value="">
              </div>
              <div class="form-group">
                <label for="department">Department</label>
                <select id="department" name="department" required>
                  <option value="">Select Department</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>
              <div class="form-group">
                <label for="position">Position</label>
                <select id="position" name="position" required>
                  <option value="">Select Position</option>
                  <option value="Junior">Junior</option>
                  <option value="Medior">Medior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div class="modal-actions">
                <button type="button" class="cancel-button">Cancel</button>
                <button type="submit" class="submit-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      `
    );
  });

  test('dispatches submit event with form data for new employee', async () => {
    const el = await fixture(html`<add-employee-modal></add-employee-modal>`);
    el.show = true;
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');
    const inputs = {
      firstName: el.shadowRoot.querySelector('#firstName'),
      lastName: el.shadowRoot.querySelector('#lastName'),
      email: el.shadowRoot.querySelector('#email'),
      phone: el.shadowRoot.querySelector('#phone'),
      department: el.shadowRoot.querySelector('#department'),
      position: el.shadowRoot.querySelector('#position'),
      dateOfBirth: el.shadowRoot.querySelector('#dateOfBirth'),
      dateOfEmployment: el.shadowRoot.querySelector('#dateOfEmployment')
    };

    // Fill in the form
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+90 530 123 45 67',
      department: 'Tech',
      position: 'Senior',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2024-01-01'
    };

    Object.entries(testData).forEach(([key, value]) => {
      inputs[key].value = value;
    });

    // Listen for the submit event
    const submitPromise = new Promise(resolve => {
      el.addEventListener('submit', e => resolve(e.detail));
    });

    // Submit the form
    form.dispatchEvent(new Event('submit', {
      bubbles: true,
      cancelable: true
    }));

    const detail = await submitPromise;
    assert.deepEqual(detail, testData);
  });

  test('dispatches update event with form data for existing employee', async () => {
    const el = await fixture(html`<add-employee-modal></add-employee-modal>`);
    
    const existingEmployee = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+90 530 123 45 67',
      department: 'Tech',
      position: 'Senior',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2024-01-01'
    };

    // Open modal in edit mode
    el.openForEdit(existingEmployee);
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');

    // Verify form is pre-filled
    Object.entries(existingEmployee).forEach(([key, value]) => {
      if (key !== 'id') {
        const input = el.shadowRoot.querySelector(`#${key}`);
        assert.equal(input.value, value);
      }
    });

    // Update some values
    const updatedData = {
      ...existingEmployee,
      firstName: 'Johnny',
      lastName: 'Doeson',
      position: 'Medior'
    };

    el.shadowRoot.querySelector('#firstName').value = updatedData.firstName;
    el.shadowRoot.querySelector('#lastName').value = updatedData.lastName;
    el.shadowRoot.querySelector('#position').value = updatedData.position;

    // Listen for the update event
    const updatePromise = new Promise(resolve => {
      el.addEventListener('update', e => resolve(e.detail));
    });

    // Submit the form
    form.dispatchEvent(new Event('submit', {
      bubbles: true,
      cancelable: true
    }));

    const detail = await updatePromise;
    assert.deepEqual(detail, updatedData);
  });

  test('closes modal when cancel button is clicked', async () => {
    const el = await fixture(html`<add-employee-modal></add-employee-modal>`);
    el.show = true;
    await el.updateComplete;
    
    const cancelButton = el.shadowRoot.querySelector('.cancel-button');
    cancelButton.click();
    
    assert.isFalse(el.show);
  });

  test('validates required fields', async () => {
    const el = await fixture(html`<add-employee-modal></add-employee-modal>`);
    el.show = true;
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');
    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true
    });
    
    form.dispatchEvent(submitEvent);
    
    const invalidInputs = el.shadowRoot.querySelectorAll(':invalid');
    assert.isAbove(invalidInputs.length, 0);
  });
}); 