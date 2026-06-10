/* config.js — 책 구성과 여행 데이터. 페이지/지점 추가는 여기서 시작한다. */

window.GoChina = window.GoChina || {};

GoChina.config = {
  // 스프레드 순서와 1:1 대응. 새 스프레드를 추가하면 slugs/titles에 같이 추가한다.
  slugs: ["index", "entry", "payment", "packing", "videos", "map", "emergency"],
  titles: ["목차", "입국과 세관", "결제와 네트워크", "필수 준비물", "충칭 영상", "충칭 지도와 조사 노트", "비상 연락과 출처"],
  turnDuration: 980,
  introHoldMs: 3400,
  introKey: "gc-intro-seen"
};

GoChina.chongqingSpots = [
  { name: "홍야동", en: "Hongyadong", cn: "洪崖洞", lat: 29.5650738, lng: 106.5753425, note: "야경과 강변 동선의 기준점" },
  { name: "해방비", en: "Jiefangbei", cn: "解放碑", lat: 29.5601096, lng: 106.5733569, note: "중심 상권과 만남 지점" },
  { name: "장강삭도 북역", en: "Yangtze Cableway North", cn: "长江索道北站", lat: 29.5605806, lng: 106.5791173, note: "삭도 탑승 북측 역" },
  { name: "리쯔바역", en: "Liziba Station", cn: "李子坝", lat: 29.5556616, lng: 106.5339223, note: "건물 관통 모노레일 촬영 포인트" },
  { name: "십팔제", en: "Shibati", cn: "十八梯", lat: 29.5537658, lng: 106.5696236, note: "계단과 골목 동선" },
  { name: "백상거", en: "Baixiangju", cn: "白象居", lat: 29.5585282, lng: 106.5813482, note: "입체 도시 촬영 포인트" },
  { name: "용문호 옛거리", en: "Longmenhao Old Street", cn: "龙门浩老街", lat: 29.5588249, lng: 106.5912051, note: "남안구 강변 옛거리" }
];
