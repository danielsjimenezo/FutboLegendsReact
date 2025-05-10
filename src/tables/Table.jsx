import './Table.css'
import TableTd from './TableTd.jsx'
import { useState } from 'react'

function Table({ headings, items, _key }) {

    const [page, setPage] = useState(0)

    const start = page * 10
    const end = (page+1) * 10
    const totalPages = Math.ceil(items.length/10)

    const shownItems = items.slice(start, end)

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {headings.map(h => {
                            return (
                                <th key={h}>{h}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {shownItems.map(item => {
                        return (
                            <tr key={item[_key]}>
                                {Object.entries(item).map(([k,v]) => {
                                    const key = Math.random()
                                    return <TableTd key={key} k={k} v={v} />
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination">
                {page > 0 && (
                    <button onClick={() => setPage(page-1)}>Prev</button>
                )}
                {page < totalPages-1 && (
                    <button onClick={() => setPage(page+1)}>Next</button>
                )}
            </div>
        </>
    )
}

export default Table;