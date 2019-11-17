import React from 'react';
import routes from './routes'
import './App.css';
// import Nav from './components/Nav'

function App(props) {
  return (
    <div className="App">
      {/* <Nav history={props.history}/> */}
      {routes}
    </div>
  );
}

export default App;
