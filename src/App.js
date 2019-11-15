import React from 'react';
import routes from './routes'
import './App.css';
import Nav from './components/Nav'

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
