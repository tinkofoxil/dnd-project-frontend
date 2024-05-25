import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';

const ProfileCreate = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [image, setImage] = useState(null);
    const [race, setRace] = useState("");
    const [class_name, setClassName] = useState("");
    const [level, setLevel] = useState("");
    const [charisma, setCharisma] = useState("");
    const [description, setDescription] = useState("");
    const [strength, setStrength] = useState("");
    const [dexterity, setDexterity] = useState("");
    const [constitution, setConstitution] = useState("");
    const [intelligence, setIntelligence] = useState("");
    const [wisdom, setWisdom] = useState("");
    const history = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("access");
      // получение токена из локального хранилища
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/profile/",
          { name, image, age, race, class_name, level, charisma, description, strength, dexterity, constitution, intelligence, wisdom },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setName("");
        setImage("");
        setAge("");
        setRace("");
        setClassName("");
        setLevel("");
        setCharisma("");
        setDescription("");
        setStrength("");
        setDexterity("");
        setConstitution("");
        setIntelligence("");
        setWisdom("");
        if (response.ok) {
          history('/');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Container fluid className="characterCreationPage py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form className="ProfileCreate" onSubmit={handleSubmit}>
              <h2 className="mb-4">Создать персонажа</h2>
                <Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>Имя:</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="age">
                    <Form.Label>Возраст:</Form.Label>
                    <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="image">
                <Form.Label>Фотка:</Form.Label>
                <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
              </Form.Group>
              <Row>
                <Col>
                <Form.Group controlId="race">
                  <Form.Label>Раса:</Form.Label>
                  <Form.Select value={race} onChange={(e) => setRace(e.target.value)}>
                    <option value="">Выберите расу</option>
                    <option value="Драконорожденный">Драконорожденный</option>
                    <option value="Дварф">Дварф</option>
                    <option value="Эльф">Эльф</option>
                    <option value="Гном">Гном</option>
                    <option value="Полуэльф">Полуэльф</option>
                    <option value="Полуорк">Полуорк</option>
                    <option value="Халфлинг">Халфлинг</option>
                    <option value="Человек">Человек</option>
                    <option value="Тифлинг">Тифлинг</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="class_name">
                  <Form.Label>Класс:</Form.Label>
                  <Form.Select value={class_name} onChange={(e) => setClassName(e.target.value)}>
                    <option value="">Выберите класс</option>
                    <option value="Бард">Бард</option>
                    <option value="Варвар">Варвар</option>
                    <option value="Воин">Воин</option>
                    <option value="Волшебник">Волшебник</option>
                    <option value="Друид">Друид</option>
                    <option value="Жрец">Жрец</option>
                    <option value="Колдун">Колдун</option>
                    <option value="Монах">Монах</option>
                    <option value="Паладин">Паладин</option>
                    <option value="Плут">Плут</option>
                    <option value="Следопыт">Следопыт</option>
                    <option value="Чародей">Чародей</option>
                  </Form.Select>
                </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="level">
                <Form.Label>Уровень:</Form.Label>
                <Form.Control type="number" value={level} onChange={(e) => setLevel(e.target.value)} />
              </Form.Group>
              <Row>
                <Col>
                <Form.Group controlId="charisma">
                  <Form.Label>Харизма:</Form.Label>
                  <Form.Control type="number" value={charisma} onChange={(e) => setCharisma(e.target.value)} />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="strength">
                  <Form.Label>Сила:</Form.Label>
                  <Form.Control type="number" value={strength} onChange={(e) => setStrength(e.target.value)} />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="dexterity">
                  <Form.Label>Ловкость:</Form.Label>
                  <Form.Control type="number" value={dexterity} onChange={(e) => setDexterity(e.target.value)} />
                </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Form.Group controlId="constitution">
                  <Form.Label>Телосложение:</Form.Label>
                  <Form.Control type="number" value={constitution} onChange={(e) => setConstitution(e.target.value)} />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="intelligence">
                  <Form.Label>Интеллект:</Form.Label>
                  <Form.Control type="number" value={intelligence} onChange={(e) => setIntelligence(e.target.value)} />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="wisdom">
                  <Form.Label>Мудрость:</Form.Label>
                  <Form.Control type="number" value={wisdom} onChange={(e) => setWisdom(e.target.value)} />
                </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="description">
                <Form.Label>Описание:</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Создать
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
export default ProfileCreate;