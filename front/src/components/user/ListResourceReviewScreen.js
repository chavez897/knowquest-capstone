import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../ui/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../plugins/axios";
import ReactPaginate from "react-paginate";
import { MyRatingsCard } from "./MyRatingsCard";

export const ListResourceReviewScreen = () => {
  const [resources, setResources] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const eye = <FontAwesomeIcon icon={faPencil} />;
  useEffect(() => {
    requestRatings(1)
  }, []);

  const requestRatings = (page) => {
    // change this filed to resource rating
    axiosInstance.get(`/resources-ratings/mine/?page=${page}`).then((res) => {
      setResources(res.data.results);
      setMaxPage(Math.ceil(res.data.count / res.data.pageSize))
    });
  }
  const handlePageClick = (event) => {
    requestRatings(event.selected + 1)
  };
  return (
    <div className="mt-3">
      <Breadcrumb
        main="Profile"
        secondary="My Resource Ratings"
        link="/user/profile"
      />
      <div className="pb-5 pt-2">
        <p className="fw-bold fs-2">My Resources Rating List </p>
      </div>
      <div className="pt-2 row">
        <div className="col-9">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Rated Item</th>
                <th scope="col">Name</th>
                <th scope="col">Created At</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <th scope="row">{resource.id}</th>
                  <td>Resource</td>
                  <td>{resource.resourceInfo.title}</td>
                  <td>{resource.created}</td>
                  <td>
                    <Link to={`/editresourcereview/?reviewId=${resource.id}`}>
                      <div>{eye}</div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={maxPage}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
        <div className="col-3">
          <MyRatingsCard />
        </div>
      </div>
    </div>
  );
};
