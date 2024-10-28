import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Valider brugernavn og adgangskode
  const validateForm = () => {
    const { username, password } = credentials;
    if (!username || !password) {
      setErrorMessage("Udfyld venligst alle felter.");
      return false;
    }
    return true;
  };

  // Handle input change for both username and password fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    if (!validateForm()) return;

    try {
      const response = await axios.post("location where we check dat shit", credentials);

      if (response.data.success) {
        // Naviger til hjemmesiden på succes, husk at spørg hvad hjemmesidelinket er og hvorfor det linker gennem min computer
        navigate("/C:\Users\cvm08\Himmerland-booking-system\frontend\src\components\TenantView");
      } else {
        // fejlbesked i tilfælde af fejl
        setErrorMessage("Forkert brugernavn eller adgangskode.");
      }
    } catch (error) {
      // fejlbeskeder
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Forkert brugernavn eller adgangskode.");
        } else {
          setErrorMessage("En fejl opstod");
        }
      } else {
        setErrorMessage("En ukendt fejl opstod");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="w-25 p-4 border rounded shadow" onSubmit={handleSubmit}>
        <h4 className="text-center mb-4">Login</h4>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        
        <div className="mb-3 mt-5">
          <label htmlFor="username">Brugernavn</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Skriv brugernavn"
            required
          />
        </div>
        
        <div className="form-group mt-3">
          <label htmlFor="password">Adgangskode</label>
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control form-control-lg"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Skriv adgangskode"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              aria-label="Toggle password visibility"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">
          Login
        </button>

        <div className="text-center mt-3">
          <Link to="/sign-up">
            <button className="btn btn-secondary btn-lg">Lav bruger</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

//spørgsmål: når jeg kopierer paths, linker den gennem mine computer filer, fix hvordan?
//spørgsmål: jeg sender nu en axiom request ud
//spørgsmål: hvor i koden skal jeg sende axios requesten hen?
