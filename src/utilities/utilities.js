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
