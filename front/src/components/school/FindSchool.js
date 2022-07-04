import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";

// test fetch school data,
export const FindSchool = () => {
  const [schools, setSchools] = useState(null);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [haveSearched, setHaveSearched] = useState(false);
  const [formValues, handleFormInputChange, reset] = useForm({
    schoolname: "",
    domainname: "",
  });

  const { domainname } = formValues;

  //const school_name = "university+of+toronto";
  const country = "canada";
  const url = `http://universities.hipolabs.com/search?name=${searchText}&country=${country}`;

  useEffect(() => {
    if (searchText !== "") {
      Swal.fire({
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axiosInstance
        .get(url)
        .then((res) => {
          setSchools(res.data);
          setHaveSearched(true);
          Swal.close();
          setInputText("");
        })
        .catch(() => {
          setHaveSearched(true);
          Swal.close();
          setInputText("");
        });
    }
  }, [searchText]);

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const search = (e) => {
    setSchools("");
    setInputText("");
    e.preventDefault();
    inputHandler(e);
    setSearchText(inputText.split(/\s+/).join("+"));
  };

  const addSchoolHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axiosInstance
      .post("/schools/", {
        schoolname: "University of Toronto",
      })
      .post("/academicdomainss/", {
        domainname: "@utoronto.ca",
      })
      .then((res) => {
        Swal.close();
        Swal.fire({
          title: "Succesful",
          text: "Thank you for adding your school!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        reset();
        setHaveSearched(false);
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
            <p>We are sorry that KnowQuest do not have your school in the system yet,</p>
              <p>Please start search to add your school</p>
              <form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={search}
              >
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Search by School Name
                  </label>
                  <div className="col-sm-7">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search..."
                      value={inputText}
                      onChange={inputHandler}
                      aria-label="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {haveSearched ? <div className="col-12 col-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {schools ? (
                  <div className="form-group row mt-3">
                    {schools.map((school) => (
                      <div key={school.id}>
                        <label className="col-sm-4 col-form-label">
                          {school.name}
                        </label>
                        <div className="col-sm-5">
                          <select
                            className="form-control"
                            name="domainname"
                            value={domainname}
                            onChange={handleFormInputChange}
                          >
                            <option></option>
                            {school.domains.map((domain) => (
                              <option key={domain} value={domain}>
                                {domain}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <div>School is not found</div>}
                {/* {schools && (
                  <div className="form-group row mt-3">
                    {schools.map((school) => (
                      <div key={school.id}>
                        <label className="col-sm-4 col-form-label">
                          {school.name}
                        </label>
                        <div className="col-sm-5">
                          <select
                            className="form-control"
                            name="domainname"
                            value={domainname}
                            onChange={handleFormInputChange}
                          >
                            <option></option>
                            {school.domains.map((domain) => (
                              <option key={domain} value={domain}>
                                {domain}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}

                <div className="form-check row mt-3">
                  <div className="col-10">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label
                      className="form-check-label text-left"
                      forhtml="defaultCheck1"
                    >
                      I acknowledge that I am a student or faculty of the selected school above
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> : null}
        
        <div className="col-12 col-md-8 py-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addSchoolHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
