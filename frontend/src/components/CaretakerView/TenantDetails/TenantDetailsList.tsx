import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiService from "../../../utils/ApiService";

interface Tenant {
  id: number;
  username: string;
  email: string;
}

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
    <div>
      <h1>Tenant Overview</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.id}</td>
              <td>{tenant.username}</td>
              <td>{tenant.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantDetailsList;