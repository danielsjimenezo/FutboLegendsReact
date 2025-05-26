import TableTd from "./TableTd.jsx";
import TableExpandable from "./TableExpandable.jsx";
import { useState, useEffect } from "react";

const closeAllExpandablesEvent = new CustomEvent('closeallexpandables')

function TableRow({ entries, expandable, columnWidths = [], cellPaddingY = "10px", cellHeight = "auto" }) {
    const [expandableShown, setExpandableShown] = useState(false)

    const handleClick = () => {
        if (!expandable) return;
        document.dispatchEvent(closeAllExpandablesEvent)
        console.log(expandable)
        setExpandableShown(!expandableShown)
    }

    const handleCloseAll = () => {
        setExpandableShown(false)
    }


    document.addEventListener('closeallexpandables', handleCloseAll)


    useEffect(() => {
        return () => {
            document.removeEventListener('closeallexpandables', handleCloseAll)
        }
    })

    return (
        <>
            <tr 
                className="trPillHover"
                onClick={handleClick}
                role="button"
                tabIndex={-1}
            >
                {entries.map(([k, v], i) => {
                    const key = Math.random();
                    return <TableTd key={key} k={k} v={v} width={columnWidths[i] || 'auto'} cellPaddingY={cellPaddingY} cellHeight={cellHeight} />;
                })}
            </tr>
            {(expandable && expandableShown) && (
                <TableExpandable expandable={expandable} cellPaddingY={cellPaddingY} cellHeight={cellHeight} />
            )}
        </>
    )
}

export default TableRow;