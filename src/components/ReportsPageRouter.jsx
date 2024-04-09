// Navbar.js
import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Attendance from './Attendence';
import ClassRoomReport from './ClassRoomReport';

const ReportsPageRouter = () => {
  return (
    <Routes>
      <Route path="classroomreport" element={<ClassRoomReport />} />
      <Route path="attendance" element={<Attendance />} />
    </Routes>
  );
};

export default ReportsPageRouter;
