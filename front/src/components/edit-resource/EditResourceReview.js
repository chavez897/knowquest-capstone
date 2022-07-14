import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const EditResourceReview = ({ response, setHaveSearched }) => {
  // form value state
  const user = useSelector((state) => state.user);
  // form value state
  const [formValues, handleFormInputChange, reset] = useForm({
    name: response.resourceInfo.resourceName,
    title: response.resourceInfo.title,
    efectiveness: response.effective / 2,
    relevent: response.relevant / 2,
    easeofuser: response.easyUse / 2,
    value: response.value / 2,
    helpwithclass: response.classHelped / 2,
    overall: response.overall / 2,
    recommend: response.recommend,
    comments: response.comments,
    year: response.year,
  });

  const {
    name,
    title,
    type,
    subject,
    level,
    semester,
    year,
    recommend,
    comments,
  } = formValues;

  //state for react stars
  const [relevent, setRelevent] = useState("");
  const [efectiveness, setEfectiveness] = useState("");
  const [value, setValue] = useState("");
  const [ease, setEase] = useState("");
  const [helped, setHelped] = useState("");
  const [overall, setOverall] = useState("");
  //state for resources
  const [resourceTypes, setResourceTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    axiosInstance.get("/media-type/").then((res) => {
      setResourceTypes(res.data.results);
    });

    axiosInstance.get("/study-area/").then((res) => {
      setSubjects(res.data.results);
    });

    axiosInstance.get("/level/").then((res) => {
      setLevels(res.data.results);
    });

    axiosInstance.get("/semester/").then((res) => {
      setSemesters(res.data.results);
    });

    let tempYears = [];
    let currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      tempYears.push(currentYear - i);
    }
    setYears(tempYears);
  }, []);

  // POST operation to backend
  const addreviewHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axiosInstance
      .put("/resources-ratings/", {
        effective: efectiveness * 2,
        relevant: relevent * 2,
        easyUse: ease * 2,
        value: value * 2,
        classHelped: helped * 2,
        overall: overall * 2,
        recommend: recommend,
        comments: comments,
        year: year,
        resource: response.resource,
        user: user.id,
        subject: subject,
        level: level,
        semester: semester,
      })
      .then((res) => {
        Swal.close();
        Swal.fire({
          title: "Succesful",
          text: "You have submitted your review!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        reset();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text:
            error.response.data.errors[0].field +
            ": " +
            error.response.data.errors[0].message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div>
      <div>
        {/* first rating block */}
        <div className="row-12 row-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">
                    Resource Name
                  </label>
                  <div className="col-sm-7">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter a text entry, URL, name or others..."
                      name="name"
                      value={name}
                      onChange={handleFormInputChange}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">
                    Resource Title
                  </label>
                  <div className="col-sm-7">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Resource Title..."
                      name="title"
                      value={title}
                      onChange={handleFormInputChange}
                      disabled={true}
                    />
                  </div>
                </div>
                {resourceTypes.length > 0 ? (
                  <div className="form-group row mt-3">
                    <label className="col-sm-4 col-form-label">
                      Resource Type
                    </label>
                    <div className="col-sm-7">
                      <select
                        className="form-control"
                        name="area"
                        value={response.resourceInfo.mediaType}
                        onChange={handleFormInputChange}
                        disabled={true}
                      >
                        <option></option>
                        {/* change resources types name if different */}
                        {resourceTypes.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
                {subjects.length > 0 ? (
                  <div className="form-group row mt-3">
                    <label className="col-sm-4 col-form-label">Subject</label>
                    <div className="col-sm-7">
                      <select
                        className="form-control"
                        name="area"
                        value={response.subject}
                        onChange={handleFormInputChange}
                      >
                        <option></option>
                        {subjects.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
                {levels.length > 0 ? (
                  <div className="form-group row mt-3">
                    <label className="col-sm-4 col-form-label">Level</label>
                    <div className="col-sm-7">
                      <select
                        className="form-control"
                        name="level"
                        value={response.level}
                        onChange={handleFormInputChange}
                      >
                        <option></option>
                        {levels.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
                {semesters.length > 0 ? (
                  <div className="form-group row mt-3">
                    <label className="col-sm-4 col-form-label">Semester</label>
                    <div className="col-sm-7">
                      <select
                        className="form-control"
                        name="semester"
                        value={response.semester}
                        onChange={handleFormInputChange}
                      >
                        <option></option>
                        {semesters.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">Year</label>
                  <div className="col-sm-7">
                    <select
                      className="form-control"
                      name="year"
                      value={year}
                      onChange={handleFormInputChange}
                    >
                      <option></option>
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* second rating block */}
        <div className="row-12 row-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Effective </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setEfectiveness(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={true}
                        value={response.effective / 2}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Relevant </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setRelevent(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={true}
                        value={response.relevant / 2}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Ease of Use </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setEase(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={true}
                        value={response.easyUse / 2}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Value </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setValue(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={true}
                        value={response.value / 2}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Helped with class </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setHelped(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={true}
                        value={response.classHelped / 2}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Overall </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setOverall(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={true}
                        value={response.overall / 2}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* third rating block */}
        <div className="row-12 row-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <label className="col-sm-7 col-form-label">
                    Do you recommend this resource?
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="checkbox"
                      name="recommend"
                      defaultChecked={response.recommend}
                      value={!recommend}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* sixth rating block */}
        <div className="row-12 row-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">
                    Additional Comments
                  </label>
                  <div className="col-sm-7">
                    <textarea
                      className="form-control"
                      rows="3"
                      name="comments"
                      value={comments}
                      onChange={handleFormInputChange}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* submit */}
        <div className="row-12 row-md-8 py-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addreviewHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
