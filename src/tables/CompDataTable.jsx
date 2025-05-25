import BelowImageTable from "../pages/profilePage/BelowImageTable.jsx"

function CompDataTable({ player }) {
  // DUMMY DATA, REMOVE LATER
  const comps = [
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
    { name: "COMP", games: 1, goals: 1 },
  ]

  return (
    <BelowImageTable
      headings={["Comp", "MP", "G", "A", "GC", "GE"]}
      rows={comps.map(comp => {
        return {
          key: `comp-${comp.name}-${Math.random()}`,
          items: [
            {
              type: "logo",
              name: comp.name,
              img: `null.svg`
            },
            { value: comp.games },
            { value: comp.goals },
            { value: 1 },
            { value: 1 },
            { value: 1 },
          ]
        }
      })}
      totals={[
        1, 1, 1, 1, 1
      ]}
      gtc="1.3fr 1fr 1fr 1fr 1fr 1fr"
    />
  )

}

export default CompDataTable
