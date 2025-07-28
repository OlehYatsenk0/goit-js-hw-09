const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 🔸 Початкові значення formData
let formData = {
  email: '',
  message: '',
};

// 🟩 1. Заповнення форми з localStorage при завантаженні сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    if (formData.email) form.elements.email.value = formData.email;
    if (formData.message) form.elements.message.value = formData.message;
  } catch (error) {
    console.error('❌ Error parsing saved data', error);
  }
}

// 🟩 2. Слухач input — оновлює formData та localStorage
form.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 🟩 3. Submit форми
form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('✅ Submitted data:', formData);

  // Очищення
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };

  // ✅ Показати повідомлення "Дякуємо"
  const thankYouMsg = document.getElementById('thank-you-message');
  thankYouMsg.classList.remove('visually-hidden');
  thankYouMsg.classList.add('show');

  // Автоматично приховати через 3 секунди
  setTimeout(() => {
    thankYouMsg.classList.add('visually-hidden');
    thankYouMsg.classList.remove('show');
  }, 3000);
});