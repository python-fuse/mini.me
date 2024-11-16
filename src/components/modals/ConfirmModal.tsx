import { Modal } from "@mui/material";
import { URL } from "@prisma/client";
import React from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: URL;
}

const ConfirmModal: React.FC<ShareModalProps> = ({ isOpen, link, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex flex-col w-64">
        <h2>Confirm action</h2>
      </div>
    </Modal>
  );
};
export default ConfirmModal;
