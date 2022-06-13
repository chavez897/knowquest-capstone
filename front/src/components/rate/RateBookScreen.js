import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../plugins/axios";
import { AddBook } from "./AddBook";
import { AddReview } from "./AddReview";

export const RateBookScreen = () => {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [book, setBook] = useState("");
  const [activeTab, setActiveTab] = useState("e");

  useEffect(() => {
    if (searchText !== "") {
      axiosInstance.get(`/books/search/?isbn=${searchText}`).then((res) => {
        setBook(res.data);
      });
    }
  }, [searchText]);

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const search = (e) => {
    setBook("");
    setInputText("");
    e.preventDefault();
    inputHandler(e);
    setSearchText(inputText);
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
                      value={inputText}
                      onChange={inputHandler}
                      aria-label="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8">
          {book ? <AddReview book={book} /> : <AddBook />}
        </div>
      </div>
      <div className="row p-5"></div>
    </div>
  );
};
