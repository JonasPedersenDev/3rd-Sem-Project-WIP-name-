import React, { useEffect, useState } from "react";
import axios from "axios";
import ResourceCard from "./TenantView/ResourceCard";

interface Resource {
  name: string;
  img: string;
  description: string;
  status: string;
}

const ResourceGrid: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/resources");
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="row">
      {resources.map((resource, index) => (
        <ResourceCard key={index} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceGrid;
