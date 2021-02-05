import React, { Component } from 'react';
import './App.css';
import data from './data';

const App = () => {
  
  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <p>
        Welcome to the app!
      </p>
      <table>
        {data.routes.map(route => (
        <tr>
          <td>{data.getAirlineById(route.airline)}</td>
          <td>{data.getAirportByCode(route.src)}</td>
          <td>{data.getAirportByCode(route.dest)}</td>
        </tr>
        ))}
      </table>
    </section>
  </div>
  );
};

export default App;