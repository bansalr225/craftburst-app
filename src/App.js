
import './App.css';
import AdminPanel from './components/AdminPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProfilePage from './components/ProfilePgae';
import ScheduleCalendar from './components/ScheduleCalendar';
import FeeDetails from './components/FeeDetails';
import SearchBar from './components/SearchBar';
import SideTab from './components/SideTab';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set the default route to Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/userprofile/:userId" element={<ProfilePage />} />
        <Route path="/getSchedule" element={<ScheduleCalendar />} />
        <Route path="/getFeeDetail" element={<FeeDetails />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/sideTab" element={<SideTab />} />

        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;