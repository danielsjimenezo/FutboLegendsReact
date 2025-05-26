import Table from "./Table.jsx";

const teams = [
  `Manchester United`,
  `Real Madrid`,
  `Barcelona`,
  `Manchester City`,
  `Chelsea`,
  `Arsenal`,
  `Atletico Madrid`,
  `Sevilla`,
  `Liverpool`,
  `Tottenham`,
  `PSG`,
  `Marseille`,
  `Monaco`,
  `Lyon`,
  `Bayern Munich`,
  `Borussia Dortmund`,
  `Bayer Leverkussen`,
  `Juventus`,
  `AC Milan`,
  `Inter Milan`,
 `Napoli`, 
 `AS Roma`,
 `Ajax`,
 `Spain`,
 `France`,
 `Italy`,
 `Germany`,
 `England`,
 `Portugal`,
 `Netherlands`,
 `Brazil`,
 `Argentina`,
 `Uruguay`,
 `Colombia`,
]

const fakeRow = {
  id: 0,
  team: `Bayern Munich`,
  badge: {
    type: "img",
    src: "/images/Teams/Bayern Munich.png",
  },
  wins: 2,
  mp: 2,
  g: 1,
  a: 4,
  gc: 7,
  "gc / mp": 92,
  cc: 45,
  dc: 12,
};

const fakeRows = [];
for (let i = 0; i < 35; i++)
  fakeRows.push({ ...fakeRow, id: Math.floor(Math.random() * 1000), team: teams[i] });

function StatsTeams() {
  return (
    <Table
      headings={Object.keys(fakeRow).filter((h) => h !== "id")}
      items={fakeRows}
      _key={"id"}
      hide={["id"]}
      id="stats-teams-table"
      perPage={35}
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
      cellPaddingY='5.75px'
    />
  );
}

export default StatsTeams;
