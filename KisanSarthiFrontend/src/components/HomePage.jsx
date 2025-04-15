// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const HomePage = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/uesr/get-user-machines")
      .then((response) => setMachines(response.data))
      .catch((error) => console.error("Error fetching machines:", error));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Available Machines</h2>
      <Row>
        {machines.map((machine) => (
          <Col key={machine._id} xs={12} sm={6} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={machine.image} alt={machine.name} />
              <Card.Body>
                <Card.Title>{machine.name}</Card.Title>
                <Card.Text>{machine.description}</Card.Text>
                <Card.Text className="fw-bold">
                  Price: ₹{machine.price}
                </Card.Text>
                <Button variant="success" className="me-2">
                  Buy Now
                </Button>
                <Button variant="warning">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
