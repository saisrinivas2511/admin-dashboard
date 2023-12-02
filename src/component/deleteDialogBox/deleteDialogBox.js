import React from "react";
import { Modal, Header, Button } from "semantic-ui-react";
import "./deleteDialogBox.css";

const DeleteDialogBox = (props) => {
  const { show, onClose, onConfirm } = props;

  return (
    <Modal className="custom-dialog" open={show} onClose={onClose} centered>
      <Header icon="exclamation circle" content="Confirm Delete" />
      <Modal.Content>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button data-testid="onClose" color="grey" onClick={onClose}>
          Cancel
        </Button>
        <Button data-testid="confirm" color="red" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteDialogBox;
