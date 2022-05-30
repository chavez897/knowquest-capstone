import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksData } from "../../actions/books";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const BooksData = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooksData());
  }, [dispatch]);

  const books = useSelector((state) => state.books);

  const filtered = !props.input
    ? books
    : books.filter((book) => book.isbn.includes(props.input));

  const columns = [
    {
      name: "ISBN",
      selector: (row) => row.isbn,
      sortable: true,
      center: true,
    },
    {
      name: "Image",
      cell: (row) => <img height="84px" width="56px" alt="" src={row.image} />,
      center: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      center: true,
    },
    {
      name: "Publisher",
      selector: (row) => row.publisher,
      sortable: true,
      center: true,
      center: true,
    },
    {
      name: "Author(s)",
      selector: (row) => row.authors,
      sortable: true,
      center: true,
    },
    {
      name: "Publish Date",
      selector: (row) => row.publishDate,
      sortable: true,
      center: true,
    },
    {
      name: "View",
      cell: (row) => <Link to="#"><div>{eye}</div></Link>,
      center: true,
    },
  ];

  const eye = <FontAwesomeIcon icon={faEye} />;
  
  return (
    <div>
      <DataTable columns={columns} data={filtered} pagination striped="true" />
    </div>
  );
};
