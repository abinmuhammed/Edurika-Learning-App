import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styleshere from "../pages/watchvideo.module.css";
import { BsFillBellFill } from "react-icons/bs";
import { BASEURL } from "../components/Constants/Constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import thumbnail from "../images/Teacher.jpeg";
import underConstruction from "../images/Free Vector _ Flat under construction sign.jpeg"
import Loading from "../components/Loading/Loading";

const VideoPlayer = () => {
  const { id } = useParams();
  const courseid = id;
  const [videos, setVideos] = useState([]);
  const [videodetails, setvidodetails] = useState([]);

  const [videoIndex, setvideosIndex] = useState(0);

  useEffect(() => {
    getvideo();
  }, [videoIndex]);

  const getvideo = () => {
    const url = BASEURL + `/getLessons?courseID=${courseid}`;
    axios.get(url).then((response) => {
      setVideos(response.data.result[0].Lessons);
      setvidodetails(response.data.result);
    });
  };

  const changesrc = (lessonId) => {
    const index = videos.findIndex((item) => item._id === lessonId);

    setvideosIndex(index);
  };

  

  return (
    <Container className="d-flex flex-wrap  bg-gradient rounded-5 justify-content-center p-2">
      <div className="  col-lg-8 col-sm-12">
        <video
          className="col-lg-12 col-sm-12 videoplayerclass"
          style={{ height: "400px" }}
          src={videos.length > 0 ? videos[videoIndex].url : ""}
          controls
          
          poster={videos.length>0?thumbnail:underConstruction}
        ></video>
        <h2 className="m-1 text-light" >
          {videos.length > 0 ? videos[videoIndex].ModuleName : "In Progress"}
        </h2>
        <p className="m-1 text-light">
          {videodetails && videodetails[0] && videodetails[0].Description
            ? videodetails[0].Description
            : ""}
          ..more
        </p>
        <div className="rounded-3 bg-dark col-2 mt-4 text-light text-center p-1">
          <h6 className="m-1">
            {videodetails && videodetails[0] && videodetails[0].Author
              ? videodetails[0].Author
              : ""}
            <BsFillBellFill></BsFillBellFill>
          </h6>
        </div>
      </div>
      {videos.length>0?<Row className="ms-4 bg-dark bg-gradient rounded-4 col-lg-3  col-12  relatedsection ">
        <h5 className="">Related Videos</h5>
        <div className="d-flex justify-content-center flex-wrap">
          {videos.map((video, index) => (
            <div key={video._id} className="mb-4 col-7    refer">
              <Card
                className=""
                onClick={() => {
                  changesrc(video._id);
                }}
              >
                <Card.Img variant="top" src={thumbnail} />
                <Card.Body>
                  <h6>{video.ModuleName} </h6>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Row>:""}
      
    </Container>
  );
};

export default VideoPlayer;
