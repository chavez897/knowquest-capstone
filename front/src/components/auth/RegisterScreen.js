import React from "react";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
    role: "",
    area: "",
    school: "",
    confirm: "",
  });

  const { email, password, role, area, school, confirm } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("register");
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
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
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
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
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
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
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
                    <div className="mx-auto">
                      <button
                        className="mx-1 btn btn-primary btn-lg btn-block col-12 col-md-4"
                        type="submit"
                      >
                        Register
                      </button>
                      <div
                        className="mx-1 d-inline col-12 btn text-primary"
                        onClick={forgot}
                      >
                        Already have an account?
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
