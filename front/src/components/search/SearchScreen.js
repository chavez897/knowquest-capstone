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
  const [books, setBooks] = useState("");

  const [formValues, handleFormInputChange, reset] = useForm({ context: "" });
  const { context } = formValues;

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    if (context === "book") {
      axiosInstance
        .get(`/books-ratings/search/?search=${inputText}&page=${1}`)
        .then((res) => {
          setBooks(res.data.results);
        });
    } else if (context === "resource") {
      console.log("Searching resouce");
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

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(books.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(books.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % books.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
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
      </>
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
      <div className="row p-5">{/* <BooksData input={inputText} /> */}</div>
      {/* <BooksDataPagination input={searchText} /> */}
      <PaginatedItems itemsPerPage={25} />
    </div>
  );
};
