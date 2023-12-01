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
        <li className="page-item">
          <button onClick={handleFirstPage} className="page-link">
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
        </li>
        <li className="page-item">
          <button onClick={handlePrevPage} className="page-link">
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
        <li className="page-item">
          <button onClick={handleNextPage} className="page-link">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
        <li className="page-item">
          <button onClick={handleLastPage} className="page-link">
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
