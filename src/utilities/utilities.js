export async function fetchData() {
  const res = await fetch("/Data/data.json");
  const data = await res.json();
  return data;
}

export function onClickOutside(element, callback) {
  document.addEventListener("click", (e) => {
    if (e.target !== element && !element.contains(e.target)) {
      callback(e);
    }
  });
}
