import { useState } from "react"

function TeamDataTableToggle() {
    const [selected, setSelected] = useState('Teams')

    return (
        <div id="team-table-toggle-container">
            <div id="team-table-toggle">
                <button onClick={() => setSelected('Teams')} className={selected == 'Teams' ? 'active' : ''}>Teams</button>
                <button onClick={() => setSelected('Comps')} className={selected != 'Teams' ? 'active' : ''}>Comps</button>
            </div>
        </div>
    )
}

export default TeamDataTableToggle