import React, { useEffect, useState } from "react";
import ApiService from "../../../utils/ApiService";
import Tenant from "../../modelInterfaces/Tenant";


const TenantDetailsList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await ApiService.fetchData("admin/getAllTenants"); 
        if (Array.isArray(response.data)) {
          setTenants(response.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error("Error fetching tenants:", err);
        setError("Failed to fetch tenants.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tenant-overview">
      <div className="filter-panel">
        <input type="text" placeholder="Name" />
        <div>
          <label>
            <input type="checkbox" /> Afdeling 1
          </label>
          <label>
            <input type="checkbox" /> Afdeling 2
          </label>
          <label>
            <input type="checkbox" /> Afdeling 3
          </label>
        </div>
        <div>
          <label>Vejnummer</label>
          <select>
            <option value="1-10">1-10</option>
            <option value="11-20">11-20</option>
            <option value="21-30">21-30</option>
          </select>
        </div>
        <button>Add</button>
        <button>Reset</button>
      </div>

      <div className="tenant-list">
        <h1>Udlejere</h1>
        {tenants.map((tenant) => (
          <div key={tenant.id} className="tenant-card">
            <div className="tenant-info">
              <h2>{tenant.name}</h2>
              <p>Address: {tenant.address}</p>
              <p>Phone: {tenant.phone}</p>
              <p>Email: {tenant.email}</p>
            </div>
            <div className="tenant-actions">
              <button>Book for Udlejer</button>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantDetailsList;
