import React, { useEffect, useState } from "react";
import ApiService from "../../../utils/ApiService";
import Tenant from "../../modelInterfaces/Tenant";
import BookForTenant from "../../CaretakerView/TenantDetails/BookForTenant";
import { Modal, Button } from "react-bootstrap";
import BookingDate from "../../modelInterfaces/BookingDate";
import FilterSearch from "./FilterSearch";

const TenantDetailsList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [bookedDates, setBookedDates] = useState<BookingDate[]>([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await ApiService.fetchData("admin/getAllTenants");
        if (Array.isArray(response.data)) {
          setTenants(response.data);
          setFilteredTenants(response.data);
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

  const handleBookClick = async (tenant: Tenant) => {
    setSelectedTenant(tenant);
    try {
      const response = await ApiService.fetchData("admin/getBookedDates");
      setBookedDates(response.data as BookingDate[]);
    } catch (error) {
      console.error("Failed to fetch booked dates:", error);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTenant(null);
  };

  const handleSearch = (filters: { name: string; address: string; phone: string }) => {
    const { name, address, phone } = filters;
    const filtered = tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(name.toLowerCase()) &&
      tenant.houseAddress.toLowerCase().includes(address.toLowerCase()) &&
      tenant.mobileNumber.includes(phone)
    );
    setFilteredTenants(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tenant-overview">
      <FilterSearch onSearch={handleSearch} />

      <div className="tenant-list">
        <h1>Udlejere</h1>
        {filteredTenants.map((tenant) => (
          <div key={tenant.id} className="tenant-card">
            <div className="tenant-info">
              <h2>{tenant.name}</h2>
              <p>Addresse: {tenant.houseAddress}</p>
              <p>Telefonnummer: {tenant.mobileNumber}</p>
              <p>Email: {tenant.email}</p>
            </div>
            <div className="tenant-actions">
              <button onClick={() => handleBookClick(tenant)}>Book for Udlejer</button>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book for {selectedTenant?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTenant && (
            <BookForTenant
              bookedDates={bookedDates}
              onDateChange={(start, end) => console.log("Date changed:", start, end)}
              resourceCapacity={5} // Example capacity, replace with actual value
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TenantDetailsList;