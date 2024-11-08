import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import ApiService from "../../../utils/ApiService";

interface ResourceProps {
  id: number;
  type: string;
  name: string;
  img: string;
  description: string;
  status: string;
  bookedDates: Date[];
}

const ResourceGrid: React.FC = () => {
  const [tools, setTools] = useState<ResourceProps[]>([]);
  const [guestHouses, setGuestHouses] = useState<ResourceProps[]>([]);
  const [otherResources, setOtherResources] = useState<ResourceProps[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const toolsResponse = await ApiService.fetchTools();
        setTools(toolsResponse.data);

        const utilitiesResponse = await ApiService.fetchUtilities();
        setOtherResources(utilitiesResponse.data);

        const hospitalitiesResponse = await ApiService.fetchHospitalities();
        setGuestHouses(hospitalitiesResponse.data);
      } catch (error) {
        console.error("Error fetching resources", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div>
      {/* Display Tools */}
      {tools.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Værktøj</h3>
          <div className="underline"></div>
          {tools.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/* Display Guest Houses */}
      {guestHouses.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Gæstehuse & Lokaler</h3>
          <div className="underline"></div>
          {guestHouses.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/* Display Other Resources */}
      {otherResources.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Andet</h3>
          <div className="underline"></div>
          {otherResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceGrid;