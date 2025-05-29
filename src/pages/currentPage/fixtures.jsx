import React, { useEffect, useState } from "react";
import { getTodayFixtures, fetchGoalscorers } from "../../misc/footballAPI.jsx";
import MatchCard from "./MatchCard.jsx";

const TodayFixtures = ({ date }) => {
  const [fixtures, setFixtures] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const data = await getTodayFixtures(date);
        console.log(data);
        setFixtures(data);
        const goals = await fetchGoalscorers(data[0].fixture.id);
        setGoals(goals);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, [date]);

  if (loading) return <p>loading...</p>;

  return (
    <div>
      {fixtures.length > 0 ? (
        <ul>
          {fixtures.map((fixture) => (
            <MatchCard
            homeTeam={fixture.teams.home.name}
            awayTeam={fixture.teams.away.name}
            homeScore={fixture.goals.home}
            awayScore={fixture.goals.away}
            competition={fixture.league.name}
            goals={goals.map((goal) => ({
              scorer: goal.player.name,
              team: goal.team.name,
              minute: goal.time.elapsed
            }))}
          />
          ))}
        </ul>
      ) : (
        <p>No hay partidos hoy en esta liga.</p>
      )}
    </div>
  );
};

export default TodayFixtures;
