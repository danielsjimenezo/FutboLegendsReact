import Table from './Table.jsx'

const fakeRow = {
    "#": 981,
    Date: `04/21/25`,
    Team: {
        type: 'img',
        src: '/images/Teams/Bayern Munich.png'
    },
    "Opp.": {
        type: 'img',
        src: '/images/Teams/Colombia.png'
    },
    Score: "3 - 1",
    Result: "W",
    Goals: 2,
    Assists: 1,
    SoT: 4,
    cc: 7,
    touches: 92,
    pc: 45,
    dc: 12
}

const fakeExpandable = [
    {title: "Expandable content title", src: "https://picsum.photos/seed/futbol/500/300"},
    {title: "Expandable content title", src: "https://picsum.photos/seed/futbol/500/300"},
]

const fakeRows = []
const fakeExpandables = []
for (let i = 0; i < 50; i++) {
    fakeRows.push({...fakeRow, number: Math.floor(Math.random()*1000)})
    fakeExpandables.push(fakeExpandable)
}

function PlayerMatchTable() {
    return (
        <Table
            headings={Object.keys(fakeRow)}
            items={fakeRows}
            expandables={fakeExpandables}
            _key={"number"}
        />
    )
}

export default PlayerMatchTable;