function rotationFrame(rotation, row, column) {
  return `${rotation.folder}/${row}_${column}.webp`;
}

function rotationMarkup(work) {
  const { rotation } = work;
  const initialFrame = rotationFrame(rotation, rotation.startRow, rotation.startColumn);
  return `
    <div class="rotation-modes" role="group" aria-label="작품 보기 방식">
      ${work.model ? '<button type="button" class="button secondary" data-mode="model" aria-pressed="false">입체 모델 보기</button>' : ""}
      <button type="button" class="button secondary" data-mode="rotation" aria-pressed="true">${work.model ? "360도 사진" : "3D로 보기"}</button>
      <button type="button" class="button secondary" data-mode="photo" aria-pressed="false">사진으로 보기</button>
    </div>
    ${work.model ? `
      <div class="model-view" hidden>
        <model-viewer class="model-stage" alt="${work.images[0].alt}" camera-controls touch-action="pan-y"
          interaction-prompt="none" camera-orbit="0deg 75deg auto" min-field-of-view="12deg" max-field-of-view="45deg"
          exposure="1" shadow-intensity="0" poster="${initialFrame}"></model-viewer>
        <p class="model-status" role="status"></p>
        <p class="model-hint">끌어서 돌리고, 확대해서 얼굴과 손에 든 새를 살펴보세요.</p>
        <div class="rotation-controls" role="group" aria-label="입체 모델 확대와 초기화">
          <button class="icon-button" type="button" data-model-action="in" aria-label="입체 모델 확대">${icon("plus")}</button>
          <button class="icon-button" type="button" data-model-action="out" aria-label="입체 모델 축소">${icon("minus")}</button>
          <button class="button secondary" type="button" data-model-action="reset">처음 각도</button>
        </div>
        <p class="rotation-credit">국립중앙박물관 사진으로 복원한 모델 · <a href="${work.model}" download>GLB 내려받기</a></p>
      </div>` : ""}
    <div class="rotation-view">
      <div class="rotation-stage" tabindex="0" role="region" aria-label="${work.title} 3D 보기" aria-describedby="rotation-hint">
        <img src="${initialFrame}" alt="${work.images[0].alt}" draggable="false">
      </div>
      <p id="rotation-hint">끌어서 돌려 보세요. 방향키나 아래 버튼으로도 볼 수 있어요.</p>
      <div class="rotation-controls">
        <div class="rotation-arrows" role="group" aria-label="작품 각도 바꾸기">
          <button type="button" class="icon-button" data-direction="left" aria-label="왼쪽으로 돌리기">${icon("left")}</button>
          <button type="button" class="icon-button" data-direction="right" aria-label="오른쪽으로 돌리기">${icon("right")}</button>
          <button type="button" class="icon-button" data-direction="up" aria-label="위쪽에서 보기">${icon("up")}</button>
          <button type="button" class="icon-button" data-direction="down" aria-label="아래쪽에서 보기">${icon("down")}</button>
        </div>
        <button type="button" class="button secondary" data-rotation-reset>처음 각도</button>
        <button type="button" class="button secondary" data-zoom="rotation">${icon("search")} 이 각도 확대</button>
      </div>
      <p class="rotation-credit"><a href="${rotation.source}" target="_blank" rel="noopener noreferrer">국립중앙박물관 3D 원본 보기 ${icon("external")}</a></p>
    </div>`;
}

let modelViewerScript;

function loadModelViewer() {
  if (customElements.get("model-viewer")) return Promise.resolve();
  if (!modelViewerScript) {
    modelViewerScript = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "./vendor/model-viewer-umd.min.js";
      script.onload = () => {
        if (customElements.get("model-viewer")) resolve();
        else reject(new Error("3D viewer unavailable"));
      };
      script.onerror = reject;
      document.head.append(script);
    });
  }
  return modelViewerScript;
}

