import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import "./ShowRoomVendorAddMachines.css";

const ShowRoomVendorAddMachines = () => {
  // Get the logged-in showroom vendor details from Redux.
  const showroomVendor = useSelector(
    (state) => state.ShowroomVendor.showroomVendor
  );
  console.log("Showroom Vendor from Redux:", showroomVendor);

  // Local state for machine form data.
  const [machineData, setMachineData] = useState({
    MachineName: "",
    MachineType: "",
    CompanyName: "",
    MachinePrice: "",
    MachineDescription: "",
    MachineImages: null,
  });

  // Handle changes in form inputs.
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "MachineImages") {
      setMachineData({ ...machineData, [name]: files });
    } else {
      setMachineData({ ...machineData, [name]: value });
    }
  };

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showroomVendor) {
      toast.error("Vendor details are missing. Please log in.");
      return;
    }

    // Create FormData and append fields.
    const formData = new FormData();
    formData.append("MachineName", machineData.MachineName);
    formData.append("MachineType", machineData.MachineType);
    formData.append("CompanyName", machineData.CompanyName);
    formData.append("MachinePrice", machineData.MachinePrice);
    formData.append("MachineDescription", machineData.MachineDescription);
    // Attach vendor ID from Redux.
    formData.append("VendorID", showroomVendor.VendorID);

    // Append each selected image.
    if (machineData.MachineImages) {
      for (let i = 0; i < machineData.MachineImages.length; i++) {
        formData.append("MachineImages", machineData.MachineImages[i]);
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/vendor/showroom-vendor/add-new-machine",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Machine Added Successfully!");
      // Reset form state.
      setMachineData({
        MachineName: "",
        MachineType: "",
        CompanyName: "",
        MachinePrice: "",
        MachineDescription: "",
        MachineImages: null,
      });
    } catch (error) {
      toast.error("Failed to add machine!");
      console.log(error);
    }
  };

  return (
    <div className="page-background">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="p-3 shadow rounded bg-white">
              <h3 className="mb-4 text-center text-success">
                Add New Machine 🚜
              </h3>

              {/* Display Vendor details */}
              {showroomVendor && (
                <div className="mb-3 p-2 bg-light border rounded">
                  <strong>Vendor ID:</strong> {showroomVendor.VendorID} <br />
                  <strong>Name:</strong> {showroomVendor.FullName} <br />
                  <strong>Email:</strong> {showroomVendor.Email}
                </div>
              )}

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-2">
                  <Form.Label>Machine Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="MachineName"
                    value={machineData.MachineName}
                    onChange={handleChange}
                    placeholder="Enter Machine Name"
                    maxLength={50}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Machine Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="MachineType"
                    value={machineData.MachineType}
                    onChange={handleChange}
                    placeholder="e.g. Tractor, Harvester"
                    maxLength={50}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="CompanyName"
                    value={machineData.CompanyName}
                    onChange={handleChange}
                    placeholder="Enter Company Name"
                    maxLength={50}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Machine Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="MachinePrice"
                    value={machineData.MachinePrice}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    required
                    min="0"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Machine Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="MachineDescription"
                    value={machineData.MachineDescription}
                    onChange={handleChange}
                    placeholder="Write something about the machine..."
                    maxLength={200}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Machine Images (Max 5)</Form.Label>
                  <Form.Control
                    type="file"
                    name="MachineImages"
                    onChange={handleChange}
                    multiple
                    accept="image/*"
                    required
                  />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100 fw-bold"
                  disabled={!showroomVendor}
                >
                  {showroomVendor ? "Add Machine" : "Vendor Not Logged In"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShowRoomVendorAddMachines;
