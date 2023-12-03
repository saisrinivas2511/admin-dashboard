// import React from "react";
// import { Modal, Header, Button } from "semantic-ui-react";
// import "./deleteDialogBox.css";

// const DeleteDialogBox = (props) => {
//   const { show, onClose, onConfirm } = props;

//   return (
//     <Modal className="custom-dialog" open={show} onClose={onClose} centered>
//       <Header icon="exclamation circle" content="Confirm Delete" />
//       <Modal.Content>
//         <p>Are you sure you want to delete this item?</p>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button className="cancelBtn" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button className="deleteBtn" onClick={onConfirm}>
//           Delete
//         </Button>
//       </Modal.Actions>
//     </Modal>
//   );
// };

// export default DeleteDialogBox;
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./deleteDialogBox.css";

const DeleteDialogBox = (props) => {
  const { onClose, onConfirm } = props;

  return (
    <>
      <div className="darkBG" onClick={onClose} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Confirm Delete</h5>
          </div>
          <button className="closeBtn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="modalContent">
            <p>Are you sure you want to delete this item?</p>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="cancelBtn" onClick={onClose}>
                Cancel
              </button>
              <button className="deleteBtn" onClick={onConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDialogBox;
