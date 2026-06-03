import "./styles/style.scss";
import "./styles/header.scss";

// Імпортуємо іконку (збірочник сам підставить правильний шлях)
import angularIcon from './assets/icons/angular.svg';
import bemIcon from './assets/icons/bem.svg';
import githubIcon from './assets/icons/github.svg';
import html5Icon from './assets/icons/html5.svg';
import jsIcon from './assets/icons/js.svg';
import sassIcon from './assets/icons/sass.svg';
import tsIcon from './assets/icons/ts.svg';

const EMAILJS_SERVICE_ID  = "service_ega4f8t";  // з вашого сервісу
const EMAILJS_TEMPLATE_ID = "template_fcyzwhf"; // з вашого шаблону
const EMAILJS_PUBLIC_KEY  = "LHUHZsoWLw66wnZxQ";       // Account → API Keys

class SkillsRenderer {
  constructor(selector, iconsPath = '') {
    this._container = document.querySelector(selector);
    // Якщо шлях порожній, залишаємо порожнім. Якщо ні — додаємо слеш.
    this._iconsPath = iconsPath ? (iconsPath.endsWith('/') ? iconsPath : iconsPath + '/') : '';
    this._skills    = [];
  }

  add(title, iconFile, percent) {
    const safePercent = Math.min(100, Math.max(0, percent));
    
    // ПЕРЕВІРКА: Якщо ми передали вже імпортований файл (абсолютний шлях/base64), 
    // не додаємо до нього префікс папки. Якщо це просто рядок 'sass.svg' — додаємо.
    const isImported = iconFile.startsWith('data:') || iconFile.startsWith('http') || iconFile.startsWith('/src') || iconFile.startsWith('/');
    const finalIconPath = isImported ? iconFile : this._iconsPath + iconFile;

    this._skills.push({
      title,
      icon: finalIconPath,
      percent: safePercent,
    });
    return this;
  }

  render() {
    if (!this._container) {
      console.warn('SkillsRenderer: контейнер не знайдено');
      return;
    }

    this._container.innerHTML = '';

    // Переписано без innerHTML — через createElement та append
    for (const skill of this._skills) {
      const li = document.createElement('li');
      li.className = 'skills__item';

      const skillCard = document.createElement('div');
      skillCard.className = 'skill-card';

      // Хедер картки
      const header = document.createElement('div');
      header.className = 'skill-card__header';

      const img = document.createElement('img');
      img.className = 'skill-card__icon';
      img.src = skill.icon;
      img.alt = skill.title;

      const titleSpan = document.createElement('span');
      titleSpan.className = 'skill-card__title';
      titleSpan.textContent = skill.title;

      const percentSpan = document.createElement('span');
      percentSpan.className = 'skill-card__percent';
      percentSpan.textContent = `${skill.percent}%`;

      header.appendChild(img);
      header.appendChild(titleSpan);
      header.appendChild(percentSpan);

      // Обгортка прогрес-бару
      const barWrap = document.createElement('div');
      barWrap.className = 'skill-card__bar-wrap';

      const bar = document.createElement('div');
      bar.className = 'skill-card__bar';
      bar.dataset.width = skill.percent; // зберігаємо для анімації

      barWrap.appendChild(bar);

      // Збираємо все докупи
      skillCard.appendChild(header);
      skillCard.appendChild(barWrap);
      li.appendChild(skillCard);

      this._container.appendChild(li);
    }

    // Анімація заповнення шкал
    requestAnimationFrame(() => {
      this._container.querySelectorAll('.skill-card__bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    });
  }

  clear() {
    this._skills = [];
    if (this._container) this._container.innerHTML = '';
    return this;
  }
}

// ============================================================
// Ініціалізація та тестування
// ============================================================

// Задаємо базовий шлях для решти іконок, які не імпортовані
const skills = new SkillsRenderer('#skills-list', './assets/icons/');

skills
  .add('HTML5 / CSS3',html5Icon,  95)
  .add('SASS / SCSS', sassIcon,   90)
  .add('JavaScript',  jsIcon,     88)
  .add('TypeScript',  tsIcon,     68)
  .add('GitHUB',      githubIcon, 85)
  .add('Angular',     angularIcon,85)
  .add('BEM',         bemIcon,    100)
  .render();


// ─── Load EmailJS SDK ─────────────────────────────────────────────────────────
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      resolve();
    };
    script.onerror = () => reject(new Error("EmailJS не завантажився"));
    document.head.appendChild(script);
  });
}
 
