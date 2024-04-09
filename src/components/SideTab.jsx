import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Attendance from './Attendence';
import ClassRoomReport from './ClassRoomReport';
import SearchBar from './SearchBar';
import ProfilePage from './ProfilePgae';
import FeeDetails from './FeeDetails';
import ScheduleCalendar from './ScheduleCalendar';

const useStyles = makeStyles({
  drawer: {
    width: '350px',
  },
  tabs: {
    backgroundColor: '#eeeeee',
    height: '100%',
    overflowY: 'auto',
  },
});

const SideTab = () => {
  const classes = useStyles();
  const [value, setValue] = useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        anchor="left"
      >
        <Box className={classes.tabs}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Attendence" value="0" />
            <Tab label="Class Report" value="1" />
            <Tab label="Class Schedule" value="5" />
            <Tab label="Search Student" value="2" />
            <Tab label="My Profile" value="3" />
            <Tab label="My Fee Detail" value="4" />

          </Tabs>
        </Box>
      </Drawer>

      <Grid container spacing={2}>
        <Grid item xs={10} sm={12} style={{ marginLeft: '40px' }}>
          <TabPanel value="0">
            <Attendance />
          </TabPanel>
          <TabPanel value="1">
            <ClassRoomReport />
          </TabPanel>
          <TabPanel value="2">
            <SearchBar />
          </TabPanel>
          <TabPanel value="3">
            <ProfilePage />
          </TabPanel>
          <TabPanel value="4">
            <FeeDetails/>
          </TabPanel>
          <TabPanel value="5">
            <ScheduleCalendar/>
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  );
};

export default SideTab;
