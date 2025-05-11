import Table from './Table.jsx'

const fakeRow = {
    number: 981,
    date: `04/21/25`,
    team: {
        type: 'img',
        src: '/images/Teams/Bayern Munich.png'
    },
    opp: {
        type: 'img',
        src: '/images/Teams/Colombia.png'
    },
    score: "3 - 1",
    goals: 2,
    assists: 1,
    sot: 4,
    cc: 7,
    touches: 92,
    pc: 45,
    dc: 12
}

const fakeRows = []
for (let i = 0; i < 50; i++) fakeRows.push({...fakeRow, number: Math.floor(Math.random()*1000)})

function PlayerMatchTable() {
    return (
        <Table
            headings={Object.keys(fakeRow)}
            items={fakeRows}
            _key={"number"}
        />
    )
}

export default PlayerMatchTable;