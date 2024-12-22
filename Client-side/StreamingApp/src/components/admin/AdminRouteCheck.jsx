

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRouteCheck(){
  const user = JSON.parse(localStorage.getItem("user")) || "";
  console.log("User:", user);
  if (user === "") return <Navigate to="/notfound" />;
  else if(user.Roles !== undefined && user.Roles.filter((role) => role.roleName === "Admin").length === 0) return <Navigate to="/notfound" />;
  return <Outlet />;
};




