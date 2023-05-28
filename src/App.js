import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tournaments, setTournaments] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tournaments');
      setTournaments(response.data);
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
    }
  };

  const fetchParticipants = async (tournamentId) => {
    try {
      const response = await axios.get(`http://localhost:3000/participants/${tournamentId}`);
      setParticipants(response.data);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    }
  };

  return (
    <div>
      <h1>Tournament System</h1>

      <h2>Tournaments</h2>
      {tournaments.map((tournament) => (
        <div key={tournament._id}>
          <p>Name: {tournament.name}</p>
          <p>Start Date: {tournament.startDate}</p>
          <p>End Date: {tournament.endDate}</p>
          <p>Status: {tournament.status}</p>
          <button onClick={() => fetchParticipants(tournament._id)}>View Participants</button>
        </div>
      ))}

      <h2>Participants</h2>
      {participants.map((participant) => (
        <div key={participant._id}>
          <p>Name: {participant.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
