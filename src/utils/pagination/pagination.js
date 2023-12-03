import React, { useState } from "react";
import "./pagination.css";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Pagination = ({ data, itemsPerPage, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const handleFirstPage = () => {
    handlePaginate(1);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    handlePaginate(prevPage);
  };

  const handleNextPage = () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    handlePaginate(nextPage);
  };

  const handleLastPage = () => {
    handlePaginate(totalPages);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="firstPage">
          <button onClick={handleFirstPage} className="firstPage-link">
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
        </li>
        <li className="previousPage">
          <button onClick={handlePrevPage} className="previousPage-link">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
          >
            <button
              data-testid="page"
              onClick={() => handlePaginate(i + 1)}
              className="page-link"
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li className="nextPage">
          <button onClick={handleNextPage} className="nextPage-link">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
        <li className="lastPage">
          <button onClick={handleLastPage} className="lastPage-link">
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
