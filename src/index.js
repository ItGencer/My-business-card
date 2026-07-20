// ============================================================
// index.js — точка входу
// Логіка відокремлена від даних: дані — в data.js
// ============================================================

import "./styles/style.scss";
import "./styles/header.scss";
import "./styles/contact.scss";
import "./styles/services.scss";

import artemPhoto from "./assets/Artem-foto.png";
import { SKILLS, SERVICES, PORTFOLIO, TRANSLATIONS, EMAILJS_CONFIG } from "./data.js";

// Поточна мова — зберігається між сесіями через localStorage
let currentLang = localStorage.getItem("lang") || "ua";

// ============================================================
// SkillsRenderer — рендерить картки навичок (іконка + назва)
// ============================================================
class SkillsRenderer {
  #container;
  #skills = [];

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  // Приймає масив { title, icon, percent } — percent ігнорується
  load(skillsArray) {
    this.#skills = skillsArray;
    return this; // повертає this для ланцюжка .load().render()
  }
  
  render() {
  if (!this.#container) {
    console.warn('SkillsRenderer: контейнер не знайдено');
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const skill of this.#skills) {
    const li = document.createElement('li');
    li.className = 'skills__item skill-card'; // skill-card — окремий BEM-блок

    const img = Object.assign(document.createElement('img'), {
      className: 'skill-card__icon', // блок skill-card, елемент icon
      src:       skill.icon,
      alt:       skill.title,
    });

    const titleEl = Object.assign(document.createElement('span'), {
      className:   'skill-card__title', // блок skill-card, елемент title
      textContent: skill.title,
    });

    li.append(img, titleEl);
    fragment.appendChild(li);
  }

  this.#container.innerHTML = '';
  this.#container.appendChild(fragment);
}
}

// ============================================================
// ServicesRenderer — рендерить картки послуг
// ============================================================
class ServicesRenderer {
  #container;
  #services = [];

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  // Приймає масив { title, description, svgIcon }
  load(servicesArray) {
    this.#services = servicesArray;
    return this;
  }

  render() {
    if (!this.#container) {
      console.warn("ServicesRenderer: контейнер не знайдено");
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const service of this.#services) {
      const li = document.createElement("li");
      li.className = "services__item";

      const card = document.createElement("div");
      card.className = "service-card";

      const iconWrap = document.createElement("div");
      iconWrap.className = "service-card__icon-wrap";
      iconWrap.innerHTML = service.svgIcon; // innerHTML лише для SVG-рядка

      const titleEl = Object.assign(document.createElement("h3"), {
        className: "service-card__title",
        textContent: service.title,
      });

      const descEl = Object.assign(document.createElement("p"), {
        className: "service-card__desc",
        textContent: service.description,
      });

      card.append(iconWrap, titleEl, descEl);
      li.appendChild(card);
      fragment.appendChild(li);
    }

    this.#container.innerHTML = "";
    this.#container.appendChild(fragment);
  }
}

// ============================================================
// Burger Menu — мобільне меню
// ============================================================
function initBurger() {
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
  });

  // Закрити при кліку на посилання навігації
  nav.querySelectorAll(".header__nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-open");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Закрити при кліку поза меню
  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      burger.classList.remove("is-open");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

// ============================================================
// Theme Toggle — світла / темна тема
// ============================================================
function initTheme() {
  const btn = document.querySelector(".header__btn--theme");
  if (!btn) return;

  const ICONS = {
    // Показується коли темна тема активна → клік переключить на світлу
    dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`,
    // Показується коли світла тема активна → клік переключить на темну
    light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`,
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    btn.innerHTML = theme === "dark" ? ICONS.dark : ICONS.light;
  };

  applyTheme(localStorage.getItem("theme") || "light");

  btn.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

// ============================================================
// i18n — перемикач мови UA ↔ EN
// ============================================================
function applyLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Оновлюємо текстовий контент елементів з data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  // Оновлюємо placeholder у полях форми з data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  // Перерендер послуг мовою що активна
  new ServicesRenderer("#services-list").load(SERVICES[lang]).render();

  // Кнопка показує наступну мову (яку буде обрано при кліку)
  const btn = document.querySelector(".header__btn--lang");
  if (btn) btn.textContent = lang === "ua" ? "🌐 EN" : "🌐 UA";

  currentLang = lang;
  localStorage.setItem("lang", lang);
}

