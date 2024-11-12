import React, { useState, useEffect } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import CaretakerResourceCard from './CaretakerResourceCard';
import Resource from '../../modelInterfaces/Resource';
import { ResourceType } from '../../../utils/EnumSupport';
import ApiService from '../../../utils/ApiService';

const CaretakerResourceOverview: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showVærktøj, setShowVærktøj] = useState(true);
  const [showGæstehuse, setShowGæstehuse] = useState(true);
  const [showAndet, setShowAndet] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      let værktøjResources = [];
      let gæstehuseResources = [];
      let andetResources = [];

      //Fetch tools
      try {
        const værktøjResponse = await ApiService.fetchResources(ResourceType.TOOL);
        console.log("tools:", værktøjResponse)
        værktøjResources = værktøjResponse.data;
      } catch (error) {
        console.error("Error fetching TOOL resources:", error);
      }
      
      //Fetch hospitality
      try {
        const gæstehuseResponse = await ApiService.fetchResources(ResourceType.HOSPITALITY);
        console.log("hospitality:", gæstehuseResponse)
        gæstehuseResources = gæstehuseResponse.data;
      } catch (error) {
        console.error("Error fetching HOSPITALITY resources:", error);
      }

      //Fetch utility
      try {
        const andetResponse = await ApiService.fetchResources(ResourceType.UTILITY);
        console.log("utility:", andetResponse)
        andetResources = andetResponse.data;
      } catch (error) {
        console.error("Error fetching UTILITY resources:", error);
      }

      const combinedResources = [
        ...værktøjResources,
        ...gæstehuseResources,
        ...andetResources,
      ];
      setResources(combinedResources);
    };

    fetchResources();
  }, []);

  //Categorize
  const værktøjResources = resources.filter(
    (resource) => resource.type && resource.type.toLowerCase() === ResourceType.TOOL.toLowerCase()
  );
  const gæstehuseResources = resources.filter(
    (resource) => resource.type && resource.type.toLowerCase() === ResourceType.HOSPITALITY.toLowerCase()
  );
  const andetResources = resources.filter(
    (resource) => resource.type && resource.type.toLowerCase() === ResourceType.UTILITY.toLowerCase()
  );

  const handleEdit = async (updatedResource: Resource) => {
    try {
      const response = await ApiService.updateResource(
        updatedResource,
        ResourceType[updatedResource.type.toUpperCase() as keyof typeof ResourceType],
        updatedResource.id
      );
      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource.id === response.data.id ? response.data : resource
        )
      );
      console.log("response:", response)
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  const handleToggleService = (id: number) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id
          ? {
              ...resource,
              status: resource.status === 'available' ? 'maintenance' : 'available',
            }
          : resource
      )
    );
  };

  const handleDelete = async (id: number, type: ResourceType) => {
    try {
      await ApiService.deleteResource(id, type);
      setResources((prevResources) => prevResources.filter((resource) => resource.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div className="container mt-4 border border-darkgrey border-4 rounded mb-3">
      <h2 className="text-center mb-4"><strong>Ressourcer</strong></h2>
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
      </h3>
      <hr />
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
      </h3>
      <hr />
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
      </h3>
      <hr />
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
    </div>
  );
};

export default CaretakerResourceOverview;
