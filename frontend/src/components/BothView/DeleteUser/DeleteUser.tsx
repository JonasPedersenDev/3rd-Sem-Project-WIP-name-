import React from "react";
import { Button } from "react-bootstrap";
import showAlert from "../../BothView/Alert/AlertFunction";
import ApiService from "../../../utils/ApiService";

interface DeleteUserProps {
  tenantId: string;
  onDelete: (tenantId: string) => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ tenantId, onDelete }) => {
  const handleDelete = async () => {
    showAlert({
      title: "Slet bruger",
      message: "Er du sikker på, at du vil slette denne bruger?",
      onConfirm: async () => {
        try {
          await ApiService.deleteData(`tenant/deleteUser/${tenantId}`);
          onDelete(tenantId);
        } catch (error) {
          console.error("Failed to delete tenant:", error);
        }
      },
    });
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Slet
    </Button>
  );
};

export default DeleteUser;