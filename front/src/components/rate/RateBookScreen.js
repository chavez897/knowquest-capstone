import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";

export const RateBookScreen = ({ reviews }) => {
  // form value state
  const [formValues, handleFormInputChange, reset] = useForm({
    appropriateness: "",
    efectiveness: "",
    value: "",
    visual_aids: "",
    overall: "",
    recommend: false,
    instructor_manualProvided: false,
    teachingSlidesProvided: false,
    questionBankProvided: false,
    digitalResourceProvided: false,
    assigmentsProvided: false,
    instructorManualUsed: false,
    teachingSlidesUsed: false,
    questionBankUsed: false,
    digitalResourceUsed: false,
    assigmentsUsed: false,
    useAgain: false,
    comments: "",
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
  } = formValues;

  //state for book search: inputText handle change in textbox; searchText handle change in search
  //condition (async serach); return book json
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [book, setBook] = useState([]);
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

  // test output
  console.log(area);
  console.log(level);
  console.log(cost);
  console.log(semester);
  console.log(book.publishDate);
  console.log(appropriateness);
  console.log(efectiveness);
  console.log(value);
  console.log(visualaids);
  console.log(overall);
  console.log(recommend);
  console.log(instructor_manualProvided);
  console.log(instructorManualUsed);
  console.log(teachingSlidesProvided);
  console.log(teachingSlidesUsed);
  console.log(questionBankProvided);
  console.log(questionBankUsed);
  console.log(assigmentsProvided);
  console.log(assigmentsUsed);
  console.log(digitalResourceProvided);
  console.log(digitalResourceUsed);
  console.log(useAgain);
  console.log(comments);

  useEffect(() => {
    const fetchBook = async () => {
      await axiosInstance
        .get(`/books/search/?isbn=${searchText}`)
        .then((res) => {
          setBook(res.data);
        });
    };
    fetchBook();

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
  }, [searchText]);

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const search = (e) => {
    e.preventDefault();
    setSearchText(inputText);
  };

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
      .post("/books-ratings/", {
        book: book.id,
        subject: area,
        level: level,
        cost: cost,
        semester: semester,
        appropriateness: appropriateness,
        efectiveness: efectiveness,
        value: value,
        visual_aids: visualaids,
        overall: overall,
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
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={search}
              >
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Search by ISBN
                  </label>
                  <div className="col-sm-7">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search..."
                      value={inputText}
                      onChange={inputHandler}
                      aria-label="Search"
                      onSubmit={search}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8">
          {book.isbn ? (
            <div className="py-3">Book Title: {book.title}</div>
          ) : (
            <div></div>
          )}
        </div>
        {/* first rating block */}
        <div className="col-12 col-md-8 py-3">
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
                    <select className="form-control">
                      <option>{book.publishDate}</option>
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
        <div className="col-12 col-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold">Appropriateness </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setAppropriateness(event)}
                        size={20}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold">Effectiveness </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setEfectiveness(event)}
                        size={20}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold">Value </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setValue(event)}
                        size={20}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold">Visual Aids </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setVisualaids(event)}
                        size={20}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-lg-4">
                    <div>
                      <p className="fw-bold">Overall </p>
                    </div>
                  </div>
                  <div className="col-lg-7 pb-2">
                    <div>
                      <ReactStars
                        count={5}
                        onChange={(event) => setOverall(event)}
                        size={20}
                        activeColor="#ffd700"
                        edit={true}
                        isHalf={false}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* third rating block */}
        <div className="col-12 col-md-8 py-3">
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
        <div className="col-12 col-md-8 py-3">
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
                      value={!instructor_manualProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="instructorManualUsed"
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
                      value={!teachingSlidesProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="teachingSlidesUsed"
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
                      value={!questionBankProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="questionBankUsed"
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
                      value={!assigmentsProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="assigmentsUsed"
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
                      value={!digitalResourceProvided}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      name="digitalResourceUsed"
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
        <div className="col-12 col-md-8 py-3">
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
        <div className="col-12 col-md-8 py-3">
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
        <div className="col-12 col-md-8 py-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addreviewHandler}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="row p-5"></div>
    </div>
  );
};
