const DEFAULT_MEDICINE_LIMIT = 10;
const DEFAULT_SUMMON_LIMIT = 6;
const SPEEDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const LAYOUT_STORAGE_KEY = "mhxyFormationLayouts";
const DEFAULT_FORMATION = "天覆阵";
const DEFAULT_SIDE_POSITIONS = {
  enemy: [[12, 28], [27, 40], [42, 52], [57, 36], [72, 22]],
  ally: [[28, 78], [43, 64], [58, 50], [73, 62], [88, 74]]
};
const DEFAULT_FORMATION_LAYOUTS = {
  ally: {
    "天覆阵": [[74.4, 71.93], [76.76, 45.07], [55.44, 67.5], [88.79, 28.7], [42.09, 81.88]],
    "地载阵": [[77.31, 67.51], [67.36, 83.98], [88.06, 52.09], [67.45, 49.47], [88.19, 84.62]],
    "风扬阵": [[83.37, 74.28], [93.81, 56.47], [72, 88.54], [83.75, 35.4], [62.08, 68.08]],
    "云垂阵": [[81.29, 87.11], [76.65, 40.89], [55.51, 63.28], [89.78, 27.57], [41.26, 76.65]],
    "龙飞阵": [[75.77, 69.01], [53.51, 63.14], [88.44, 25.59], [67.39, 48.42], [85.38, 88.04]],
    "虎翼阵": [[82, 85.78], [86.44, 56.62], [64.49, 78.1], [87.41, 27.3], [45.44, 70.84]],
    "鸟翔阵": [[62.37, 52.67], [77.7, 62.43], [58.07, 80.6], [81.12, 35.09], [40.44, 76.24]],
    "蛇蟠阵": [[71.1, 70.35], [81.9, 54.51], [59.83, 84.96], [51.21, 64.37], [91.52, 74.26]],
    "鹰啸阵": [[73.74, 70.48], [76.76, 38.67], [52.79, 63.85], [65.08, 51.31], [83.34, 87.06]],
    "雷绝阵": [[82.14, 85.51], [86.23, 59.65], [67.61, 76.26], [78.14, 38.25], [59.25, 56.98]]
  },
  enemy: {
    "天覆阵": [[29.09, 21.63], [25.15, 47.21], [44.12, 26.8], [11.26, 63.34], [57.21, 13.99]],
    "地载阵": [[24.29, 31.64], [13.11, 49.03], [35.39, 14.2], [34.63, 50.05], [14.08, 11.34]],
    "风扬阵": [[19.97, 24.27], [7.5, 37.31], [32.05, 12.79], [14.74, 59.92], [40.3, 34.05]],
    "云垂阵": [[23.88, 14.74], [24.39, 56.48], [48.94, 32.86], [11.28, 69.95], [61.85, 20.2]],
    "龙飞阵": [[24.58, 33.42], [47.09, 37.76], [11.01, 74.55], [33.05, 53.42], [16.66, 12.5]],
    "虎翼阵": [[21.2, 12.43], [16.13, 40.53], [38.08, 20.74], [12.95, 72.15], [55.41, 28.87]],
    "鸟翔阵": [[40.22, 45.68], [23.48, 39.21], [46.81, 18.23], [19.19, 68.45], [62.53, 22]],
    "蛇蟠阵": [[24.25, 32.36], [13.54, 47.12], [35.44, 18.62], [45.43, 36.92], [6.03, 26.09]],
    "鹰啸阵": [[25.27, 32.09], [45.81, 39.08], [20.49, 64.8], [33.26, 52.09], [16.65, 12.51]],
    "雷绝阵": [[13.62, 16.13], [12.05, 42.77], [29.48, 24.82], [20.13, 64.1], [38.04, 44.03]]
  }
};
const formations = Object.fromEntries(Object.keys(DEFAULT_FORMATION_LAYOUTS.enemy).map((name) => [name, name]));
const formationAdvantages = {
  "天覆阵": { "地载阵": 6, "龙飞阵": 6, "鸟翔阵": 3, "鹰啸阵": 3, "风扬阵": -6, "蛇蟠阵": -6, "云垂阵": -3, "虎翼阵": -3, "雷绝阵": -3 },
  "地载阵": { "风扬阵": 6, "虎翼阵": 6, "雷绝阵": 6, "云垂阵": 3, "蛇蟠阵": 3, "天覆阵": -6, "鸟翔阵": -3, "鹰啸阵": -3, "龙飞阵": -3 },
  "风扬阵": { "天覆阵": 6, "鸟翔阵": 6, "鹰啸阵": 6, "蛇蟠阵": 3, "地载阵": -6, "虎翼阵": -6, "雷绝阵": -6, "云垂阵": -3, "龙飞阵": -3 },
  "云垂阵": { "鸟翔阵": 6, "蛇蟠阵": 6, "鹰啸阵": 6, "天覆阵": 3, "风扬阵": 3, "龙飞阵": -6, "虎翼阵": -6, "雷绝阵": -6, "地载阵": -3 },
  "龙飞阵": { "云垂阵": 6, "雷绝阵": 6, "地载阵": 3, "风扬阵": 3, "天覆阵": -6, "鹰啸阵": -6, "虎翼阵": -3, "鸟翔阵": -3, "蛇蟠阵": -3 },
  "虎翼阵": { "风扬阵": 6, "云垂阵": 6, "天覆阵": 3, "龙飞阵": 3, "雷绝阵": 3, "地载阵": -6, "鸟翔阵": -6, "蛇蟠阵": -3, "鹰啸阵": -3 },
  "鸟翔阵": { "地载阵": 6, "虎翼阵": 6, "龙飞阵": 3, "鹰啸阵": 3, "天覆阵": -3, "蛇蟠阵": -3, "雷绝阵": -3, "风扬阵": -6, "云垂阵": -6 },
  "蛇蟠阵": { "天覆阵": 6, "龙飞阵": 3, "虎翼阵": 3, "鸟翔阵": 3, "地载阵": -3, "风扬阵": -3, "鹰啸阵": -3, "云垂阵": -6 },
  "鹰啸阵": { "地载阵": 6, "龙飞阵": 6, "虎翼阵": 3, "蛇蟠阵": 3, "风扬阵": -6, "天覆阵": -3, "鸟翔阵": -3, "雷绝阵": -3 },
  "雷绝阵": { "风扬阵": 6, "云垂阵": 6, "天覆阵": 3, "鸟翔阵": 3, "鹰啸阵": 3, "虎翼阵": -3, "蛇蟠阵": -3, "地载阵": -6, "龙飞阵": -6 }
};
let appState;

