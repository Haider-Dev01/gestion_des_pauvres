import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Offers from './pages/Offers';
import Stock from './pages/Stock';
import Redistribution from './pages/Redistribution';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
             <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="offers" element={<Offers />} />
                {/* Routes Protected by Role */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'TRANSPORTEUR']} />}>
                    <Route path="stock" element={<Stock />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                    <Route path="redistribution" element={<Redistribution />} />
                </Route>
             </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
