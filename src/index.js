// Entry point: imports assets, renders dynamic sections, and wires UI behavior.
// Точка входу: підключає ресурси, рендерить динамічні секції та прив'язує поведінку UI.

import "./styles/style.scss";
import "./styles/header.scss";
import "./styles/contact.scss";
import "./styles/services.scss";

import "./assets/Artem-foto.png";
import "./assets/Artem-foto.avif";
import "./assets/Artem-foto.webp";
import {
  SKILLS,
  SERVICES,
  TRANSLATIONS,
  EMAILJS_CONFIG,
} from "./data.js";

// Stores the active UI language between sessions.
// Зберігає активну мову інтерфейсу між сесіями.
let activeLanguage = localStorage.getItem("lang") || "ua";

const createElementWithProps = (tagName, elementProps = {}) =>
  Object.assign(document.createElement(tagName), elementProps);

// Renders the skills list from data.js into BEM cards.
// Рендерить список навичок з data.js у BEM-картки.
class SkillsRenderer {
  #container;
  #skills = [];

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  load(skillsArray) {
    this.#skills = skillsArray;
    return this;
  }
  
  render() {
    if (!this.#container) {
      console.warn("SkillsRenderer: container not found");
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const skill of this.#skills) {
      const skillItemElement = document.createElement("li");
      skillItemElement.className = "skills__item skill-card";

      const skillIconElement = createElementWithProps("img", {
        className: "skill-card__icon",
        src: skill.icon,
        alt: skill.title,
      });

      const skillTitleElement = createElementWithProps("span", {
        className: "skill-card__title",
        textContent: skill.title,
      });

      skillItemElement.append(skillIconElement, skillTitleElement);
      fragment.appendChild(skillItemElement);
    }

    this.#container.innerHTML = "";
    this.#container.appendChild(fragment);
  }
}

// Renders service cards and keeps service copy in the active language.
// Рендерить картки послуг і тримає текст послуг активною мовою.
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
      console.warn("ServicesRenderer: container not found");
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const service of this.#services) {
      const serviceItemElement = document.createElement("li");
      serviceItemElement.className = "services__item";

      const serviceCardElement = document.createElement("div");
      serviceCardElement.className = "service-card";

      const serviceIconWrapperElement = document.createElement("div");
      serviceIconWrapperElement.className = "service-card__icon-wrap";
      serviceIconWrapperElement.innerHTML = service.svgIcon;

      const serviceTitleElement = createElementWithProps("h3", {
        className: "service-card__title",
        textContent: service.title,
      });

      const serviceDescriptionElement = createElementWithProps("p", {
        className: "service-card__desc",
        textContent: service.description,
      });

      serviceCardElement.append(
        serviceIconWrapperElement,
        serviceTitleElement,
        serviceDescriptionElement,
      );
      serviceItemElement.appendChild(serviceCardElement);
      fragment.appendChild(serviceItemElement);
    }

    this.#container.innerHTML = "";
    this.#container.appendChild(fragment);
  }
}

// Controls the mobile navigation menu: open, close, and outside-click behavior.
// Керує мобільним меню: відкриття, закриття та клік поза меню.
function initMobileNavigation() {
  const mobileMenuButton = document.querySelector(".header__burger");
  const navigationMenu = document.querySelector(".header__nav");
  if (!mobileMenuButton || !navigationMenu) return;

  mobileMenuButton.addEventListener("click", () => {
    const isMenuOpen = mobileMenuButton.classList.toggle("is-open");
    navigationMenu.classList.toggle("is-open", isMenuOpen);
    mobileMenuButton.setAttribute("aria-expanded", isMenuOpen);
  });

  navigationMenu.querySelectorAll(".header__nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuButton.classList.remove("is-open");
      navigationMenu.classList.remove("is-open");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !mobileMenuButton.contains(event.target) &&
      !navigationMenu.contains(event.target)
    ) {
      mobileMenuButton.classList.remove("is-open");
      navigationMenu.classList.remove("is-open");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Applies and toggles the saved light/dark theme.
// Застосовує та перемикає збережену світлу/темну тему.
function initThemeToggle() {
  const themeButton = document.querySelector(".header__btn--theme");
  if (!themeButton) return;

  const THEME_TOGGLE_ICONS = {
    // Icon shown in dark mode: click switches to light mode.
    // Іконка у темній темі: клік перемикає на світлу тему.
    dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`,
    // Icon shown in light mode: click switches to dark mode.
    // Іконка у світлій темі: клік перемикає на темну тему.
    light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`,
  };

  const applyThemeMode = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    themeButton.innerHTML =
      theme === "dark" ? THEME_TOGGLE_ICONS.dark : THEME_TOGGLE_ICONS.light;
  };

  applyThemeMode(localStorage.getItem("theme") || "light");

  themeButton.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    localStorage.setItem("theme", nextTheme);
    applyThemeMode(nextTheme);
  });
}

