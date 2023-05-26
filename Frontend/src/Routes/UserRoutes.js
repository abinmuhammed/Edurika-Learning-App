import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import TextLinkExample from "../components/Navbar/Navbar";
import Signup from "../components/Signup/Signup";
import Home from "../pages/home";
import OneCategory from "../pages/OneCategory";
import VideoPlayer from "../pages/WatchVideo";
import { Privateuser } from "../components/Private/VerifyAdmin";
import ChatRoom from "../pages/ChatRoom";
import Chat from "../pages/Chat";
import CoursesUser from "../pages/Courses_user";
import Notification from "../components/Notification/Notification";
import News from "../components/New Components/News";
import Trending from "../components/New Components/Trending";
import Mentorship from "../components/New Components/MentorAd/Mentorship";

function UserRoutes() {
  return (
    <>
      <TextLinkExample></TextLinkExample>
      <Routes>
        <Route element={<Privateuser></Privateuser>}>
          <Route path="categories" component={<h1>categories</h1>}></Route>
          <Route
            path="/Courses/:id"
            element={<OneCategory></OneCategory>}
          ></Route>
          <Route
            path="/watchVideo/:id"
            element={<VideoPlayer></VideoPlayer>}
          ></Route>
          <Route path="/Chat" element={<Chat user={"Student"}></Chat>}></Route>
          <Route
            path="/notification"
            element={<Notification></Notification>}
          ></Route>
        </Route>

        {/* <Route path="Chat1" element={<ChatRoom></ChatRoom>}></Route> */}
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route
          path="/Courses-User"
          element={<CoursesUser></CoursesUser>}
        ></Route>
        {/* <Route path="/reset-Password" element={<h2>RESET PASSWORD</h2>}></Route> */}
        <Route path="/test" element={<Mentorship></Mentorship>}></Route>
      </Routes>
    </>
  );
}

export default UserRoutes;
