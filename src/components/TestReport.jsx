import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge } from '@mui/material';

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

  const marksData = test.marks.map((mark, index) => {
    const [name, score] = mark.split(':');
    return { id: index + 1, name: name.trim(), score: parseInt(score.trim()) };
  }).sort((a, b) => b.score - a.score);

  return (
    <div>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', color: 'rgb(140, 140, 140)', fontWeight: 'bold' }}>
        {test.TestName}
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: 'auto', width: '400px' }}>
      <Table>
  <TableBody>
    {marksData.map((row, index, array) => {
      let rank = index + 1;
      if (index > 0 && row.score === array[index - 1].score) {
        // If the current score is the same as the previous score, they share the same rank
        rank = array[index - 1].rank;
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
    </div>
  );
};

export default TestReport;
