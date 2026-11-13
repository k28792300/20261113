const museum = "https://www.museum.go.kr/MUSEUM/contents/";
const collection = (id) => `${museum}M0502000000.do?relicId=${id}&schM=view&searchId=search`;
const artworkImage = (file, label, alt, x, y, zoom = 2.5) => ({
  src: `./assets/${file}.webp`, label, alt, x, y, zoom,
});

const chapters = [
  { name: "일상에서 만난 아이", theme: "blue" },
  { name: "아이에게 건넨 소망", theme: "peach" },
  { name: "무늬와 조각이 된 아이", theme: "green" },
];

const works = [
  {
    id: "seodang", chapter: 0, title: "서당", meta: "김홍도 · 조선 · 《단원풍속도첩》",
    source: collection(552), accession: "본관 6504-23",
    images: [artworkImage("seodang", "그림 전체", "훌쩍이는 학동과 둘러앉은 아이들, 훈장이 그려진 서당.", .39, .42, 2.4)],
    clue: "아이들의 표정", hint: "가운데 고개를 숙인 아이와 그 옆에 앉은 친구들의 얼굴을 살펴보세요.",
    observation: "고개를 숙인 학동(서당에서 글을 배우는 아이)과 주변 학동의 표정, 시선, 몸짓을 비교해 보세요.",
    question: "학동 한 명을 골라 어떤 감정으로 보이는지 설명해 보세요. 그림에서 그렇게 생각한 근거는 무엇인가요?",
    story: "김홍도는 고개를 숙인 학동과 이를 지켜보는 친구들을 한 장면에 담았습니다. 인물들의 시선이 학동에게 모여 보는 사람도 그 아이를 주목하게 됩니다. 그림 속 표정은 감정을 짐작할 단서이고, 사건의 앞뒤는 여러 가지로 해석할 수 있습니다.",
  },
  {
    id: "ssireum", chapter: 0, title: "씨름", meta: "김홍도 · 조선 · 《단원풍속도첩》",
    source: collection(551), accession: "본관 6504-22",
    images: [artworkImage("ssireum", "그림 전체", "두 씨름꾼을 둘러싼 구경꾼들. 그림 왼쪽에는 엿을 파는 아이가 있어요.", .20, .54)],
    clue: "그림 왼쪽 가장자리", hint: "두 씨름꾼에게서 눈을 떼고 그림 왼쪽 가장자리를 보세요.",
    observation: "화면 중앙의 씨름꾼과 왼쪽 가장자리의 아이를 비교해 보세요. 각각 무엇을 하고 있고, 몸은 어느 쪽을 향하나요?",
    question: "이 장면에서 엿을 파는 아이를 빼면 조선 시대 어린이의 생활에 관해 어떤 단서를 놓치게 될까요?",
    story: "김홍도는 씨름 경기를 화면 중앙에, 엿을 파는 아이를 왼쪽에 배치했습니다. 경기와 구경에 시선이 모이는 동안 한쪽에서는 장사가 이루어집니다. 어린이가 일에 참여하던 모습을 그림의 가장자리에서 발견할 수 있습니다.",
  },
  {
    id: "first-birthday", chapter: 1, title: "첫돌을 맞다", meta: "조선 · 《모당 홍이상공의 일생》 중 돌잔치",
    source: collection(1442), accession: "덕수 5768",
    images: [artworkImage("first-birthday", "돌잔치 그림", "기와집 안에서 가족이 아기의 첫돌을 축하하는 그림.", .77, .53, 4)],
    detail: artworkImage("first-birthday-detail", "돌상 가까이 보기", "기와집 안에 차린 둥근 돌상에 가족이 모여 있어요.", .57, .47, 2),
    clue: "아기의 손과 돌상", hint: "사람들이 모여 있는 방을 살펴보세요. 둥근 돌상 앞에 아기가 있어요.",
    observation: "돌상 앞 아기가 손에 쥔 물건과 주변 사람들의 시선을 살펴보세요. 그림은 어디에 시선을 모으나요?",
    question: "돌상에서 책을 고르는 장면을 그림에 남긴 사람은 아이의 어떤 미래를 기대했을까요?",
    story: "평생도는 한 사람의 일생에서 기념할 만한 순간을 모아 그린 그림입니다. 첫돌 장면에서 아기가 집은 책은 학업에 대한 기대를 보여줍니다. 아기를 둘러싼 사람들의 모습과 돌상 위 물건을 함께 보면, 첫돌이 아이의 미래를 바라는 자리이기도 했음을 알 수 있습니다.",
    reference: "https://www.museum.go.kr/uploadfile/other/idealLife/web-ko/painting_watch.html",
  },
  {
    id: "baekdong", chapter: 1, title: "백동자도 병풍", meta: "작가 미상 · 조선 · 비단에 그린 그림",
    source: collection(5977), accession: "구 4251",
    overview: artworkImage("baekdong-overview", "여덟 폭 전체", "백동자도 병풍의 여덟 폭. 정원과 집 사이에서 여러 아이가 놀고 있어요.", .5, .5),
    images: Array.from({ length: 8 }, (_, index) => artworkImage(
      `baekdong-${index + 1}`, `${index + 1}번째 폭`,
      `백동자도 병풍의 ${index + 1}번째 폭. 아이들이 함께 노는 모습이 그려져 있어요.`, .50, .62, 3,
    )),
    clue: "아이들의 놀이", hint: "병풍 그림을 골라 손과 발의 움직임, 아이들이 들고 있는 물건을 살펴보세요.",
    observation: "병풍의 두 폭을 골라 아이들이 모인 장소와 몸짓을 비교해 보세요. 여러 폭에 걸쳐 반복되는 모습은 무엇인가요?",
    question: "혼례에 이 병풍을 펼친다면, 여러 아이가 함께 노는 장면은 어떤 바람을 전했을까요?",
    story: "백동자도는 여러 아이가 노는 모습을 통해 자손이 많아지고 집안이 풍요롭기를 바라는 뜻을 담은 그림입니다. 이런 병풍은 조선 왕실의 혼례와 잔치에도 쓰였습니다. 그림을 펼친 자리까지 생각하면 놀이 장면이 축복의 뜻을 전하는 방식이었음을 이해할 수 있습니다.",
    reference: "https://www.gogung.go.kr/gogung/bbs/BMSR00002/view.do?boardId=6664&gubunCd=&menuNo=800040&nextBoardId=&pageIndex=1&preBoardId=",
  },
  {
    id: "celadon", chapter: 2, title: "포도·동자무늬 청자 주전자", meta: "고려 · 청자 · 주전자와 받침",
    cardTitle: "포도·동자…",
    source: collection(957), accession: "덕수 19",
    rotation: {
      source: "https://www.museum.go.kr/uploadfile/relic3D/duk000019/duk000019.html",
      folder: "./assets/celadon-360",
      columns: 18, rows: 5, startColumn: 9, startRow: 1,
    },
    images: [
      artworkImage("celadon-1", "주전자와 받침", "연녹색 청자 주전자와 받침. 주전자 몸통에는 포도 덩굴과 아이 무늬가 있어요.", .50, .59, 3),
      artworkImage("celadon-2", "다른 각도", "다른 각도에서 본 주전자. 몸통에 포도송이와 아이들의 모습이 보여요.", .48, .59, 3),
    ],
    clue: "포도 덩굴과 아이", hint: "주전자 몸통에서 포도 줄기를 붙잡은 작은 손을 찾아보세요.",
    observation: "주전자를 돌려 보며 포도송이와 아이들의 모습이 몸통을 따라 어떻게 이어지는지 살펴보세요.",
    question: "청자 주전자와 백동자도 병풍은 서로 다른 물건입니다. 두 작품에서 아이가 풍요의 상징으로 표현된 방식은 어떻게 다른가요?",
    story: "고려의 장인은 포도 덩굴과 아이를 상감 기법으로 표현했습니다. 상감은 표면에 무늬를 파고 다른 색의 재료를 채워 넣는 기법입니다. 국립중앙박물관은 많은 열매가 달린 포도와 아이를 함께 그린 무늬에 자손이 많아지기를 바라는 뜻이 담겼다고 해석합니다.",
    reference: "https://vcm.museum.go.kr/MUSEUM/contents/M0202030000.do?exhiSpThemId=1208340&listType=list&menuId=past&schM=view",
  },
  {
    id: "dongja", chapter: 2, title: "동자상", meta: "조선 · 나무로 만든 불교 조각",
    source: collection(1460), accession: "덕수 5973",
    model: "./assets/dongja-reconstruction.glb",
    rotation: {
      source: "https://www.museum.go.kr/relic3D/3D_V2/PS01001001005/005973/viewer.html",
      folder: "./assets/dongja-360",
      columns: 9, rows: 5, startColumn: 0, startRow: 3,
      rowDirection: -1,
    },
    images: [artworkImage("dongja", "조각 전체", "고개를 살짝 돌리고 두 손으로 새를 든 나무 동자상.", .51, .35)],
    clue: "고개와 손", hint: "조각의 얼굴을 보고, 두 손 사이에 무엇이 있는지 살펴보세요.",
    observation: "동자상을 정면과 옆면에서 보세요. 고개가 향한 방향, 손에 든 물건, 옷자락의 형태가 각도에 따라 어떻게 보이나요?",
    question: "청자 속 아이와 동자상의 자세를 비교해 보세요. 주전자 무늬와 사찰 조각이라는 용도의 차이가 어린이의 표현에 어떻게 드러나나요?",
    story: "조선 시대 사찰에 둔 목조 동자상입니다. 불교에서 동자는 부처나 보살을 가까이에서 돕는 어린 모습의 존재로 등장합니다. 이 조각은 고개를 돌리고 새를 든 자세를 담고 있습니다. 몸을 둘러싼 옷자락은 옆에서 볼 때 더 뚜렷하게 드러납니다.",
  },
];
