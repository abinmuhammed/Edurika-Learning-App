import React, { lazy, Suspense, useEffect } from "react";
import Feautures from "../components/Feautures/Feautures";
import Categories from "../components/categories/Categories";
import Footer from "../components/adminHome/Footer/Footer";
import Trending from "../components/New Components/Trending";
import axios from "axios";
import { BASEURL } from "../components/Constants/Constants";
import News from "../components/New Components/News";
import Typed from "../utils/Typed";
import Mentorship from "../components/New Components/MentorAd/Mentorship";
const Banner = lazy(() => import("../components/Banner/Banner"));

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const triggerPosition = 500;

      if (scrollPosition >= triggerPosition) {
        const element = document.querySelector(".updateText");
        if (element) {
          element.classList.add("animate");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const triggerPosition = 1200;

      if (scrollPosition >= triggerPosition) {
        const element = document.querySelector(".mentorship");
        if (element) {
          element.classList.add("animatementor");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <div>
            <h2>loading....</h2>
          </div>
        }
      >
        <Banner></Banner>
      </Suspense>
      <div className="mt-4 mb-4">
        
      <Feautures></Feautures>
      </div>
      <div className="d-flex justify-content-center mb-4 mt-4"></div>
      <Categories></Categories>
      <div className="mt-4 mb-4">
        <div id="" className="text-white d-flex mb-4 justify-content-center">
          <h3 className="p-3 updateText">
            Stay updated on the latest developments in your field of interest
          </h3>
        </div>
        <News></News>
      </div>
      <div className="mb-4 mt-4">
        <Trending></Trending>
      </div>
      <div className="mt-5 mb-5 mentorship">
        <Mentorship></Mentorship>
      </div>


      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
export default Home;
