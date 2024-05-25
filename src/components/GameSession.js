import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const GameSession = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    axios.get(`http://127.0.0.1:8000/api/v1/gamessessions/${sessionId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSession(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the game session!', error);
    });
  }, [sessionId]);

  const handleEndSession = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/v1/gamessessions/${sessionId}/end/`);
      alert('Game session ended.');
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Game Session</Card.Header>
            <Card.Body>
              <Card.Title>{session.game.name}</Card.Title>
              <Card.Text>Current Round: {session.current_round}</Card.Text>
              <Button variant="danger" onClick={handleEndSession}>End Session</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Player Actions</Card.Header>
            <ListGroup variant="flush">
              {actions.map(action => (
                <ListGroup.Item key={action.id}>
                  <strong>{action.player.user.username}</strong>: {action.action_type} - {action.description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GameSession;