function initLang() {
  // Застосовуємо збережену або дефолтну мову при завантаженні
  applyLang(currentLang);

  // Перемикання при кліку на кнопку
  document
    .querySelector(".header__btn--lang")
    ?.addEventListener("click", () => {
      applyLang(currentLang === "ua" ? "en" : "ua");
    });
}

// ============================================================
// Форма зворотного зв'язку — валідація + EmailJS
// ============================================================
const FORM_FIELDS = {
  name: { inputId: "userName", errorId: "nameError" },
  email: { inputId: "userEmail", errorId: "emailError" },
  message: { inputId: "userMessage", errorId: "messageError" },
};

function validateForm(name, email, message) {
  const errors = {};
  if (!name.trim()) errors.name = "Введіть ваше ім'я";
  if (!email.trim()) errors.email = "Введіть email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Невірний формат email";
  if (!message.trim()) errors.message = "Введіть повідомлення";
  return errors;
}

function clearErrors() {
  Object.values(FORM_FIELDS).forEach(({ inputId, errorId }) => {
    document.getElementById(inputId)?.classList.remove("is-invalid");
    const err = document.getElementById(errorId);
    if (err) err.textContent = "";
  });
}

function showErrors(errors) {
  clearErrors();
  Object.entries(errors).forEach(([key, msg]) => {
    const { inputId, errorId } = FORM_FIELDS[key];
    document.getElementById(inputId)?.classList.add("is-invalid");
    const err = document.getElementById(errorId);
    if (err) err.textContent = msg;
  });
}

function setStatus(message, type) {
  const el = document.getElementById("formStatus");
  if (!el) return;
  el.textContent = message;
  el.className = `form__status ${type}`;
}

// SVG іконка кнопки "Надіслати" — винесена окремо щоб не дублювати
const SEND_ICON = `<svg class="form__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="22" y1="2" x2="11" y2="13"></line>
  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
</svg>`;

function setLoading(isLoading) {
  const btn = document.getElementById("submitBtn");
  const btnText = btn?.querySelector(".form__btn-text");
  if (!btn) return;

  btn.disabled = isLoading;

  const iconSlot = btn.querySelector(".form__btn-icon, .spinner");
  if (isLoading) {
    iconSlot?.insertAdjacentHTML("afterend", '<span class="spinner"></span>');
    iconSlot?.remove();
    if (btnText) btnText.textContent = "Надсилаємо…";
  } else {
    iconSlot?.insertAdjacentHTML("afterend", SEND_ICON);
    iconSlot?.remove();
    if (btnText) btnText.textContent = "Надіслати";
  }
}

// Завантажує EmailJS з CDN лише при першій відправці (lazy load)
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      resolve();
    };
    script.onerror = () => reject(new Error("EmailJS не завантажився"));
    document.head.appendChild(script);
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  const nameEl = document.getElementById("userName");
  const emailEl = document.getElementById("userEmail");
  const messageEl = document.getElementById("userMessage");
  if (!nameEl || !emailEl || !messageEl) return;

  clearErrors();
  setStatus("", "");

  const errors = validateForm(nameEl.value, emailEl.value, messageEl.value);
  if (Object.keys(errors).length) {
    showErrors(errors);
    return;
  }

  setLoading(true);
  try {
    await loadEmailJS();
    await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        user_name: nameEl.value.trim(),
        user_email: emailEl.value.trim(),
        message: messageEl.value.trim(),
        to_email: EMAILJS_CONFIG.toEmail,
        reply_to: emailEl.value.trim(),
      },
    );
    setStatus(
      "✅ Повідомлення надіслано! Відповім найближчим часом.",
      "success",
    );
    e.target.reset();
    clearErrors();
  } catch (err) {
    console.error("EmailJS error:", err);
    setStatus(
      `❌ Помилка відправки. Напишіть напряму: ${EMAILJS_CONFIG.toEmail}`,
      "error",
    );
  } finally {
    setLoading(false);
  }
}

