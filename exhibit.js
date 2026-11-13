const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const homeView = document.querySelector("#home-view");
const workView = document.querySelector("#work-view");
const reflectionView = document.querySelector("#reflection-view");
const dialog = document.querySelector("#zoom-dialog");
const viewport = document.querySelector("#zoom-viewport");
const zoomImage = document.querySelector("#zoom-image");
const zoomIn = document.querySelector("#zoom-in");
const zoomOut = document.querySelector("#zoom-out");
const zoomLevel = document.querySelector("#zoom-level");
const workById = new Map(works.map((work) => [work.id, work]));
let selectedWork;
let selectedImage;
let zoomFactor = 1;
let zoomTarget = { x: .5, y: .5 };
let zoomOpener;

function galleryCard(work) {
  const thumb = work.detail ?? work.images[0];
  return `<a class="work-card" data-art="${work.id}" href="#${work.id}"${work.cardTitle ? ` aria-label="${work.title}"` : ""}>
    <img src="${thumb.src}" alt="" loading="lazy">
    <span>${work.cardTitle ?? work.title} ${icon("right")}</span>
  </a>`;
}

document.querySelector("#gallery-grid").innerHTML = chapters.map((chapter, index) => `
  <article class="chapter-card theme-${chapter.theme}">
    <p class="chapter-label">${index + 1}부</p>
    <h3>${chapter.name}</h3>
    <div class="chapter-works">${works.filter((work) => work.chapter === index).map(galleryCard).join("")}</div>
  </article>
`).join("");

function artworkPicker(work) {
  if (work.images.length === 1) return "";
  const isScreen = work.id === "baekdong";
  const label = isScreen ? "병풍의 여덟 폭" : "작품 사진";
  return `<div class="image-picker" role="group" aria-label="${label}">
    <p>${isScreen ? "보고 싶은 병풍 그림을 골라 보세요." : "다른 각도에서 살펴보세요."}</p>
    ${work.overview ? '<button type="button" data-photo="-1" aria-pressed="true">여덟 폭 전체</button>' : ""}
    ${work.images.map((photo, index) => `<button type="button" data-photo="${index}" aria-pressed="${index === selectedImage}" aria-label="${photo.label}">${isScreen ? index + 1 : photo.label}</button>`).join("")}
  </div>`;
}

function renderWork(work) {
  const position = works.indexOf(work);
  const previous = works[position - 1];
  const next = works[position + 1];
  const chapter = chapters[work.chapter];
  const photo = work.overview ?? work.images[0];
  workView.className = `work-view theme-${chapter.theme}`;
  workView.innerHTML = `
    <div class="work-top">
      <a href="#gallery" class="text-link">${icon("left")} 작품 목록</a>
      <nav class="progress" aria-label="작품 순서">
        <p>${position + 1} / ${works.length} 작품</p>
        ${works.map((item, index) => `<a href="#${item.id}" aria-label="${index + 1}번 작품 ${item.title}"${item === work ? ' aria-current="step"' : ""}>${index + 1}</a>`).join("")}
      </nav>
    </div>
    <div class="work-grid">
      <header class="work-heading">
        <p class="eyebrow">${work.chapter + 1}부 · ${chapter.name}</p>
        <h1 id="work-title" tabindex="-1">${work.title}</h1>
        <p class="meta">${work.meta}</p>
      </header>
      <figure class="work-art">
        ${work.rotation ? rotationMarkup(work) : ""}
        <div class="photo-view"${work.rotation ? " hidden" : ""}>
          <button type="button" class="art-surface${work.overview ? " art-overview" : ""}" data-zoom="whole" aria-label="${work.title} 작품 확대">
            <img src="${photo.src}" alt="${photo.alt}"${work.rotation ? ' loading="lazy"' : ""}>
            <span class="zoom-chip">${icon("search")} 작품 확대</span>
          </button>
          ${artworkPicker(work)}
        </div>
        <figcaption><a href="${work.source}" target="_blank" rel="noopener noreferrer">국립중앙박물관 소장품</a> · ${work.accession} · <a href="https://www.kogl.or.kr/info/license.do#type1" target="_blank" rel="noopener noreferrer">공공누리 제1유형</a></figcaption>
      </figure>
      <div class="question-panel">
        <section class="prompt">
          <h2>${icon("search")} 작품 관찰</h2>
          <p>${work.observation}</p>
          <button class="button primary" type="button" data-zoom="clue">${icon("search")} 자세히 보기</button>
          <span class="hint" id="art-hint" hidden>${work.hint}</span>
        </section>
        <button class="button secondary think-trigger" type="button" aria-expanded="false" aria-controls="thinking-question">${icon("spark")} 해석 질문 보기</button>
        <section class="prompt thinking" id="thinking-question" hidden>
          <h2>${icon("spark")} 단서로 해석하기</h2>
          <p>${work.question}</p>
        </section>
        <details class="story">
          <summary>작품 이야기 ${icon("down")}</summary>
          <p>${work.story}</p>
          ${work.reference ? `<p><a href="${work.reference}" target="_blank" rel="noopener noreferrer">박물관 해설 보기 ${icon("external")}</a></p>` : ""}
        </details>
      </div>
    </div>
    <nav class="work-nav" aria-label="이전과 다음 작품">
      <a class="button secondary" href="#${previous?.id ?? "home"}">${icon("left")} ${previous ? `이전 · ${previous.title}` : "전시 소개"}</a>
      <a class="button primary" href="#${next?.id ?? "reflection"}">${next ? `다음 · ${next.title}` : "마지막 감상"} ${icon("right")}</a>
    </nav>`;
  if (work.rotation) mountRotation(workView.querySelector(".work-art"), work);
}

