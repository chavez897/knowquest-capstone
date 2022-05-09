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
  return (
  <section className="vh-100 bg-info">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong">
            <div className="card-body p-5 text-center">

              <h3 className="mb-5">Sign in</h3>
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleLogin}
              >
                <div className="form-outline mb-4">
                  <input type="email" id="typeEmailX-2" className="form-control form-control-lg" 
                    name="email"
                    value={email}
                    onChange={handleInputChange} 
                  />
                  <label className="form-label">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg"
                    name="password"
                    value={password}
                    onChange={handleInputChange} 
                  />
                  <label className="form-label">Password</label>
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
