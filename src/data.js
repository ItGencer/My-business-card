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
// { title, description, svgIcon }
export const SERVICES = [
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
  },
  {
    title: 'Безкоштовний огляд портфоліо',
    description: 'Безкоштовно подивлюся ваше портфоліо чи досвід — відверто та по суті.',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`,
  },
];

// ── EmailJS конфіг ────────────────────────────────────────────
export const EMAILJS_CONFIG = {
  serviceId:  'service_ega4f8t',
  templateId: 'template_fcyzwhf',
  publicKey:  'LHUHZsoWLw66wnZxQ',
  toEmail:    'gencer.it.1989@gmail.com',
};