import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const IndexSignUp = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="row" style={{ backgroundColor: "#333999" }}>
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
          <div className="text-white py-2">
            <input type="radio" value="Online" name="btn" /> Online Learning
          </div>
          <div className="text-white mb-5">
            <input type="radio" value="Inclass" name="btn" /> Inclass Learning
          </div>
          <div
            role="button"
            className="btn btn-warning text-white"
            style={{ width: "30vh" }}
          >
            Submit
          </div>
          <div className="text-white py-3">
            {user.username ? (
              <div>
                <p>Hi {user.username}, you can submit your response now!</p>
              </div>
            ) : (
              <div>
                <p>
                  You must be <Link to="/auth/login">logged in</Link> to answer
                  questions
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-4 bg-light offset-lg-2">
          {user.username ? (
            <div>
              <h4 className="py-5 text-center">Refer A Student or Professor</h4>
              <p>
                Refer your fellow students and professors for additional chances
                to win in our contests! As long as they are an active user, you
                get extra contest entries!
              </p>
              <div className="py-5 d-flex justify-content-center">
                <Link
                  role="button"
                  className="btn btn-warning text-white"
                  style={{ width: "30vh" }}
                  to="/user/referral"
                >
                  Start Refering
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="py-3 text-center">Sign up Today</h3>
              <p>
                Just sign up with your school email. We will send you a
                confirmation email so check your inbox and junk folder. Then
                just click the link in the confirmation email to setup your
                profile. It takes less than a minute and we do not collect any
                other personal information.
              </p>
              <div className="py-3 d-flex justify-content-center">
                <Link
                  role="button"
                  className="btn btn-warning text-white"
                  style={{ width: "30vh" }}
                  to="/auth/login"
                >
                  Login
                </Link>
              </div>
              <div className="py-3 d-flex justify-content-center">
                <Link
                  role="button"
                  className="btn btn-warning text-white"
                  style={{ width: "30vh" }}
                  to="/auth/register"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
