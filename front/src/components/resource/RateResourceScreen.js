import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../plugins/axios";
import { AddBook } from "../rate/AddBook";
import { AddResource } from "./AddResource";
import Swal from "sweetalert2";

export const RateResourceScreen = () => {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [book, setBook] = useState("");
  const [haveSearched, setHaveSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("e");

  useEffect(() => {
    if (searchText !== "") {
      Swal.fire({
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axiosInstance
        .get(`${searchText}`)
        .then((res) => {
          setBook(res);
          console.log(res);
          setHaveSearched(true);
          Swal.close();
          setInputText("");
        })
        .catch(() => {
          setHaveSearched(true);
          Swal.close();
          setInputText("");
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

//   unable to query title
  useEffect(() => {
    axiosInstance
      .get(`https://www.google.ca`)
      .then((res) => {
        const title = res.title;
        console.log(title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                    Search by Resource Name
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
        {haveSearched ? (
          <div className="col-12 col-md-8">
            {book ? (
              <AddResource setHaveSearched={setHaveSearched} />
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
