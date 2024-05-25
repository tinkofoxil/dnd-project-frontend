import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/users/', {
      method: 'POST',
      body: formData, // отправляем FormData
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      history('/register/success');
    } else {
      if (data.username) { setError(data.username);}
      if (data.password) { setError(data.password);}
      if (data.avatar) { setError(data.avatar);}
    }
  };

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6}>
          <Card>
            <Card.Body>
              <h2 className="mb-4 text-center">Регистрация</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="py-2">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="email" className="py-2">
                  <Form.Label>Почта</Form.Label>
                  <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="password" className="py-2">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Играть!
                </Button>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const Register = () => {
  return (
    <div>
      <Registration />
    </div>
  )
};

export default Register;
