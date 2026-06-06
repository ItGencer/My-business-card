# 🌐 Artem Hrishyn — Front-end Developer Portfolio

> Відповідальний підхід — якісний результат  
> *Responsible approach — quality result*

## 📋 Про проєкт

Особистий сайт-візитка Front-end розробника Артема Грішина. Односторінковий сайт (SPA) із секціями: про мене, навички, послуги, портфоліо та контакти. Підтримує перемикання мови (UA/EN) та темну/світлу тему.

## 🚀 Демо

🔗 [my-business-card-eta.vercel.app](https://my-business-card-eta.vercel.app/)

---

## 🛠️ Технічний стек

| Категорія | Технології |
|---|---|
| Мови | HTML5, SCSS (BEM), JavaScript (ES2022) |
| Збірка | Webpack |
| Стилі | SCSS + CSS Custom Properties |
| JS-архітектура | ES Modules, класи з приватними полями (`#`) |
| Форма | EmailJS |
| Хостинг | Vercel |

---

## ⚙️ Встановлення та запуск

### Кроки

```bash
# 1. Клонувати репозиторій
git clone https://github.com/your-username/portfolio.git

# 2. Перейти в папку проєкту
cd my-business-card

# 3. Встановити залежності
npm install

# 4. Запустити локальний сервер розробки
npm start

# 5. Відкрити в браузері
# http://localhost:8080
```

### Продакшн збірка

```bash
# Зібрати проєкт для деплою
npm run build
```

---

## 📁 Структура проєкту

```
src/
├── index.html
├── index.js              # Точка входу, DOMContentLoaded, ініціалізація модулів
├── data.js               # Дані: навички (SVG), послуги (UA/EN), EmailJS config
├── styles/
│   ├── style.scss        # Головний файл стилів
│   ├── _variables.scss   # CSS custom properties + SCSS змінні
│   ├── _header.scss      # Стилі хедера та бургер-меню
│   ├── _contact.scss     # Стилі форми контактів
│   └── _services.scss    # Стилі секції послуг
└── modules/
    ├── SkillsRenderer.js    # Клас рендерингу навичок
    └── ServicesRenderer.js  # Клас рендерингу послуг
```

---

## 📄 Секції сайту

- **Hero** — головний екран із заголовком та фото
- **Про мене** — короткий опис і підхід до роботи
- **Навички та технології** — прогрес-бари з рівнем навичок та SVG-іконками
- **Послуги** — SPA-сайти, сайти-візитки, front-end розробка, огляд портфоліо
- **Портфоліо** — проєкти з посиланнями
- **Контакти** — форма зворотного зв'язку + контактні дані

---

## 🌗 Функціональність

- ✅ Перемикання мови: **UA / EN**
- ✅ Темна / світла тема
- ✅ Адаптивний дизайн (mobile-first)
- ✅ Плавна навігація по секціях (scroll)
- ✅ Форма зворотного зв'язку (EmailJS)
- ✅ Анімація прогрес-барів навичок
- ✅ Бургер-меню для мобільних пристроїв
- ✅ SVG-іконки з підтримкою темної теми

---

## 🔄 Changelog

### v1.1.0 — Рефакторинг та нові фічі

**Тема (Theme)**
- Міграція з SCSS `$variables` (compile-time) на CSS Custom Properties (`var(--)`) для runtime-перемикання теми
- Світла тема визначена в `:root`, темна — в `[data-theme="dark"]` у `_variables.scss`
- Виправлено: тепер тема реально змінює кольори на льоту без перезавантаження

**i18n (UA/EN)**
- Реалізована архітектура перекладів через об'єкт `TRANSLATIONS` у `data.js`
- HTML-атрибути `data-i18n` та `data-i18n-placeholder` для авто-підстановки текстів
- Свідомо не перекладаються: "Front-end Developer", "Artem Hrishyn", контактні дані, назви технологій

**Дані та рендеринг**
- Дані послуг реструктуровані з плоского масиву в об'єкт `{ ua: [...], en: [...] }` для двомовного рендерингу
- Дані навичок (з імпортованими SVG) та послуг (з inline SVG) винесені в `data.js`
- Класи `SkillsRenderer` та `ServicesRenderer` використовують `DocumentFragment` для ефективного оновлення DOM
- Два `DOMContentLoaded`-слухачі об'єднані в один з чіткими коментарями по секціях

**SCSS-архітектура**
- Рефакторинг у партіали з єдиним `_variables.scss`, підключеним через `@use 'variables' as *`
- Окремі партіали: `style.scss`, `header.scss`, `contact.scss`, `services.scss`
- Замінено застарілу `darken()` на `color.adjust()` з `@use 'sass:color'`
- Уніфіковані брейкпоінти в `_variables.scss` (усунуто розбіжності між файлами)

**Хедер та навігація**
- Бургер-меню кнопка перенесена всередину `.__actions` для коректного вирівнювання праворуч
- Брейкпоінти: `$breakpoint-burger: 860px` для колапсу навігації, `400px` для приховування тексту логотипу

**Анімація навичок**
- Виправлено баг: всі бари показували 100% через зламані `@keyframes` з `width: inherit`
- Рішення: CSS `transition` + `requestAnimationFrame` для плавної анімації

**Зображення та іконки**
- Webpack `asset/resource` — зображення підключаються через JS `import` + програмне присвоєння `src`
- SVG-іконки навичок підтримують темну тему через CSS `filter: brightness(0) invert(1)` з SCSS-вкладенням `[data-theme="dark"] &`

**Загальні виправлення**
- Глобальний CSS reset `img { width: 100% }` замінено на `max-width: 100%` для коректної роботи `object-fit`

**Деплой**
- Сайт розгорнуто на [Vercel](https://vercel.com): [my-business-card-eta.vercel.app](https://my-business-card-eta.vercel.app/)

---

## 📬 Контакти

| Канал | Дані |
|---|---|
| 📞 Телефон | +380 93 647 0424 |
| ✈️ Telegram | [@gencerIT](https://t.me/gencerIT) |
| 📧 Email | gencer.it.1989@gmail.com |

---

## 📝 Ліцензія

© 2026 Artem Hrishyn. Всі права захищено.