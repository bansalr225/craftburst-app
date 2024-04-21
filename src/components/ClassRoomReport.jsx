import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from '@mui/material';

const ClassRoomReport = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
            <ResponsiveContainer width={isSmallScreen ? 400 : 800} height={400}  >
                <BarChart
                    data={searchResults}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalAttendance" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ClassRoomReport;
