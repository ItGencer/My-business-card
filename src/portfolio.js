import { PORTFOLIO } from "./portfolio-data.js";

let activePortfolioLanguage = "ua";
let isPortfolioRendered = false;

// Portfolio helpers: localized CTA copy and animated card rendering.
// Хелпери портфоліо: локалізований CTA-текст і рендер анімованих карток.
function getPortfolioVisitCopy(languageCode = activePortfolioLanguage, siteName = "site") {
  const isEnglish = languageCode === "en";
  const safeSiteName = siteName || (isEnglish ? "site" : "сайт");

  return {
    text: isEnglish ? "Open site" : "Відкрити сайт",
    aria: isEnglish
      ? `Open ${safeSiteName} in a new tab`
      : `Відкрити ${safeSiteName} у новій вкладці`,
    preview: isEnglish
      ? `Scroll preview of ${safeSiteName}`
      : `Прокрутити прев'ю ${safeSiteName}`,
  };
}

export function updatePortfolioVisitLabels(languageCode = activePortfolioLanguage) {
  activePortfolioLanguage = languageCode;

  document.querySelectorAll(".portfolio-card__visit").forEach((visitLink) => {
    const cardName =
      visitLink.closest(".portfolio-card")?.querySelector(".portfolio-card__name")
        ?.textContent || "site";
    const visitCopy = getPortfolioVisitCopy(languageCode, cardName.trim());
    const visitTextElement = visitLink.querySelector(".portfolio-card__visit-text");

    if (visitTextElement) visitTextElement.textContent = visitCopy.text;
    visitLink.setAttribute("aria-label", visitCopy.aria);
  });
}

class PortfolioRenderer {
  #container;
  #portfolioItems = [];

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  load(portfolioItems) {
    this.#portfolioItems = portfolioItems;
    return this;
  }

  render(languageCode = activePortfolioLanguage) {
    if (!this.#container) {
      console.warn("PortfolioRenderer: container not found");
      return false;
    }

    this.#container.innerHTML = "";

    const createMarqueeGroup = () => {
      const marqueeGroup = document.createElement("div");
      marqueeGroup.className = "portfolio__marquee-group";

      for (const portfolioItem of this.#portfolioItems) {
        const cardElement = document.createElement("div");
        cardElement.className = "portfolio-card";
        const visitCopy = getPortfolioVisitCopy(languageCode, portfolioItem.name);

        if (portfolioItem.embeddable) {
          cardElement.innerHTML = `
            <div class="portfolio-card__frame-wrap" data-preview-scroll tabindex="0"
              aria-label="${visitCopy.preview}">
              <div class="portfolio-card__frame-canvas">
                <iframe data-src="${portfolioItem.url}" loading="lazy"
                  title="${portfolioItem.name} preview"
                  sandbox="allow-scripts allow-same-origin"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div class="portfolio-card__shield"></div>
            </div>
          `;
        } else {
          cardElement.innerHTML = `
            <div class="portfolio-card__fallback">
              <span>${portfolioItem.name}</span>
            </div>
          `;
        }

        cardElement.innerHTML += `
          <div class="portfolio-card__caption">
            <span class="portfolio-card__name">${portfolioItem.name}</span>
            <a class="portfolio-card__visit" href="${portfolioItem.url}" target="_blank"
              rel="noopener" aria-label="${visitCopy.aria}">
              <span class="portfolio-card__visit-text">${visitCopy.text}</span>
              <span class="portfolio-card__visit-icon" aria-hidden="true">↗</span>
            </a>
          </div>
        `;

        marqueeGroup.appendChild(cardElement);
      }

      return marqueeGroup;
    };

    this.#container.append(createMarqueeGroup(), createMarqueeGroup());
    return true;
  }
}