function loadSavedLayouts() {
  try {
    return JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLayouts(layouts) {
  try {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layouts));
  } catch {}
}

function clone(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundPosition(value) {
  return Number(value.toFixed(2));
}

function getPosition(savedLayouts, side, formationName, slot) {
  return savedLayouts?.[side]?.[formationName]?.[slot - 1]
    || DEFAULT_FORMATION_LAYOUTS?.[side]?.[formationName]?.[slot - 1]
    || DEFAULT_SIDE_POSITIONS[side][slot - 1];
}

function createUnit(side, slot, savedLayouts, selectedFormations) {
  const [x, y] = getPosition(savedLayouts, side, selectedFormations[side], slot);
  return {
    id: `${side}-${slot}`,
    side,
    slot,
    label: side === "enemy" ? `敌${slot}` : `我${slot}`,
    x,
    y,
    medicine: { count: 0, limit: DEFAULT_MEDICINE_LIMIT },
    summon: { count: 0, limit: DEFAULT_SUMMON_LIMIT },
    speed: null
  };
}

function createInitialState(savedLayouts = loadSavedLayouts(), selectedFormations = { enemy: DEFAULT_FORMATION, ally: DEFAULT_FORMATION }) {
  const safeFormations = {
    enemy: formations[selectedFormations.enemy] ? selectedFormations.enemy : DEFAULT_FORMATION,
    ally: formations[selectedFormations.ally] ? selectedFormations.ally : DEFAULT_FORMATION
  };
  const units = {};
  ["enemy", "ally"].forEach((side) => {
    for (let slot = 1; slot <= 5; slot += 1) {
      const unit = createUnit(side, slot, savedLayouts, safeFormations);
      units[unit.id] = unit;
    }
  });
  return withAvailableSpeeds({ selectedFormations: safeFormations, savedLayouts, units });
}

function withAvailableSpeeds(state) {
  const used = new Set(Object.values(state.units).map((unit) => unit.speed).filter((speed) => speed !== null));
  return { ...state, availableSpeeds: SPEEDS.filter((speed) => !used.has(speed)) };
}

function setSideFormation(state, side, formationName) {
  const safeFormation = formations[formationName] ? formationName : DEFAULT_FORMATION;
  const next = clone(state);
  next.selectedFormations[side] = safeFormation;
  for (let slot = 1; slot <= 5; slot += 1) {
    const [x, y] = getPosition(next.savedLayouts, side, safeFormation, slot);
    next.units[`${side}-${slot}`].x = x;
    next.units[`${side}-${slot}`].y = y;
  }
  return withAvailableSpeeds(next);
}

function resetState(state) {
  return createInitialState(state.savedLayouts, state.selectedFormations);
}

function changeCounter(state, unitId, kind, delta) {
  const next = clone(state);
  const counter = next.units[unitId]?.[kind];
  if (!counter) return state;
  counter.count = clamp(counter.count + delta, 0, counter.limit);
  return withAvailableSpeeds(next);
}

function increaseLimit(state, unitId, kind) {
  const next = clone(state);
  const counter = next.units[unitId]?.[kind];
  if (!counter) return state;
  counter.limit += 1;
  return withAvailableSpeeds(next);
}

function setSpeed(state, unitId, speed) {
  const next = clone(state);
  const selected = speed === "" || speed === null ? null : Number(speed);
  if (!next.units[unitId] || (selected !== null && !SPEEDS.includes(selected))) return state;
  if (selected !== null) {
    Object.values(next.units).forEach((unit) => {
      if (unit.id !== unitId && unit.speed === selected) unit.speed = null;
    });
  }
  next.units[unitId].speed = selected;
  return withAvailableSpeeds(next);
}

function moveUnit(state, unitId, x, y) {
  const next = clone(state);
  if (!next.units[unitId]) return state;
  next.units[unitId].x = roundPosition(clamp(Number(x), 0, 100));
  next.units[unitId].y = roundPosition(clamp(Number(y), 0, 100));
  return withAvailableSpeeds(next);
}

function extractSideLayout(state, side) {
  return [1, 2, 3, 4, 5].map((slot) => {
    const unit = state.units[`${side}-${slot}`];
    return [unit.x, unit.y];
  });
}

function applySavedSideLayout(savedLayouts, state, side) {
  const next = clone(savedLayouts);
  const formationName = state.selectedFormations[side] || DEFAULT_FORMATION;
  next[side] = { ...(next[side] || {}), [formationName]: extractSideLayout(state, side) };
  return next;
}

function getFormationAdvantage(firstFormation, secondFormation) {
  const firstValue = formationAdvantages[firstFormation]?.[secondFormation] || 0;
  const secondValue = formationAdvantages[secondFormation]?.[firstFormation] || -firstValue;
  return { first: formatAdvantage(firstValue), second: formatAdvantage(secondValue) };
}

function formatAdvantage(value) {
  if (value === 6) return "大克";
  if (value === 3) return "小克";
  if (value === -6) return "被大克";
  if (value === -3) return "被小克";
  return "平";
}

function boot() {
  const resetButton = document.querySelector("#resetButton");
  const enemyFormationSelect = document.querySelector("#enemyFormationSelect");
  const allyFormationSelect = document.querySelector("#allyFormationSelect");
  const openLimitButton = document.querySelector("#openLimitButton");
  const limitPanel = document.querySelector("#limitPanel");
  const limitUnitSelect = document.querySelector("#limitUnitSelect");
  const limitKindSelect = document.querySelector("#limitKindSelect");
  const applyLimitButton = document.querySelector("#applyLimitButton");
  if (!resetButton || !enemyFormationSelect || !allyFormationSelect || !openLimitButton || !limitPanel || !limitUnitSelect || !limitKindSelect || !applyLimitButton) return;

  appState = createInitialState();
  populateFormationSelect(enemyFormationSelect, appState.selectedFormations.enemy);
  populateFormationSelect(allyFormationSelect, appState.selectedFormations.ally);
  populateLimitUnitSelect(limitUnitSelect);
  render();

  enemyFormationSelect.addEventListener("change", (event) => {
    appState = setSideFormation(appState, "enemy", event.target.value);
    render();
  });
  allyFormationSelect.addEventListener("change", (event) => {
    appState = setSideFormation(appState, "ally", event.target.value);
    render();
  });
  resetButton.addEventListener("click", () => {
    appState = resetState(appState);
    render();
  });
  openLimitButton.addEventListener("click", () => {
    limitPanel.hidden = !limitPanel.hidden;
  });
  applyLimitButton.addEventListener("click", () => {
    appState = increaseLimit(appState, limitUnitSelect.value, limitKindSelect.value);
    render();
  });
}

function populateFormationSelect(select, selectedFormation) {
  select.innerHTML = "";
  Object.keys(formations).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.append(option);
  });
  select.value = selectedFormation;
}

