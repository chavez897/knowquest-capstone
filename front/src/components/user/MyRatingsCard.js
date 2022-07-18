import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";

export const MyRatingsCard = () => {
    const book = <FontAwesomeIcon icon={faBook} />;
    const resource = <FontAwesomeIcon icon={faCircleDot} />;
  return (
    <div className="card bg-muted text-white">
      <div className="bg-light">
        <div className="row px-5 py-4">
          <div className="col-12 text-dark">
            <div>
              <p className="fw-bold fs-4">My Ratings </p>
            </div>
            <div className="row my-2">
            <div className="col-1">{book}</div>
              <Link to="/user/my-ratings" className="mt-0 pt-0 col-10">
                <div className="col-12 text-start fw-lighter">
                  Textbook Ratings
                </div>
              </Link>
            </div>
            <div className="row my-2">
            <div className="col-1">{resource}</div>
              <Link to="/user/rc-ratings" className="mt-0 pt-0 col-10">
                <div className="col-12 text-start fw-lighter">
                  Resource Ratings
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
