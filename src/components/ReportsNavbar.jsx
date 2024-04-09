// ReportsPage.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReportsNavbar from './ReportsNavbar';
import Attendance from './Attendence';
import ClassRoomReport from './ClassRoomReport';

const ReportsPage = () => {
  return (
    <div>
      <ReportsNavbar />
      <Routes>
        <Route path="/" element={<div>Reports Home</div>} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/classroom" element={<ClassRoomReport />} />
      </Routes>
    </div>
  );
};

export default ReportsPage;
