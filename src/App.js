
import './App.css';
import AdminPanel from './components/AdminPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SideTab from './components/SideTab';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set the default route to Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/sideTab" element={<SideTab />} /> 

        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;