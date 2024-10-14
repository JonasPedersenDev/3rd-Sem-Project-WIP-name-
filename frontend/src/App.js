import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    axios.get('/api/greeting?name=ReactUser')
      .then(response => setGreeting(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn How

          <p>{greeting}</p>
        </a>
      </header>
    </div>
  );
}

export default App;
