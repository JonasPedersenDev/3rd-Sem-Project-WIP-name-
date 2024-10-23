import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import AddResourceModal from "../../CaretakerView/AddResourceModal/AddResourceModal";

// Fake data
interface ResourceProps {
  id: number;
  type: string;
  name: string;
  img: string;
  description: string;
  status: string;
}

const resources: ResourceProps[] = [
  { id: 1, name: "Boremaskine", type: "tool", description: "En boremaskine", img: "Boremaskine.jpg", status: "available" },
  { id: 2, name: "Hammer", type: "tool", description: "En hammer", img: "Hammer.jpg", status: "available" },
  { id: 3, name: "Målebånd", type: "tool", description: "Et målebånd", img: "Målebånd.jpg", status: "unavailable" },
  { id: 4, name: "Sav", type: "tool", description: "En sav", img: "Sav.jpg", status: "maintenance" },
  { id: 5, name: "Skruetrækker", type: "tool", description: "En skruetrækker", img: "Skruetrækker.jpg", status: "available" },
  { id: 6, name: "Gæstehus A", type: "guestHouse", description: "Et gæstehus", img: "GuestHouseA.jpg", status: "available" },
  { id: 7, name: "Gæstehus B", type: "guestHouse", description: "Et andet gæstehus", img: "GuestHouseB.jpg", status: "unavailable" },
  { id: 8, name: "Trailer", type: "other", description: "En stor trailer", img: "Trailer.jpg", status: "available" }
];

const ResourceGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResourceAdded = () => {
    setIsModalOpen(false);
  };

  const toolResources = resources.filter(resource => resource.type === "tool");
  const guestHouseResources = resources.filter(resource => resource.type === "guestHouse");
  const otherResources = resources.filter(resource => resource.type === "other");

  return (
    <div>
      {/*Viser kun værktøj*/}
      {toolResources.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Værktøj</h3>
          <div className="underline"></div>
          {toolResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/*Viser gæstehuse*/}
      {guestHouseResources.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Gæstehuse</h3>
          <div className="underline"></div>
          {guestHouseResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/*Viser andet*/}
      {otherResources.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Andet</h3>
          <div className="underline"></div>
          {otherResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/* Add Resource Modal */}
      <button onClick={() => setIsModalOpen(true)}>Add new resource</button>
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

export default ResourceGrid;
