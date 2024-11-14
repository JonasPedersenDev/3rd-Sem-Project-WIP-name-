import React, { useState } from "react";

interface FilterSearchProps {
  onSearch: (filters: { name: string; address: string; phone: string }) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSearch = () => {
    onSearch({ name, address, phone });
  };

  const handleReset = () => {
    setName("");
    setAddress("");
    setPhone("");
    onSearch({ name: "", address: "", phone: "" });
  };

  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Navn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    <div style={{ marginBottom: "10px" }}></div>
      <input
        type="text"
        placeholder="Addresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div style={{ marginBottom: "10px" }}></div>
      <input
        type="text"
        placeholder="Tlf.nr."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
        <div style={{ marginBottom: "10px" }}></div>
      <button onClick={handleSearch}>Søg</button>
      <button onClick={handleReset}>Nulstil</button>
    </div>
  );
};

export default FilterSearch;