import React, { useEffect, useState } from "react";
import Pagination from "../../utils/pagination/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrash,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./admindashboard.css";
import DeleteDialogBox from "../deleteDialogBox/deleteDialogBox";

const MyTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const itemsPerPage = 10;
  const [editingRowId, setEditingRowId] = useState(null);

  // Functions to start and stop editing for a row
  const startEditingRow = (rowId) => {
    setEditingRowId(rowId);
  };

  const stopEditingRow = () => {
    setEditingRowId(null);
  };

  // Function to handle the inline edit of a field
  const handleFieldEdit = (rowId, field, value) => {
    // Update the data with the edited information
    const updatedData = data.map((item) => {
      if (item.id === rowId) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setData(updatedData);
  };
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
  const handleSelectAllChange = () => {
    // If selectAll is false, select all rows in the current page; otherwise, clear selected rows
    setSelectedRows(selectAll ? [] : currentData.map((item) => item.id));
    setSelectAll(!selectAll);
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
    setOpenDeleteModal(false);
  };

  const handleSaveEdit = (editedData) => {
    // Update the data with the edited information
    const updatedData = data.map((item) => {
      if (item.id === editRowId) {
        return {
          ...item,
          name: editedData.name,
          email: editedData.email,
          role: editedData.role,
        };
      }
      return item;
    });

    setData(updatedData);
    setEditRowId(null);
    stopEditingRow();
  };

  const handleConfirmDelete = () => {
    setOpenDeleteModal(true);
  };
  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      {openDeleteModal && (
        <DeleteDialogBox
          onClose={handleCancelDelete}
          onConfirm={handleDeleteSelectedRows}
        />
      )}

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
        {selectedRows.length > 0 ? (
          <div>
            <button className="delete-button" onClick={handleConfirmDelete}>
              {console.log(
                "this is the value of openDeleteModal",
                openDeleteModal
              )}
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="adminPage" style={adminPageStyle}>
        <table style={{ borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
              <th style={tableCellStyle}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
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
                <td style={tableCellStyle}>
                  {editingRowId === item.id ? (
             
                    <input
                      className="editingInputField"
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleFieldEdit(item.id, "name", e.target.value)
                      }
                    />
                  ) : (

                    <span onClick={() => startEditingRow(item.id)}>
                      {item.name}
                    </span>
                  )}
                </td>
                <td style={tableCellStyle}>
                  {editingRowId === item.id ? (
                
                    <input
                      className="editingInputField"
                      type="text"
                      value={item.email}
                      onChange={(e) =>
                        handleFieldEdit(item.id, "email", e.target.value)
                      }
                    />
                  ) : (
                    // Render value for non-editing state
                    <span onClick={() => startEditingRow(item.id)}>
                      {item.email}
                    </span>
                  )}
                </td>
                <td style={tableCellStyle}>
                  {editingRowId === item.id ? (
                    // Render input field for editing
                    <input
                      className="editingInputField"
                      type="text"
                      value={item.role}
                      onChange={(e) =>
                        handleFieldEdit(item.id, "role", e.target.value)
                      }
                    />
                  ) : (
                    // Render value for non-editing state
                    <span onClick={() => startEditingRow(item.id)}>
                      {item.role}
                    </span>
                  )}
                </td>
                <td style={tableCellStyle}>
                  {editingRowId === null && (
                    <div>
                      <button
                        className="edit-button"
                        onClick={() => startEditingRow(item.id)}
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
                  {editingRowId === item.id && (
                    <div>
                      <button
                        className="saveEdit"
                        onClick={() => handleSaveEdit(editingRowId)}
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button className="cancelEdit" onClick={stopEditingRow}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <Pagination
          data={data}
          itemsPerPage={itemsPerPage}
          paginate={paginate}
        />
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
