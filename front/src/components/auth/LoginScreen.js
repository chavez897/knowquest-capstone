import React from "react";
import { login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "../../actions/user";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

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
  const register = () => {
    console.log("register");
  };
  const forgot = () => {
    console.log("forgot");
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
                      <div
                        className="mx-1 mt-2 mt-md-0 btn btn-primary btn-lg btn-block col-12 col-md-3"
                        onClick={register}
                      >
                        Register
                      </div>
                      <div
                        className="mx-1 d-inline col-12 btn text-primary col-md-4"
                        onClick={forgot}
                      >
                        Forgot yout Password?
                      </div>
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
