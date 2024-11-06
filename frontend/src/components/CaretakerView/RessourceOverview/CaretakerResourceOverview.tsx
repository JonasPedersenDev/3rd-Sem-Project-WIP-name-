import React, { useState, useEffect } from 'react';
import CaretakerResourceCard from './CaretakerResourceCard';
import { Collapse, Button } from 'react-bootstrap';
import AddResourceModal from '../AddResourceModal/AddResourceModal';

interface Resource {
  id: string;
  name: string;
  description: string;
  status: 'Aktiv' | 'Service';
  imageUrl: string;
  category: 'Værktøj' | 'Gæstehuse' | 'Andet';
}

const CaretakerResourceOverview: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showVærktøj, setShowVærktøj] = useState(true);
  const [showGæstehuse, setShowGæstehuse] = useState(true);
  const [showAndet, setShowAndet] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const resourcesData: Resource[] = [
      {
        id: '1',
        name: 'Boremaskine 1',
        description: 'tekstet fylde',
        status: 'Aktiv',
        imageUrl: '',
        category: 'Værktøj',
      },
      {
        id: '2',
        name: 'Sav 1',
        description: 'fyldt tekst',
        status: 'Aktiv',
        imageUrl: '',
        category: 'Værktøj',
      },
      {
        id: '3',
        name: 'Hammer 1',
        description: 'fylde med tekst',
        status: 'Service',
        imageUrl: '',
        category: 'Værktøj',
      },
      {
        id: '4',
        name: 'Gæstehus 1',
        description: 'tekst med fylde',
        status: 'Aktiv',
        imageUrl: '',
        category: 'Gæstehuse',
      },
      {
        id: '5',
        name: 'Trailer 1',
        description: 'tekst fyldt',
        status: 'Aktiv',
        imageUrl: '',
        category: 'Andet',
      },
    ];

    setResources(resourcesData);
  }, []);

  const værktøjResources = resources.filter((resource) => resource.category === 'Værktøj');
  const gæstehuseResources = resources.filter((resource) => resource.category === 'Gæstehuse');
  const andetResources = resources.filter((resource) => resource.category === 'Andet');

  const handleEdit = (id: string) => {
    console.log(`Edit resource with id: ${id}`);
    // todo
  };

  const handleToggleService = (id: string) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id
          ? { ...resource, status: resource.status === 'Aktiv' ? 'Service' : 'Aktiv' }
          : resource
      )
    );
  };

  const handleDelete = (id: string) => {
    setResources((prevResources) => prevResources.filter((resource) => resource.id !== id));
  };

  const handleResourceAdded = () => {
    console.log("booking added to cart")
    setIsModalOpen(false)
  }

return (
    <div className="container mt-4 border border-darkgrey border-4 rounded mb-3">
      <h2 className="text-center mb-4"><strong>Ressourcer</strong></h2>
      <Button onClick={() => setIsModalOpen(true)}>
        Tilføj Ressource
      </Button>
      {/* Værktøj */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowVærktøj(!showVærktøj)}
          aria-controls="værktøj-collapse"
          aria-expanded={showVærktøj}
          className="fs-5"
        >
          Værktøj
        </Button>
      </h3> <hr />
      <Collapse in={showVærktøj}>
        <div id="værktøj-collapse">
          {værktøjResources.length === 0 ? (
            <p>Ingen værktøj endnu</p>
          ) : (
            værktøjResources.map((resource) => (
              <CaretakerResourceCard
                key={resource.id}
                resource={resource}
                onEdit={handleEdit}
                onToggleService={handleToggleService}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </Collapse>

      {/* Gæstehuse */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowGæstehuse(!showGæstehuse)}
          aria-controls="gæstehuse-collapse"
          aria-expanded={showGæstehuse}
          className="fs-5"
        >
          Gæstehuse
        </Button>
      </h3> <hr />
      <Collapse in={showGæstehuse}>
        <div id="gæstehuse-collapse">
          {gæstehuseResources.length === 0 ? (
            <p>Ingen gæstehuse endnu</p>
          ) : (
            gæstehuseResources.map((resource) => (
              <CaretakerResourceCard
                key={resource.id}
                resource={resource}
                onEdit={handleEdit}
                onToggleService={handleToggleService}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </Collapse>

      {/* Andet Section */}
      <h3>
        <Button
          variant="secondary"
          onClick={() => setShowAndet(!showAndet)}
          aria-controls="andet-collapse"
          aria-expanded={showAndet}
          className="fs-5"
        >
          Andet
        </Button>
      </h3> <hr />
      <Collapse in={showAndet}>
        <div id="andet-collapse">
          {andetResources.length === 0 ? (
            <p>Ingen andre ressourcer endnu</p>
          ) : (
            andetResources.map((resource) => (
              <CaretakerResourceCard
                key={resource.id}
                resource={resource}
                onEdit={handleEdit}
                onToggleService={handleToggleService}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </Collapse>
      {isModalOpen && (
        <AddResourceModal
          show={isModalOpen}
          onResourceAdded={handleResourceAdded}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CaretakerResourceOverview;