import React from 'react';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, Drawer,  CssBaseline } from '@mui/material';

import { useAuth } from '../context/AuthContext';
import { BrowserRouter as Router,Route, Navigate, useMatch,Link,Routes,Outlet } from 'react-router-dom';
import ViewData from './ViewData';
import ImportData from './ImportData';
import UserSettings from './UserSettings';
import Sidebar from '../components/Sidebar';
import './../Dashboard.css';


const Dashboard: React.FC = () => {
      const match = useMatch('/dashboard/:section');
    const { isAuthenticated } = useAuth();
       console.log('dashboard... isAuthenticated ',isAuthenticated);
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
 // return <div>Dashboard Page</div>;
 return (
    <div className="dashboard-container">
    <Sidebar />
    <div className="page-content">
    {/* <Router basename="/dashboard"> */}
        <Routes>
          <Route path="/" element={<ViewData />} />
          <Route path="/view" element={<ViewData />} />
          <Route path="/import" element={<ImportData />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
    {/* </Router> */}
      </div>
  </div>
//     <div>
//     <Sidebar />
//     <Routes>
//       <Route path="/" element={<ViewData />} />
//       <Route path="/view" element={<ViewData />} />
//       <Route path="/import" element={<ImportData />} />
//       <Route path="/settings" element={<UserSettings />} />
//     </Routes>
//   </div>
                
 )
};

  {/* <Container>
                 
                    <Typography variant="h4">Welcome, !</Typography>
                    <Typography variant="h5">This is Dashboard</Typography>
                </Container> */}
export default Dashboard;