import React from "react";
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../plugins/axios";
import Swal from "sweetalert2";

export const AddBook = () => {
  const [formValues, handleFormInputChange, reset] = useForm({
    isbn: "",
    image: "",
    title: "",
    description: "",
    publisher: "",
    authors: "",
    publishDate: "",
  });

  const { isbn, image, title, description, publisher, authors, publishDate } =
    formValues;

  // POST operation to backend
  const addbookHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axiosInstance
      .post("/books/", {
        isbn: isbn,
        image: image,
        title: title,
        description: description,
        publisher: publisher,
        authors: authors,
        publishDate: publishDate,
      })
      .then((res) => {
        Swal.close();
        Swal.fire({
          title: "Succesful",
          text: "You have add the book!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        reset();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text:
            error.response.data.errors[0].field +
            ": " +
            error.response.data.errors[0].message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
  return (
    <div>
      <h5>Book is not found. Try search again or add book below.</h5>
      {/* form */}
      <div className="row-12 row-md-8 py-3">
        <div className="card shadow-2-strong bg-light">
          <div className="card-body p-5">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="form-group row mt-3">
                <label className="col-sm-7 col-form-label">
                  ISBN
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="isbn"
                    value={isbn}
                    onChange={handleFormInputChange}
                  />
                </div>
              </div>
              <div className="form-group row mt-3">
                <label className="col-sm-7 col-form-label">
                  Image URL
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="image"
                    value={image}
                    onChange={handleFormInputChange}
                  />
                </div>
              </div>
              <div className="form-group row mt-3">
                <label className="col-sm-7 col-form-label">
                  Title
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleFormInputChange}
                  />
                </div>
              </div>
              <div className="form-group row mt-3">
                <label className="col-sm-7 col-form-label">
                  Description
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleFormInputChange}
                  />
                </div>
              </div>
              <div className="form-group row mt-3">
                <label className="col-sm-7 col-form-label">
                  Publisher
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="publisher"
                    value={publisher}
                    onChange={handleFormInputChange}
                  />
                </div>
              </div>
              <div className="form-group row mt-3">
                <label className="col-sm-7 col-form-label">
                  Author
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="authors"
                    value={authors}
                    onChange={handleFormInputChange}
                  />
                </div>
              </div>
              <div className="form-group row mt-3">
                <label className="col-sm-7 col-form-label">
                  Publish Date
                </label>
                <div className="col-sm-4">
                  <input
                    type="date"
                    name="publishDate"
                    value={publishDate}
                    onChange={handleFormInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* submit */}
      <div className="row-12 row-md-8 py-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={addbookHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
