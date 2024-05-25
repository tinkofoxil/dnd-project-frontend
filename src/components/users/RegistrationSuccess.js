import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import cat from "../../assets/img/cat.gif";

const RegistrationSuccess = () => {
  return (
    <Container fluid className="RegistrationSuccessPage bg-light text-center py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>Успешная регистрация ❤️</h2>
          <img src={cat} alt="cat" className="img-fluid mb-4" />
          <p>Ваш аккаунт создан. Добро пожаловать!</p>
          <Link to="/" className="btn btn-primary">Вернуться на главную</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationSuccess;
