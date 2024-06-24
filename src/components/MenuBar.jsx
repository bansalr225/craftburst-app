import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2d3a54',
    color: 'white',
    padding: theme.spacing(2),
    borderRadius: 8,
    maxWidth: 360,
    margin: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  icon: {
    backgroundColor: '#f0f0f0',
    color: '#2d3a54',
    padding: theme.spacing(1.5),
    borderRadius: 8,
    textAlign: 'center',
    width: 50,
    height: 50,
  },
  gridItem: {
    textAlign: 'center',
  },
}));

const MenuBar = () => {
  const classes = useStyles();

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
    <Box className={classes.root}>
      {/* <Box className={classes.header}>
        <Box>
          <Typography variant="h6">Class IX - A</Typography>
          <Typography variant="subtitle2">Physics II, Chemistry +2</Typography>
        </Box>
        <IconButton color="primary">
          <Add />
        </IconButton>
      </Box>
      <Box className={classes.icons}>
        <Avatar src="teacher.jpg" />
        <Avatar src="student1.jpg" />
        <Avatar src="student2.jpg" />
        <Badge badgeContent={20} color="secondary">
          <Avatar>+20</Avatar>
        </Badge>
      </Box> */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {menuItems.map((item, index) => (
          <Grid item xs={4} className={classes.gridItem} key={index}>
            <Box className={classes.icon}>
              <span role="img" aria-label={item.label}>{item.icon}</span>
            </Box>
            <Typography variant="body2">{item.label}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuBar;
