import React from "react";
import { Button } from "react-bootstrap";

interface DeleteUserProps {
  tenantId: string;
  onDelete: (tenantId: string) => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ tenantId, onDelete }) => {
  const handleDelete = () => {
    onDelete(tenantId);
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Slet
    </Button>
  );
};

export default DeleteUser;