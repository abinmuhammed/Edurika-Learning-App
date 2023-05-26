import axios from "axios";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loading from "../Loading/Loading";
import {MdViewHeadline} from 'react-icons/md'

// import Sonnet from '../../components/Sonnet';

function News() {
  const [key, setKey] = useState("home");
  const [news, setnews] = useState([]);
  const [Businessnews, setBusinessNews] = useState([]);
  const Api = "2ca8fda63dbc4e51acffc3017b401493";
  const url =
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=2ca8fda63dbc4e51acffc3017b401493";

    const url2="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2ca8fda63dbc4e51acffc3017b401493"





    
  useEffect(() => {
    getTechNews();
    
    getBusinessNews();

  }, []);

  const  getTechNews = () => {
    axios.get(url).then((res) => {
      setnews(res.data.articles.slice(-5));
    });
  };

  const getBusinessNews=()=>{
    axios.get(url2).then((res)=>{
        setBusinessNews(res.data.articles.slice(-5))
    })
  }

  return (
    <div className="d-flex justify-content-center p-4 ">
      <div className=" bg-light col-10 rounded-4  bg-gradient">
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3  btn btn-dark bg-gradient"
          fill
        >
          <Tab
            eventKey="home"
            title="Tech "
            style={{ fontFamily: "revert-layer" }}
          >
            {news.length > 0 ? (
              news.map((item, index) => (
                <div key={index} className="newsborder newsborder  text-light bg-gradient">
                  <h5 className="m-3 ">{item.title} <MdViewHeadline></MdViewHeadline></h5>
                  <p className="p-3">{item.description}</p>
                </div>
              ))
            ) : (
              <Loading></Loading>
            )}
          </Tab>

          <Tab eventKey="contact" title="Business" className="p-3 ">
          {Businessnews.length > 0 ? (
              Businessnews.map((item, index) => (
                <div key={index} className="newsborder bg-dark text-light bg-gradient">
                  <h5 className="m-3 ">{item.title} <MdViewHeadline></MdViewHeadline></h5>
                  <p className="p-3 ">{item.description}</p>
                </div>
              ))
            ) : (
              <Loading></Loading>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default News;