// Applies translations, rerenders translated sections, and stores the language.
// Застосовує переклади, перерендерює перекладені секції та зберігає мову.
function applyLanguage(languageCode) {
  const dictionary = TRANSLATIONS[languageCode];
  if (!dictionary) return;

  document.documentElement.lang = languageCode === "ua" ? "uk" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) element.placeholder = dictionary[key];
  });

  new ServicesRenderer("#services-list").load(SERVICES[languageCode]).render();
  updateLoadedPortfolioLanguage(languageCode);

  const languageButton = document.querySelector(".header__btn--lang");
  if (languageButton) {
    languageButton.textContent = languageCode === "ua" ? "🌐 EN" : "🌐 UA";
  }

  activeLanguage = languageCode;
  localStorage.setItem("lang", languageCode);
}

function initLanguageSwitcher() {
  applyLanguage(activeLanguage);

  document
    .querySelector(".header__btn--lang")
    ?.addEventListener("click", () => {
      applyLanguage(activeLanguage === "ua" ? "en" : "ua");
    });
}

// Contact form: validates fields, lazy-loads EmailJS, and sends messages.
// Форма контактів: валідує поля, ліниво завантажує EmailJS і надсилає повідомлення.
const CONTACT_FORM_FIELDS = {
  name: { inputId: "userName", errorId: "nameError" },
  email: { inputId: "userEmail", errorId: "emailError" },
  message: { inputId: "userMessage", errorId: "messageError" },
};

function validateContactForm(name, email, message) {
  const errors = {};
  if (!name.trim()) errors.name = "Введіть ваше ім'я";
  if (!email.trim()) errors.email = "Введіть email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Невірний формат email";
  if (!message.trim()) errors.message = "Введіть повідомлення";
  return errors;
}

function clearContactFormErrors() {
  Object.values(CONTACT_FORM_FIELDS).forEach(({ inputId, errorId }) => {
    document.getElementById(inputId)?.classList.remove("is-invalid");
    const errorMessageElement = document.getElementById(errorId);
    if (errorMessageElement) errorMessageElement.textContent = "";
  });
}

function showContactFormErrors(errors) {
  clearContactFormErrors();
  Object.entries(errors).forEach(([fieldName, errorMessage]) => {
    const { inputId, errorId } = CONTACT_FORM_FIELDS[fieldName];
    document.getElementById(inputId)?.classList.add("is-invalid");
    const errorMessageElement = document.getElementById(errorId);
    if (errorMessageElement) errorMessageElement.textContent = errorMessage;
  });
}

function setContactFormStatus(message, type) {
  const statusElement = document.getElementById("formStatus");
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.className = `form__status ${type}`;
}

// Reusable send icon for restoring the submit button after loading.
// Повторно використовувана іконка відправки для відновлення кнопки після loading-стану.
const SEND_BUTTON_ICON = `<svg class="form__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="22" y1="2" x2="11" y2="13"></line>
  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
</svg>`;

function setSubmitButtonLoading(isLoading) {
  const submitButton = document.getElementById("submitBtn");
  const submitButtonText = submitButton?.querySelector(".form__btn-text");
  if (!submitButton) return;

  submitButton.disabled = isLoading;

  const buttonIconSlot = submitButton.querySelector(".form__btn-icon, .spinner");
  if (isLoading) {
    buttonIconSlot?.insertAdjacentHTML("afterend", '<span class="spinner"></span>');
    buttonIconSlot?.remove();
    if (submitButtonText) submitButtonText.textContent = "Надсилаємо…";
  } else {
    buttonIconSlot?.insertAdjacentHTML("afterend", SEND_BUTTON_ICON);
    buttonIconSlot?.remove();
    if (submitButtonText) submitButtonText.textContent = "Надіслати";
  }
}

// Loads EmailJS from CDN only when the user submits the form.
// Завантажує EmailJS з CDN тільки коли користувач відправляє форму.
function loadEmailJsSdk() {
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
    script.onerror = () =>
      reject(new Error("EmailJS не завантажився"));
    document.head.appendChild(script);
  });
}

function getContactEmailSubject() {
  return activeLanguage === "en"
    ? "New message from portfolio website"
    : "Нове повідомлення з сайту-візитки";
}

function buildEmailTemplateParams({ name, email, message }) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  return {
    name: trimmedName,
    email: trimmedEmail,
    title: getContactEmailSubject(),
    message: trimmedMessage,

    // Backward-compatible aliases for the previous EmailJS template variables.
    // Зворотно сумісні псевдоніми для попередніх змінних EmailJS-шаблону.
    user_name: trimmedName,
    user_email: trimmedEmail,

    to_email: EMAILJS_CONFIG.toEmail,
    reply_to: trimmedEmail,
  };
}

