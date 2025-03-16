import React from "react";
import ReactDOM from "react-dom/client";
import AdminPanel from "./App";
import "./index.css";
import { AuthProvider } from "./hooks/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <AdminPanel />
  </AuthProvider>
);
