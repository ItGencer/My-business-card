// Central content store: edit copy, links, and lists here instead of renderers.
// Центральне сховище контенту: редагуй тексти, посилання та списки тут, а не в рендерах.

// Skill icon imports used by SKILLS.
// Імпорти іконок навичок, які використовує SKILLS.
import angularIcon from './assets/icons/angular.svg';
import bemIcon     from './assets/icons/bem.svg';
import githubIcon  from './assets/icons/github.svg';
import html5Icon   from './assets/icons/html5.svg';
import jsIcon      from './assets/icons/js.svg';
import sassIcon    from './assets/icons/sass.svg';
import tsIcon      from './assets/icons/ts.svg';

// Skills data rendered into the "Навички" section.
// Дані навичок, які рендеряться у секцію "Навички".
// Shape: { title, icon, percent }.
// Формат: { title, icon, percent }.
export const SKILLS = [
  { title: 'HTML5 / CSS3', icon: html5Icon,   percent: 95  },
  { title: 'SASS / SCSS',  icon: sassIcon,    percent: 90  },
  { title: 'JavaScript',   icon: jsIcon,      percent: 88  },
  { title: 'TypeScript',   icon: tsIcon,      percent: 68  },
  { title: 'GitHUB',       icon: githubIcon,  percent: 85  },
  { title: 'Angular',      icon: angularIcon, percent: 85  },
  { title: 'BEM',          icon: bemIcon,     percent: 100 },
];

// Services are separated by language because their cards are fully rerendered on language change.
// Послуги розділені за мовами, бо картки повністю перерендерюються при зміні мови.
export const SERVICES = {
  ua: [
    {
      title: 'Односторінкові сайти (SPA)',
      description: 'Швидкі, інтерактивні застосунки з плавною навігацією та сучасним UX.',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>`,
    },
    {
      title: 'Сайти-візитки',
      description: 'Лаконічні сайти-візитки, що підкреслюють вашу професійну ідентичність.',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>`,
    },
    {
      title: 'Front-end розробка',
      description: 'Верстка та front-end розробка під стек: HTML/CSS/SCSS, JS/TS, Angular.',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>`,
    }
  ],
  en: [
    {
      title: 'Single Page Applications (SPA)',
      description: 'Fast and interactive SPAs with smooth navigation and modern UX.',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>`,
    },
    {
      title: 'Business Card Sites',
      description: 'Concise business card sites that highlight your professional identity.',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>`,
    },
    {
      title: 'Front-end Development',
      description: 'Markup and front-end development: HTML/CSS/SCSS, JS/TS, Angular.',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>`,
    }
  ],
};
// EmailJS identifiers used by contact form submission.
// Ідентифікатори EmailJS, які використовує відправка контактної форми.
export const EMAILJS_CONFIG = {
  serviceId:  'service_ega4f8t',
  templateId: 'template_fcyzwhf',
  publicKey:  'LHUHZsoWLw66wnZxQ',
  toEmail:    'gencer.it.1989@gmail.com',
};

// UI translations for static HTML text and placeholders.
// Переклади інтерфейсу для статичного HTML-тексту та placeholder.
export const TRANSLATIONS = {
  ua: {
    // Navigation labels.
    'nav.about':    'Про мене',
    'nav.skills':   'Навички',
    'nav.contact':  'Контакти',

    // Hero section copy.
    'intro.subtitle': 'Відповідальний підхід — якісний результат',
    'intro.btn.works':   'Переглянути роботи',
    'intro.btn.contact': "Зв'язатися",

    // About section copy.
    'about.title': 'Про мене',
    'about.text.1': 'Я — Артем Грішин, front-end розробник. Створюю сайти-візитки та односторінкові сайти (SPA), орієнтовані на швидкість, чистий код і сучасний UX. Працюю зі стеком HTML/CSS/SCSS, JS/TS, Angular.',
    'about.text.2': 'Кожен проєкт — поєднання технічної якості та уваги до деталей: від адаптивної верстки до плавної навігації. Мета — перетворити вашу ідею на функціональний і візуально продуманий сайт.',
    'about.github.prefix': 'Приклади реалізованих робіт — на',

    // Skills section title.
    'skills.title': 'Навички та технології',

    // Services section title.
    'services.title': 'Послуги',

    // Contact section copy and form labels.
    'contact.title':    'Зв\'язатися зі мною',
    'contact.subtitle': 'Маєте проєкт або питання? Напишіть — відповім швидко.',
    'contact.info.title': 'Оберіть зручний спосіб зв\'язку',
    'contact.info.subtitle': 'Телефон, Telegram або email — усі канали активні.',
    'contact.action.phone': 'Подзвонити',
    'contact.action.telegram': 'Написати в Telegram',
    'contact.action.email': 'Написати email',
    'form.name':    "Ваше ім'я",
    'form.email':   'Email',
    'form.message': 'Повідомлення',
    'form.submit':  'Надіслати',

    // Legacy keys kept for compatibility with older markup/renderers.
    // Legacy-ключі залишені для сумісності зі старою розміткою/рендерами.
    'service.spa.title':  'Односторінкові сайти (SPA)',
    'service.spa.desc':   'Швидкі та інтерактивні SPA...',
    'footer.copyright': '© 2026 Артем Грішин. Всі права захищені.'
  },
  en: {
    'nav.about':    'About',
    'nav.skills':   'Skills',
    'nav.contact':  'Contact',

    'intro.subtitle': 'Responsible approach — quality result',
    'intro.btn.works':   'View my work',
    'intro.btn.contact': 'Get in touch',

    'about.title': 'About Me',
    'about.text.1': 'I am Artem Grishin, a front-end developer. I create business card sites and single-page applications (SPA) focused on speed, clean code, and modern UX. I work with HTML/CSS/SCSS, JS/TS, and Angular.',
    'about.text.2': 'Each project combines technical quality and attention to detail: from responsive layout to smooth navigation. The goal is to turn your idea into a functional and visually thoughtful website.',
    'about.github.prefix': 'Examples of completed work are on',

    'skills.title': 'Skills & Technologies',
    'services.title': 'Services',

    'contact.title':    'Contact Me',
    'contact.subtitle': 'Have a project or question? Write — I\'ll reply quickly.',
    'contact.info.title': 'Choose a convenient way to connect',
    'contact.info.subtitle': 'Phone, Telegram, or email — every channel is active.',
    'contact.action.phone': 'Call',
    'contact.action.telegram': 'Message on Telegram',
    'contact.action.email': 'Send an email',
    'form.name':    'Your name',
    'form.email':   'Email',
    'form.message': 'Message',
    'form.submit':  'Send',

    'service.spa.title': 'Single Page Applications (SPA)',
    'service.spa.desc':  'Fast and interactive SPAs with smooth navigation...',
    'footer.copyright': '© 2026 Artem Grishin. All rights reserved.'
  },
};
