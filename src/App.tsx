// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LeavesForm from "./pages/LeavesForm.jsx";
import LeaveList from "./pages/LeaveList.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute requiredRole={null}><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="apply-leave" element={<LeavesForm />} />
            <Route path="my-leaves" element={<LeaveList view="my" />} />
            
            <Route 
              path="admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <LeaveList view="admin" />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="employees" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <EmployeeList />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="add-employee" 
              element={
                <ProtectedRoute requiredRole="admin">
                   <AddEmployee />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;