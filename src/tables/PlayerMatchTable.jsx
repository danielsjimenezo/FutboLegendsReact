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
    // Result: "W",
    Goals: 2,
    Assists: 1,
    Shots: 4,
    Chances: 7,
    Dribbles: 92,
    // Takeons: 45,
    // Passes: 122
}


const fakeExpandable = {
    type: 'videos',
    items: [
        {
            title: 'Lionel Messi Career Highlights',
            channel: 'The Highlight Factory',
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ht1wQJTpNAA?si=EZgG-cl9qwZxhfgX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        },
        {
            title: 'Lionel Messi - 100 Magical Dribbling Skills',
            channel: 'Fad3nHD',
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nA8wHQvHPJU?si=HUUL4FN4aZIYO2W-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        }
    ]
}

const fakeRows = []
const fakeExpandables = []
for (let i = 0; i < 50; i++) {
    fakeRows.push({...fakeRow, "#": Math.floor(Math.random()*1000)})
    fakeExpandables.push(fakeExpandable)
}

function PlayerMatchTable() {
    return (
        <Table
            headings={Object.keys(fakeRow)}
            items={fakeRows}
            expandables={fakeExpandables}
            _key={"number"}
            id="player-match-table"
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
            cellPaddingY='7.5px'
        />
    )
}

export default PlayerMatchTable;