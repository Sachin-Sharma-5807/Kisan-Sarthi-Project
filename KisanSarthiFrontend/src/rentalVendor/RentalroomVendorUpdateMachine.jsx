import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RentalroomVendorUpdateMachine.css"; // Create and customize this file

const RentalroomVendorUpdateMachine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/vendor/rental-vendor/get-old-machine/${id}`)
      .then((res) => {
        const fetchedMachine = res.data.getMachine || res.data;
        setMachine(fetchedMachine);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching machine details:", err);
        setLoading(false);
        toast.error("Failed to load machine details");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "MachineImages") {
      setMachine({ ...machine, [name]: files });
    } else {
      setMachine({ ...machine, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("MachineName", machine.MachineName);
    formData.append("MachineType", machine.MachineType);
    formData.append("CompanyName", machine.CompanyName);
    formData.append("RentalPricePerDay", machine.RentalPricePerDay);
    formData.append("MachineDescription", machine.MachineDescription);
    formData.append("AvailabilityStatus", machine.AvailabilityStatus);

    if (machine.MachineImages) {
      for (let i = 0; i < machine.MachineImages.length; i++) {
        formData.append("MachineImages", machine.MachineImages[i]);
      }
    }

    try {
      await axios.put(
        `http://localhost:3000/vendor/rental-vendor/update-old-machine/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Machine updated successfully!");
      navigate("/showroom-vendor/view-all-machines");
    } catch (error) {
      console.error("Error updating machine:", error);
      toast.error("Failed to update machine");
    }
  };

  if (loading) {
    return (
      <Container className="my-5 py-5 text-center">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <div className="update-machine-page">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white text-center">
                <h3>Update Machine</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Form.Group className="mb-3">
                    <Form.Label>Machine Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="MachineName"
                      value={machine.MachineName || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Machine Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="MachineType"
                      value={machine.MachineType || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="CompanyName"
                      value={machine.CompanyName || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rental Price Per Day (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="RentalPricePerDay"
                      value={machine.RentalPricePerDay || ""}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Machine Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="MachineDescription"
                      value={machine.MachineDescription || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Availability Status</Form.Label>
                    <Form.Select
                      name="AvailabilityStatus"
                      value={machine.AvailabilityStatus || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Upload New Machine Images (optional)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="MachineImages"
                      onChange={handleChange}
                      multiple
                      accept="image/*"
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 fw-bold"
                  >
                    Update Machine
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RentalroomVendorUpdateMachine;
