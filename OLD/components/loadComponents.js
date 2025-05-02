export default async function loadComponent(cssSelector, name) {
  const res = await fetch(`/components/${name}/${name}.html`);
  const html = await res.text();
  document.querySelector(cssSelector).innerHTML = html;
  try {
    import(`/components/${name}/${name}.js`);
  } catch (_) {}
}
