import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const CreateNotice = () => {
    const [classes, setClasses] = useState([""]);
    const [selectedClass, setSelectedClass] = useState("Select class");
    const [announcement, setAnnouncement] = useState("");

    const isButtonDisabled = () => {
        return announcement.trim() === "" || selectedClass === "Select class";
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
                        rows={4}
                        inputProps={{ maxLength: 100 }}
                        sx={{ width: '300px' }}
                        value={announcement}
                        onChange={(event) => setAnnouncement(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                            Upload File
                        </Button>
                    </label>
                    <Select
                        labelId="select-class-label"
                        id="select-class"
                        value={selectedClass}
                        onChange={(event) => setSelectedClass(event.target.value)}
                        style={{ marginLeft: '16px', height: '40px' }}
                    >
                      <MenuItem value="Select class" disabled>Select class</MenuItem>
                        {classes.map((value) => {
                            return(
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" sx={{ width: '100%' }} disabled={isButtonDisabled} >Announce</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CreateNotice;