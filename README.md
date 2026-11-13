# 옛사람들의 눈에 비친 아이들

고려와 조선의 작품 여섯 점을 살펴보는 만 14세 이상 청소년 대상 웹전시입니다. 중학생 관람객이 작품의 표정, 몸짓, 재료와 용도를 단서로 당시의 생활과 가치관을 해석하도록 구성했습니다. 전시의 출발점과 작품 선정 배경은 [초기 웹전시 기획안](웹전시-기획안.md)에 있습니다.

## 로컬에서 열기

프로젝트의 `docs/index.html`을 브라우저에서 열면 바로 관람할 수 있습니다. 작품 사진과 화면에 필요한 파일은 모두 `docs`에 들어 있습니다. 외부 출처 링크를 열 때는 인터넷 연결이 필요합니다.

동자상의 **입체 모델 보기**는 아래 로컬 서버 또는 GitHub Pages에서 열어 주세요. 파일을 직접 열면 브라우저에 따라 GLB 로딩이 제한될 수 있습니다.

로컬 서버로 확인하려면 프로젝트 폴더에서 다음 명령을 실행하고 [http://127.0.0.1:8000](http://127.0.0.1:8000)을 엽니다. Python 3가 필요합니다.

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory docs
```

## GitHub Pages에 올리기

1. 배포 ZIP을 사용한다면 압축을 풀고 그 안의 `docs` 폴더와 Markdown 문서를 저장소 최상위에 올립니다. `docs/index.html`이 이 경로에 있는지 확인합니다.
2. 저장소의 **Settings → Pages**에서 **Deploy from a branch**를 선택합니다.
3. 올린 브랜치(예: `main`)와 `/docs` 폴더를 선택하고 저장합니다.
4. Pages에 표시된 주소에서 작품 이미지, 확대, 작품 이동이 동작하는지 확인합니다.

[GitHub Pages 공식 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 작품 이미지

국립중앙박물관 소장품 사진을 공공누리 제1유형 조건에 따라 사용했습니다. 전시의 작품별 화면에 소장품 번호, 출처, 이용 조건을 표시했습니다. 사진은 웹 표시용으로 변환했고, 일부 회화는 작품 밖 촬영용 색상표와 주변 여백을 잘라냈습니다.

〈백동자도 병풍〉은 기획안에서 참고한 덴버미술관 소장본과 같은 주제의 [국립중앙박물관 소장본(구 4251)](https://www.museum.go.kr/MUSEUM/contents/M0502000000.do?relicId=5977&schM=view&searchId=search)을 사용했습니다. 전체 보기에서는 소장품 사진 여덟 장을 나란히 배치했습니다.

포도·동자무늬 청자 주전자의 3D 보기는 [국립중앙박물관 공식 3D 보기](https://www.museum.go.kr/uploadfile/relic3D/duk000019/duk000019.html)의 90개 각도 이미지를 WebP로 변환해 사용합니다. 출처는 [국립중앙박물관 3D 데이터 검색(덕수 19)](https://www.museum.go.kr/MUSEUM/contents/M0505000000.do?relicId=957&schM=view&searchId=search)입니다. 이미지가 전시 파일에 들어 있어 로컬에서도 돌려 볼 수 있습니다.

동자상(덕수 5973)은 [국립중앙박물관 공식 3D 보기](https://www.museum.go.kr/relic3D/3D_V2/PS01001001005/005973/viewer.html)의 45개 각도 이미지를 사용합니다. 같은 사진을 COLMAP으로 정렬해 표면과 색을 복원한 GLB도 함께 제공합니다. 사진에 잘 보이지 않는 받침 바닥과 깊게 가려진 부분의 형상은 근사값입니다. 웹에서 모델을 표시하는 [model-viewer](https://github.com/google/model-viewer)의 라이선스는 `docs/vendor`에 있습니다.

전시 서체는 [Google Fonts의 동글(Dongle)](https://fonts.google.com/specimen/Dongle)입니다. 폰트와 SIL Open Font License를 `docs/assets/fonts`에 포함했습니다.
