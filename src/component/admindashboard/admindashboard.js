import React, { useEffect, useState } from "react";
import Pagination from "../../utils/pagination/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faSearch,
  faTrash,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./admindashboard.css";
const MyTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");

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

  const handleBulkDelete = () => {
    //clearing the entire data
    setData([]);
  };

  const handleDeleteSelectedRows = () => {
    // Filter out the selected rows from the data
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    // Clear the selected rows
    setSelectedRows([]);
  };
  const handleEditRow = (rowId) => {
    setEditRowId(rowId);
    // Fetch the current row's data and set it to state
    const currentRow = data.find((item) => item.id === rowId);
    setEditedName(currentRow.name);
    setEditedEmail(currentRow.email);
    setEditedRole(currentRow.role);
  };
  const handleSaveEdit = () => {
    // Update the data with the edited information
    const updatedData = data.map((item) => {
      if (item.id === editRowId) {
        return {
          ...item,
          name: editedName,
          email: editedEmail,
          role: editedRole,
        };
      }
      return item;
    });
    setData(updatedData);
    setEditRowId(null);
  };

  const handleCancelEdit = () => {
    // Clear the edited information and reset the editRowId
    setEditedName("");
    setEditedEmail("");
    setEditedRole("");
    setEditRowId(null);
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
          <button className="delete-button" onClick={handleBulkDelete}>
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
                  {editRowId === item.id ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={editedRole}
                        onChange={(e) => setEditedRole(e.target.value)}
                      />
                      <button className="saveEdit" onClick={handleSaveEdit}>
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button className="cancelEdit" onClick={handleCancelEdit}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="edit-button"
                        onClick={() => handleEditRow(item.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="deleteRow"
                        onClick={() => handleDeleteRow(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {selectedRows.length > 0 ? (
          <div>
            <button
              className="deleteSelectedRow"
              onClick={handleDeleteSelectedRows}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <Pagination
            data={data}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
          />
        </div>
      </div>
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
