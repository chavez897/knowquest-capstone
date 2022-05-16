import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    password: "",
    role: "",
    area: "",
    school: "",
    confirm: "",
  });

  const { email, password, role, area, school, confirm } = formValues;

  const [schools, setSchools] = useState([]);
  const [areas, setAreas] = useState([]);
  const [roles, setRoles] = useState(["student", "regular", "faculty member"]);

  useEffect(() => {
    axiosInstance.get("/schools/").then((res) => {
      setSchools(res.data.results);
    });
    axiosInstance.get("/study-area/").then((res) => {
      setAreas(res.data.results);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    let requestSchool = null;
    let requestArea = null;
    if (role === "student" || role === "faculty member") {
      requestSchool = school;
      requestArea = area;
    }
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const username = email.split("@")[0] + Math.floor(Math.random() * 100);
    axiosInstance
      .post("/auth/signup/", {
        email: email,
        username: username,
        password: password,
        password_confirmation: confirm,
        role: role,
        school: requestSchool,
        studyArea: requestArea,
      })
      .then((res) => {
        Swal.close();
        Swal.fire({
          title: "Succesful",
          text: "Please verify your email account.",
          icon: "success",
          confirmButtonText: "Ok",
        });
        reset();
      })
      .catch((error) => {
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
  const forgot = () => {
    console.log(schools);
    console.log(areas);
  };

  return (
    <section className="vh-75">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8">
            <div className="card shadow-2-strong">
              <div className="card-body p-5">
                <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleLogin}
                >
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      I am a ...
                    </label>
                    <div className="col-sm-7">
                      <select
                        className="form-control"
                        name="role"
                        value={role}
                        onChange={handleInputChange}
                      >
                        <option></option>
                        {roles.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {(role === "student" || role === "faculty member") && (
                    <div className="form-group row mt-3">
                      <label className="col-sm-4 col-form-label">
                        Select Area of study
                      </label>
                      <div className="col-sm-7">
                        <select
                          className="form-control"
                          name="area"
                          value={area}
                          onChange={handleInputChange}
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
                  )}
                  {(role === "student" || role === "faculty member") && (
                    <div className="form-group row mt-3">
                      <label className="col-sm-4 col-form-label">
                        Select your current school
                      </label>
                      <div className="col-sm-7">
                        <select
                          className="form-control"
                          name="school"
                          value={school}
                          onChange={handleInputChange}
                        >
                          <option></option>
                          {schools.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="form-group row mt-3">
                    <label className="col-sm-4 col-form-label">
                      E-Mail Address
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row mt-3">
                    <label className="col-sm-4 col-form-label">Password</label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label className="col-sm-4 col-form-label">
                      Confirm Password
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirm"
                        value={confirm}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
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
                        I accept the Terms of Use and Privacy Policy
                      </label>
                    </div>
                  </div>
                  <div className="md:row mt-3">
                    <div className="mx-auto text-center">
                      <button
                        className="mx-1 btn btn-primary btn-lg btn-block col-12 col-md-4"
                        type="submit"
                      >
                        Register
                      </button>
                      <Link to="/auth/login">
                        <div className="mx-1 d-inline col-12 btn text-primary">
                          Already have an account?
                        </div>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