function populateLimitUnitSelect(select) {
  select.innerHTML = "";
  ["enemy", "ally"].forEach((side) => {
    for (let slot = 1; slot <= 5; slot += 1) {
      const option = document.createElement("option");
      option.value = `${side}-${slot}`;
      option.textContent = side === "enemy" ? `敌${slot}` : `我${slot}`;
      select.append(option);
    }
  });
}

function render() {
  document.querySelector("#enemyFormationSelect").value = appState.selectedFormations.enemy;
  document.querySelector("#allyFormationSelect").value = appState.selectedFormations.ally;
  const advantage = getFormationAdvantage(appState.selectedFormations.enemy, appState.selectedFormations.ally);
  document.querySelector("#enemyAdvantage").textContent = advantage.first;
  document.querySelector("#allyAdvantage").textContent = advantage.second;
  const availableSpeeds = document.querySelector("#availableSpeeds");
  availableSpeeds.innerHTML = "";
  appState.availableSpeeds.forEach((speed) => {
    const chip = document.createElement("span");
    chip.className = "speed-chip";
    chip.textContent = speed;
    availableSpeeds.append(chip);
  });

  document.querySelector("#enemyBoard").innerHTML = "";
  document.querySelector("#allyBoard").innerHTML = "";
  Object.values(appState.units)
    .sort((first, second) => first.side.localeCompare(second.side) || first.slot - second.slot)
    .forEach((unit) => {
      document.querySelector(unit.side === "enemy" ? "#enemyBoard" : "#allyBoard").append(createUnitCard(unit));
    });
}

