/* main.js — 모듈 조립. 지도는 해당 스프레드가 펼쳐질 때 지연 초기화한다. */

(() => {
  const { config, chongqingSpots, createMapController, createBook, createIntro } = window.GoChina;

  const mapController = createMapController(chongqingSpots);

  const book = createBook({
    config,
    onSpreadShown: (spread) => {
      if (spread.querySelector("#chongqingMap")) {
        window.setTimeout(mapController.init, 150);
      }
    }
  });

  const intro = createIntro({
    config,
    skipIntro: book.startIndex > 0
  });

  book.bindEvents();
  book.setSpread(book.startIndex);
  intro.play();
})();
