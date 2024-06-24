import './App.css';
import AdminPanel from './components/AdminPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SideTab from './components/SideTab';
import TestReport from './components/TestReport';
import OptionsList from './components/OptionsList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/sideTab" element={<SideTab />} /> 
        <Route path="/report/:id" element={<TestReport />} />
        <Route path="/menu" element={<OptionsList />} />

        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
