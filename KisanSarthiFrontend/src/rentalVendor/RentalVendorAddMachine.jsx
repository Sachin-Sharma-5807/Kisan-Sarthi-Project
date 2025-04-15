import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import "./RentalVendorAddMachines.css";

const RentalVendorAddMachine = () => {
  const rentalVendor = useSelector((state) => state.RentalVendor.rentalVendor);

  console.log("Showroom Vendor from Redux:", rentalVendor);

  const [machineData, setMachineData] = useState({
    MachineName: "",
    MachineType: "",
    CompanyName: "",
    RentalPricePerDay: "",
    MachineDescription: "",
    MachineImages: null,
    AvailabilityStatus: "Available", // Default value
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "MachineImages") {
      setMachineData({ ...machineData, [name]: files });
    } else {
      setMachineData({ ...machineData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rentalVendor) {
      toast.error("Vendor details are missing. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("MachineName", machineData.MachineName);
    formData.append("MachineType", machineData.MachineType);
    formData.append("CompanyName", machineData.CompanyName);
    formData.append("RentalPricePerDay", machineData.RentalPricePerDay);
    formData.append("MachineDescription", machineData.MachineDescription);
    formData.append("VendorID", rentalVendor.VendorID);
    formData.append("AvailabilityStatus", machineData.AvailabilityStatus);

    if (machineData.MachineImages) {
      for (let i = 0; i < machineData.MachineImages.length; i++) {
        formData.append("MachineImages", machineData.MachineImages[i]);
      }
    }

    try {
      await axios.post(
        "http://localhost:3000/vendor/rental-vendor/add-old-machine",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Machine Added Successfully!");
      setMachineData({
        MachineName: "",
        MachineType: "",
        CompanyName: "",
        RentalPricePerDay: "",
        MachineDescription: "",
        MachineImages: null,
        AvailabilityStatus: "Available",
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

              {rentalVendor && (
                <div className="mb-3 p-2 bg-light border rounded">
                  <strong>Vendor ID:</strong> {rentalVendor.VendorID} <br />
                  <strong>Name:</strong> {rentalVendor.FullName} <br />
                  <strong>Email:</strong> {rentalVendor.Email}
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
                  <Form.Label>Rental Price Per Day (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="RentalPricePerDay"
                    value={machineData.RentalPricePerDay}
                    onChange={handleChange}
                    placeholder="Enter Rental Price"
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

                <Form.Group className="mb-2">
                  <Form.Label>Availability Status</Form.Label>
                  <Form.Select
                    name="AvailabilityStatus"
                    value={machineData.AvailabilityStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </Form.Select>
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
                  disabled={!rentalVendor}
                >
                  {rentalVendor ? "Add Machine" : "Vendor Not Logged In"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RentalVendorAddMachine;
