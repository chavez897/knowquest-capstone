import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

export const EditReview = ({ response, setHaveSearched}) => {
    // form value state
  const [formValues, handleFormInputChange, reset] = useForm({
    appropriateness: response.appropriateness / 2,
    efectiveness: response.effectiveness / 2,
    value: response.value / 2,
    visual_aids: response.visual_aids / 2,
    overall: response.overall / 2,
    recommend: response.recommend,
    instructor_manualProvided: response.instructorManualProvided,
    teachingSlidesProvided: response.instructorManualProvided,
    questionBankProvided: response.questionBankProvided,
    digitalResourceProvided: response.digitalResourceProvided,
    assigmentsProvided: response.assigmentsProvided,
    instructorManualUsed: response.instructorManualUsed,
    teachingSlidesUsed: response.teachingSlidesUsed,
    questionBankUsed: response.questionBankUsed,
    digitalResourceUsed: response.digitalResourceUsed,
    assigmentsUsed: response.assigmentsUsed,
    useAgain: response.useAgain,
    comments: response.comments,
    year: response.year
  });

  const {
    area,
    level,
    semester,
    cost,
    recommend,
    instructor_manualProvided,
    teachingSlidesProvided,
    questionBankProvided,
    digitalResourceProvided,
    assigmentsProvided,
    instructorManualUsed,
    teachingSlidesUsed,
    questionBankUsed,
    digitalResourceUsed,
    assigmentsUsed,
    useAgain,
    comments,
    year,
  } = formValues;

  //state for react stars
  const [appropriateness, setAppropriateness] = useState("");
  const [efectiveness, setEfectiveness] = useState("");
  const [value, setValue] = useState("");
  const [visualaids, setVisualaids] = useState("");
  const [overall, setOverall] = useState("");
  //state for books
  const [areas, setAreas] = useState([]);
  const [costs, setCosts] = useState([]);
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [years, setYears] = useState([])

  useEffect(() => {
    axiosInstance.get("/study-area/").then((res) => {
      setAreas(res.data.results);
    });

    axiosInstance.get("/cost/").then((res) => {
      setCosts(res.data.results);
    });

    axiosInstance.get("/level/").then((res) => {
      setLevels(res.data.results);
    });

    axiosInstance.get("/semester/").then((res) => {
      setSemesters(res.data.results);
    });
    let tempYears = []
    let currentYear = new Date().getFullYear()
    for (let i = 0; i < 5; i++) {
      tempYears.push(currentYear - i)
    } 
    setYears(tempYears)

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
      .put("/books-ratings/5/", {
        book: response.bookInfo.id,
        subject: area,
        level: level,
        cost: cost,
        semester: semester,
        appropriateness: appropriateness * 2,
        efectiveness: efectiveness * 2,
        value: value * 2,
        visual_aids: visualaids * 2,
        overall: overall * 2,
        recommend: recommend,
        instructor_manualProvided: instructor_manualProvided,
        teachingSlidesProvided: teachingSlidesProvided,
        questionBankProvided: questionBankProvided,
        digitalResourceProvided: digitalResourceProvided,
        assigmentsProvided: assigmentsProvided,
        instructorManualUsed: instructorManualUsed,
        teachingSlidesUsed: teachingSlidesUsed,
        questionBankUsed: questionBankUsed,
        digitalResourceUsed: digitalResourceUsed,
        assigmentsUsed: assigmentsUsed,
        useAgain: useAgain,
        comments: comments,
        year: year
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
        setHaveSearched(false)
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
        {/* <div className="py-3">Book Title: {book.title}</div> */}
        {/* first rating block */}
        <div className="row-12 row-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">Subject</label>
                  <div className="col-sm-7">
                    <select
                      className="form-control"
                      name="area"
                      value={area}
                      defaultValue = {response.subject}
                      onChange={handleFormInputChange}
                    >
                      <option></option>
                      {areas.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">Level</label>
                  <div className="col-sm-7">
                    <select
                      className="form-control"
                      name="level"
                      value={level}
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
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">Semester</label>
                  <div className="col-sm-7">
                    <select
                      className="form-control"
                      name="semester"
                      value={semester}
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
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">Cost</label>
                  <div className="col-sm-7">
                    <select
                      className="form-control"
                      name="cost"
                      value={cost}
                      onChange={handleFormInputChange}
                    >
                      <option></option>
                      {costs.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
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
                      <p className="fw-bold mt-0 mt-md-3">Appropriateness </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setAppropriateness(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={false}
                        value={response.appropriateness / 2}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Effectiveness </p>
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
                        isHalf={false}
                        value={response.effectiveness / 2}
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
                        isHalf={false}
                        value={response.value / 2}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold mt-0 mt-md-3">Visual Aids </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setVisualaids(event)}
                        size={40}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={false}
                        value={response.visualAids / 2}
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
                        isHalf={false}
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
                    Do you recommend this textbook?
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="checkbox"
                      name="recommend"
                      defaultChecked = {response.recommend}
                      value={!recommend}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* fourth rating block */}
        <div className="row-12 row-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <div className="row">
                <div className="col-lg-2 offset-7">Provided</div>
                <div className="col-lg-2">Used</div>
              </div>
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <label className="col-sm-7 col-form-label">
                    Instructor's Manual
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="instructor_manualProvided"
                      defaultChecked = {response.instructorManualProvided}
                      value={!instructor_manualProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="instructorManualUsed"
                      defaultChecked = {response.instructorManualUsed}
                      value={!instructorManualUsed}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-sm-7 col-form-label">
                    Teaching Slides
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="teachingSlidesProvided"
                      defaultChecked = {response.teachingSlidesProvided}
                      value={!teachingSlidesProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="teachingSlidesUsed"
                      defaultChecked = {response.teachingSlidesUsed}
                      value={!teachingSlidesUsed}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-sm-7 col-form-label">
                    Question Bank
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="questionBankProvided"
                      defaultChecked = {response.questionBankProvided}
                      value={!questionBankProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="questionBankUsed"
                      defaultChecked = {response.questionBankUsed}
                      value={!questionBankUsed}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-sm-7 col-form-label">Assignments</label>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="assigmentsProvided"
                      defaultChecked = {response.assigmentsProvided}
                      value={!assigmentsProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="assigmentsUsed"
                      defaultChecked = {response.assigmentsUsed}
                      value={!assigmentsUsed}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-sm-7 col-form-label">
                    Digital/Video Resource
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="digitalResourceProvided"
                      defaultChecked = {response.digitalResourceProvided}
                      value={!digitalResourceProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="digitalResourceUsed"
                      defaultChecked = {response.digitalResourceUsed}
                      value={!digitalResourceUsed}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* fifth rating block */}
        <div className="row-12 row-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <label className="col-sm-7 col-form-label">
                    Will you use this textBook again?
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="checkbox"
                      name="useAgain"
                      defaultChecked = {response.useAgain}
                      value={!useAgain}
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
