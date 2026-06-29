/* config.js — 책 구성과 여행 데이터. 페이지/지점 추가는 여기서 시작한다. */

window.GoChina = window.GoChina || {};

GoChina.config = {
  // 스프레드 순서와 1:1 대응. 새 스프레드를 추가하면 slugs/titles에 같이 추가한다.
  slugs: ["index", "entry", "payment", "downloads", "packing", "chengdu", "chongqing", "night", "activity", "photo", "market", "local", "lodging", "lodging-more", "food", "videos", "map", "emergency"],
  titles: ["목차", "입국과 세관", "결제와 네트워크", "출국 전 다운로드", "필수 준비물", "청두 어디 갈지", "충칭 어디 갈지", "충칭 야경과 전망", "액티비티와 마천루", "사진 찍기 좋은 곳", "야시장과 시장", "로컬 숨은 장소", "야경 숙소 후보", "숙소 추가 후보", "충칭 대표음식", "충칭 영상", "충칭 3D 지도와 도시 노트", "비상 연락과 출처"],
  turnDuration: 1260,
  introHoldMs: 3600,
  introKey: "gc-intro-seen"
};

GoChina.chongqingSpots = [
  { name: "홍야동", en: "Hongyadong", cn: "洪崖洞", lat: 29.5650738, lng: 106.5753425, note: "11층 절벽형 야경과 강변 동선" },
  { name: "해방비", en: "Jiefangbei", cn: "解放碑", lat: 29.5601096, lng: 106.5733569, note: "중심 상권과 만남 지점" },
  { name: "장강삭도 신화루 쪽", en: "Yangtze Cableway", cn: "长江索道 / 新华路", lat: 29.5605806, lng: 106.5791173, note: "신화루-상신가를 잇는 강 위 이동" },
  { name: "리쯔바역", en: "Liziba Station", cn: "李子坝", lat: 29.5556616, lng: 106.5339223, note: "2호선 열차 관통 전망대" },
  { name: "십팔제", en: "Shibati", cn: "十八梯", lat: 29.5537658, lng: 106.5696236, note: "위·아래 도시를 잇던 계단 거리" },
  { name: "백상거", en: "Baixiangju", cn: "白象居", lat: 29.5585282, lng: 106.5813482, note: "주거단지와 삭도 촬영 포인트" },
  { name: "룽먼하오 옛거리", en: "Longmenhao Old Street", cn: "龙门浩老街", lat: 29.5588249, lng: 106.5912051, note: "남안구 언덕형 역사 거리" },
  { name: "쿠이싱러우", en: "Kuixing Building", cn: "魁星楼", lat: 29.560258, lng: 106.573618, note: "1층과 22층 감각이 겹치는 포인트" },
  { name: "대한민국 임시정부 구지 진열관", en: "Korean Provisional Government Site", cn: "韩国临时政府旧址陈列馆", lat: 29.555944, lng: 106.569389, note: "충칭 시기 임시정부 청사" },
  { name: "츠치커우 고진", en: "Ciqikou Ancient Town", cn: "磁器口古镇", lat: 29.581204, lng: 106.456939, note: "옛 거리, 간식, 기념품 동선" },
  { name: "남산일과수 전망대", en: "Nanshan One Tree", cn: "南山一棵树", lat: 29.54258, lng: 106.58986, note: "유중반도와 두 강 야경 조망" },
  { name: "차오톈먼 부두", en: "Chaotianmen Wharf", cn: "朝天门码头", lat: 29.562987, lng: 106.588103, note: "양강 야간 유람선 승선 후보" },
  { name: "래플스시티 탐색창", en: "Raffles City Exploration Deck", cn: "来福士 探索舱", lat: 29.563165, lng: 106.587222, note: "수평 마천루와 250m 전망/스카이워크" },
  { name: "WFC 회선루 전망대", en: "WFC Skyview", cn: "会仙楼观景台", lat: 29.561057, lng: 106.574329, note: "해방비 고층 360도 전망" },
  { name: "자오창커우 야시장", en: "Jiaochangkou Night Market", cn: "较场口夜市", lat: 29.55688, lng: 106.56672, note: "스낵, 바비큐, 디저트 야시장" },
  { name: "바이이루 하오츠제", en: "Bayi Road Food Street", cn: "八一路好吃街", lat: 29.55883, lng: 106.57445, note: "해방비 옆 대표 간식 거리" },
  { name: "관인차오 보행가", en: "Guanyinqiao Pedestrian Street", cn: "观音桥步行街", lat: 29.582789, lng: 106.532109, note: "상권, 쇼핑, 하오츠제, 야간 산책" },
  { name: "산성샹", en: "Shancheng Alley", cn: "山城巷", lat: 29.552845, lng: 106.565222, note: "중흥로-통원먼을 잇는 1.5km 언덕길" },
  { name: "샤하오리 노가", en: "Xiahaoli Old Street", cn: "下浩里老街", lat: 29.5577, lng: 106.5892, note: "룽먼하오와 이어지는 남안구 조용한 옛 거리" },
  { name: "어링공원", en: "Eling Park", cn: "鹅岭公园", lat: 29.552344, lng: 106.532017, note: "양강정에서 두 강과 구도심 조망" },
  { name: "황줴핑 그래피티 거리", en: "Huangjueping Graffiti Street", cn: "黄桷坪涂鸦街", lat: 29.5019, lng: 106.5369, note: "쓰촨미술학원 주변 거리 예술" },
  { name: "교통차관", en: "Jiaotong Teahouse", cn: "交通茶馆", lat: 29.5055, lng: 106.5381, note: "황줴핑의 오래된 로컬 찻집" },
  { name: "베이창 문창거리", en: "Beicang Cultural Creative Street", cn: "北仓文创街区", lat: 29.5836, lng: 106.5372, note: "관인차오 뒤 창고 개조 카페·전시 거리" },
  { name: "비파산공원", en: "Pipa Mountain Park", cn: "枇杷山公园", lat: 29.556904, lng: 106.553572, note: "홍성정에서 보는 조용한 구도심 전망" },
  { name: "통원먼 성벽공원", en: "Tongyuan Gate Park", cn: "通远门城墙遗址公园", lat: 29.55806, lng: 106.56333, note: "구 충칭 성문과 성벽 흔적" }
];
