import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
// import Details from './components/Details/Details';
// import VideogameCreate from './components/PokemonCreate/PokemonCreate';
// import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
    <div className="App">
        <Route exact path= '/' component= {LandingPage}/>
        <Route exact path='/home' component={Home}/>
    </div>
    </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
