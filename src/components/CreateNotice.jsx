import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';


const CreateNotice = () => {
    const [classes, setClasses] = useState([""]);
    const [noticeDetails, setNoticeDetails] = useState({
        announcement: "",
        selectedClass: "Select class",
        file: null,
    });

    const isButtonDisabled = () => {
        return (
            noticeDetails.announcement.trim() === "" ||

            noticeDetails.selectedClass === "Select class"
        );
    };
    const handleInputChange = (e) => {
        const { name, value ,files } = e.target;
        if(name==='file'){
            setNoticeDetails((prevNoticeDetails) => ({
                ...prevNoticeDetails,
                [name]: files[0],
            }));
        } else{
        setNoticeDetails((prevNoticeDetails) => ({
            ...prevNoticeDetails,
            [name]: value,
        }));
    }
    };


    const handleCreateNotice = async () => {
        try {
            const formData = new FormData();
            formData.append('announcement', noticeDetails.announcement);
            formData.append('selectedClass', noticeDetails.selectedClass);
            formData.append('file', noticeDetails.file); // append file to form data

            const response = await axios.post(
                "http://localhost:8080/hello/createNotice",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // set content type for file upload
                    },
                }
            );

            if (response.status === 200) {
                console.log("Test created successfully");

                // Reset all fields
                setNoticeDetails({
                    announcement: "",
                    selectedClass: "Select class",
                    file: null,
                });
            } else {
                console.log("Failed to create Notice");
            }
        } catch (error) {
            console.error("Error creating Notice:", error);
        }
    };


    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await fetch('http://localhost:8080/hello/getClasses');
                const data = await response.json();
                setClasses(["All Classes", ...data]);
            } catch (error) {
                console.error('Error fetching test:', error);
            }
        };

        fetchTest();
    }, []);
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3 >Make an Announcement</h3>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        name="announcement"
                        rows={4}
                        inputProps={{ maxLength: 100 }}
                        sx={{ width: '300px' }}
                        value={noticeDetails.announcement}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} >
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="file" 
                        onChange={handleInputChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                            Upload File
                        </Button>
                    </label>
                    <Select
                        labelId="select-class-label"
                        id="select-class"
                        name="selectedClass"
                        value={noticeDetails.selectedClass}
                        onChange={handleInputChange}
                        style={{ marginLeft: '16px', height: '40px' }}
                    >
                        <MenuItem value="Select class" disabled>Select class</MenuItem>
                        {classes.map((value) => {
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" sx={{ width: '100%' }} disabled={isButtonDisabled()} onClick={handleCreateNotice} >Announce</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CreateNotice;