const comparison = [workById.get("seodang"), workById.get("baekdong")];
reflectionView.innerHTML = `
  <p class="eyebrow">마지막 감상</p>
  <h1 id="reflection-title" tabindex="-1">두 작품, 두 시선</h1>
  <p class="intro">〈서당〉의 학동과 〈백동자도 병풍〉 속 아이들을 나란히 살펴보세요.</p>
  <div class="reflection-art">
    ${comparison.map((work) => `<a href="#${work.id}"><img src="${work.images[0].src}" alt="${work.images[0].alt}" loading="lazy"><span>〈${work.title}〉 다시 보기</span></a>`).join("")}
  </div>
  <div class="reflection-note">
    <label for="reflection-note">두 작품은 어린이를 어떤 모습으로 표현했나요? 각 작품에서 찾은 단서를 하나씩 들어 설명해 보세요.</label>
    <textarea id="reflection-note" maxlength="400" placeholder="〈서당〉의 …은 …처럼 보입니다. 〈백동자도 병풍〉의 …은 …을 보여줍니다." aria-describedby="reflection-help"></textarea>
    <small id="reflection-help">그림 속 표정, 몸짓, 인물의 배치 중 두 가지를 골라 두세 문장으로 적어 보세요. 적은 내용은 전송되지 않습니다.</small>
  </div>
  <a href="#gallery" class="button secondary">${icon("grid")} 작품 목록으로</a>`;

function showRoute(moveFocus = false) {
  const route = location.hash.slice(1);
  if (route === "main") return;
  if (dialog.open) dialog.close();
  selectedWork = workById.get(route);
  const isReflection = route === "reflection";
  homeView.hidden = Boolean(selectedWork) || isReflection;
  workView.hidden = !selectedWork;
  reflectionView.hidden = !isReflection;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const active = !homeView.hidden && link.dataset.nav === (route === "gallery" ? "gallery" : "home");
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  if (selectedWork) {
    selectedImage = selectedWork.overview ? -1 : 0;
    renderWork(selectedWork);
  }
  const heading = document.querySelector(
    selectedWork ? "#work-title" : isReflection ? "#reflection-title" : route === "gallery" ? "#gallery-title" : "#home-title",
  );
  document.title = selectedWork
    ? `${selectedWork.title} | 옛사람들의 눈에 비친 아이들`
    : "옛사람들의 눈에 비친 아이들 | 한국 문화유산 웹전시";
  if (moveFocus) heading.focus({ preventScroll: true });
  if (route === "gallery") document.querySelector("#gallery").scrollIntoView();
  else if (moveFocus || route) window.scrollTo(0, 0);
}

window.addEventListener("hashchange", () => showRoute(true));
showRoute();

