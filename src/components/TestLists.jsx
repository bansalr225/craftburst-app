import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TestLists = () => {
  const [completedTests, setCompletedTests] = useState([]);
  const [notCompletedTests, setNotCompletedTests] = useState([]);


  const navigate = useNavigate();

  const handleTestClick = (testId) => {
    navigate(`/report/${testId}`);
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/hello/getTestList');
        const data = await response.json();
        const completed = data.tests.filter(tests => tests.status === 'completed');
        const notCompleted = data.tests.filter(tests => tests.status !== 'completed');
        setCompletedTests(completed);
        setNotCompletedTests(notCompleted);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {completedTests.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column' ,marginTop:'450%'}} >

        <h3> Completed</h3>
        {completedTests.map((test, index) => (
          <div key={index} style={{ marginBottom: '20px' }} onClick={() => handleTestClick(test.testId)}>
            <Card>
              <CardContent>
                <Typography variant="h1" component="div" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1.2rem' }}>
                  {test.subject}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgb(80,80,80)' }}>
                  Duration: {test.duration} | {test.date}, {test.topic}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  {test.submissions.submitted}/{test.submissions.total} Submitted
                  <span style={{ marginLeft: '100px', color: 'rgb(80,80,80)' }}>Marks:</span><span style={{ color: 'rgb(255, 153, 0)' }}>{test.marks}</span>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      )}
        {notCompletedTests.length > 0 && (
      <div >
        <h3>Not Completed</h3>
        {completedTests.map((test, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <Card>
              <CardContent>
                <Typography variant="h1" component="div" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1.2rem' }}>
                  {test.subject}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgb(80,80,80)' }}>
                  Duration: {test.duration} | {test.date}, {test.topic}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  {test.submissions.submitted}/{test.submissions.total} Submitted
                  <span style={{ marginLeft: '100px', color: 'rgb(80,80,80)' }}>Marks:</span><span style={{ color: 'rgb(255, 153, 0)' }}>{test.marks}</span>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
        )}
         {completedTests.length === 0 && notCompletedTests.length === 0 && (
      <div>
        <p>No tests available</p>
      </div>
    )}
   
    </div>
  );
};

export default TestLists;