// ─── Theme Toggle ─────────────────────────────────────────────────────────────
// Ваша кнопка: <button class="header__btn header__btn--theme">
function initTheme() {
  const btn = document.querySelector(".header__btn--theme");
  if (!btn) return;
 
  const moonSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;
 
  const sunSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`;
 
  // Застосувати збережену тему одразу
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  btn.innerHTML = saved === "dark" ? sunSVG : moonSVG;
 
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next    = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.innerHTML = next === "dark" ? sunSVG : moonSVG;
  });
}
 
// ─── Validation ───────────────────────────────────────────────────────────────
function validateForm(name, email, message) {
  const errors = {};
  if (!name.trim())    errors.name    = "Введіть ваше ім'я";
  if (!email.trim())   errors.email   = "Введіть email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                       errors.email   = "Невірний формат email";
  if (!message.trim()) errors.message = "Введіть повідомлення";
  return errors;
}
 
function clearErrors() {
  document.querySelectorAll(".form__input, .form__textarea")
    .forEach(el => el.classList.remove("is-invalid"));
  document.querySelectorAll(".form__error")
    .forEach(el => (el.textContent = ""));
}
 
function showErrors(errors) {
  clearErrors();
  const map = {
    name:    ["userName",    "nameError"],
    email:   ["userEmail",   "emailError"],
    message: ["userMessage", "messageError"],
  };
  Object.entries(errors).forEach(([key, msg]) => {
    const [inputId, errorId] = map[key];
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add("is-invalid");
    if (error) error.textContent = msg;
  });
}
 
function setStatus(message, type) {
  const el = document.getElementById("formStatus");
  if (!el) return;
  el.textContent = message;
  el.className = "form__status " + type;
}
 
function setLoading(isLoading) {
  const btn     = document.getElementById("submitBtn");
  const btnText = btn && btn.querySelector(".form__btn-text");
  if (!btn) return;
 
  btn.disabled = isLoading;
 
  if (isLoading) {
    const icon = btn.querySelector(".form__btn-icon");
    if (icon) icon.outerHTML = `<span class="spinner"></span>`;
    if (btnText) btnText.textContent = "Надсилаємо…";
  } else {
    const spinner = btn.querySelector(".spinner");
    if (spinner) spinner.outerHTML = `<svg class="form__btn-icon" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>`;
    if (btnText) btnText.textContent = "Надіслати";
  }
}
 
// ─── Form Submit ──────────────────────────────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
 
  const nameEl    = document.getElementById("userName");
  const emailEl   = document.getElementById("userEmail");
  const messageEl = document.getElementById("userMessage");
  if (!nameEl || !emailEl || !messageEl) return;
 
  const name    = nameEl.value;
  const email   = emailEl.value;
  const message = messageEl.value;
 
  clearErrors();
  setStatus("", "");
 
  const errors = validateForm(name, email, message);
  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }
 
  setLoading(true);
 
  try {
    await loadEmailJS();
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      user_name:  name.trim(),
      user_email: email.trim(),
      message:    message.trim(),
      to_email:   "gencer.it.1989@gmail.com",
      reply_to:   email.trim(),
    });
    setStatus("✅ Повідомлення надіслано! Відповім найближчим часом.", "success");
    e.target.reset();
    clearErrors();
  } catch (err) {
    console.error("EmailJS error:", err);
    setStatus(
      "❌ Помилка відправки. Напишіть напряму: gencer.it.1989@gmail.com",
      "error"
    );
  } finally {
    setLoading(false);
  }
}
 
// ─── Live validation ──────────────────────────────────────────────────────────
function initLiveValidation() {
  const map = {
    userName:    "nameError",
    userEmail:   "emailError",
    userMessage: "messageError",
  };
  Object.entries(map).forEach(([inputId, errorId]) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    input.addEventListener("input", function () {
      this.classList.remove("is-invalid");
      error.textContent = "";
    });
  });
}
 
// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLiveValidation();
 
  const form = document.getElementById("contactForm");
  if (form) form.addEventListener("submit", handleSubmit);
});
 

// ============================================================
// ServicesRenderer — клас для рендеру секції "Послуги"
// Такий самий патерн як SkillsRenderer — class ES6
//
// add(title, description, svgIcon) — додає послугу
// render()                         — будує картки в DOM
// ============================================================

class ServicesRenderer {
  constructor(selector) {
    this._container = document.querySelector(selector);
    this._services  = [];
  }

  // svgIcon — рядок з SVG-розміткою (inline SVG)
  add(title, description, svgIcon) {
    this._services.push({ title, description, svgIcon });
    return this; // ланцюжок .add().add().render()
  }

  render() {
    if (!this._container) {
      console.warn('ServicesRenderer: контейнер не знайдено');
      return;
    }

    this._container.innerHTML = '';

    for (const service of this._services) {
      const li = document.createElement('li');
      li.className = 'services__item';

      // Картка
      const card = document.createElement('div');
      card.className = 'service-card';

      // Кружок з іконкою
      const iconWrap = document.createElement('div');
      iconWrap.className = 'service-card__icon-wrap';
      iconWrap.innerHTML = service.svgIcon; // вставляємо inline SVG

      // Заголовок
      const title = document.createElement('h3');
      title.className = 'service-card__title';
      title.textContent = service.title;

      // Опис
      const desc = document.createElement('p');
      desc.className = 'service-card__desc';
      desc.textContent = service.description;

      card.appendChild(iconWrap);
      card.appendChild(title);
      card.appendChild(desc);
      li.appendChild(card);
      this._container.appendChild(li);
    }
  }

  clear() {
    this._services = [];
    if (this._container) this._container.innerHTML = '';
    return this;
  }
}

// ============================================================
// ВСІ ДАНІ ТУТ — тільки цей блок редагуєш
// add(назва, опис, svgРядок)
// ============================================================

const services = new ServicesRenderer('#services-list');

services
  .add(
    'Односторінкові сайти (SPA)',
    'Швидкі та інтерактивні SPA з плавною навігацією та сучасним UX.',
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>`
  )
  .add(
    'Сайти-візитки',
    'Лаконічні сайти-візитки, що підкреслюють вашу професійну ідентичність.',
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="9" y1="15" x2="15" y2="15"></line>
    </svg>`
  )
  .add(
    'Front-end розробка',
    'Верстка та front-end розробка під стек: HTML/CSS/SCSS, JS/TS, Angular.',
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>`
  )
  .add(
    'Безкоштовний огляд портфоліо',
    'Безкоштовно подивлюся ваше портфоліо чи досвід — відверто та по суті.',
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`
  )
  .render();