workView.addEventListener("click", (event) => {
  const picker = event.target.closest("[data-photo]");
  if (picker) {
    selectedImage = Number(picker.dataset.photo);
    const photo = selectedWork.images[selectedImage] ?? selectedWork.overview;
    const surface = workView.querySelector(".art-surface");
    const image = surface.querySelector("img");
    surface.classList.toggle("art-overview", selectedImage === -1);
    image.src = photo.src;
    image.alt = photo.alt;
    workView.querySelectorAll("[data-photo]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button === picker));
    });
    return;
  }

  const thinkTrigger = event.target.closest(".think-trigger");
  if (thinkTrigger) {
    const question = workView.querySelector("#thinking-question");
    question.hidden = !question.hidden;
    thinkTrigger.setAttribute("aria-expanded", String(!question.hidden));
    return;
  }

  const trigger = event.target.closest("[data-zoom]");
  if (trigger) {
    if (trigger.dataset.zoom === "rotation") {
      const currentFrame = workView.querySelector(".rotation-stage img");
      openZoom(selectedWork, { src: currentFrame.src, alt: currentFrame.alt }, false, trigger, 2);
      return;
    }
    const clue = trigger.dataset.zoom === "clue";
    if (clue) workView.querySelector("#art-hint").hidden = false;
    const photo = selectedWork.images[selectedImage]
      ?? (clue ? selectedWork.images[0] : selectedWork.overview);
    openZoom(selectedWork, photo, clue, trigger);
  }
});

function openZoom(work, photo, clue, trigger, initialZoom = 1) {
  const image = clue ? (work.detail ?? photo) : photo;
  zoomOpener = trigger;
  zoomFactor = clue ? image.zoom : initialZoom;
  zoomTarget = clue ? { x: image.x, y: image.y } : { x: .5, y: .5 };
  document.querySelector("#zoom-title").textContent = `${work.title} · ${clue ? work.clue : "작품 확대"}`;
  document.querySelector("#zoom-help").textContent = clue
    ? work.hint
    : "이미지가 크면 화면을 밀거나 방향키로 움직여 보세요.";
  zoomImage.alt = image.alt;
  zoomImage.src = image.src;
  dialog.showModal();
  if (zoomImage.complete) renderZoom();
  document.querySelector("#zoom-close").focus();
}

function imageCenter() {
  return {
    x: (viewport.scrollLeft + viewport.clientWidth / 2 - zoomImage.offsetLeft + viewport.offsetLeft) / zoomImage.clientWidth,
    y: (viewport.scrollTop + viewport.clientHeight / 2 - zoomImage.offsetTop + viewport.offsetTop) / zoomImage.clientHeight,
  };
}

function renderZoom() {
  if (!dialog.open || !zoomImage.naturalWidth) return;
  const fit = Math.min(viewport.clientWidth / zoomImage.naturalWidth, viewport.clientHeight / zoomImage.naturalHeight);
  const width = Math.round(zoomImage.naturalWidth * fit * zoomFactor);
  const height = Math.round(zoomImage.naturalHeight * fit * zoomFactor);
  const left = Math.max(0, Math.floor((viewport.clientWidth - width) / 2));
  const top = Math.max(0, Math.floor((viewport.clientHeight - height) / 2));
  zoomImage.style.width = `${width}px`;
  zoomImage.style.height = `${height}px`;
  zoomImage.style.margin = `${top}px 0 0 ${left}px`;
  viewport.scrollLeft = left + width * zoomTarget.x - viewport.clientWidth / 2;
  viewport.scrollTop = top + height * zoomTarget.y - viewport.clientHeight / 2;
  zoomLevel.textContent = `${Math.round(zoomFactor * 100)}%`;
  zoomOut.disabled = zoomFactor <= 1;
  zoomIn.disabled = zoomFactor >= 6;
}

function changeZoom(amount) {
  if (!zoomImage.clientWidth) return;
  const center = imageCenter();
  zoomTarget = { x: Math.max(0, Math.min(1, center.x)), y: Math.max(0, Math.min(1, center.y)) };
  zoomFactor = Math.min(6, Math.max(1, zoomFactor + amount));
  renderZoom();
}

zoomImage.addEventListener("load", renderZoom);
window.addEventListener("resize", renderZoom);
zoomIn.addEventListener("click", () => changeZoom(.5));
zoomOut.addEventListener("click", () => changeZoom(-.5));
document.querySelector("#zoom-reset").addEventListener("click", () => {
  zoomFactor = 1;
  zoomTarget = { x: .5, y: .5 };
  renderZoom();
});
document.querySelector("#zoom-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) {
      dialog.close();
    }
  }
});
dialog.addEventListener("close", () => {
  if (zoomOpener?.isConnected) zoomOpener.focus({ preventScroll: true });
  zoomOpener = undefined;
});
