import './App.css';
import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details';
import VideogameCreate from './components/VideogameCreate/VideogameCreate';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <Route>
        <NavBar/>
      </Route>
    <div className="App">
        <Route exact path= '/' component= {LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/details/:id' component={Details}/>
        <Route exact path='/videogame' component={VideogameCreate}/>
    </div>
    </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
