import React, { useState } from 'react';
import axios from "axios";
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid } from '@mui/material';

const CreateTest = () => {
 // const [testType, setTestType] = React.useState('');
  const [testDetails, setTestDetails] = useState({
    className: "",
    testName: "",
    marks: "",
    duration: "",
    testType: "",
    dateTime:"",
  });
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'testType') {
    //     setTestType(value);
    //   }
    setTestDetails((prevTestDetails) => ({
      ...prevTestDetails,
      [name]: value,
    }));
  };

  const handleCreateTest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/hello/createTest",
        testDetails
      );
  
      if (response.status === 200) {
        console.log("Test created successfully");
  
        // Reset all fields
        setTestDetails({
          className: "",
          testName: "",
          marks: "",
          duration: "",
          testType: "",
          dateTime: "",
        });
      //  setTestType('');
      } else {
        console.log("Failed to create test");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  
  return (
    <Grid container spacing={2} sx={{ width: '40%',marginX:50 }} >
      <Grid item xs={12}>
        <TextField label="Class Name" name="className" value={testDetails.className} fullWidth onChange={handleInputChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Test Name" name="testName" value={testDetails.testName} fullWidth onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Marks" type="number" name="marks" value={testDetails.marks} fullWidth onChange={handleInputChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Duration(in min)" type="number" name="duration" value={testDetails.duration} fullWidth onChange={handleInputChange}/>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Date and Time"
          type="datetime-local"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={testDetails.dateTime}
          name="dateTime"
          onChange={handleInputChange} />
      </Grid>
      <Grid item xs={12}>
        <FormControl value={testDetails.testType} fullWidth>
          <InputLabel>Test Type</InputLabel>
          <Select name="testType" onChange={handleInputChange}>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary"  onClick={handleCreateTest}>Create Test</Button>
      </Grid>
    </Grid>
  );
};

export default CreateTest;
