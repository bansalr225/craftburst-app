// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Nav } from 'react-bootstrap';


const Sidebar = ({ path }) => {
  return (
    <Col md={3} className="p-0 d-none d-md-block" style={{ backgroundColor: '#e6f2ff', position: 'fixed', top: 0, left: 0, bottom: 0, overflowY: 'auto' }}>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/reports/attendance" className={path === '/reports/attendance' ? 'active' : ''}>
            Attendance
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/reports/classroomreport" className={path === '/reports/classroomreport' ? 'active' : ''}>
            ClassRoomReport
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

export default Sidebar;