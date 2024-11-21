

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";


export default function AdminRoute(){
  const user = useAuth();
  if (!user || !user.token) return <Navigate to="/" />;
  return <Outlet />;
};




