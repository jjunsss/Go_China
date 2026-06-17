/* book.js — 책 내비게이션: 스프레드 전환, 낱장 페이지 턴, 탭/키보드/스와이프/해시 */

window.GoChina = window.GoChina || {};

GoChina.createBook = ({ config, onSpreadShown, onSpreadSettled }) => {
  const spreads = [...document.querySelectorAll(".spread")];
  const tabs = [...document.querySelectorAll(".tab")];
  const tabsContainer = document.querySelector(".page-tabs");
  const book = document.getElementById("book");
  const progressLabel = document.getElementById("progressLabel");
  const progressFill = document.getElementById("progressFill");
  const backToIndex = document.getElementById("backToIndex");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const { slugs, titles, turnDuration } = config;
  let current = 0;
  let turning = false;
  let pendingTarget = null;

  // 마크업의 hidden 속성은 JS 미동작 대비용. 이후에는 클래스(visibility/display)로 제어한다.
  spreads.forEach((spread) => spread.removeAttribute("hidden"));

  const revealActiveTab = () => {
    const tab = tabs[current];
    if (!tab || !tabsContainer) return;
    const target = tab.offsetLeft - (tabsContainer.clientWidth - tab.offsetWidth) / 2;
    tabsContainer.scrollTo({ left: Math.max(0, target), behavior: reduceMotion.matches ? "auto" : "smooth" });
  };

  const setNavBusy = (busy) => {
    tabs.forEach((tab) => tab.setAttribute("aria-disabled", busy ? "true" : "false"));
    if (backToIndex) backToIndex.setAttribute("aria-disabled", busy ? "true" : "false");
  };

  const readTimeMs = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    return trimmed.endsWith("ms") ? parseFloat(trimmed) : parseFloat(trimmed) * 1000;
  };

  const longestAnimationMs = (spread) => {
    const elements = [spread, ...spread.querySelectorAll(".page")];
    const durations = elements.flatMap((element) => {
      const styles = window.getComputedStyle(element);
      const animationDurations = styles.animationDuration.split(",").map(readTimeMs);
      const animationDelays = styles.animationDelay.split(",").map(readTimeMs);
      return animationDurations.map((duration, index) => duration + (animationDelays[index] || 0));
    });
    return Math.max(turnDuration, ...durations, 0);
  };

  const updateChrome = () => {
    tabs.forEach((tab, tabIndex) => {
      tab.setAttribute("aria-current", tabIndex === current ? "true" : "false");
    });
    revealActiveTab();
    if (progressLabel) progressLabel.textContent = `${current + 1} / ${spreads.length} · ${titles[current]}`;
    if (progressFill) progressFill.style.width = `${((current + 1) / spreads.length) * 100}%`;
    if (window.history.replaceState) {
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", current === 0 ? cleanUrl : `#${slugs[current]}`);
    }
    document.title = current === 0 ? "Go China 2026 Travel Book" : `${titles[current]} — Go China 2026`;
  };

  const scrollBookIntoView = () => {
    const top = book.getBoundingClientRect().top;
    if (top < -8) {
      window.scrollTo({
        top: window.scrollY + top - 72,
        behavior: reduceMotion.matches ? "auto" : "smooth"
      });
    }
  };

  const setSpread = (index) => {
    current = Math.max(0, Math.min(index, spreads.length - 1));
    spreads.forEach((spread, spreadIndex) => {
      const active = spreadIndex === current;
      spread.classList.toggle("is-active", active);
      spread.setAttribute("aria-hidden", active ? "false" : "true");
    });
    updateChrome();
    if (onSpreadShown) onSpreadShown(spreads[current]);
    if (onSpreadSettled) onSpreadSettled(spreads[current]);
  };

  const showSpread = (index, animate = true) => {
    const target = Math.max(0, Math.min(index, spreads.length - 1));
    if (turning) {
      if (target !== current) pendingTarget = target;
      return;
    }
    if (target === current) return;

    if (!animate || reduceMotion.matches) {
      setSpread(target);
      return;
    }

    turning = true;
    const direction = target > current ? "next" : "prev";
    const outSpread = spreads[current];
    const inSpread = spreads[target];

    book.classList.add(`is-turning-${direction}`);
    outSpread.classList.add(`turn-out-${direction}`);
    inSpread.classList.add("is-active", `turn-in-${direction}`);
    inSpread.setAttribute("aria-hidden", "false");
    scrollBookIntoView();

    current = target;
    updateChrome();
    if (onSpreadShown) onSpreadShown(inSpread);

    setNavBusy(true);

    let settled = false;
    let fallbackTimer = 0;
    const settle = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallbackTimer);
      inSpread.removeEventListener("animationend", handleAnimationEnd);
      outSpread.classList.remove(`turn-out-${direction}`, "is-active");
      outSpread.setAttribute("aria-hidden", "true");
      inSpread.classList.remove(`turn-in-${direction}`);
      book.classList.remove("is-turning-next", "is-turning-prev");
      turning = false;
      setNavBusy(false);
      if (onSpreadSettled) onSpreadSettled(inSpread);

      const nextTarget = pendingTarget;
      pendingTarget = null;
      if (nextTarget !== null && nextTarget !== current) {
        showSpread(nextTarget);
      }
    };

    const finishAnimations = new Set([
      `leafBack${direction === "next" ? "Next" : "Prev"}`,
      `reveal${direction === "next" ? "Next" : "Prev"}`,
      "spreadInM"
    ]);
    const handleAnimationEnd = (event) => {
      if (finishAnimations.has(event.animationName)) settle();
    };

    inSpread.addEventListener("animationend", handleAnimationEnd);
    fallbackTimer = window.setTimeout(settle, longestAnimationMs(inSpread) + 140);
  };

  const bindEvents = () => {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => showSpread(Number(tab.dataset.spread)));
    });

    document.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => showSpread(Number(button.dataset.jump)));
    });

    if (backToIndex) backToIndex.addEventListener("click", () => showSpread(0));

    document.addEventListener("keydown", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const interactiveTarget = target && target.closest("input, textarea, select, [contenteditable='true'], button, a, iframe, .map-wrap");
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || interactiveTarget) return;
      if (event.key === "ArrowLeft") showSpread(current - 1);
      if (event.key === "ArrowRight") showSpread(current + 1);
    });

    window.addEventListener("hashchange", () => {
      const idx = slugs.indexOf(window.location.hash.replace("#", ""));
      if (idx >= 0 && idx !== current) showSpread(idx);
    });

    let touchX = 0;
    let touchY = 0;
    let touchValid = false;
    book.addEventListener("touchstart", (event) => {
      touchValid = event.touches.length === 1 && !event.target.closest(".map-wrap, iframe, a");
      if (!touchValid) return;
      touchX = event.touches[0].clientX;
      touchY = event.touches[0].clientY;
    }, { passive: true });
    book.addEventListener("touchend", (event) => {
      if (!touchValid) return;
      const dx = event.changedTouches[0].clientX - touchX;
      const dy = event.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        showSpread(current + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
  };

  const startIndex = Math.max(0, slugs.indexOf((window.location.hash || "").replace("#", "")));

  return { setSpread, showSpread, bindEvents, startIndex };
};
