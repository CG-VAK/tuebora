// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
const App: React.FC = () => {
  
  return (
    <Router>
      <MainLayout>
      <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} /> 
            <Route path="/login" element={<Login />} />
            <Route index element={<Navigate to="/login" />} />
      </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
