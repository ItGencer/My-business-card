// ============================================================
// index.js — точка входу
// Логіка відокремлена від даних: дані — в data.js
// ============================================================

import './styles/style.scss';
import './styles/header.scss';
import './styles/contact.scss';
import './styles/services.scss';

import artemPhoto from './assets/Artem-foto.png';

// Всі дані — з одного місця
import { SKILLS, SERVICES, EMAILJS_CONFIG } from './data.js';


// ─── Burger Menu ──────────────────────────────────────────────
// Додай виклик initBurger() всередині DOMContentLoaded в index.js
function initBurger() {
  const burger = document.querySelector('.header__burger');
  const nav    = document.querySelector('.header__nav');
  if (!burger || !nav) return;
 
  // Відкрити / закрити меню
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    // Доступність: повідомляємо скрін-рідеру стан кнопки
    burger.setAttribute('aria-expanded', isOpen);
  });
 
  // Закрити при кліку на посилання (SPA-навігація)
  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
 
  // Закрити при кліку поза меню
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── Фото ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const photo = document.querySelector('.intro__photo-img');
  if (photo) photo.src = artemPhoto;
  initBurger();
});


// ============================================================
// SkillsRenderer
// ============================================================
class SkillsRenderer {
  #container;   // приватне поле — синтаксис ES2022, не треба this._
  #skills = [];

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  // Приймає масив { title, icon, percent } — не окремі аргументи
  load(skillsArray) {
    this.#skills = skillsArray.map(skill => ({
      ...skill,
      percent: Math.min(100, Math.max(0, skill.percent)),
    }));
    return this;
  }

  render() {
    if (!this.#container) {
      console.warn('SkillsRenderer: контейнер не знайдено');
      return;
    }

    // DocumentFragment — вставляємо весь список за один раз,
    // а не по одному елементу (менше перемальовувань DOM)
    const fragment = document.createDocumentFragment();

    for (const skill of this.#skills) {
      const li       = document.createElement('li');
      li.className   = 'skills__item';

      const card     = document.createElement('div');
      card.className = 'skill-card';

      // Хедер: іконка + назва + відсоток
      const header   = document.createElement('div');
      header.className = 'skill-card__header';

      const img      = Object.assign(document.createElement('img'), {
        className: 'skill-card__icon',
        src:       skill.icon,
        alt:       skill.title,
      });

      const titleEl  = Object.assign(document.createElement('span'), {
        className:   'skill-card__title',
        textContent: skill.title,
      });

      const pctEl    = Object.assign(document.createElement('span'), {
        className:   'skill-card__percent',
        textContent: `${skill.percent}%`,
      });

      header.append(img, titleEl, pctEl);

      // Прогрес-бар
      const barWrap  = document.createElement('div');
      barWrap.className = 'skill-card__bar-wrap';

      const bar      = document.createElement('div');
      bar.className  = 'skill-card__bar';
      bar.dataset.width = skill.percent;   // для анімації

      barWrap.appendChild(bar);
      card.append(header, barWrap);
      li.appendChild(card);
      fragment.appendChild(li);
    }

    this.#container.innerHTML = '';
    this.#container.appendChild(fragment);   // один reflow замість N

    // Анімація — після того як браузер відмалював початковий стан (width: 0)
    requestAnimationFrame(() => {
      this.#container.querySelectorAll('.skill-card__bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    });
  }
}


// ============================================================
// ServicesRenderer
// ============================================================
class ServicesRenderer {
  #container;
  #services = [];

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  load(servicesArray) {
    this.#services = servicesArray;
    return this;
  }

  render() {
    if (!this.#container) {
      console.warn('ServicesRenderer: контейнер не знайдено');
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const service of this.#services) {
      const li       = document.createElement('li');
      li.className   = 'services__item';

      const card     = document.createElement('div');
      card.className = 'service-card';

      const iconWrap = document.createElement('div');
      iconWrap.className = 'service-card__icon-wrap';
      iconWrap.innerHTML = service.svgIcon;   // inline SVG — тільки тут innerHTML

      const titleEl  = Object.assign(document.createElement('h3'), {
        className:   'service-card__title',
        textContent: service.title,
      });

      const descEl   = Object.assign(document.createElement('p'), {
        className:   'service-card__desc',
        textContent: service.description,
      });

      card.append(iconWrap, titleEl, descEl);
      li.appendChild(card);
      fragment.appendChild(li);
    }

    this.#container.innerHTML = '';
    this.#container.appendChild(fragment);
  }
}


// ─── EmailJS ──────────────────────────────────────────────────
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) { resolve(); return; }

    const script  = document.createElement('script');
    script.src    = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      resolve();
    };
    script.onerror = () => reject(new Error('EmailJS не завантажився'));
    document.head.appendChild(script);
  });
}


