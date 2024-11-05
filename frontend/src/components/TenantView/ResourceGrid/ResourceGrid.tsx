import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../../utils/ApiService';
import ResourceCard from "./ResourceCard";

interface ResourceProps {
  id: number;
  name: string;
  description: string;
  resourcePictureFileName: string;
  type: string;
  capacity: number;
  status: string;
}

const ResourceGrid: React.FC = () => {
  const [tools, setTools] = useState<ResourceProps[]>([]);
  const [guestHouses, setGuestHouses] = useState<ResourceProps[]>([]);
  const [utilities, setUtilities] = useState<ResourceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [toolResponse, guestHouseResponse, utilityResponse] = await Promise.all([
        ApiService.fetchData<ResourceProps[]>('tool/all'),
        ApiService.fetchData<ResourceProps[]>('guestHouse/all'),
        ApiService.fetchData<ResourceProps[]>('utility/all')
      ]);

      setTools(toolResponse.data);
      setGuestHouses(guestHouseResponse.data);
      setUtilities(utilityResponse.data);
    } catch (error: any) {
      setError("Error fetching resources");
      console.error("Error fetching resources", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading resources...</div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {tools.length > 0 && (
            <div className="row">
              <h3 className="resourceHeading">Værktøj</h3>
              <div className="underline"></div>
              {tools.map(tool => (
                <ResourceCard
                  key={tool.id}
                  resource={{
                    name: tool.name,
                    img: tool.resourcePictureFileName,
                    description: tool.description,
                    status: tool.status,
                    bookedDates: [],  // Replace if booked dates are available
                  }}
                />
              ))}
            </div>
          )}

          {guestHouses.length > 0 && (
            <div className="row">
              <h3 className="resourceHeading">Gæstehuse</h3>
              <div className="underline"></div>
              {guestHouses.map(guestHouse => (
                <ResourceCard
                  key={guestHouse.id}
                  resource={{
                    name: guestHouse.name,
                    img: guestHouse.resourcePictureFileName,
                    description: guestHouse.description,
                    status: guestHouse.status,
                    bookedDates: [],  // Replace if booked dates are available
                  }}
                />
              ))}
            </div>
          )}

          {utilities.length > 0 && (
            <div className="row">
              <h3 className="resourceHeading">Andet</h3>
              <div className="underline"></div>
              {utilities.map(utility => (
                <ResourceCard
                  key={utility.id}
                  resource={{
                    name: utility.name,
                    img: utility.resourcePictureFileName,
                    description: utility.description,
                    status: utility.status,
                    bookedDates: [],  // Replace if booked dates are available
                  }}
                />
              ))}
              <button
                className="fortsætButton"
                type="button"
                onClick={() => navigate("/reservation-overblik")}
              >
                Fortsæt
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResourceGrid;
