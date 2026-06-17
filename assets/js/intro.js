/* intro.js — 시작 화면(책 펼침) 재생/스킵. 첫 방문이고 해시 없이 들어왔을 때만 재생한다. */

window.GoChina = window.GoChina || {};

GoChina.createIntro = ({ config, skipIntro }) => {
  const intro = document.getElementById("intro");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const skipButton = document.getElementById("skipIntro");
  let playFrame = 0;
  let playTimer = 0;
  let hideTimer = 0;
  let hidden = false;

  let introSeen = false;
  try {
    introSeen = window.localStorage.getItem(config.introKey) === "1";
  } catch (error) { /* 시크릿 모드 등에서 localStorage 차단 시 무시 */ }

  const hide = () => {
    if (hidden) return;
    hidden = true;
    window.cancelAnimationFrame(playFrame);
    window.clearTimeout(playTimer);
    window.clearTimeout(hideTimer);
    intro.classList.add("is-done");
    try {
      window.localStorage.setItem(config.introKey, "1");
    } catch (error) { /* 무시 */ }
  };

  const play = () => {
    if (introSeen || skipIntro || reduceMotion.matches) {
      hide();
      return;
    }
    playFrame = window.requestAnimationFrame(() => {
      playTimer = window.setTimeout(() => {
        if (!hidden) intro.classList.add("is-playing");
      }, 120);
    });
    hideTimer = window.setTimeout(hide, config.introHoldMs);
  };

  if (skipButton) {
    skipButton.addEventListener("click", (event) => {
      event.stopPropagation();
      hide();
    }, { once: true });
  }
  intro.addEventListener("click", hide, { once: true });

  return { play, hide };
};