// ─── Theme Toggle ─────────────────────────────────────────────
function initTheme() {
  const btn = document.querySelector('.header__btn--theme');
  if (!btn) return;

  // SVG окремо — не дублювати рядки в обробнику
  const ICONS = {
    dark:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>`,
    light: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>`,
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    // Якщо тема dark — показуємо іконку сонця (перемикнутись на light)
    btn.innerHTML = theme === 'dark' ? ICONS.dark : ICONS.light;
  };

  applyTheme(localStorage.getItem('theme') || 'light');

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}


// ─── Валідація форми ──────────────────────────────────────────
const FORM_FIELDS = {
  name:    { inputId: 'userName',    errorId: 'nameError'    },
  email:   { inputId: 'userEmail',   errorId: 'emailError'   },
  message: { inputId: 'userMessage', errorId: 'messageError' },
};

function validateForm(name, email, message) {
  const errors = {};
  if (!name.trim())    errors.name    = "Введіть ваше ім'я";
  if (!email.trim())   errors.email   = 'Введіть email';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                       errors.email   = 'Невірний формат email';
  if (!message.trim()) errors.message = 'Введіть повідомлення';
  return errors;
}

function clearErrors() {
  Object.values(FORM_FIELDS).forEach(({ inputId, errorId }) => {
    document.getElementById(inputId)?.classList.remove('is-invalid');
    const err = document.getElementById(errorId);
    if (err) err.textContent = '';
  });
}

function showErrors(errors) {
  clearErrors();
  Object.entries(errors).forEach(([key, msg]) => {
    const { inputId, errorId } = FORM_FIELDS[key];
    document.getElementById(inputId)?.classList.add('is-invalid');
    const err = document.getElementById(errorId);
    if (err) err.textContent = msg;
  });
}

function setStatus(message, type) {
  const el = document.getElementById('formStatus');
  if (!el) return;
  el.textContent = message;
  el.className   = `form__status ${type}`;
}

// SVG іконки кнопки відправки
const SEND_ICON = `<svg class="form__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="22" y1="2" x2="11" y2="13"></line>
  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
</svg>`;

function setLoading(isLoading) {
  const btn     = document.getElementById('submitBtn');
  const btnText = btn?.querySelector('.form__btn-text');
  if (!btn) return;

  btn.disabled = isLoading;

  const iconSlot = btn.querySelector('.form__btn-icon, .spinner');
  if (isLoading) {
    iconSlot?.insertAdjacentHTML('afterend', '<span class="spinner"></span>');
    iconSlot?.remove();
    if (btnText) btnText.textContent = 'Надсилаємо…';
  } else {
    iconSlot?.insertAdjacentHTML('afterend', SEND_ICON);
    iconSlot?.remove();
    if (btnText) btnText.textContent = 'Надіслати';
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  const nameEl    = document.getElementById('userName');
  const emailEl   = document.getElementById('userEmail');
  const messageEl = document.getElementById('userMessage');
  if (!nameEl || !emailEl || !messageEl) return;

  clearErrors();
  setStatus('', '');

  const errors = validateForm(nameEl.value, emailEl.value, messageEl.value);
  if (Object.keys(errors).length) { showErrors(errors); return; }

  setLoading(true);
  try {
    await loadEmailJS();
    await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        user_name:  nameEl.value.trim(),
        user_email: emailEl.value.trim(),
        message:    messageEl.value.trim(),
        to_email:   EMAILJS_CONFIG.toEmail,
        reply_to:   emailEl.value.trim(),
      }
    );
    setStatus('✅ Повідомлення надіслано! Відповім найближчим часом.', 'success');
    e.target.reset();
    clearErrors();
  } catch (err) {
    console.error('EmailJS error:', err);
    setStatus(`❌ Помилка відправки. Напишіть напряму: ${EMAILJS_CONFIG.toEmail}`, 'error');
  } finally {
    setLoading(false);
  }
}

function initLiveValidation() {
  Object.values(FORM_FIELDS).forEach(({ inputId, errorId }) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    input.addEventListener('input', function () {
      this.classList.remove('is-invalid');
      error.textContent = '';
    });
  });
}


// ─── Init ─────────────────────────────────────────────────────
// Рендерери запускаємо одразу — DOM для них не потрібен
// (вони самі шукають контейнер через querySelector)
new SkillsRenderer('#skills-list').load(SKILLS).render();
new ServicesRenderer('#services-list').load(SERVICES).render();

// Решта — після DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const photo = document.querySelector('.intro__photo-img');
  if (photo) photo.src = artemPhoto;

  initTheme();
  initLiveValidation();

  document.getElementById('contactForm')?.addEventListener('submit', handleSubmit);
});