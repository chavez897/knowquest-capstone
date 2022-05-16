import React from "react";

export const IndexSignUp = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#333999" }}>
      <div className="row px-5">
        <div className="col-lg-6">
          <h3 className="text-white py-3">
            Online or In Class, How Do You Prefer to Learn?
          </h3>
          <p className="text-white">
            We will periodically ask basic questions here on our home page, and
            encourage you to participate! All ratings on KnowQuest.net are
            Anonymous. The following question is in response to the current
            pandemic: Do you prefer to learn Online or In Class?
          </p>
          <div className="text-white py-3">
            <input type="radio" value="Online" name="btn" /> Online Learning
            <input type="radio" value="Inclass" name="btn" /> Inclass Learning
          </div>
          <button
            type="button"
            className="btn btn-warning text-white"
            style={{ width: "30vh" }}
          >
            Submit
          </button>
          <div className="text-white py-3">
            <p>
              You must be <span>logged in</span>to answer questions
            </p>
          </div>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-4 bg-light">
          <h3 className="py-3 text-center">Sign up Today</h3>
          <p>
            Just sign up with your school email. We will send you a confirmation
            email so check your inbox and junk folder. Then just click the link
            in the confirmation email to setup your profile. It takes less than
            a minute and we do not collect any other personal information.
          </p>
          <div className="py-3 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-warning text-white"
              style={{ width: "30vh" }}
            >
              Login
            </button>
          </div>
          <div className="py-3 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-warning text-white"
              style={{ width: "30vh" }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
