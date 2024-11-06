import React from 'react';
import { Button } from 'react-bootstrap';

interface Resource {
  id: string;
  name: string;
  description: string;
  status: 'Aktiv' | 'Service';
  imageUrl: string;
}

interface CaretakerResourceCardProps {
  resource: Resource;
  onEdit: (id: string) => void;
  onToggleService: (id: string) => void;
  onDelete: (id: string) => void;
}

const CaretakerResourceCard: React.FC<CaretakerResourceCardProps> = ({
  resource,
  onEdit,
  onToggleService,
  onDelete,
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="resource-info">
          <h5>{resource.name}</h5>
          <p><strong>Status:</strong> {resource.status}</p>
          <p><strong>Beskrivelse:</strong> {resource.description}</p>
        </div>
        <img src={resource.imageUrl} alt={resource.name} className="resource-image" />
        <div className="resource-actions">
          <Button variant="outline-secondary" onClick={() => onEdit(resource.id)}>
            Rediger
          </Button>
          <Button
            variant={resource.status === 'Service' ? 'success' : 'warning'}
            onClick={() => onToggleService(resource.id)}
            className="ms-2"
          >
            {resource.status === 'Service' ? 'Aktiver' : 'Servicer'}
          </Button>
          <Button variant="danger" onClick={() => onDelete(resource.id)} className="ms-2">
            Slet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaretakerResourceCard;
