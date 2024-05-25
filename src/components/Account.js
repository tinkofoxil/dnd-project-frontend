import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutButton from './users/LogoutButton';
import axios from 'axios';
import UploadAvatarModal from './users/UploadAvatarModal';

const Account = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleShowUploadModal = () => setShowUploadModal(true);
  const handleCloseUploadModal = () => setShowUploadModal(false);

  const updateAvatar = (newAvatar) => {
    setUser({ ...user, avatar: newAvatar });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/v1/users/${localStorage.getItem('user_id')}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        await fetch(`http://127.0.0.1:8000/api/v1/user/${result.data.pk}/profiles`)
          .then((res) => res.json())
          .then((data) => setProfile(data))
          .catch((error) => console.error(error));
        const friendList = await axios.get(`http://127.0.0.1:8000/api/v1/users/friends/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        setFriends(friendList.data);
        setUser(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="py-5">
      <div className="account-page">
        <Row>
          <Col md={6}>
            <div className="account-container p-4 shadow rounded">
              <h1 className="mb-4">Аккаунт</h1>
              <div className="avatar-container mb-3" onClick={handleShowUploadModal}>
                <Image src={user.avatar} thumbnail style={{ cursor: 'pointer' }} />
              </div>
              <p className="mb-2">
                <strong>Имя пользователя:</strong> {user.username}
              </p>
              <p className="mb-4">
                <strong>Почта:</strong> {user.email}
              </p>
              <div className="mb-4">
                <Button variant="primary" className="me-2">
                  Настройки аккаунта
                </Button>
                <LogoutButton />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="friend-list-container p-4 shadow rounded">
              <h2 className="mb-4">Список друзей</h2>
              {friends.results?.map((item) => (
                <Card key={item.pk} className="account-profile-container mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <Image src={item.friend.avatar} rounded fluid />
                      </Col>
                      <Col xs={9}>
                        <Link to={`/account/${item.friend.pk}`} className="text-decoration-none">
                          {item.friend.username}
                        </Link>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <div className="character-list-container p-4 shadow rounded">
              <h2 className="mt-5 mb-4">Список персонажей</h2>
              {profile.results?.map((item) => (
                <Card key={item.pk} className="account-profile-container mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <Image src={item.image} rounded fluid />
                      </Col>
                      <Col xs={9}>
                        <Link to={`/profiles/${item.pk}`} className="text-decoration-none">
                          {item.name}
                        </Link>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </div>
      <UploadAvatarModal show={showUploadModal} handleClose={handleCloseUploadModal} userId={user.pk} updateAvatar={updateAvatar} />
    </Container>
  );
};

export default Account;
