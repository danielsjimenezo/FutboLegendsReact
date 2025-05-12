import Table from "./Table.jsx";

const fakeRow = {
  id: 0,
  round: `Finals`,
  comp: "All",
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
for (let i = 0; i < 50; i++)
  fakeRows.push({ ...fakeRow, id: Math.floor(Math.random() * 1000) });

function StatsPlayoffsTable() {
  return (
    <Table
      headings={Object.keys(fakeRow).filter((h) => h !== "id")}
      items={fakeRows}
      _key={"id"}
      hide={["id"]}
    />
  );
}

export default StatsPlayoffsTable;
