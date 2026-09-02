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
      price: 'від 500 грн',
      actionLabel: 'Замовити',
      actionHref: '#contact',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>`,
    },
    {
      title: 'Сайти-візитки',
      description: 'Лаконічні сайти-візитки, що підкреслюють вашу професійну ідентичність.',
      price: 'від 500 грн',
      badgeLabel: 'Популярний вибір',
      actionLabel: 'Замовити',
      actionHref: '#contact',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>`,
    },
    {
      title: 'Індивідуальний проєкт',
      description: 'Нестандартний запит або складніший функціонал? Обговоримо й розробимо рішення під ваші задачі.',
      price: 'від 500 грн',
      actionLabel: 'Замовити',
      actionHref: '#contact',
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
      price: 'from 500 UAH',
      actionLabel: 'Order',
      actionHref: '#contact',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>`,
    },
    {
      title: 'Business Card Sites',
      description: 'Concise business card sites that highlight your professional identity.',
      price: 'from 500 UAH',
      badgeLabel: 'Popular choice',
      actionLabel: 'Order',
      actionHref: '#contact',
      svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>`,
    },
    {
      title: 'Custom Project',
      description: 'Have a non-standard request or more complex functionality? We will discuss it and build a solution for your tasks.',
      price: 'from 500 UAH',
      actionLabel: 'Order',
      actionHref: '#contact',
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
    // Підписи навігації.
    'nav.about':    'Про мене',
    'nav.skills':   'Навички',
    'nav.services': 'Послуги',
    'nav.portfolio': 'Портфоліо',
    'nav.contact':  'Контакти',

    // Hero section copy.
    // Тексти hero-секції.
    'intro.subtitle': 'Відповідальний підхід — якісний результат',
    'intro.btn.works':   'Переглянути роботи',
    'intro.btn.contact': "Зв'язатися",

    // About section copy.
    // Тексти секції "Про мене".
    'about.title': 'Про мене',
    'about.lead': 'Вітаю! Роблю сайти-візитки та односторінкові сайти (SPA) для малого бізнесу та фахівців 🚀',
    'about.what.title': 'Що роблю:',
    'about.what.1': 'Сайт-візитка / лендінг під ваші послуги',
    'about.what.2': 'Чиста верстка: HTML5, CSS3, SCSS, JS/TypeScript — без важких CMS, сайт швидкий і надійний',
    'about.what.3': 'Адаптивність під телефон і ПК',
    'about.what.4': 'Допоможу завантажити готовий сайт на хостинг, якщо ви ще його не маєте',
    'about.process.title': 'Як працюю:',
    'about.process.1': 'Обговорюємо задачу та ваші побажання. Якщо власного макету ще немає — швидко створю візуальний прототип за допомогою AI-інструментів, щоб ви одразу побачили, як виглядатиме майбутній сайт.',
    'about.process.2': 'Узгоджуємо деталі та ціну',
    'about.process.3': 'Верстаю сайт з нуля, без шаблонних конструкторів',
    'about.process.4': 'Вносимо правки за потреби',
    'about.process.5': 'Допомагаю з розміщенням на хостингу і здаю готовий результат',
    'about.price': '💰 Ціна від 500 грн — працюю на портфоліо та відгуки, тому по-чесному дешево. Включено: макет, верстка, адаптив під девайси. Можна домовитись під ваш бюджет',

    // Skills section title.
    // Заголовок секції навичок.
    'skills.title': 'Навички та технології',

    // Services section title.
    // Заголовок секції послуг.
    'services.title': 'Послуги',

    // Contact section copy and form labels.
    // Тексти секції контактів і підписи форми.
    'contact.title':    'Зв\'язатися зі мною',
    'contact.subtitle': 'Маєте проєкт або питання? Напишіть — відповім швидко.',
    'contact.info.title': 'Оберіть зручний спосіб зв\'язку',
    'contact.info.subtitle': 'Телефон, Telegram, email або LinkedIn — усі канали активні.',
    'contact.action.phone': 'Подзвонити',
    'contact.action.telegram': 'Написати в Telegram',
    'contact.action.email': 'Написати email',
    'contact.action.linkedin': 'Відкрити LinkedIn',
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
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact':  'Contact',

    'intro.subtitle': 'Responsible approach — quality result',
    'intro.btn.works':   'View my work',
    'intro.btn.contact': 'Get in touch',

    'about.title': 'About Me',
    'about.lead': 'Hi! I build business card websites and single-page sites (SPA) for small businesses and independent professionals 🚀',
    'about.what.title': 'What I do:',
    'about.what.1': 'Business card website / landing page for your services',
    'about.what.2': 'Clean layout: HTML5, CSS3, SCSS, JS/TypeScript — no heavy CMS, so the site stays fast and reliable',
    'about.what.3': 'Responsive layout for phones and desktops',
    'about.what.4': 'I can help publish the finished site to hosting if you do not have hosting yet',
    'about.process.title': 'How I work:',
    'about.process.1': 'We discuss the task and I prepare an initial mockup. If you do not have your own site design yet, I can generate one with AI or lovable.dev so you can clearly see how the site will look.',
    'about.process.2': 'We agree on the details and price',
    'about.process.3': 'I code the site from scratch, without template builders',
    'about.process.4': 'We make edits if needed',
    'about.process.5': 'I help with hosting setup and deliver the finished result',
    'about.price': '💰 Prices start at 500 UAH — I’m building my portfolio and gathering reviews, so my rates are genuinely low. Includes: design, coding, and responsive layout. I’m open to discussing a price that fits your budget.',

    'skills.title': 'Skills & Technologies',
    'services.title': 'Services',

    'contact.title':    'Contact Me',
    'contact.subtitle': 'Have a project or question? Write — I\'ll reply quickly.',
    'contact.info.title': 'Choose a convenient way to connect',
    'contact.info.subtitle': 'Phone, Telegram, email, or LinkedIn — every channel is active.',
    'contact.action.phone': 'Call',
    'contact.action.telegram': 'Message on Telegram',
    'contact.action.email': 'Send an email',
    'contact.action.linkedin': 'Open LinkedIn',
    'form.name':    'Your name',
    'form.email':   'Email',
    'form.message': 'Message',
    'form.submit':  'Send',

    'service.spa.title': 'Single Page Applications (SPA)',
    'service.spa.desc':  'Fast and interactive SPAs with smooth navigation...',
    'footer.copyright': '© 2026 Artem Grishin. All rights reserved.'
  },
};
