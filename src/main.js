import { submitRegistration } from './api.js';
import { validateForm } from './validation.js';
import { setupSignature } from './signature.js';

const districtBlocks = {
  Keonjhar: ['Banspal', 'Harichandanpur'],
  Dhenkanal: ['Kankadahad'],
  Raygada: ['Muniguda'],
  Nuapada: ['Komna'],
  Gajapati: ['Guma'],
};

const form = document.querySelector('#registration-form');
const district = document.querySelector('#district');
const block = document.querySelector('#block');
const statusMessage = document.querySelector('#status-message');
const submitButton = document.querySelector('#submit-button');
const signature = setupSignature(
  document.querySelector('#signature-canvas'),
  document.querySelector('#clear-signature'),
  document.querySelector('#signature-placeholder'),
);

function showErrors(errors) {
  document.querySelectorAll('.field-error').forEach((element) => { element.textContent = ''; });
  document.querySelectorAll('[aria-invalid="true"]').forEach((element) => element.removeAttribute('aria-invalid'));
  Object.entries(errors).forEach(([name, message]) => {
    const error = document.querySelector(`#${name}-error`);
    const input = document.querySelector(`[name="${name}"]`);
    if (error) error.textContent = message;
    if (input) input.setAttribute('aria-invalid', 'true');
  });
}

district.addEventListener('change', () => {
  const options = districtBlocks[district.value] || [];
  block.innerHTML = '<option value="">Select block</option>';
  options.forEach((name) => block.add(new Option(name, name)));
  block.disabled = options.length === 0;
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMessage.className = 'status-message';
  statusMessage.textContent = '';
  const { values, errors } = validateForm(form);
  if (!signature.hasSignature()) errors.signature = 'A digital signature is required.';
  showErrors(errors);
  if (Object.keys(errors).length) {
    const firstError = document.querySelector('[aria-invalid="true"]') || document.querySelector('#signature-canvas');
    firstError.focus?.();
    return;
  }

  submitButton.disabled = true;
  submitButton.classList.add('is-loading');
  submitButton.querySelector('span').textContent = 'Submitting Registration...';
  const payload = { ...values, digitalSignature: signature.dataUrl(), submittedAt: new Date().toISOString() };

  try {
    const result = await submitRegistration(payload);
    if (!result.connected) {
      statusMessage.className = 'status-message status-info';
      statusMessage.innerHTML = '<strong>Registration service is being connected.</strong><span>Your details have not been stored. Please contact the event team for submission support.</span>';
      return;
    }
    const reference = result.data?.referenceId ? ` Reference ID: ${result.data.referenceId}` : '';
    statusMessage.className = 'status-message status-success';
    statusMessage.innerHTML = `<strong>Registration Submitted Successfully</strong><span>${reference}</span>`;
    form.reset();
  } catch (error) {
    console.error(error);
    statusMessage.className = 'status-message status-error';
    statusMessage.textContent = 'Unable to submit registration. Please try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.classList.remove('is-loading');
    submitButton.querySelector('span').textContent = 'Submit Registration';
  }
});