function createUnitCard(unit) {
  const card = document.querySelector("#unitTemplate").content.firstElementChild.cloneNode(true);
  card.dataset.unitId = unit.id;
  card.classList.add(`${unit.side}-card`);
  card.style.left = `${unit.x}%`;
  card.style.top = `${unit.y}%`;
  card.querySelector(".unit-name").textContent = unit.label;
  renderCounter(card, unit, "medicine");
  renderCounter(card, unit, "summon");
  renderSpeedSelect(card, unit);
  attachPointerDrag(card, unit);
  return card;
}

function renderCounter(card, unit, kind) {
  const row = card.querySelector(`.counter-row[data-kind="${kind}"]`);
  const counter = unit[kind];
  const atLimit = counter.count >= counter.limit;
  row.classList.toggle("at-limit", atLimit);
  row.querySelector(".counter-value").textContent = `${counter.count}/${counter.limit}`;
  row.querySelector(".counter-minus").disabled = counter.count <= 0;
  row.querySelector(".counter-plus").disabled = atLimit;
  row.querySelector(".counter-minus").addEventListener("click", () => {
    appState = changeCounter(appState, unit.id, kind, -1);
    render();
  });
  row.querySelector(".counter-plus").addEventListener("click", () => {
    appState = changeCounter(appState, unit.id, kind, 1);
    render();
  });
}

function renderSpeedSelect(card, unit) {
  const select = card.querySelector(".speed-select select");
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "未定";
  select.append(emptyOption);
  SPEEDS.forEach((speed) => {
    const option = document.createElement("option");
    option.value = String(speed);
    option.textContent = String(speed);
    option.disabled = Object.values(appState.units).some((other) => other.id !== unit.id && other.speed === speed);
    select.append(option);
  });
  select.value = unit.speed === null ? "" : String(unit.speed);
  select.addEventListener("change", (event) => {
    appState = setSpeed(appState, unit.id, event.target.value);
    render();
  });
}

function attachPointerDrag(card, unit) {
  let dragState = null;
  card.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest("button, select, option")) return;
    const point = getBoardPosition(card.parentElement, event);
    dragState = { pointerId: event.pointerId, offsetX: point.x - unit.x, offsetY: point.y - unit.y };
    card.classList.add("dragging");
    if (card.setPointerCapture) card.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  card.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    const point = getBoardPosition(card.parentElement, event);
    card.style.left = `${roundPosition(clamp(point.x - dragState.offsetX, 0, 100))}%`;
    card.style.top = `${roundPosition(clamp(point.y - dragState.offsetY, 0, 100))}%`;
    event.preventDefault();
  });
  card.addEventListener("pointerup", (event) => finishDrag(card, unit.id, event, dragState));
  card.addEventListener("pointercancel", (event) => finishDrag(card, unit.id, event, dragState));
}

function finishDrag(card, unitId, event, dragState) {
  if (!dragState || !event) return;
  const point = getBoardPosition(card.parentElement, event);
  card.classList.remove("dragging");
  appState = moveUnit(appState, unitId, point.x - dragState.offsetX, point.y - dragState.offsetY);
  appState.savedLayouts = applySavedSideLayout(appState.savedLayouts, appState, appState.units[unitId].side);
  saveLayouts(appState.savedLayouts);
  render();
}

function getBoardPosition(board, event) {
  const rect = board.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  };
}

document.addEventListener("DOMContentLoaded", boot);

globalThis.CombatTracker = {
  formations,
  defaultFormationLayouts: DEFAULT_FORMATION_LAYOUTS,
  formationAdvantages,
  createInitialState,
  resetState,
  setSideFormation,
  getFormationAdvantage,
  changeCounter,
  increaseLimit,
  setSpeed,
  moveUnit,
  extractSideLayout,
  applySavedSideLayout
};
