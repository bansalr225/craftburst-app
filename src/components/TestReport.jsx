import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid } from '@mui/material';


const TestReport = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hello/getTestReport/${id}`);
        const data = await response.json();
        setTest(data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [id]);

  if (!test) {
    return <div>Loading...</div>;
  }
  let rank = 1;
  const marksData = test.marks.map((mark, index) => {
    const [name, score] = mark.split(':');
    return { id: index + 1, name: name.trim(), score: parseInt(score.trim()) };
  }).sort((a, b) => b.score - a.score);
  const totalMarks = marksData.reduce((acc, curr) => acc + curr.score, 0);
  const averageMarks = (totalMarks / marksData.length).toFixed(2);;

  // Find highest marks
  const highestMarks = marksData.length > 0 ? marksData[0].score : 0;

  // Data for the bar chart
  const chartData = [
    { name: 'Average Marks', value: averageMarks },
    { name: 'Highest Marks', value: highestMarks }
  ];
  return (
    <Grid container spacing={2}>
       <Grid item xs={12} sm={6} sx={{ marginTop: { xs: 15, sm: 0 } , marginLeft: { xs: 8, sm: 0 }}}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', color: 'rgb(140, 140, 140)', fontWeight: 'bold' }}>
        {test.testName}
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: 'auto', width: '400px',backgroundColor: 'rgb(242, 242, 242)' }}>
        <Table sx={{color:'rgb(217, 217, 217)'}}>
          <TableBody>
            {marksData.map((row, index, array) => {
              if (index > 0 && row.score === array[index - 1].score) {
                rank = rank - 1;
              }
              if (index !== 0) {
                rank++;
              }

              return (
                <TableRow key={row.id} >
                  <TableCell>
                    {rank <= 3 ? (
                      <>
                        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'} {row.name}

                      </>
                    ) : (
                      row.name

                    )}
                  </TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item xs={10} sm={6} sx={{ marginLeft: { xs: 2, sm: 0 }}} >
      <Typography variant="h5" component="h3" sx={{ textAlign: 'center', margin: '20px 0', color: 'rgb(140, 140, 140)' , fontWeight: 'bold'}}>
        Marks Overview
      </Typography>
      <ResponsiveContainer width="100%" height={300} >
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={50} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </Grid>
      </Grid>

  );
};

export default TestReport;
