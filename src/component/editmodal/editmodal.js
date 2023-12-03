import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./editModal.css";

const EditDialogBox = (props) => {
  const { onClose, onSave, initialValues } = props;

  // State to manage the edited values
  const [editedName, setEditedName] = useState(initialValues.name || "");
  const [editedEmail, setEditedEmail] = useState(initialValues.email || "");
  const [editedRole, setEditedRole] = useState(initialValues.role || "");

  return (
    <>
      <div className="darkBG" onClick={onClose} />
      <div className="centered">
        <div className="editModal">
          <div className="modalHeader">
            <h5 className="heading">Edit Item</h5>
          </div>
          <button className="closeBtn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="editModalContent">
            {/* Editable fields */}
            <label htmlFor="editedName">Name:</label>
            <input
              type="text"
              className="editedName"
              name="editedName"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            <label htmlFor="editedEmail">Email:</label>
            <input
              type="text"
              className="editedEmail"
              name="editedEmail"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />

            <label htmlFor="editedRole">Role:</label>
            <input
              type="text"
              className="editedRole"
              name="editedRole"
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            />
          </div>
          <div className="editModalActions">
            <div className="actionsContainer">
              <button className="cancelBtn" onClick={onClose}>
                Cancel
              </button>
              <button
                className="saveBtn"
                onClick={() =>
                  onSave({
                    name: editedName,
                    email: editedEmail,
                    role: editedRole,
                  })
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDialogBox;
