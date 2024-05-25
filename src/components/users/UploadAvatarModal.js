import React, { useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import axios from 'axios';

const UploadAvatarModal = ({ show, handleClose, userId, updateAvatar }) => {
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const token = localStorage.getItem('access');
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/upload_avatar/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      updateAvatar(response.data.avatar); // Update the avatar in the parent component
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Обновить фото</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Выберите новую аватарку</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Обновить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadAvatarModal;
