import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ClassRoomReport = () => {


    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/hello/getAttendenceReport')
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('Error fetching attendance report:', error);
            });
    }, []);

    return (
        <div>
            <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto', '@media (max-width: 768px)': { maxHeight: '150px' } }}>

                {searchResults.map((result, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            width: '100%',
                        }}
                    >
                        <span style={{ marginRight: '10px' }}>
                            {`${result.name}(${result.rollNo})`}
                        </span>
                        <span style={{ marginLeft: '10px' }}>
                            {`${result.totalAttendance})`}
                        </span>

                    </li>
                ))}
            </ul>
        </div>
    );

};

export default ClassRoomReport;