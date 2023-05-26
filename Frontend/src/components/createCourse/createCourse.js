import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import stylehere from "./Addcourse.module.css";
import Loading from "../Loading/Loading";
import { AiFillDelete } from "react-icons/ai";
import { BASEURL } from "../Constants/Constants";

function CreateCourse() {
  const [video, setVideo] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isplaying, setisplaying] = useState(false);
  const coursedata = useParams();
  const courseid = coursedata.id;
  const [modulename, setmodulename] = useState("");
  const [error, seterror] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh,setrefresh]=useState(true)

  useEffect(() => {
    setLoading(true);

    getlessons();
    console.count('h')
  }, [refresh]);

  const getlessons = () => {
    const url = `${BASEURL}/getLessons?courseID=${courseid}`;

    axios.get(url).then((response) => {
      console.log(response.data.result[0].Lessons);
      setLessons(response.data.result[0].Lessons);
      setLoading(false);
      
    });
  };

  const deletecourse = (modulename, courseID = courseid) => {
    axios
      .delete(BASEURL + `deleteModule?module=${modulename}&course=${courseID}`)
      .then((response) => {
        console.log(response);
        setrefresh(!refresh)
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!modulename) {
      seterror(true);
      return false;
    }

    const formData = new FormData();

    formData.append("video", video);
    formData.append("courseID", courseid);
    formData.append("modulename", modulename);

    await axios
      .post(`${BASEURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      })
      .then((Response) => {
        setrefresh(!refresh)
        console.log(Response.data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Video Uploaded successfully",
        });
        setProgress(0);
      })
      .catch((error) => {
        alert("upload failed");
        setProgress(0);
      });
  };

  const handleplaybutton = () => {
    setisplaying(true);
  };
  const handlemodulename = (e) => {
    const input = e.target.value;
    setmodulename(input);
  };

  return (
    <>
      <div
        className={[stylehere.maincenter, "col-5"].join(" ")}
        style={{ "box-shadow": "5px 3px 2px rgb(61, 58, 58)" }}
      >
        <div className=" maincenter text-center">
          <h2 className="module-text">Add a new Module Here </h2>
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Module Name</Form.Label>
              <Form.Control
                type="text"
                onChange={handlemodulename}
                placeholder="Enter Module Name"
              />
              {error && (
                <Form.Label className="text-danger">
                  Please add module name !
                </Form.Label>
              )}
            </Form.Group>
            <input
              className="bg-dark bg-gradient"
              type="file"
              name="file"
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <button className="btn btn-dark bg-gradient m-2" type="submit">
              Upload Video
            </button>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
          </form>
        </div>

        {loading ? (
          <Loading></Loading>
        ) : (
          lessons.map((item, index) => {
            return (
              <>
                <div key={item._id} className="m-2 d-flex justify-content-between text-light  p-2 lessons">
                  <div>
                    <h4>Module: {item.ModuleName} </h4>
                  </div>
                  <div className="">
                    <p>Duration:{Math.floor(item.duration)}s</p>
                  </div>
                  <div className="">
                    {!isplaying && (
                      <h5 onClick={handleplaybutton}>
                        WatchVideo <FaPlayCircle></FaPlayCircle>
                      </h5>
                    )}
                  </div>
                  <div className="col-3">
                    {isplaying && (
                      <video
                        className="col-8 videoplayer"
                        src={item.url}
                        controls
                      ></video>
                    )}
                  </div>
                  <button
                    className="btn"
                    onClick={() => deletecourse(item.ModuleName)}
                  >
                    {" "}
                    <AiFillDelete></AiFillDelete>
                  </button>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
}

export default CreateCourse;
