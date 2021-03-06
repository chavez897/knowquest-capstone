import React, { useEffect } from "react";
import { login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "../../actions/user";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { axiosInstance } from "../../plugins/axios";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const location = useLocation();
  const { token = "" } = queryString.parse(location.search);

  useEffect(() => {
    if (token.length > 0) {
      Swal.fire({
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axiosInstance
        .post("/auth/verify/", {
          token: token,
        })
        .then((res) => {
          Swal.close();
          Swal.fire({
            title: "Succesful",
            text: "You can login with your new account",
            icon: "success",
            confirmButtonText: "Ok",
          });
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
    }
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    dispatch(login(email, password))
      .then(() => {
        dispatch(getUserData()).then(() => {
          Swal.close();
        });
      })
      .catch((error) => {
        Swal.close();
        const message =
          error.length <= 0 ? "Error please try again" : error[0].message;
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
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
                    <label className="col-sm-3 col-form-label">
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
                    <label className="col-sm-3 col-form-label">Password</label>
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
                  <div className="md:row mt-3 text-center">
                    <div className="mx-auto">
                      <button
                        className="mx-1 btn btn-primary btn-lg btn-block col-12 col-md-3"
                        type="submit"
                      >
                        Login
                      </button>
                      <Link to="/auth/register">
                        <div className="mx-1 mt-2 mt-md-0 btn btn-primary btn-lg btn-block col-12 col-md-3">
                          Register
                        </div>
                      </Link>
                      <Link to="/auth/forgot-password">
                        <div className="mx-1 d-inline col-12 btn text-primary col-md-4">
                          Forgot yout Password?
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
