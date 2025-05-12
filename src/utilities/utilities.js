export const HOME_PAGE_CHART_ASPECT_RATIO = 1 / 0.55;
export const GOAL_TYPE_CHART_ASPECT_RATIO = 1 / 0.75;

export async function fetchData() {
  const res = await fetch("/Data/data.json");
  if (!res.ok) return;
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading players");
    console.error(error);
    return;
  }
}

const clickOutsideListeners = new Map(); // keys are elements

export function onClickOutside(element, callback) {
  if (clickOutsideListeners.has(element)) return;

  document.addEventListener("click", (e) => {
    if (e.target !== element && !element.contains(e.target)) {
      callback(e);
    }
  });

  clickOutsideListeners.set(element, true);
}

export function createGradient(color1, color2, val, max) {
  return (ctx) => {
    const x1 = 0;
    let x2 = 300;
    let y1 = 0;
    let y2 = 0;

    const canvas = ctx.chart.ctx;
    const gradient = canvas.createLinearGradient(x1, y1, x2, y2);

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    return gradient;
  };
}

export function getArrayFromLocalStorage(key, fallback = []) {
  try {
    const ls = localStorage.getItem(key);
    if (!ls) {
      console.log(`localStorage::${key} was unset`);
      return fallback;
    }

    const data = JSON.parse(ls);
    if (!Array.isArray(data)) {
      console.log(`localStorage::${key} was unset`);
      return fallback;
    }

    return data;
  } catch {
    console.log(`localStorage::${key} was unset`);
    return fallback;
  }
}

export const shortenName = (name) => {
  const names = name.split(" ");

  // player only has one name
  if (names.length === 1) return name;

  // player has 2 names but second is jr
  if (names.length === 2 && names[names.length - 1].startsWith("Jr")) {
    return name;
  }

  names[0] = names[0][0] + ".";
  return names.join(" ");
};
