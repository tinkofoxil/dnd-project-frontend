import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// import '../css/main.css';
import character from "../assets/img/character.png"
import monster from "../assets/img/monster.png"
import map from "../assets/img/map.png"

function Main() {
  return (
    <Container fluid className="py-5">
      <main>
        <section>
          <h2>Добро пожаловать на ДНД сайт</h2>
          <p>Здесь вы можете найти все, что вам нужно для создания своих собственных персонажей, монстров и приключений. Присоединяйтесь к нашему сообществу и делитесь своими творениями с другими игроками!</p>
        </section>
        <section>
          <h2>Рекомендуемый контент</h2>
          <Row className="featured-content-container">
            <Col md={4}>
              <Card className="featured-content-item h-100">
                <Card.Img variant="top" src={character} alt="Featured content" />
                <Card.Body>
                  <Card.Title>Создать персонажа</Card.Title>
                  <Card.Text>
                    Создавайте и настраивайте своих собственных персонажей DND с помощью нашего простого в использовании character creator.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="featured-content-item h-100">
                <Card.Img variant="top" src={monster} alt="Featured content" />
                <Card.Body>
                  <Card.Title>Генератор монстра</Card.Title>
                  <Card.Text>
                    Создавайте уникальных монстров с помощью нашего генератора монстров. Выбирайте из множества способностей и черт характера.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="featured-content-item h-100">
                <Card.Img variant="top" src={map} alt="Featured content" />
                <Card.Body>
                  <Card.Title>Планировщик приключений</Card.Title>
                  <Card.Text>
                    Спланируйте свое следующее приключение с помощью нашего планировщика приключений. Создавайте пользовательские встречи и точки построения.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </main>
    </Container>
  );
}

export default Main;
