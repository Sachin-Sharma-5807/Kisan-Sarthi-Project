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
import "./ShowroomVendorUpdateMachine.css"; // Create and customize this file

const ShowRoomVendorUpdateMachines = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/vendor/showroom-vendor/get-new-machine/${id}`)
      .then((res) => {
        // Assuming the response structure is either { getMachine: { ... } } or the machine object directly
        const fetchedMachine = res.data.getMachine
          ? res.data.getMachine
          : res.data;
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
    // Create a FormData object and append all fields
    const formData = new FormData();
    formData.append("MachineName", machine.MachineName);
    formData.append("MachineType", machine.MachineType);
    formData.append("CompanyName", machine.CompanyName);
    formData.append("MachinePrice", machine.MachinePrice);
    formData.append("MachineDescription", machine.MachineDescription);

    if (machine.MachineImages) {
      for (let i = 0; i < machine.MachineImages.length; i++) {
        formData.append("MachineImages", machine.MachineImages[i]);
      }
    }

    try {
      await axios.put(
        `http://localhost:3000/vendor/showroom-vendor/update-new-machine/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Machine updated successfully!");
      navigate("/showroom-vender/view-machines  ");
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
                      placeholder="Enter Machine Name"
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
                      placeholder="e.g. Tractor, Harvester"
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
                      placeholder="Enter Company Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Machine Price (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="MachinePrice"
                      value={machine.MachinePrice || ""}
                      onChange={handleChange}
                      placeholder="Enter Price"
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
                      placeholder="Write something about the machine..."
                      required
                    />
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

export default ShowRoomVendorUpdateMachines;