async function handleContactFormSubmit(event) {
  event.preventDefault();

  const nameInputElement = document.getElementById("userName");
  const emailInputElement = document.getElementById("userEmail");
  const messageInputElement = document.getElementById("userMessage");
  if (!nameInputElement || !emailInputElement || !messageInputElement) return;

  clearContactFormErrors();
  setContactFormStatus("", "");

  const errors = validateContactForm(
    nameInputElement.value,
    emailInputElement.value,
    messageInputElement.value,
  );
  if (Object.keys(errors).length) {
    showContactFormErrors(errors);
    return;
  }

  setSubmitButtonLoading(true);
  try {
    await loadEmailJsSdk();
    await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      buildEmailTemplateParams({
        name: nameInputElement.value,
        email: emailInputElement.value,
        message: messageInputElement.value,
      }),
    );
    setContactFormStatus(
      "✅ Повідомлення надіслано! Відповім найближчим часом.",
      "success",
    );
    event.target.reset();
    clearContactFormErrors();
  } catch (error) {
    console.error("EmailJS error:", error);
    setContactFormStatus(
      `❌ Помилка відправки. Напишіть напряму: ${EMAILJS_CONFIG.toEmail}`,
      "error",
    );
  } finally {
    setSubmitButtonLoading(false);
  }
}

// Clears a field error as soon as the user starts editing it.
// Прибирає помилку поля одразу, коли користувач починає його редагувати.
function initContactFormLiveValidation() {
  Object.values(CONTACT_FORM_FIELDS).forEach(({ inputId, errorId }) => {
    const inputElement = document.getElementById(inputId);
    const errorMessageElement = document.getElementById(errorId);
    if (!inputElement || !errorMessageElement) return;
    inputElement.addEventListener("input", function () {
      this.classList.remove("is-invalid");
      errorMessageElement.textContent = "";
    });
  });
}

let portfolioModulePromise = null;
let loadedPortfolioModule = null;
let isPortfolioRenderRequested = false;

// Lazy-loads portfolio code only when the portfolio section becomes relevant.
// Ліниво завантажує код портфоліо тільки тоді, коли секція портфоліо стає потрібною.
function loadPortfolioModule() {
  if (!portfolioModulePromise) {
    portfolioModulePromise = import("./portfolio.js").then((portfolioModule) => {
      loadedPortfolioModule = portfolioModule;
      return portfolioModule;
    });
  }

  return portfolioModulePromise;
}

function updateLoadedPortfolioLanguage(languageCode) {
  loadedPortfolioModule?.updatePortfolioVisitLabels(languageCode);
}

function requestPortfolioRender() {
  if (isPortfolioRenderRequested) return portfolioModulePromise;
  isPortfolioRenderRequested = true;

  return loadPortfolioModule()
    .then((portfolioModule) => {
      portfolioModule.initPortfolioMarquee({ languageCode: activeLanguage });
    })
    .catch((error) => {
      isPortfolioRenderRequested = false;
      console.error("Portfolio module loading failed:", error);
    });
}

function requestPortfolioRenderWhenIdle() {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(requestPortfolioRender, { timeout: 1600 });
  } else {
    window.setTimeout(requestPortfolioRender, 900);
  }
}

function initLazyPortfolioLoading() {
  const portfolioSection = document.getElementById("portfolio");
  if (!portfolioSection) return;

  document.querySelectorAll('a[href="#portfolio"]').forEach((portfolioLink) => {
    portfolioLink.addEventListener("click", requestPortfolioRender, { once: true });
  });

  if (window.location.hash === "#portfolio") {
    requestPortfolioRender();
    return;
  }

  if ("IntersectionObserver" in window) {
    const portfolioObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        requestPortfolioRender();
        portfolioObserver.disconnect();
      },
      { rootMargin: "700px 0px" },
    );

    portfolioObserver.observe(portfolioSection);
  } else {
    window.addEventListener("load", requestPortfolioRenderWhenIdle, { once: true });
  }
}

// App bootstrap: early render reduces layout shifts; DOM-only listeners wait for DOMContentLoaded.
// Старт застосунку: ранній рендер зменшує layout shift; DOM-слухачі чекають DOMContentLoaded.
new SkillsRenderer("#skills-list").load(SKILLS).render();
initThemeToggle();
initLanguageSwitcher();

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initContactFormLiveValidation();
  initLazyPortfolioLoading();

  document
    .getElementById("contactForm")
    ?.addEventListener("submit", handleContactFormSubmit);
});
