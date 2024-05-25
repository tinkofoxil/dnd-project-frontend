import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, ListGroup, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const [isProfileDeleted, setIsProfileDeleted] = useState(false);
  const userId = localStorage.getItem('user_id');
  const history = useNavigate();
  
  // Состояние для модального окна добавления предмета
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const handleShowAddItemModal = () => setShowAddItemModal(true);
  const handleCloseAddItemModal = () => setShowAddItemModal(false);
  
  // Состояния для формы добавления предмета
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  
  // Функция для отправки POST-запроса для добавления предмета
  const handleAddItem = () => {
    fetch('http://127.0.0.1:8000/api/v1/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify({
        name: itemName,
        description: itemDescription
      })
    })
    .then(response => response.json())
    .then(data => {
      // Создаем предмет и привязываем его к профилю персонажа
      fetch('http://127.0.0.1:8000/api/v1/inventories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({
          character: id,
          item: data.id
        })
      })
      .then(() => {
        // Обновляем профиль с новым предметом
        fetch(`http://127.0.0.1:8000/api/v1/profile/${id}`)
          .then((res) => res.json())
          .then((data) => setProfile(data))
          .catch((error) => console.error(error));
        handleCloseAddItemModal();
      })
      .catch((error) => console.error(error));
    })
    .catch(error => console.error(error));
  };
  
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleDeleteProfile = () => {
    fetch(`http://127.0.0.1:8000/api/v1/profile/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(() => {
        setIsProfileDeleted(true);
        setTimeout(() => {
          setIsProfileDeleted(false);
          history('/profiles');
        }, 3000);
      })
      .catch((error) => console.error(error));
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundImage: "url('https://wallpaperaccess.com/full/2067062.jpg')", backgroundSize: "cover" }}>
      <Row className="justify-content-center mt-4">
        <Col md={10}>
          {isProfileDeleted && (
            <Alert variant="success" className="mb-3 text-center">
              Профиль персонажа был успешно удален!
            </Alert>
          )}
          <Card className="text-center shadow-lg rounded">
            <Card.Header className="bg-dark text-white" style={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
              <h1>{profile.name}</h1>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img variant="top" src={profile.image} style={{ height: "100%", objectFit: "cover", borderRadius: "10px", border: "5px solid #333" }} />
                </Col>
                <Col md={8}>
                  <Card.Text className="text-left" style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}>{profile.description}</Card.Text>
                  <ListGroup variant="flush" className="text-left">
                    <ListGroup.Item className="bg-secondary text-white rounded-top" style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Раса и Класс</strong></ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Раса:</strong> {profile.race}</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Класс:</strong> {profile.class_name}</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Уровень:</strong> {profile.level}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white rounded-top" style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Характеристики</strong></ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Возраст:</strong> {profile.age}</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Сила:</strong> {profile.strength} ({profile.strength_modifier})</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Ловкость:</strong> {profile.dexterity} ({profile.dexterity_modifier})</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Телосложение:</strong> {profile.constitution} ({profile.constitution_modifier})</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Интеллект:</strong> {profile.intelligence} ({profile.intelligence_modifier})</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Мудрость:</strong> {profile.wisdom} ({profile.wisdom_modifier})</ListGroup.Item>
                    <ListGroup.Item style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}><strong>Харизма:</strong> {profile.charisma} ({profile.charisma_modifier})</ListGroup.Item>
                  </ListGroup>
                  <Card.Link as={Link} to={`/account/${profile.user_id}`} className="text-muted" style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}>Автор: {profile.user}</Card.Link>
                  {profile.user_id === parseInt(userId) && (
                    <div className="mt-3">
                      <Button variant="primary" as={Link} to={`/profiles/${id}/edit/`} className="mr-2">
                        Редактировать персонажа
                      </Button>
                      <Button variant="danger" onClick={handleDeleteProfile}>
                        Удалить персонажа
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
              <Card.Title className="mt-4 text-left" style={{ fontFamily: "'Garamond', serif", fontSize: "1.5rem" }}><strong>Инвентарь</strong></Card.Title>
              <ListGroup className="text-left">
                {profile.inventory.map((inv, index) => (
                  inv.items.map(item => (
                    <ListGroup.Item key={item.id} style={{ fontFamily: "'Garamond', serif", fontSize: "1.2rem" }}>
                      <strong>{item.name}</strong>: {item.description}
                      {item.image && <Card.Img variant="top" src={item.image} style={{ height: "100px", width: "100px", objectFit: "cover", borderRadius: "10px", border: "2px solid #333", marginLeft: "10px" }} />}
                    </ListGroup.Item>
                  ))
                ))}
              </ListGroup>
              {localStorage.getItem('access') && (
                <Button variant="primary" onClick={handleShowAddItemModal} className="mt-3">
                  Добавить предмет в инвентарь
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Модальное окно для добавления предмета */}
      <Modal show={showAddItemModal} onHide={handleCloseAddItemModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить предмет в инвентарь</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="itemName">
              <Form.Label>Название предмета</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название предмета"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="itemDescription">
              <Form.Label>Описание предмета</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите описание предмета"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddItemModal}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Добавить предмет
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;

