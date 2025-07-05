const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const storageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

window.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    try {
      formData = JSON.parse(savedData);
      emailInput.value = formData.email || '';
      messageInput.value = formData.message || '';
    } catch (error) {
      console.error('Неможливо прочитати дані з localStorage:', error);
    }
  }
});

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim(); // видаляємо пробіли по краях
  localStorage.setItem(storageKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem(storageKey);
  formData = { email: '', message: '' };
  form.reset();
});
