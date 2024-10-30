import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../services/ApiService";
interface SignUpDetails {
  username: string;
  password: string;
  email: string;
  name: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState<SignUpDetails>({ username: "", password: "", email: "", name: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Valider om det er en mail
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Valider styrke af kodeord
  const isStrongPassword = (password: string): boolean => {
    // Min 8 karakterer, et stort bogstav, et tal
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = (): boolean => {
    const { username, password, email, name } = details;
    if (!username || !password || !email || !name) {
      setErrorMessage("Udfyld venligst alle felter.");
      return false;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Indtast en gyldig email.");
      return false;
    }
    if (!isStrongPassword(password)) {
      setErrorMessage("Adgangskoden skal være mindst 8 tegn lang og inkludere både store og små bogstaver samt et tal");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      const response = await ApiService.signUp({user: details});

      console.log(response);
      console.log(response.data);

      if (response.status === 201) {
        navigate("/login"); // succes: tilbage til login
      } else {
        setErrorMessage("Kunne ikke oprette bruger.");
      }
    } catch (error) {
      setErrorMessage("En fejl opstod ved oprettelse af bruger.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="w-25 p-4 border rounded shadow" onSubmit={handleSubmit}>
        <h4 className="text-center mb-4">Opret en bruger</h4>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="mb-3 mt-5">
          <label htmlFor="name">Navn</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Skriv name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="email"
            value={details.email}
            onChange={handleChange}
            placeholder="Skriv email"
            required
          />
        </div>

        <div className="mb-3 mt-5">
          <label htmlFor="username">Brugernavn</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="username"
            value={details.username}
            onChange={handleChange}
            placeholder="Skriv brugernavn"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Adgangskode</label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="password"
            value={details.password}
            onChange={handleChange}
            placeholder="Skriv adgangskode"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">
          Opret Bruger
        </button>

        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => navigate("/LoginPage")}
          >
            Allerede en bruger? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