function mountModel(view, modelSource) {
  const viewer = view.querySelector("model-viewer");
  const status = view.querySelector(".model-status");
  const buttons = [...view.querySelectorAll("[data-model-action]")];
  const showError = () => { status.textContent = "입체 모델을 열지 못했어요. 360도 사진으로 살펴보세요."; };
  viewer.addEventListener("error", showError);
  viewer.addEventListener("load", () => {
    status.textContent = "";
    buttons.forEach((button) => { button.disabled = false; });
  });
  buttons.forEach((button) => {
    button.disabled = true;
    button.addEventListener("click", () => {
      const action = button.dataset.modelAction;
      if (action === "reset") {
        viewer.cameraOrbit = "0deg 75deg auto";
        viewer.cameraTarget = "auto auto auto";
        viewer.fieldOfView = "auto";
      } else {
        const next = viewer.getFieldOfView() * (action === "in" ? .78 : 1.28);
        viewer.fieldOfView = `${Math.min(45, Math.max(12, next))}deg`;
      }
      viewer.jumpCameraToGoal();
    });
  });
  return () => {
    if (viewer.hasAttribute("src") || status.textContent) return;
    status.textContent = "입체 모델을 불러오는 중이에요.";
    loadModelViewer().then(() => { viewer.src = modelSource; }).catch(showError);
  };
}

function mountRotation(figure, work) {
  const { rotation } = work;
  const stage = figure.querySelector(".rotation-stage");
  const image = stage.querySelector("img");
  const rotationView = figure.querySelector(".rotation-view");
  const photoView = figure.querySelector(".photo-view");
  const modelView = figure.querySelector(".model-view");
  const showModel = modelView ? mountModel(modelView, work.model) : null;
  const modes = [...figure.querySelectorAll("[data-mode]")];
  const controls = [...figure.querySelectorAll("[data-direction]")];
  const rowDirection = rotation.rowDirection ?? 1;
  const directions = {
    left: { row: 0, column: -1 }, right: { row: 0, column: 1 },
    up: { row: rowDirection, column: 0 }, down: { row: -rowDirection, column: 0 },
  };
  let row = rotation.startRow;
  let column = rotation.startColumn;
  let drag;
  const preloaded = new Set();

  function draw() {
    image.src = rotationFrame(rotation, row, column);
    for (const button of controls) {
      const nextRow = row + directions[button.dataset.direction].row;
      button.setAttribute("aria-disabled", String(nextRow < 0 || nextRow >= rotation.rows));
    }
    for (const { row: y, column: x } of Object.values(directions)) {
      const nextRow = row + y;
      if (nextRow < 0 || nextRow >= rotation.rows) continue;
      const nextColumn = (column + x + rotation.columns) % rotation.columns;
      const source = rotationFrame(rotation, nextRow, nextColumn);
      if (preloaded.has(source)) continue;
      preloaded.add(source);
      new Image().src = source;
    }
  }

  function move(y, x) {
    row = Math.max(0, Math.min(rotation.rows - 1, row + y));
    column = ((column + x) % rotation.columns + rotation.columns) % rotation.columns;
    draw();
  }

  for (const button of modes) {
    button.addEventListener("click", () => {
      const modeName = button.dataset.mode;
      rotationView.hidden = modeName !== "rotation";
      photoView.hidden = modeName !== "photo";
      if (modelView) modelView.hidden = modeName !== "model";
      if (modeName === "model") showModel();
      for (const mode of modes) mode.setAttribute("aria-pressed", String(mode === button));
    });
  }
  for (const button of controls) {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-disabled") === "true") return;
      const step = directions[button.dataset.direction];
      move(step.row, step.column);
    });
  }
  figure.querySelector("[data-rotation-reset]").addEventListener("click", () => {
    row = rotation.startRow;
    column = rotation.startColumn;
    draw();
  });
  stage.addEventListener("keydown", (event) => {
    if (!event.key.startsWith("Arrow")) return;
    const step = directions[event.key.slice(5).toLowerCase()];
    if (!step) return;
    event.preventDefault();
    move(step.row, step.column);
  });
  stage.addEventListener("pointerdown", (event) => {
    if (drag || !event.isPrimary || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointermove", (event) => {
    if (drag?.id !== event.pointerId) return;
    const x = Math.trunc((event.clientX - drag.x) / 18);
    const y = Math.trunc((event.clientY - drag.y) / 32);
    if (!x && !y) return;
    drag.x += x * 18;
    drag.y += y * 32;
    move(-y * rowDirection, x);
  });
  stage.addEventListener("lostpointercapture", () => { drag = undefined; });
  draw();
}
