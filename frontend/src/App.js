import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SidePanel from './components/SidePanel';
import HomePage from './pages/HomePage';

function App() {

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    axios.get('/api/greeting?name=ReactUser')
      .then(response => setGreeting(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App" style={{ display: 'flex' }}>
      <SidePanel />
      <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
        <HomePage />
      </div>
    </div>
  );


}

export default App;
