import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const PlayerActions = () => {
  const { sessionId } = useParams();
  const [actionType, setActionType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/v1/games/sessions/${sessionId}/actions/`, {
        action_type: actionType,
        description: description,
      });
      alert('Action submitted.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formActionType" className="mb-3">
          <Form.Label>Action Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter action type"
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Action
        </Button>
      </Form>
    </Container>
  );
};

export default PlayerActions;
