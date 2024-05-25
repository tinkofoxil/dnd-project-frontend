import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Image, Button, Modal, Row, Col } from 'react-bootstrap';

const GameDetail = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/games/${gameId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGame(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCharacters = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/gameusers/?game=${gameId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const characterIds = response.data.results.map(gameUser => gameUser.profile);
        const charactersData = await Promise.all(characterIds.map(id =>
          axios.get(`http://127.0.0.1:8000/api/v1/profile/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ));
        setCharacters(charactersData.map(character => character.data));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/gameusers/?game=${gameId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userIds = response.data.results.map(gameUser => gameUser.user);
        const usersData = await Promise.all(userIds.map(id =>
          axios.get(`http://127.0.0.1:8000/api/v1/users/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ));
        setUsers(usersData.map(user => user.data));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/users/friends`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFriends(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGame();
    fetchCharacters();
    fetchUsers();
    fetchFriends();
  }, [gameId]);

  const handleInvite = async (friendId) => {
    try {
      const token = localStorage.getItem('access');
      await axios.post(`http://127.0.0.1:8000/api/v1/invitations/`, {
        game: gameId,
        recipient: friendId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowInviteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowCharacterModal(true);
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="py-4" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/2067062.jpg')", backgroundSize: "cover", minHeight: "100vh" }}>
      <Card className="mb-4" style={{ borderRadius: "10px"}}>
        <Card.Body>
          <Card.Title className="text-center" style={{ fontSize: "2.5rem", fontFamily: "'Garamond', serif" }}>{game.name}</Card.Title>
          <Card.Text className="text-center" style={{ fontSize: "1.2rem", fontFamily: "'Garamond', serif" }}>Статус: {game.status}</Card.Text>
          <Card.Text className="text-center" style={{ fontSize: "1.2rem", fontFamily: "'Garamond', serif" }}>Дата начала: {game.start_time || 'Not started yet'}</Card.Text>
          <Card.Text className="text-center" style={{ fontSize: "1.2rem", fontFamily: "'Garamond', serif" }}>Дата конца: {game.finish_time || 'Not finished yet'}</Card.Text>
          <Button variant="primary" className="mx-auto d-block" onClick={() => setShowInviteModal(true)}>Пригласить друга</Button>
        </Card.Body>
      </Card>

      <Row>
        {characters.map(character => (
          <Col md={4} key={character.pk} className="mb-4">
            <Card style={{ borderRadius: "10px", cursor: "pointer" }} onClick={() => handleCharacterClick(character)}>
              <Card.Img variant="top" src={character.image} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", height: "300px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontFamily: "'Garamond', serif" }}>{character.name}</Card.Title>
                <Card.Text style={{ fontSize: "1.2rem", fontFamily: "'Garamond', serif" }}>Раса: {character.race}</Card.Text>
                <Card.Text style={{ fontSize: "1.2rem", fontFamily: "'Garamond', serif" }}>Класс: {character.class_name}</Card.Text>
                <Card.Text style={{ fontSize: "1.2rem", fontFamily: "'Garamond', serif" }}>Уровень: {character.level}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {users.map(user => (
          <Col md={4} key={user.pk} className="mb-4">
            <Card style={{ borderRadius: "10px" }}>
              <Card.Body className="d-flex align-items-center">
                <Image src={user.avatar} roundedCircle width="50" height="50" className="me-3" />
                <div>
                  <Card.Title style={{ fontSize: "1.5rem", fontFamily: "'Garamond', serif" }}>{user.username}</Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Character Detail Modal */}
      <Modal show={showCharacterModal} onHide={() => setShowCharacterModal(false)} size="lg">
        {selectedCharacter && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCharacter.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col md={4}>
                    <Image src={selectedCharacter.image} roundedCircle fluid />
                  </Col>
                  <Col md={8}>
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Раса:</strong> {selectedCharacter.race}</ListGroup.Item>
                      <ListGroup.Item><strong>Класс:</strong> {selectedCharacter.class_name}</ListGroup.Item>
                      <ListGroup.Item><strong>Уровень:</strong> {selectedCharacter.level}</ListGroup.Item>
                      <ListGroup.Item><strong>Сила:</strong> {selectedCharacter.strength} ({selectedCharacter.strength_modifier})</ListGroup.Item>
                      <ListGroup.Item><strong>Ловкость:</strong> {selectedCharacter.dexterity} ({selectedCharacter.dexterity_modifier})</ListGroup.Item>
                      <ListGroup.Item><strong>Телосложение:</strong> {selectedCharacter.constitution} ({selectedCharacter.constitution_modifier})</ListGroup.Item>
                      <ListGroup.Item><strong>Интеллект:</strong> {selectedCharacter.intelligence} ({selectedCharacter.intelligence_modifier})</ListGroup.Item>
                      <ListGroup.Item><strong>Мудрость:</strong> {selectedCharacter.wisdom} ({selectedCharacter.wisdom_modifier})</ListGroup.Item>
                      <ListGroup.Item><strong>Харизма:</strong> {selectedCharacter.charisma} ({selectedCharacter.charisma_modifier})</ListGroup.Item>
                      <ListGroup.Item><strong>Оружие:</strong> {selectedCharacter.weapon}</ListGroup.Item>
                      <ListGroup.Item><strong>Броня:</strong> {selectedCharacter.armor}</ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCharacterModal(false)}>Close</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Invite Modal */}
      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invite Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {friends.map(friend => (
              <ListGroup.Item key={friend.pk} className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Image src={friend.friend.avatar} roundedCircle width="30" height="30" className="me-2" />
                  <div className="ms-2">{friend.friend.username}</div>
                </div>
                <Button variant="success" onClick={() => handleInvite(friend.friend.pk)}>+</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInviteModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GameDetail;
