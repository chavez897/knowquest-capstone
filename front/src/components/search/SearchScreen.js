import { React, useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Breadcrumb } from "../ui/Breadcrumb";
import ReactPaginate from "react-paginate";
import { axiosInstance } from "../../plugins/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const SearchScreen = () => {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  const [formValues, handleFormInputChange, reset] = useForm({ context: "" });
  const { context } = formValues;

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const handlePageClick = (event) => {
    fetchBooks(event.selected + 1);
  };

  const fetchBooks = (page) => {
    axiosInstance
      .get(`/books-ratings/search/?search=${inputText}&page=${page}`)
      .then((res) => {
        setItems(res.data.results);
        setMaxPage(Math.ceil(res.data.count / res.data.pageSize));
      });
  };

  const search = (e) => {
    e.preventDefault();
    if (context === "book") {
      fetchBooks(1);
    } else if (context === "resource") {
    } else {
      Swal.fire({
        title: "Error",
        text: "You have to select book or resource",
        icon: "error",
        confirmButtonText: "Ok",
      });
      reset();
    }
  };

  // get searched book
  const eye = <FontAwesomeIcon icon={faEye} />;

  function Items({ currentItems }) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Total</th>
            <th scope="col">Average</th>
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((book) => (
              <tr key={book.bookId}>
                <th scope="row">{book.bookId}</th>
                <td>
                  <img src={book.bookImage} />
                </td>
                <td>{book.bookTitle}</td>
                <td>{book.bookDescription}</td>
                <td>{book.total}</td>
                <td>{book.rateAverage}</td>
                <td>
                  <Link to={`/book-review-detail/?bookId=${book.bookId}`}>
                    <div>{eye}</div>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="container py-5 h-100">
      <Breadcrumb main="Search" />
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8">
          <div className="card shadow-2-strong">
            <div className="card-body p-5">
              <h6>
                Here you can search for textbooks and resources that have been
                rated.
              </h6>
              <p>
                Help us grow this database and make education better by rating
                today!
              </p>

              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={search}
              >
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Search by Book Name
                  </label>
                  <div className="col-sm-7">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search..."
                      value={inputText}
                      onChange={inputHandler}
                      aria-label="Search"
                    />
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">Context</label>
                  <div className="col-sm-7">
                    <select
                      className="form-control"
                      name="context"
                      value={context}
                      onChange={handleFormInputChange}
                    >
                      <option></option>
                      <option value="book">Book</option>
                      <option value="resource">Resource</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row mt-3 justify-content-center d-flex">
                  <button
                    type="button"
                    className="btn btn-primary col-md-4"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-5"></div>
      <Items currentItems={items} />
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
  );
};
