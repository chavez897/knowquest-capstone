import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export const ResetPasswordScreen = () => {
  const history = useHistory();
  const [formValues, handleInputChange, reset] = useForm({
    password: "",
    confirm: "",
  });

  const { password, confirm } = formValues;

  const location = useLocation();
  const { token = "" } = queryString.parse(location.search);

  useEffect(() => {
    if (token.length <= 0) {
        history.push('/auth/login')
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axiosInstance
        .post("/auth/recover-password/", {
          password: password,
          passwordConfirmation: confirm,
          token: token
        })
        .then((res) => {
          Swal.close();
          Swal.fire({
            title: "Succesful",
            text: "You can login with your new password",
            icon: "success",
            confirmButtonText: "Ok",
          });
          reset();
          history.push('/auth/login')
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
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8">
            <div className="card shadow-2-strong">
              <div className="card-body p-5">
                <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleSubmit}
                >
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
                  <div className="md:row mt-3 text-center">
                    <div className="mx-auto">
                      <button
                        className="mx-1 btn btn-primary btn-lg btn-block col-12 col-md-6"
                        type="submit"
                      >
                        Reset Password
                      </button>
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
