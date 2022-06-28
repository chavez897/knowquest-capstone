import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../ui/Breadcrumb";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import { MyRatingsCard } from "./MyRatingsCard";

export const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [formValues, handleInputChange, reset] = useForm({
    oldPassword: "",
    newPassword: "",
  });

  const { oldPassword, newPassword } = formValues;

  const [schools, setSchools] = useState([]);
  const [areas, setAreas] = useState([]);
  const [roles] = useState(["student", "regular", "faculty member"]);

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
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axiosInstance
      .put("/auth/update_password/", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        reset();
        Swal.close();
        Swal.fire({
          title: "Succesful",
          text: "You will have to log in with your new password.",
          icon: "success",
          confirmButtonText: "Ok",
        });
        dispatch(logout());
        history.push("/auth/login");
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
    <section className="vh-75">
      <div className="container py-5 h-100">
        <Breadcrumb main="Profile" />
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="row">
            <div className="col-9 col-md-8">
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
                          value={user.role}
                          disabled={true}
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
                    {(user.role === "student" ||
                      user.role === "faculty member") && (
                      <div className="form-group row mt-3">
                        <label className="col-sm-4 col-form-label">
                          Select Area of study
                        </label>
                        <div className="col-sm-7">
                          <select
                            className="form-control"
                            name="area"
                            value={user.studyArea}
                            disabled={true}
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
                    {(user.role === "student" ||
                      user.role === "faculty member") && (
                      <div className="form-group row mt-3">
                        <label className="col-sm-4 col-form-label">
                          Select your current school
                        </label>
                        <div className="col-sm-7">
                          <select
                            className="form-control"
                            name="school"
                            value={user.school}
                            disabled={true}
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
                          value={user.email}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mt-3">
                      <label className="col-sm-4 col-form-label">
                        Password
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="oldPassword"
                          value={oldPassword}
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
                          name="newPassword"
                          value={newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="md:row mt-3">
                      <div className="mx-auto text-center">
                        <button
                          className="mx-1 btn btn-primary btn-lg btn-block col-12 col-md-4"
                          type="submit"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-3">
              <MyRatingsCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
