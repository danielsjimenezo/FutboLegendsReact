export async function fetchData() {
  const res = await fetch("./Data/data.json");
  const data = await res.json();
  return data;
}
