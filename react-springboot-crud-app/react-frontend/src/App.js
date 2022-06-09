import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<ListEmployeeComponent/>} /> 
              <Route path="/employee" element={<ListEmployeeComponent/>} />
              <Route path="/add-employee" element={<CreateEmployeeComponent/>} />
              <Route path="/update-employee/:id" element={<UpdateEmployeeComponent/>} />
              <Route path="/view-employee/:id" element={<ViewEmployeeComponent/>} />
            </Routes>
          </div>
          <FooterComponent/>
      </Router>
    </div>
    
  );
}

export default App;
