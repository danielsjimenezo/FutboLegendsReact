import TableTd from "./TableTd.jsx";
import TableExpandable from "./TableExpandable.jsx";
import { useState, useEffect } from "react";

const closeAllExpandablesEvent = new CustomEvent('closeallexpandables')

function TableRow({ entries, expandable }) {
    const [expandableShown, setExpandableShown] = useState(false)

    const handleClick = () => {
        if (!expandable) return;
        document.dispatchEvent(closeAllExpandablesEvent)
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
                {entries.map(([k, v]) => {
                    const key = Math.random();
                    return <TableTd key={key} k={k} v={v} />;
                })}
            </tr>
            {(expandable && expandableShown) && (
                <tr>
                    <td colSpan={10000}>
                        <TableExpandable expandable={expandable} />
                    </td>
                </tr>
            )}
        </>
    )
}

export default TableRow;