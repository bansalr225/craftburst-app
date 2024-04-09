// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/reports/classroomreport">ClassRoomReport</Link></li>
        <li><Link to="/reports/attendance">Attendance</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
