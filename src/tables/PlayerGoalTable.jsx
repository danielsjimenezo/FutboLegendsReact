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
    comp: "UCL",
    min: "25'",
    type: "Penalty",
    body: 'Right',
    stakes: 'Qtr Final',
    assister: 'M. Ozil'
}

const fakeRows = []
for (let i = 0; i < 50; i++) fakeRows.push({...fakeRow, number: Math.floor(Math.random()*1000)})

function PlayerGoalTable() {
    return (
        <Table
            headings={Object.keys(fakeRow)}
            items={fakeRows}
            _key={"number"}
        />
    )
}

export default PlayerGoalTable;