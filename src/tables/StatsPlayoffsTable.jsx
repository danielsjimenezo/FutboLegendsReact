import Table from "./Table.jsx";


const items = [
  {
    Round: "Finals",
    Comp: "All",
    Winds: 2,
    Mp: 2,
    G: 1,
    A: 4,
    GC: 7, 
    "GC/MP": 92,
    CC: 45,
    DC: 12
  },
  {
    Round: "Semi Finals",
    Comp: "All",
    Winds: 2,
    Mp: 2,
    G: 1,
    A: 4,
    GC: 7, 
    "GC/MP": 92,
    CC: 45,
    DC: 12
  },
  {
    Round: "Qtr Finals",
    Comp: "All",
    Winds: 2,
    Mp: 2,
    G: 1,
    A: 4,
    GC: 7, 
    "GC/MP": 92,
    CC: 45,
    DC: 12
  },
  {
    Round: "Round of 16",
    Comp: "All",
    Winds: 2,
    Mp: 2,
    G: 1,
    A: 4,
    GC: 7, 
    "GC/MP": 92,
    CC: 45,
    DC: 12
  },
]

const expandables = []

items.forEach((item, i) => {
  const expandable = {
    type: 'moreRows',
    items: []
  }
  for (let j = 0; j < 10; j++) {
    const row = [...Object.values(item)]
    expandable.items.push(row)
  }
  expandables.push(expandable)
})

console.log(expandables)

function StatsPlayoffsTable() {
  return (
    <Table
      headings={Object.keys(items[0]).filter((h) => h !== "id")}
      items={items}
      _key={"id"}
      hide={["id"]}
      id="stats-playoffs-table"
      expandables={expandables}
    />
  );
}

export default StatsPlayoffsTable;
