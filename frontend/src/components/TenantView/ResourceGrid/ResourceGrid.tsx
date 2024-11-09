import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import ApiService from "../../../utils/ApiService";
import { ResourceType } from "../../../utils/EnumSupport";
import Resource from "../../modelInterfaces/Resource";

const mapToResourceType = (type: string | null | undefined): ResourceType | undefined => {
  if (type) {
    const upperCaseType = type.toUpperCase();
    if (upperCaseType in ResourceType) {
      return ResourceType[upperCaseType as keyof typeof ResourceType];
    }
  }
  console.error("Invalid resource type:", type);
  return undefined;
};

const ResourceGrid: React.FC = () => {
  const [tools, setTools] = useState<Resource[]>([]);
  const [hospitalities, setHospitalities] = useState<Resource[]>([]);
  const [otherResources, setOtherResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const toolsResponse = await ApiService.fetchResources(ResourceType.TOOL);
        const mappedTools = toolsResponse.data.map((resource: Resource) => ({
          ...resource,
          type: mapToResourceType(resource.type),
        }));
        setTools(mappedTools);

        const utilitiesResponse = await ApiService.fetchResources(ResourceType.UTILITY);
        const mappedUtilities = utilitiesResponse.data.map((resource: Resource) => ({
          ...resource,
          type: mapToResourceType(resource.type),
        }));
        setOtherResources(mappedUtilities);

        const hospitalitiesResponse = await ApiService.fetchResources(ResourceType.HOSPITALITY);
        const mappedHospitalities = hospitalitiesResponse.data.map((resource: Resource) => ({
          ...resource,
          type: mapToResourceType(resource.type),
        }));
        setHospitalities(mappedHospitalities);
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
          {tools.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/* Display Guest Houses */}
      {hospitalities.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Gæstehuse & Lokaler</h3>
          <div className="underline"></div>
          {hospitalities.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/* Display Other Resources */}
      {otherResources.length > 0 && (
        <div className="row">
          <h3 className="resourceHeading">Andet</h3>
          <div className="underline"></div>
          {otherResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceGrid;
