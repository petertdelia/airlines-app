import React, { Component } from 'react';
import './App.css';
import data from './data';

const App = () => (
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
        <td>{route.airline}</td>
        <td>{route.src}</td>
        <td>{route.dest}</td>
      </tr>
      ))}
    </table>
  </section>
</div>
)

export default App;