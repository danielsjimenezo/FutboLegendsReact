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
    "Comp.": "UCL",
    Min: "25'",
    Type: "Penalty",
    Body: 'Right',
    Stakes: 'Qtr Final',
    Assist: 'M. Ozil'
}

const fakeRows = []
for (let i = 0; i < 50; i++) fakeRows.push({...fakeRow, "#": Math.floor(Math.random()*1000)})

function PlayerGoalTable() {
    return (
        <Table
            headings={Object.keys(fakeRow)}
            items={fakeRows}
            _key={"#"}
            id="player-goal-table"
        />
    )
}

export default PlayerGoalTable;