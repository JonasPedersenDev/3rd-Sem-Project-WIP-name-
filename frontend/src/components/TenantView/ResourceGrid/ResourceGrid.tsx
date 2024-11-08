import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import ApiService from "../../../utils/ApiService";
import { ResourceType } from "../../../utils/ResourceTypes"; 
import Resource from "../../modelInterfaces/Resource";


const ResourceGrid: React.FC = () => {
  const [tools, setTools] = useState<Resource[]>([]);
  const [guestHouses, setGuestHouses] = useState<Resource[]>([]);
  const [otherResources, setOtherResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const toolsResponse = await ApiService.fetchResources(ResourceType.TOOL);
        setTools(toolsResponse.data);

        const utilitiesResponse = await ApiService.fetchResources(ResourceType.UTILITY);
        setOtherResources(utilitiesResponse.data);

        const hospitalitiesResponse = await ApiService.fetchResources(ResourceType.HOSPITALITY);
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