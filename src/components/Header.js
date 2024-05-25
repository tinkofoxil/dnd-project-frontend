import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Badge, Modal, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faUser, faDragon, faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import LogoutButton from './users/LogoutButton';
import axios from 'axios';

const Header = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [notifications, setNotifications] = useState(0);
  const [invitations, setInvitations] = useState([]);
  const [showInvitationsModal, setShowInvitationsModal] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    const theme = darkTheme ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', theme);
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('access');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('access');
        const user_id = localStorage.getItem('user_id');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/invitations/?recipient=${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInvitations(response.data.results);
        setNotifications(response.data.results.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  const handleInvitationsModalClose = () => {
    setShowInvitationsModal(false);
  };

  const handleShowInvitationsModal = () => {
    setShowInvitationsModal(true);
  };

  const joinGame = (gameId) => {
    // Redirect to the game page
    window.location.href = `/games/${gameId}`;
  };

  const declineInvitation = async (invitationId) => {
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://127.0.0.1:8000/api/v1/invitations/${invitationId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setInvitations(prevInvitations => prevInvitations.filter(invitation => invitation.id !== invitationId));
      setNotifications(prevNotifications => prevNotifications - 1);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Navbar bg={darkTheme ? 'dark' : 'light'} variant={darkTheme ? 'dark' : 'light'} expand="lg" className='py-3'>
        <Navbar.Brand as={Link} to="/">DND <FontAwesomeIcon icon={faDragon} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="ms-auto">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/profiles">Профили</Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile_create">Создать персонажа <FontAwesomeIcon icon={faDice} /></Nav.Link>
                <Nav.Link as={Link} to="/games">Игры</Nav.Link>
                <Nav.Link as={Link} to="/about">О проекте</Nav.Link>
                <Nav.Link as={Link} to="/account">Аккаунт <FontAwesomeIcon icon={faUser} /> </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile_create">Создать персонажа <FontAwesomeIcon icon={faDice} /></Nav.Link>
                <Nav.Link as={Link} to="/about">О проекте</Nav.Link>
                <Nav.Link as={Link} to="/login">Войти</Nav.Link>
                <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
              </>
            )}
          </Nav>
          <Button variant={darkTheme ? 'outline-light' : 'outline-dark'} className="me-3" onClick={toggleTheme}>
            {darkTheme ? '🌞' : '🌙'}
          </Button>
          <Button variant={darkTheme ? 'outline-light' : 'outline-dark'} className="me-3" onClick={handleShowInvitationsModal}>
            <FontAwesomeIcon icon={faBell} />
            {notifications > 0 && <Badge bg="danger" className="ms-1">{notifications}</Badge>}
          </Button>
          {isAuthenticated && <LogoutButton/>}
          <Modal show={showInvitationsModal} onHide={handleInvitationsModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Приглашения в игру</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {invitations.map(invitation => (
                <ListGroup key={invitation.id} className="mb-3">
                  <ListGroup.Item>
                    <Image src={`http://127.0.0.1:8000${invitation.sender.avatar}`} width={40} height={40} className="me-2" roundedCircle />
                      {invitation.sender.username} приглашает вас присоединиться к игре.
                      <Button variant="danger" className="ms-auto" onClick={() => declineInvitation(invitation.id)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant="primary" onClick={() => joinGame(invitation.game.pk)}>Присоединиться</Button>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </Modal.Body>
          </Modal>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
