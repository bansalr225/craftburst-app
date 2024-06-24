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
import CreateTest from './CreateTest';
import TestLists from './TestLists';
import CreateNotice from './CreateNotice';
import NoticeLists from './NoticeLists';
import MenuBar from './MenuBar';
import OptionsList from './OptionsList';

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
            <Tab label="Create Test" value="6" />
            <Tab label="View Tests" value="7" />
            <Tab label="Make Announce" value="8" />
            <Tab label="Announcements" value="9" />
            <Tab label="Menu Bar" value="10" />
            <Tab label="Options List" value="11" />
          </Tabs>
        </Box>
      </Drawer>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={14} style={{ marginLeft: '40px' , marginTop: '-150px' }}>
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
          <TabPanel value="6">
            <CreateTest/>
          </TabPanel>
          <TabPanel value="7">
            <TestLists/>
          </TabPanel>
          <TabPanel value="8">
            <CreateNotice/>
          </TabPanel>
          <TabPanel value="9">
            <NoticeLists/>
          </TabPanel>
          <TabPanel value="10">
            <MenuBar/>
          </TabPanel>
          <TabPanel value="11">
            <OptionsList/>
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  );
};

export default SideTab;
