import { useState } from "react"

function TeamDataTableToggle({ tableShown, fn }) {

    return (
        <div id="team-table-toggle-container">
            <div id="team-table-toggle">
                <button onClick={fn} className={tableShown == 'team' ? 'active' : ''}>Teams</button>
                <button onClick={fn} className={tableShown != 'team' ? 'active' : ''}>Comps</button>
            </div>
        </div>
    )
}

export default TeamDataTableToggle