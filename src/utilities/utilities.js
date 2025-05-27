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

export function createGradient(color1, color2, x1 = 0, x2 = 300, y1 = 0, y2 = 0) {
  return (ctx) => {
    // const x1 = 0;
    // let x2 = 300;
    // let y1 = 0;
    // let y2 = 0;

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
      // console.log(`localStorage::${key} was unset`);
      return fallback;
    }

    const data = JSON.parse(ls);
    if (!Array.isArray(data)) {
      // console.log(`localStorage::${key} was unset`);
      return fallback;
    }

    return data;
  } catch {
    // console.log(`localStorage::${key} was unset`);
    return fallback;
  }
}

export const shortenName = (name = "") => {
  const names = name.split(" ");

  // player only has one name
  if (names.length === 1) return name;

  // player has 2 names but second is jr
  if (names.length === 2 && names[1].startsWith("Jr")) {
    return name;
  }

  names[0] = names[0][0] + ".";

  return names.join(" ");
};

export const graphColors = {
  pink: "#FF4F8B",
  green: "#62b3ad",
  purple: "#AF95FC",
  pinkRGBA(a) {
    return `rgba(255, 79, 139, ${a})`
  },
  purpleRGBA(a) {
    return `rgba(175, 149, 252, ${a})`
  },
  greenRGBA(a) {
    return `rgba(98, 179, 173, ${a})`
  },
};

export function generateYouTubeEmbedCode(videoId, width = 560, height = 315) {
  if (!videoId) {
    throw new Error("A valid YouTube video ID is required.");
  }

  return `
    <iframe width="${width}" height="${height}" 
        src="https://www.youtube.com/embed/${videoId}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
    </iframe>
  `;
}
