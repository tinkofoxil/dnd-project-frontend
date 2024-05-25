import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function About() {
  return (
    <Container fluid className="about-container py-5">
      <h1>О проекте</h1>
      <Row>
        <Col>
          <p>
            Привет, дорогой друг! Я автор проекта DND :) Здесь можно удобно хранить данные профилей/анкет ваших персонажей из ДНД игр.
            Это мой первый опыт создания клиентского приложения на React, так что прошу прощения за возможные недочеты.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
