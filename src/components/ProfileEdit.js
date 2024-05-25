import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/profile/${id}/`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedProfile = Object.fromEntries(formData.entries());

    // Convert the 'age' and 'level' fields to numbers before sending
    updatedProfile.age = Number(updatedProfile.age);
    updatedProfile.level = Number(updatedProfile.level);

    fetch(`http://127.0.0.1:8000/api/v1/profile/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify(updatedProfile)
    })
    .then(() => history(`/profile/${id}`))
    .catch((error) => console.error(error));
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Редактировать персонажа</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Имя персонажа</Form.Label>
              <Form.Control type="text" name="name" defaultValue={profile.name} />
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Label>Возраст</Form.Label>
              <Form.Control type="number" name="age" defaultValue={profile.age} />
            </Form.Group>

            {/* Add more form fields for the other character attributes */}

            <Button variant="primary" type="submit">
              Сохранить изменения
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;