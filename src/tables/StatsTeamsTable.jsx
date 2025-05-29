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
  `Dortmund`,
  `Bayer Leverkussen`,
  `Juventus`,
  `Milan`,
  `Napoli`,
  `Roma`,
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
];

const items = [
  {
    league: "Premier League",
    team: "",
    badge: {
      type: "img",
      src: "/images/Competitions/PremierLeague.png",
    },
    wins: 2,
    mp: 2,
    g: 1,
    a: 4,
    gc: 7,
    "gc / mp": 92,
    cc: 45,
    dc: 12,
  },
  {
    league: "La Liga",
    team: "",
    badge: {
      type: "img",
      src: "/images/Competitions/LaLiga.png",
    },
    wins: 2,
    mp: 2,
    g: 1,
    a: 4,
    gc: 7,
    "gc / mp": 92,
    cc: 45,
    dc: 12,
  },
  {
    league: "Bundesliga",
    team: "",
    badge: {
      type: "img",
      src: "/images/Competitions/Bundesliga.png",
    },
    wins: 2,
    mp: 2,
    g: 1,
    a: 4,
    gc: 7,
    "gc / mp": 92,
    cc: 45,
    dc: 12,
  },
  {
    league: "Ligue 1",
    team: "",
    badge: {
      type: "img",
      src: "/images/Competitions/Ligue1.png",
    },
    wins: 2,
    mp: 2,
    g: 1,
    a: 4,
    gc: 7,
    "gc / mp": 92,
    cc: 45,
    dc: 12,
  },
  {
    league: "Serie A",
    team: "",
    badge: {
      type: "img",
      src: "/images/Competitions/SerieA.png",
    },
    wins: 2,
    mp: 2,
    g: 1,
    a: 4,
    gc: 7,
    "gc / mp": 92,
    cc: 45,
    dc: 12,
  },
  {
    league: "Champions League",
    team: "",
    badge: {
      type: "img",
      src: "/images/Competitions/ChampionsLeague.png",
    },
    wins: 2,
    mp: 2,
    g: 1,
    a: 4,
    gc: 7,
    "gc / mp": 92,
    cc: 45,
    dc: 12,
  },

  
  ];


const fakeRow = {
  id: 0,
  team: `Bayern`,
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
  fakeRows.push({
    ...fakeRow,
    id: Math.floor(Math.random() * 1000),
    team: teams[i],
  });

  const expandables = []

  console.log(items)

  items.forEach((item, i) => {
    const expandable = {
      type: 'moreRows',
      items: []
    }
    
    for (let j = 0; j < teams.length ; j++) {
      const values = Object.values(fakeRow)
      const row = [
        "",
        teams[j],
        { type: "img", src: `/images/Teams/${teams[j]}.png`, alt: teams[j] }, 
        ...values.slice(3)
      ]
      expandable.items.push(row)
    }
    expandables.push(expandable)
    console.log(expandable)
  })



function StatsTeams() {

  return (
    <Table
      headings={Object.keys(items[0]).filter((h) => h !== "id")}
      items={items }
      _key={"id"}
      hide={["id"]}
      id="stats-teams-table"
      expandables={expandables}
      perPage={35}
      columnWidths={[
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
        "10%",
      ]}
      totals={[
        'All leagues',
        'All',
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100
      ]}
      cellPaddingY="5.75px"
    />
    
  );
}

export default StatsTeams;
