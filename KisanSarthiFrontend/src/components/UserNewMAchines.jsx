import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserNewMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router Hook for navigation

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/get-user-new-machines")
      .then((res) => {
        setMachines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching new machines:", err);
        setLoading(false);
      });
  }, []);

  // Function to handle redirection
  const handleRedirect = () => {
    navigate("/signup"); // Redirect to signup page
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">New Machines</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : machines.length === 0 ? (
        <p className="text-center">No new machines available at the moment.</p>
      ) : (
        <Row>
          {machines.map((machine) => (
            <Col key={machine.MachineID} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={machine.MachineImage || "/default-machine.jpg"}
                  alt={machine.MachineName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{machine.MachineName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {machine.CompanyName} | ₹{machine.MachinePrice}
                  </Card.Subtitle>
                  <Card.Text>{machine.MachineDescription}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="primary" onClick={handleRedirect}>
                    Buy Now
                  </Button>
                  <Button variant="secondary" onClick={handleRedirect}>
                    Add to Cart
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default UserNewMachines;
