# Go China Trip Checklist

Shared checklist for the July 2026 Seoul, Chengdu, and Chongqing trip.

GitHub Pages URL after publishing:

https://jjunsss.github.io/Go_China/

## 구조

```
index.html              마크업만 (스프레드 = 펼침면 단위의 <article class="spread">)
assets/
  css/
    base.css            폰트, 디자인 토큰(:root 변수), 리셋, 전역 배경
    intro.css           시작 화면(책 펼침 애니메이션)
    layout.css          헤더, 탭, 진행 표시, 푸터
    book.css            책 본체, 종이 질감, 낱장 페이지 턴 3D 애니메이션
    components.css      페이지 내부 콘텐츠 컴포넌트(목차, 티켓, 노트, 체크리스트, 영상, 지도, 출처)
    responsive.css      반응형(모바일 전환 애니메이션 포함), prefers-reduced-motion
  js/
    config.js           책 구성(slugs/titles)과 여행 데이터(충칭 지점 좌표)
    map.js              Leaflet 지도 컨트롤러 (지연 초기화)
    book.js             스프레드 내비게이션, 페이지 턴, 탭/키보드/스와이프/해시
    intro.js            시작 화면 재생/스킵
    main.js             모듈 조립(엔트리 포인트)
```

ES module 대신 `window.GoChina` 네임스페이스를 쓰는 클래식 스크립트라
GitHub Pages뿐 아니라 로컬에서 `index.html`을 더블클릭해도 그대로 동작한다.

## 페이지(스프레드) 추가하는 법

1. `index.html`의 `<div class="book">` 안에 `<article class="spread" data-title="..." hidden>` 블록 추가
   (왼쪽/오른쪽 페이지는 `<section class="page left">` / `<section class="page right">`)
2. `assets/js/config.js`의 `slugs`, `titles` 배열에 같은 순서로 항목 추가
3. `index.html`의 `.page-tabs`에 탭 버튼(`data-spread="N"`) 추가
4. 목차 페이지의 `.index-list`에 점프 버튼(`data-jump="N"`) 추가 (선택)

지도 지점 추가는 `config.js`의 `chongqingSpots` 배열만 수정하면 된다.
