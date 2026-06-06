// ============================================================
// data.js — всі дані портфоліо в одному місці
// Редагуєш тільки цей файл — рендерери не чіпаєш
// ============================================================

// ── Іконки навичок — імпорт тут, а не в index.js ────────────
import angularIcon from './assets/icons/angular.svg';
import bemIcon     from './assets/icons/bem.svg';
import githubIcon  from './assets/icons/github.svg';
import html5Icon   from './assets/icons/html5.svg';
import jsIcon      from './assets/icons/js.svg';
import sassIcon    from './assets/icons/sass.svg';
import tsIcon      from './assets/icons/ts.svg';

// ── Навички ──────────────────────────────────────────────────
// { title, icon, percent }
export const SKILLS = [
  { title: 'HTML5 / CSS3', icon: html5Icon,   percent: 95  },
  { title: 'SASS / SCSS',  icon: sassIcon,    percent: 90  },
  { title: 'JavaScript',   icon: jsIcon,      percent: 88  },
  { title: 'TypeScript',   icon: tsIcon,      percent: 68  },
  { title: 'GitHUB',       icon: githubIcon,  percent: 85  },
  { title: 'Angular',      icon: angularIcon, percent: 85  },
  { title: 'BEM',          icon: bemIcon,     percent: 100 },
];

// ── Послуги ───────────────────────────────────────────────────
// ✅ ТІЛЬКИ ЦЕЙ:
export const SERVICES = {
  ua: [
    {
      title: 'Односторінкові сайти (SPA)',
      description: 'Швидкі та інтерактивні SPA з плавною навігацією та сучасним UX.',
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

// ── EmailJS конфіг ────────────────────────────────────────────
export const EMAILJS_CONFIG = {
  serviceId:  'service_ega4f8t',
  templateId: 'template_fcyzwhf',
  publicKey:  'LHUHZsoWLw66wnZxQ',
  toEmail:    'gencer.it.1989@gmail.com',
};

// ── Переклади інтерфейсу ──────────────────────────────────────
export const TRANSLATIONS = {
  ua: {
    // Навігація
    'nav.about':    'Про мене',
    'nav.skills':   'Навички',
    'nav.contact':  'Контакти',

    // Hero
    'intro.subtitle': 'Відповідальний підхід — якісний результат',
    'intro.btn.works':   'Переглянути роботи',
    'intro.btn.contact': "Зв'язатися",

    // About
    'about.title': 'Про мене',
    'about.text':  ' Привіт! Мене звати Артем Грішин. Я front-end розробник, який створює сучасні, швидкі та зручні веб-продукти. Я ціную деталі, чистий код і відповідальне ставлення до кожного проєкту. Моя мета — перетворити вашу ідею на надійний інтерфейс, який працюватиме бездоганно на будь-якому пристрої.',

    // Skills
    'skills.title': 'Навички та технології',

    // Services
    'services.title': 'Послуги',

    // Contact
    'contact.title':    'Зв\'язатися зі мною',
    'contact.subtitle': 'Маєте проєкт або питання? Напишіть — відповім швидко.',
    'form.name':    "Ваше ім'я",
    'form.email':   'Email',
    'form.message': 'Повідомлення',
    'form.submit':  'Надіслати',

    // Services data (рендерер окремо)
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
    'about.text':  'Hello! My name is Artem Grishin. I am a front-end developer who creates modern, fast and user-friendly web products. I value details, clean code and a responsible attitude towards each project. My goal is to turn your idea into a reliable interface that will work flawlessly on any device.',

    'skills.title': 'Skills & Technologies',
    'services.title': 'Services',

    'contact.title':    'Contact Me',
    'contact.subtitle': 'Have a project or question? Write — I\'ll reply quickly.',
    'form.name':    'Your name',
    'form.email':   'Email',
    'form.message': 'Message',
    'form.submit':  'Send',

    'service.spa.title': 'Single Page Applications (SPA)',
    'service.spa.desc':  'Fast and interactive SPAs with smooth navigation...',
    'footer.copyright': '© 2026 Artem Grishin. All rights reserved.'
  },
};