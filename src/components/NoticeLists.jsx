import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const NoticeLists = () => {
  const [noticeLists, setNoticeLists] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/hello/getNoticeList');
        const data = await response.json();
        setNoticeLists(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
    <div style={{ display: 'flex', flexDirection: 'column' ,marginTop:'160%'}}>
              {noticeLists.map((notice) => (
          <div style={{ marginBottom: '20px' }}>
            <Card sx={{ maxWidth: 400, margin: '0 auto' }}>
              <CardContent>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1rem' }}>
                  {notice.teacher}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgb(80,80,80)' }}>
                   {notice.message}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  Class: {notice.class}
                  <span style={{ marginLeft: '100px', color: 'rgb(80,80,80)' }}>Posted Date:</span><span style={{ color: 'rgb(255, 153, 0)' }}>{notice.date}</span>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
    </div>
  );
};

export default NoticeLists;
