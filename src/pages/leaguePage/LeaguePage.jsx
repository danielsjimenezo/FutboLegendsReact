import './LeaguePage.css'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { leagues, topAssisters, topScorers } from '../../utilities/dummy-data.js';
import TeamOfTheWeek from './TeamOfTheWeek.jsx';
import TopPlayersList from '../../misc/TopPlayersList.jsx';
import { selectPlayerState } from '../../context/playerSlice.js';
import { useSelector } from 'react-redux';

function LeaguePage() {

    const [tab, setTab] = useState('Recent Matches') // or 'League Standings'

    const { leagueId } = useParams()
    const league = leagues.find(l => l.id == leagueId)

    const { getRandomPlayers } = useSelector(selectPlayerState)

    if (!league) return (
        <>
            <p>League not found. Check the URL.</p>
        </>
    )

    return (
        <>
            <div className="container league-page">
                <div className="left">
                    <TeamOfTheWeek players={getRandomPlayers(11)} />
                </div>
                <div className="center">
                    <div className="tabs">
                        <button
                            className={`${tab == 'Recent Matches' ? 'active' : ''}`}
                            onClick={() => setTab('Recent Matches')}
                        >
                            Recent Matches
                        </button>
                        <button
                            className={`${tab == 'League Standings' ? 'active' : ''}`}
                            onClick={() => setTab('League Standings')}
                        >
                            League Standings
                        </button>
                    </div>
                </div>
                <div className="right">
                    <TopPlayersList scorers={topScorers} assisters={topAssisters} />
                </div>
            </div>
        </>
    )
}

export default LeaguePage;