// Знімає помилку з поля в реальному часі при введенні
function initLiveValidation() {
  Object.values(FORM_FIELDS).forEach(({ inputId, errorId }) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    input.addEventListener("input", function () {
      this.classList.remove("is-invalid");
      error.textContent = "";
    });
  });
}

// ============================================================
// Init — точка старту застосунку
// ============================================================

// Skills рендеримо одразу — не залежить від DOM (шукає контейнер сам)
new SkillsRenderer("#skills-list").load(SKILLS).render();

// Решта — після повного завантаження DOM

document.addEventListener("DOMContentLoaded", () => {
  const photo = document.querySelector(".intro__photo-img");
  if (photo) photo.src = artemPhoto;

  initBurger();
  initTheme();
  initLang();
  initLiveValidation();
  initPortfolio(); 
  
  document.getElementById("contactForm")?.addEventListener("submit", handleSubmit);
});

// ============================================================
// PortfolioRenderer — рендерить картки з живими iframe-сайтами
// ============================================================
class PortfolioRenderer {
  #container;
  #items = [];

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  load(items) {
    this.#items = items;
    return this;
  }

  render() {
    if (!this.#container) {
      console.warn("PortfolioRenderer: контейнер не знайдено");
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const item of this.#items) {
      const card = document.createElement("div");
      card.className = "portfolio-card";

      if (item.embeddable) {
        card.innerHTML = `
          <div class="portfolio-card__frame-wrap">
            <iframe src="${item.url}" loading="lazy"
              sandbox="allow-scripts allow-same-origin"></iframe>
            <div class="portfolio-card__shield"></div>
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="portfolio-card__fallback">
            <span>${item.name}</span>
          </div>
        `;
      }

      card.innerHTML += `
        <div class="portfolio-card__caption">
          <span>${item.name}</span>
          <a href="${item.url}" target="_blank" rel="noopener">↗</a>
        </div>
      `;

      fragment.appendChild(card);
    }

    this.#container.innerHTML = "";
    this.#container.appendChild(fragment);
  }
}

// ============================================================
// initPortfolio — колесо миші, кнопки, прозорість по центру
// ============================================================
function initPortfolio() {
  const track = document.getElementById("portfolioTrack");
  const prevBtn = document.getElementById("portfolioPrev");
  const nextBtn = document.getElementById("portfolioNext");
  if (!track) return;

  new PortfolioRenderer("#portfolioTrack").load(PORTFOLIO).render();

  const cards = Array.from(track.querySelectorAll(".portfolio-card"));
  let currentIndex = 0;

  const scrollToCard = (index, behavior = "smooth") => {
    if (!cards.length) return;

    const safeIndex = (index + cards.length) % cards.length;
    currentIndex = safeIndex;
    cards[safeIndex].scrollIntoView({
      behavior,
      block: "nearest",
      inline: "center",
    });
  };

  const updateOpacity = () => {
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      const maxDistance = track.clientWidth / 2 + card.offsetWidth / 2;
      const opacity = Math.max(0.25, 1 - distance / maxDistance);
      card.style.opacity = opacity.toFixed(2);
    });
  };

  const handleNext = () => scrollToCard(currentIndex + 1);
  const handlePrev = () => scrollToCard(currentIndex - 1);

  track.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    },
    { passive: false }
  );

  track.addEventListener("scroll", updateOpacity, { passive: true });

  prevBtn?.addEventListener("click", handlePrev);
  nextBtn?.addEventListener("click", handleNext);

  requestAnimationFrame(() => {
    updateOpacity();
    scrollToCard(0, "auto");
  });
}