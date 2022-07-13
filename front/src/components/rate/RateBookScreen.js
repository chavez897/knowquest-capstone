import React, { useState } from "react";
import { axiosInstance } from "../../plugins/axios";
import { AddBook } from "./AddBook";
import { AddReview } from "./AddReview";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";

export const RateBookScreen = () => {
  const [book, setBook] = useState("");
  const [haveSearched, setHaveSearched] = useState(false);

  const [formValues, handleInputChange] = useForm({
    isbn: "",
  });

  const { isbn } = formValues;

  const search = (e) => {
    e.preventDefault();
    if (isbn !== "") {
      Swal.fire({
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axiosInstance
        .get(`/books/search/?isbn=${isbn}`)
        .then((res) => {
          setBook(res.data);
          setHaveSearched(true);
          Swal.close();
        })
        .catch(() => {
          setBook("");
          setHaveSearched(true);
          Swal.close();
        });
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 py-3">
          <div className="card shadow-2-strong bg-light">
            <div className="card-body p-5">
              <form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={search}
              >
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Search by ISBN
                  </label>
                  <div className="col-sm-7">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search..."
                      name="isbn"
                      value={isbn}
                      onChange={handleInputChange}
                      aria-label="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {haveSearched ? (
          <div className="col-12 col-md-8">
            {book ? (
              <AddReview book={book} setHaveSearched={setHaveSearched} />
            ) : (
              <AddBook setHaveSearched={setHaveSearched} />
            )}
          </div>
        ) : null}
      </div>
      <div className="row p-5"></div>
    </div>
  );
};
