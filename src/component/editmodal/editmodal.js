import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "semantic-ui-react";

const EditModal = ({
  editedName,
  setEditedName,
  editedEmail,
  setEditedEmail,
  editedRole,
  setEditedRole,
  handleSaveEdit,
  handleCancelEdit,
}) => {
  return (
    <Modal open={true}>
      <Modal.Header>Edit User Data</Modal.Header>
      <Modal.Content>
        <div className="edit-modal">
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Role:</label>
            <input
              type="text"
              placeholder="Role"
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <button className="saveEdit" onClick={handleSaveEdit}>
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
        <button className="cancelEdit" onClick={handleCancelEdit}>
          <FontAwesomeIcon icon={faTimes} /> Cancel
        </button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditModal;
