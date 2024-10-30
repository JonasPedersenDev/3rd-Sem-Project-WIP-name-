import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { isAxiosError } from "axios";

interface Credentials {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const { username, password } = credentials;
    if (!username || !password) {
      setErrorMessage("Udfyld venligst alle felter.");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      const response = await ApiService.login(credentials);

      console.log(response);
      console.log(response.data);

      if (response.status === 200) {
        navigate("/hjem");
      } else {
        setErrorMessage("Forkert brugernavn eller adgangskode.");
      }
    } catch (error) {

      if (isAxiosError(error)) {
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
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

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
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => navigate("/opret-konto")}
          >
            Lav bruger
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
