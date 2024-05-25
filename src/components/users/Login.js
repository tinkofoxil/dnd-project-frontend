import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('access', data.access);
      const result = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
      });
      localStorage.setItem('user_id', result.data.id)
      history('/');
      window.location.reload();
    } else {
      if (data.username) { setError(data.username);}
      if (data.password) { setError(data.password);}
      if (data.detail) { setError(data.detail);}
    }
  };

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6}>
          <Card>
            <Card.Body>
              <h2 className="mb-4 text-center">Войти</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="py-2">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="password" className="py-2">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Войти
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

export default Login;