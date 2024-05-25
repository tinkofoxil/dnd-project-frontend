import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Account from './Account';

const UserAccount = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const [isFriendAdded, setIsFriendAdded] = useState(false);
  const { id } = useParams();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/v1/users/${id}`);
        await fetch(`http://127.0.0.1:8000/api/v1/user/${result.data.pk}/profiles`)
          .then((res) => res.json())
          .then((data) => setProfile(data))
          .catch((error) => console.error(error));
        setUser(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleAddFriend = () => {
    axios.post(`http://127.0.0.1:8000/api/v1/users/${id}/friend/`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    })
      .then((response) => {
        console.log(response);
        setIsFriendAdded(true);
      })
      .catch((error) => {
        setError(error.response.data.non_field_errors);
      });
  };
  if (user.pk === parseInt(userId)) {
    return (
      <Account/>
    )
  }
  else {
    return (
      <Container className="py-5">
        <div className="account-page">
          <Row>
            <Col md={6}>
              <div className="account-container p-4 shadow rounded">
                <h1 className="mb-4">Аккаунт</h1>
                <h3>Имя пользователя: {user.username}</h3>
                <Button onClick={handleAddFriend}>Добавить в друзья</Button>
                {error && <div className="notification">{error}</div>}
                {isFriendAdded && <div className="notification">Успешное добавление в друзья!</div>}
              </div>
              {profile.results?.map(item => (
                <Card key={item.pk} className="account-profile-container mt-4">
                  <Card.Body>
                    <div className="account-profile-header">
                      <h1>{item.name}</h1>
                      <Image src={item.image} alt="Character Portrait" fluid rounded />
                    </div>
                    <div className="account-profile-body">
                      <div className="account-profile-section">
                        <h2>Краткая инфа</h2>
                        <ul>
                          <li>Возраст: {item.age}</li>
                          <li>Раса: {item.race}</li>
                          <li>Класс: {item.class_name}</li>
                          <li>Уровень: {item.level}</li>
                        </ul>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
};

export default UserAccount;