// Lets users scroll the iframe preview vertically without interacting with the embedded site.
// Дозволяє вертикально прокручувати iframe-прев'ю без взаємодії з вбудованим сайтом.
function initPortfolioPreviewScrolling(container) {
  const previewFrames = Array.from(container.querySelectorAll("[data-preview-scroll]"));

  previewFrames.forEach((previewFrame) => {
    const previewIframe = previewFrame.querySelector("iframe");
    if (!previewIframe) return;

    let previewScrollOffset = 0;
    let pointerStartY = 0;
    let pointerStartX = 0;
    let pointerStartOffset = 0;
    let isDragging = false;

    const readCssNumber = (customPropertyName, fallbackValue) => {
      const cssValue = parseFloat(
        getComputedStyle(previewFrame).getPropertyValue(customPropertyName),
      );
      return Number.isFinite(cssValue) ? cssValue : fallbackValue;
    };

    const getPreviewScale = () => readCssNumber("--preview-scale", 0.3);
    const getPreviewHeight = () => readCssNumber("--preview-height", 2400);
    const getMaxOffset = () =>
      Math.max(0, getPreviewHeight() - previewFrame.clientHeight / getPreviewScale());

    const setPreviewScrollOffset = (nextOffset) => {
      const maxOffset = getMaxOffset();
      previewScrollOffset = Math.min(Math.max(nextOffset, 0), maxOffset);
      previewIframe.style.setProperty(
        "--preview-offset",
        `${-previewScrollOffset}px`,
      );
      previewFrame.classList.toggle(
        "is-preview-scrolled",
        previewScrollOffset > 8,
      );
    };

    const scrollPreviewByDelta = (scrollDelta) => {
      setPreviewScrollOffset(previewScrollOffset + scrollDelta / getPreviewScale());
    };

    previewFrame.addEventListener(
      "wheel",
      (event) => {
        if (!event.deltaY) return;

        event.preventDefault();
        event.stopPropagation();
        scrollPreviewByDelta(event.deltaY);
      },
      { passive: false },
    );

    previewFrame.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;

      isDragging = true;
      pointerStartY = event.clientY;
      pointerStartX = event.clientX;
      pointerStartOffset = previewScrollOffset;
      previewFrame.setPointerCapture?.(event.pointerId);
    });

    previewFrame.addEventListener("pointermove", (event) => {
      if (!isDragging) return;

      const pointerDeltaY = pointerStartY - event.clientY;
      const pointerDeltaX = pointerStartX - event.clientX;
      if (Math.abs(pointerDeltaY) <= Math.abs(pointerDeltaX)) return;

      event.preventDefault();
      event.stopPropagation();
      setPreviewScrollOffset(pointerStartOffset + pointerDeltaY / getPreviewScale());
    });

    ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
      previewFrame.addEventListener(eventName, () => {
        isDragging = false;
      });
    });

    previewFrame.addEventListener("keydown", (event) => {
      const keyboardScrollDeltas = {
        ArrowDown: 120,
        PageDown: 420,
        ArrowUp: -120,
        PageUp: -420,
        Home: -Infinity,
        End: Infinity,
      };

      if (!(event.key in keyboardScrollDeltas)) return;

      event.preventDefault();
      const keyboardScrollDelta = keyboardScrollDeltas[event.key];
      if (keyboardScrollDelta === Infinity) {
        setPreviewScrollOffset(getMaxOffset());
      } else if (keyboardScrollDelta === -Infinity) {
        setPreviewScrollOffset(0);
      } else {
        scrollPreviewByDelta(keyboardScrollDelta);
      }
    });

    window.addEventListener(
      "resize",
      () => setPreviewScrollOffset(previewScrollOffset),
      { passive: true },
    );
  });
}

// Loads iframe previews near the portfolio viewport to keep first page load light.
// Завантажує iframe-прев'ю біля viewport портфоліо, щоб перше завантаження було легшим.
function initPortfolioPreviewLazyLoading(container) {
  const previewFrames = Array.from(container.querySelectorAll("[data-preview-scroll]"));

  const loadPreviewFrame = (previewFrame) => {
    const previewIframe = previewFrame.querySelector("iframe[data-src]");
    if (!previewIframe) return;

    previewFrame.classList.add("is-preview-loading");
    previewIframe.src = previewIframe.dataset.src;
    previewIframe.removeAttribute("data-src");
    previewIframe.addEventListener(
      "load",
      () => {
        previewFrame.classList.add("is-preview-loaded");
        previewFrame.classList.remove("is-preview-loading");
      },
      { once: true },
    );
  };

  if ("IntersectionObserver" in window) {
    const previewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadPreviewFrame(entry.target);
          previewObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "420px 0px" },
    );

    previewFrames.forEach((previewFrame) => previewObserver.observe(previewFrame));
  } else {
    previewFrames.slice(0, PORTFOLIO.length).forEach(loadPreviewFrame);
  }

  previewFrames.forEach((previewFrame) => {
    previewFrame.addEventListener("pointerenter", () => loadPreviewFrame(previewFrame), {
      once: true,
    });
    previewFrame.addEventListener("focusin", () => loadPreviewFrame(previewFrame), {
      once: true,
    });
  });
}

export function initPortfolioMarquee({ languageCode = activePortfolioLanguage } = {}) {
  activePortfolioLanguage = languageCode;

  const portfolioTrack = document.getElementById("portfolioTrack");
  if (!portfolioTrack) return;

  if (isPortfolioRendered) {
    updatePortfolioVisitLabels(languageCode);
    return;
  }

  const didRender = new PortfolioRenderer("#portfolioTrack")
    .load(PORTFOLIO)
    .render(languageCode);

  if (!didRender) return;

  initPortfolioPreviewLazyLoading(portfolioTrack);
  initPortfolioPreviewScrolling(portfolioTrack);
  isPortfolioRendered = true;
}
