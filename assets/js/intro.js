/* intro.js — 시작 화면(책 펼침) 재생/스킵. 첫 방문이고 해시 없이 들어왔을 때만 재생한다. */

window.GoChina = window.GoChina || {};

GoChina.createIntro = ({ config, skipIntro }) => {
  const intro = document.getElementById("intro");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let introSeen = false;
  try {
    introSeen = window.localStorage.getItem(config.introKey) === "1";
  } catch (error) { /* 시크릿 모드 등에서 localStorage 차단 시 무시 */ }

  const hide = () => {
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
    window.requestAnimationFrame(() => {
      window.setTimeout(() => intro.classList.add("is-playing"), 120);
    });
    window.setTimeout(hide, config.introHoldMs);
  };

  document.getElementById("skipIntro").addEventListener("click", hide);
  intro.addEventListener("click", hide);

  return { play, hide };
};
