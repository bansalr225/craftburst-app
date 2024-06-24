import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Box)(({ theme }) => ({
  backgroundColor: '#2d3a54',
  color: 'white',
  padding: theme.spacing(2),
  borderRadius: 8,
  maxWidth: 360,
  margin: 'auto',
}));

const IconBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  color: '#2d3a54',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  textAlign: 'center',
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const GridItem = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
}));

const Icon = styled('span')({
  fontSize: '2rem', // Increase the size of the icon here
});

const OptionsList = () => {
  const menuItems = [
    { label: 'Attendance', icon: '📋' },
    { label: 'Timetable', icon: '🗓️' },
    { label: 'Notice Board', icon: '🔔' },
    { label: 'Chat', icon: '💬' },
    { label: 'Homework', icon: '📚' },
    { label: 'Study Material', icon: '📖' },
    { label: 'Teacher Assistive', icon: '👩‍🏫' },
  ];

  return (
    <Root>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {menuItems.map((item, index) => (
          <GridItem item xs={4} key={index}>
            <IconBox>
              <Icon role="img" aria-label={item.label}>{item.icon}</Icon>
            </IconBox>
            <Typography variant="body2">{item.label}</Typography>
          </GridItem>
        ))}
      </Grid>
    </Root>
  );
};

export default OptionsList;
