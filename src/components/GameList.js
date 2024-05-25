import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/games/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGames(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Row>
        {games.map((game) => (
          <Col key={game.pk} md={4}>
            <Card className="mb-4">
              <Card.Header>{game.name}</Card.Header>
              <Card.Body>
                <Card.Title>Статус: {game.status}</Card.Title>
                <Card.Text>
                  Дата начала: {game.start_time ? new Date(game.start_time).toLocaleString() : 'N/A'}
                </Card.Text>
                <Card.Text>
                  Дата завершения: {game.finish_time ? new Date(game.finish_time).toLocaleString() : 'N/A'}
                </Card.Text>
                <Button variant="primary" href={`/games/${game.pk}`}>View Game</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GameList;
