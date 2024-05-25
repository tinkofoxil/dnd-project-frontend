import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GameSessionsList = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/gamessessions/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.results)) {
          setSessions(response.data.results);
        } else {
          setSessions([]);
        }
      } catch (error) {
        console.error(error);
        setSessions([]);
      }
    };

    fetchSessions();
  }, []);

  const handleStartSession = async (gameId) => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/games/${gameId}/start/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        alert('Game session started.');
        setSessions([...sessions, response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        {sessions.map((session) => (
          <Col key={session.id} md={4}>
            <Card className="mb-4">
              <Card.Header>{session.game}</Card.Header>
              <Card.Body>
                <Card.Title>Round {session.current_round}</Card.Title>
                <Link to={`/sessions/${session.id}`}>
                  <Button variant="primary">View Session</Button>
                </Link>
                <Button
                  variant="success"
                  className="ms-2"
                  onClick={() => handleStartSession(session.id)}
                >
                  Start New Session
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GameSessionsList;
