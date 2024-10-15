import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    axios.get('/api/greeting?name=ReactUser')
      .then(response => setGreeting(response.data))
      .catch(error => console.log(error));
  }, []);

  return <div>
    <HomePage />
  </div>


}

export default App;
