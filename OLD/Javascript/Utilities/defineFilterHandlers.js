/*
    {
        onAllPositionsSelected() {},
        onPositionSelect(selectedPos) {},
        onAllCountriesSelected() {},
        onCountrySelect(selectedCy) {},
    }
*/

export function onClickOutside(element, callback) {
  document.addEventListener("click", (e) => {
    if (e.target !== element && !element.contains(e.target)) {
      callback(e);
    }
  });
}

export default function defineFilterHandlers(data, handlers) {
  const filterMenu = document.querySelector("#filter-menu");
  const filterButton = document.querySelector("#filter-button");
  const filterWrapper = document.querySelector("#filter-menu-wrapper");
  const globeFilterWrapper = document.querySelector(
    "#globe-filter-menu-wrapper"
  );
  const globeFilterMenu = document.querySelector("#globe-filter-menu");
  const globeFilterButton = document.querySelector("#globe-filter");

  // Click interaction for the filter button
  filterButton.addEventListener("click", () => {
    filterMenu.classList.toggle("hidden");
  });

  //Click interaction for the globe filter button
  globeFilterButton.addEventListener("click", () => {
    globeFilterMenu.classList.toggle("hidden");
  });

  onClickOutside(filterWrapper, () => {
    filterMenu.classList.add("hidden");
  });

  onClickOutside(globeFilterWrapper, () => {
    globeFilterMenu.classList.add("hidden");
  });

  // render position filter options
  const positions = [...new Set(data.map((p) => p.Position))].filter(Boolean);

  // ALL BUTTON
  document
    .querySelector("#filter-menu > button")
    .addEventListener("click", () => {
      handlers.onAllPositionsSelected();
      filterMenu.classList.add("hidden");
    });
  //

  positions.forEach((pos) => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      const selectedPos = btn.innerHTML;
      handlers.onPositionSelect(selectedPos);
      filterMenu.classList.add("hidden");
    });
    btn.innerHTML = pos;
    filterMenu.append(btn);
  });

  // render countries filter options
  const countries = [...new Set(data.map((p) => p.birthCountry))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  // ALL COUNTRIES BUTTON
  document
    .querySelector("#globe-filter-menu > button")
    .addEventListener("click", () => {
      handlers.onAllCountriesSelected();
      globeFilterMenu.classList.add("hidden");
    });
  //

  // Creates each country filter option
  countries.forEach((pos) => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      const cy = btn.innerHTML;
      handlers.onCountrySelect(cy);
      globeFilterMenu.classList.add("hidden");
    });
    btn.innerHTML = pos;
    globeFilterMenu.append(btn);
  });
}
