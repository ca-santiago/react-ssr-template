import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomeView from './views/home';
import ManagerView from './views/manager';

function App() {
  return (
    <div>
      <div>
        <Link to={'/'} childred="Home" />
        <Link to={'/manager'} childred="Manager" />
      </div>
      <Routes>
        <Route path='/' Component={ HomeView } />
        <Route path='/manager' Component={ ManagerView } />
      </Routes>
    </div>
  );
}

export default App;
