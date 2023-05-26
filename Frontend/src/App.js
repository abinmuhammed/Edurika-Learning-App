import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import UserRoutes from "./Routes/UserRoutes";
import MentorRoutes from "./Routes/MentorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import LoadingPage from "../src/components/landing logo/Landinglogo";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
     
          <Route path="/" element={<Navigate to="/user/login" replace />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/adminlogin" replace />}
          />
          <Route
            path="/mentor"
            element={<Navigate to="/mentor/Mentorlogin" replace />}
          />
          <Route path="/user/*" element={<UserRoutes></UserRoutes>}></Route>
          <Route
            path="/mentor/*"
            element={<MentorRoutes></MentorRoutes>}
          ></Route>
          <Route path="/admin/*" element={<AdminRoutes></AdminRoutes>}></Route>

          {/* <Route path="/" element={<LoadingPage></LoadingPage>}></Route> */}
          <Route path="/*" element={<h2>NOT FOUND</h2>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
