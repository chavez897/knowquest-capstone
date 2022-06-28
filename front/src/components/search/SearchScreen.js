import { React, useState } from "react";
import { Breadcrumb } from "../ui/Breadcrumb";
import { BooksData } from "./BooksData";

export const SearchScreen = () => {
  const [inputText, setInputText] = useState("");
  const [searchType] = useState(["Books", "Resources"]);

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

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

              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Context* </label>
                  <div className="col-sm-7">
                    <select className="form-control">
                      <option></option>
                      <option value="book">Book</option>
                      <option value="resource">Resource</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group row mt-3">
                  <label className="col-sm-4 col-form-label">
                    Enter URL
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
                  <label className="col-sm-4 col-form-label">
                    Enter ISBN
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
      </div>
      <div className="row p-5">
        <BooksData input={inputText} />
      </div>
    </div>
  );
};
