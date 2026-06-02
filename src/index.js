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