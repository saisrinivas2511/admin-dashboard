import React, { useEffect, useState } from "react";
import Pagination from "../../utils/pagination/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./admindashboard.css";
const MyTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 10;

  const handleSearch = () => {
    // Fetch data based on the search term
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((json) => {
        const filteredData = json.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Fetch data initially without search term
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowSelect = (rowId) => {
    // Toggle the selection of the row
    const isSelected = selectedRows.includes(rowId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  const handleDeleteRow = (rowId) => {
    // Filter out the row with the specified ID
    const updatedData = data.filter((item) => item.id !== rowId);
    setData(updatedData);
    // Clear the selected rows
    setSelectedRows(selectedRows.filter((id) => id !== rowId));
  };

  const handleDeleteSelectedRows = () => {
    // Filter out the selected rows from the data
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    // Clear the selected rows
    setSelectedRows([]);
  };

  return (
    <>
      <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div>
          <button className="delete-button" onClick={handleDeleteSelectedRows}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>

      <div className="adminPage" style={adminPageStyle}>
        <table style={{ borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
              <th style={tableCellStyle}></th>
              <th style={tableCellStyle}>Name</th>
              <th style={tableCellStyle}>Email</th>
              <th style={tableCellStyle}>Role</th>
              <th style={tableCellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: selectedRows.includes(item.id)
                    ? "#f2f2f2" // Selected row color
                    : "#fff", // normal row color
                }}
              >
                <td style={tableCellStyle}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleRowSelect(item.id)}
                  />
                </td>
                <td style={tableCellStyle}>{item.name}</td>
                <td style={tableCellStyle}>{item.email}</td>
                <td style={tableCellStyle}>{item.role}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => handleDeleteRow(item.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination data={data} itemsPerPage={itemsPerPage} paginate={paginate} />
    </>
  );
};
const tableCellStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  borderRight: "1px solid #ddd",
  borderLeft: "1px solid #ddd",
  borderTop: "1px solid #ddd",
};

const adminPageStyle = {
  display: "flex",
  marginTop: 1,
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

export default MyTable;
