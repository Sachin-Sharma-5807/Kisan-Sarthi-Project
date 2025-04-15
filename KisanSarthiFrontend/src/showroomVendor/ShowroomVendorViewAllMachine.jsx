import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ShowroomVendorViewAllMachine.css";
import { useSelector } from "react-redux";

const ShowroomVendorViewAllMachine = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Access vendor details from Redux (ensure key matches store)
  const showroomVendor = useSelector(
    (state) => state.ShowroomVendor.showroomVendor
  );
  console.log("Showroom Vendor from Redux:", showroomVendor);

  useEffect(() => {
    if (showroomVendor && showroomVendor.VendorID) {
      axios
        .get(
          `http://localhost:3000/vendor/showroom-vendor/get-all-new-machine?VendorID=${showroomVendor.VendorID}`
        )
        .then((res) => {
          console.log("Response Data:", res.data);
          setMachines(res.data?.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching machines:", err);
          setMachines([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [showroomVendor]);

  const deleteMachine = (id) => {
    // Show confirmation popup before deletion
    if (window.confirm("Do you want to remove this machine?")) {
      axios
        .delete(
          `http://localhost:3000/vendor/showroom-vendor/delete-new-machine/${id}`
        )
        .then(() => {
          setMachines(machines.filter((m) => m.MachineID !== id));
        })
        .catch((error) => console.error("Error deleting machine:", error));
    }
  };

  return (
    <div className="page-background">
      <Container className="my-5 py-5">
        <h2 className="text-center text-success mb-4">My Machines 🚜</h2>

        {/* Display Vendor details */}
        {showroomVendor && (
          <div className="mb-4 p-3 bg-light border rounded text-center">
            <p>
              <strong>Vendor ID:</strong> {showroomVendor.VendorID}
            </p>
            <p>
              <strong>Name:</strong> {showroomVendor.FullName}
            </p>
            <p>
              <strong>Email:</strong> {showroomVendor.Email}
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        ) : machines.length === 0 ? (
          <p className="text-center text-muted">
            No machines found for your showroom.
          </p>
        ) : (
          <Row>
            {machines.map((m) => (
              <Col md={6} lg={4} key={m.MachineID} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={m.MachineImage || "/default-machine.jpg"}
                    alt={m.MachineName}
                    style={{ height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{m.MachineName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {m.CompanyName} | ₹{m.MachinePrice}
                    </Card.Subtitle>
                    <Card.Text>{m.MachineDescription}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-success"
                        onClick={() =>
                          navigate(
                            `/showroom-vender/update-machine/${m.MachineID}`
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteMachine(m.MachineID)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ShowroomVendorViewAllMachine;
