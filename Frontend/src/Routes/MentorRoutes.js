import React from "react";
import { Routes, Route } from "react-router-dom";
import Mentorlogin from "../components/MentorLogin/Mentorlogin";
import MentorSignup from "../components/MentorSignup/MentorSignup";
import MentorHome from "../pages/MentorHome";
import CreateCourse from "../components/createCourse/createCourse";
import MnAbar from "../components/MentorNavbar/MnAbar";
import AddCourse from "../components/Course/AddCourse";
import { PrivateMentor } from "../components/Private/VerifyAdmin";
import Chat from "../pages/Chat";

function MentorRoutes() {
  return (
    <>
      <MnAbar></MnAbar>
      <Routes>
        <Route element={<PrivateMentor></PrivateMentor>}>
          <Route path="Home" element={<MentorHome></MentorHome>}></Route>
          <Route path="addcourse" element={<h2>Add course</h2>}></Route>
          <Route
            path="Add-a-lesson/:id"
            element={<CreateCourse></CreateCourse>}
          ></Route>

          <Route
            path="create-a-course"
            element={<AddCourse></AddCourse>}
          ></Route>
        </Route>

        <Route path="MentorLogin"  element={<Mentorlogin ></Mentorlogin>}></Route>
        <Route path="chat"  element={<Chat user={"mentor"}></Chat>}></Route>
        <Route
          path="MentorSignup"
          element={<MentorSignup></MentorSignup>}
        ></Route>
      </Routes>
    </>
  );
}

export default MentorRoutes;
