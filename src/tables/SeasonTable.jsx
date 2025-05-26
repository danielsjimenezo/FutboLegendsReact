import Table from './Table.jsx'

const fakeRow = {
    Season: "2020/2021",
    Team: {
        type: "img",
        src: "/images/Teams/Bayern Munich.png"
    },
    Games: 1,
    Wins: 1,
    Goals: 1,
    Assists: 1,
    Contributions: 1,
    Efficiency: 1,
    "Team ": 1,
    "Individual": 1
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
    fakeRows.push({...fakeRow})
    fakeExpandables.push(fakeExpandable)
}


function SeasonTable() {
    return (
        <Table
            headings={Object.keys(fakeRow).filter((h) => h !== "id")}
            items={fakeRows}
            expandables={fakeExpandables}
            _key={"id"}
            hide={["id"]}
            id="stats-teams-table"
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

export default SeasonTable;