import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Switch from 'react-switch';
import axios from 'axios';


const Attendance = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [markAllHoliday, setMarkAllHoliday] = useState(false);


    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:8080/hello/getAllStudents')
            .then(response => {
                const studentArray = Object.entries(response.data).map(([rollNumber, name]) => ({
                    name,
                    rollNumber,
                    checked: true,
                }));
                setSearchResults(studentArray);  // Update the searchResults state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const handleCheckboxChange = (rollNumber) => {
        setSearchResults((prevResults) =>
            prevResults.map((result) =>
                result.rollNumber === rollNumber
                    ? { ...result, checked: !result.checked }
                    : result
            )
        );
    };

    const handleMarkAllHolidayChange = () => {
        setMarkAllHoliday(!markAllHoliday);
    };
    const handleSubmit = async () => {
        let absentCandidates;

        if (markAllHoliday) {
            // Mark all as holiday
            absentCandidates = searchResults.map((result) => result.rollNumber);
        } else {
            absentCandidates = searchResults
                .filter((result) => !result.checked)
                .map((result) => result.rollNumber);
        }
        try {
            const response = await fetch('http://localhost:8080/hello/createAttendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ absentCandidates }),
            });

            // Handle response if needed
            console.log('Attendance submitted successfully');
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };

    return (
        <div>
            <Form>
                <div style={{ marginBottom: '10px' }}>
                    <Form.Check
                        type="checkbox"
                        label="Mark All as Holiday"
                        checked={markAllHoliday}
                        onChange={handleMarkAllHolidayChange}
                    />
                </div>

                <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto', '@media (max-width: 768px)': { maxHeight: '150px' } }}>

                    {searchResults.map((result, index) => (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px', // Increased spacing
                            }}
                        >
                            <span style={{ color: result.checked ? 'green' : 'red', marginRight: '10px' }}>
                                {`${result.name}(${result.rollNumber})`}
                            </span>
                            <Switch
                                onChange={() => handleCheckboxChange(result.rollNumber)}
                                checked={result.checked}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                handleDiameter={20}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={16}
                                width={40}
                            />
                        </li>
                    ))}
                </ul>
                <Button variant="success" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Attendance;
