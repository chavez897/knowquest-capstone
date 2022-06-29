import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../ui/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../plugins/axios";
import ReactPaginate from "react-paginate";
import { MyRatingsCard } from "./MyRatingsCard";

export const ListOwnReviewsScreen = () => {
  const [books, setBooks] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const eye = <FontAwesomeIcon icon={faPencil} />;
  useEffect(() => {
    requestRatings(1)
  }, []);

  const requestRatings = (page) => {
    axiosInstance.get(`/books-ratings/mine/?page=${page}`).then((res) => {
      setBooks(res.data.results);
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
        secondary="My Textbook Ratings"
        link="/user/profile"
      />
      <div className="pb-5 pt-2">
        <p className="fw-bold fs-2">My Rating Textbooks List </p>
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
              {books.map((book) => (
                <tr key={book.id}>
                  <th scope="row">{book.id}</th>
                  <td>Book</td>
                  <td>{book.bookInfo.title}</td>
                  <td>{book.created}</td>
                  <td>
                    <Link to={`/user/editreview/?reviewId=${book.bookId}`}>
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
