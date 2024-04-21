// src/components/AdminPanel.js
import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../CSS/text.css";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedType, setSelectedType] = useState("");

  const [scheduleDetails, setScheduleDetails] = useState({
    startDate: "",
    endDate: "",
    teacherName: "",
    selectedDays: [],
  });

  // State for "Select All" checkbox
  const [selectAllDays, setSelectAllDays] = useState(false);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    mobileNumber: "",
    roleNumber: "",
    gender: "",
  });

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    if (new Date(value) < new Date(scheduleDetails.startDate)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        endDate: 'End Date cannot be less than Start Date.',
      }));
      return;
    }
    else{
    setScheduleDetails((prevScheduleDetails) => ({
      ...prevScheduleDetails,
      [name]: value,
    }));
  }
  };

  // Function to handle changes in the checkboxes for individual days
  const handleDayCheckboxChange = (day) => {
    const updatedSelectedDays = [...scheduleDetails.selectedDays];
    if (updatedSelectedDays.includes(day)) {
      updatedSelectedDays.splice(updatedSelectedDays.indexOf(day), 1);
    } else {
      updatedSelectedDays.push(day);
    }
    setScheduleDetails((prevScheduleDetails) => ({
      ...prevScheduleDetails,
      selectedDays: updatedSelectedDays,
    }));
  };

  // Function to handle changes in the "Select All" checkbox
  const handleSelectAllDaysChange = () => {
    const allDays = daysOfWeek;
    setSelectAllDays((prevSelectAllDays) => !prevSelectAllDays);
    setScheduleDetails((prevScheduleDetails) => ({
      ...prevScheduleDetails,
      selectedDays: !selectAllDays ? allDays : [],
    }));
  };
  const handleUpload = async () => {
    if (!file || !selectedType) {
      setUploadStatus({
        type: "error",
        message: "Please upload an Excel file.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8080/hello/upload?type=${selectedType}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus({ type: "success", message: "Successfully uploaded!" });
      } else {
        setUploadStatus({
          type: "error",
          message: "Please check your Excel file.",
        });
      }

      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus({
        type: "error",
        message: "An error occurred during file upload.",
      });
    }
  };

  const handleCreateUser = async () => {
    const errors = {};
    Object.keys(userDetails).forEach((key) => {
      if (!userDetails[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } cannot be empty.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear validation errors if no errors
    setValidationErrors({});
    try {
      const response = await axios.post(
        "http://localhost:8080/hello/createUser",
        userDetails
      );

      // Handle the response accordingly
      console.log(response.data);

      // Optionally, reset the user details state after successful creation
      setUserDetails({
        firstName: "",
        middleName: "",
        lastName: "",
        emailId: "",
        mobileNumber: "",
        roleNumber: "",
        gender: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error
    }
  };
  
  const handleCreateSchedule = async () => {
    const errors = {};
    if (scheduleDetails.selectedDays.length === 0) {
      errors.selectedDays = 'Please select at least one day.';
    }
    Object.keys(scheduleDetails).forEach((key) => {
      if (!scheduleDetails[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } cannot be empty.`;
        console.log(errors);
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear validation errors if no errors
    setValidationErrors({});
    try {
      const response = await axios.post(
        "http://localhost:8080/hello/createSchedule",
        scheduleDetails
      );

      // Handle the response accordingly
      console.log(response.data);

      // Optionally, reset the user details state after successful creation
      setScheduleDetails({
        startDate: "",
        endDate: "",
        teacherName: "",
        selectedDays: [],
      });
    } catch (error) {
      console.error("Error creating Scheduke:", error);
      // Handle error
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  return (
    <>
      {/* <style>
        {`
        body {
          background-image: url(${AdminBackground});
          background-size: cover;
          margin: 0;
          padding: 0;
        }
      `}
      </style> */}
      <Container className="my-5">
        <h1 style={{ textAlign: "center" }} className="text-primary fs-7">
          Admin Panel
        </h1>

        <Row>
          <Col>
            <Form>
              <h2 className="text-center mb-4 text-primary">
                Create/Modify User
              </h2>

              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={userDetails.firstName}
                      onChange={handleInputChange}
                      className={validationErrors.firstName ? "is-invalid" : ""}
                    />
                    {validationErrors.firstName && (
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.firstName}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="middleName"
                      placeholder="Middle Name"
                      value={userDetails.middleName}
                      onChange={handleInputChange}
                      className={
                        validationErrors.middleName ? "is-invalid" : ""
                      }
                    />
                    {validationErrors.middleName && (
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.middleName}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={userDetails.lastName}
                      onChange={handleInputChange}
                      className={
                        validationErrors.middleName ? "is-invalid" : ""
                      }
                    />
                    {validationErrors.middleName && (
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.lastName}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="emailId" className="mb-3">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  name="emailId"
                  placeholder="Email ID"
                  value={userDetails.emailId}
                  onChange={handleInputChange}
                  className={validationErrors.emailId ? "is-invalid" : ""}
                />
                {validationErrors.emailId && (
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.emailId}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="mobileNumber" className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={userDetails.mobileNumber}
                  onChange={handleInputChange}
                  className={validationErrors.mobileNumber ? "is-invalid" : ""}
                />
                {validationErrors.mobileNumber && (
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.mobileNumber}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="roleNumber" className="mb-3">
                <Form.Label>Role Number</Form.Label>
                <Form.Control
                  type="text"
                  name="roleNumber"
                  placeholder="Role Number"
                  value={userDetails.roleNumber}
                  onChange={handleInputChange}
                  className={validationErrors.roleNumber ? "is-invalid" : ""}
                />
                {validationErrors.roleNumber && (
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.roleNumber}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="gender" className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={userDetails.gender}
                  onChange={handleInputChange}
                  className={validationErrors.gender ? "is-invalid" : ""}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </Form.Control>
                {validationErrors.gender && (
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.gender}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateUser}
                className="mt-3"
              >
                Create User
              </Button>
            </Form>
          </Col>

          <Col>
            {/* Import Section */}
            <Form>
              <h2 className="text-center mb-4 text-primary">Import Section</h2>
              <Form.Group as={Row} controlId="typeAndFile" className="mb-3">
                <Form.Label column sm="2">
                  Type
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    as="select"
                    name="type"
                    value={selectedType}
                    onChange={handleTypeChange}
                  >
                    <option value="">Select Type</option>
                    <option value="Student">Student</option>
                    <option value="Schedule">Schedule</option>
                  </Form.Control>
                </Col>

                <Form.Label column sm="2">
                  Upload Excel File
                </Form.Label>
                <Col sm="4">
                  <Form.Control type="file" size="sm" onChange={onFileChange} />
                </Col>
              </Form.Group>

              <Button variant="primary" size="sm" onClick={handleUpload}>
                Upload
              </Button>

              {uploadStatus && (
                <Alert
                  variant={
                    uploadStatus.type === "success" ? "success" : "danger"
                  }
                  className="mt-3"
                >
                  {uploadStatus.message}
                </Alert>
              )}
              <h3 className="text-center mt-3 mb-8 text-primary">
                Schedule Section
              </h3>

              <Form.Group controlId="startDate" className="mb-3">
                <Form.Label>Start Date Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="startDate"
                  value={scheduleDetails.startDate}
                  onChange={handleScheduleInputChange}
                  className={validationErrors.startDate ? "is-invalid" : ""}
                  />
                    {validationErrors.startDate && (
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.startDate}
                      </Form.Control.Feedback>
                    )}
              </Form.Group>

              <Form.Group controlId="endDate" className="mb-3">
                <Form.Label>End Date Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="endDate"
                  value={scheduleDetails.endDate}
                  onChange={handleScheduleInputChange}
                  className={validationErrors.endDate ? "is-invalid" : ""}
                  />
                    {validationErrors.endDate && (
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.endDate}
                      </Form.Control.Feedback>
                    )}
              </Form.Group>

              <Form.Group controlId="teacherName" className="mb-3">
                <Form.Label>Teacher Name</Form.Label>
                <Form.Control
                  type="text"
                  name="teacherName"
                  placeholder="Teacher Name"
                  value={scheduleDetails.teacherName}
                  onChange={handleScheduleInputChange}
                  className={validationErrors.teacherName ? "is-invalid" : ""}
                />
                  {validationErrors.teacherName && (
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.teacherName}
                    </Form.Control.Feedback>
                  )}
              </Form.Group>

              <Form.Group controlId="selectedDays" className="mb-3">
                <Form.Label>Select Days</Form.Label>
                <Row>
                  {daysOfWeek.map((day) => (
                    <Col key={day} sm="auto" className="mb-2">
                      <Form.Check
                        type="checkbox"
                        id={`checkbox-${day}`}
                        label={day}
                        checked={scheduleDetails.selectedDays.includes(day)}
                        onChange={() => handleDayCheckboxChange(day)}
                      />
                    </Col>
                  ))}
                  <Col sm="2">
                    <Form.Check
                      type="checkbox"
                      id="checkbox-all"
                      label="Select All"
                      checked={selectAllDays}
                      onChange={handleSelectAllDaysChange}
                    />
                  </Col>
                  <Row>
                  <Form
                  className={validationErrors.selectedDays ? "is-invalid" : ""} style={{ marginTop: "0rem" }}
                        />
                        {validationErrors.selectedDays && (
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.selectedDays}
                          </Form.Control.Feedback>
                        )}
                  </Row>
                </Row>
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateSchedule}
                className="mt-1"
              >
                Create Schedule
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPanel;
