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
  const comps = [
    'Champions League',
    'World Cup',
    'Copa America',
    'Europa League',
    'Domestic Cup',
    'Domestic Super Cup',
    'Club World Cup',
    'Nations League',
    'Olympics',
    'Confederation Cup'
  ]
  for (let j = 0; j < comps.length; j++) {
    const values = Object.values(item)
    const row = [
      values[0], 
      comps[j],
      // { type: "img", src: `/images/Competitions/${comps[j]}.png` }, 
      ...values.slice(2)
    ]
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
      columnWidths={[
          '10%',
          '10%',
          '10%',
          '10%',
          '10%',
          '10%',
          '10%',
          '10%',
          '10%',
          '10%',
      ]}
    />
  );
}

export default StatsPlayoffsTable;
