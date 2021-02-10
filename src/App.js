import React, { useState, Component } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';
import Select from './components/Select';

data.routes = data.addId(data.routes);
data.airports = data.addId(data.airports);
data.airlines = data.addId(data.airlines);

const App = () => {
  /*
  PEDAC: Filter routes by airport
  input: data
  output: select component displaying the correct airport list
  rules:
  data structures:
  algorithm:

  input: data
  output: airport list
  rules: only need 'name' and 'code' properties of each object in the list
  TODOs:
    - map data.airports, include only name and code
    - refactor Select so that we can pass valueKey and titleKey and use them in the options list to display the correct properties in the option.
    - use state to set both filteredAirlines and filteredAirports, not to get rid of some, but instead to add a property that tells the Select component whether the option is to be disabled or not

  */
  const [filteredAirlines, setFilteredAirlines] = useState(data.airlines);
  const [filteredAirports, setFilteredAirports] = useState(data.airports);
  const [rows, setRows] = useState(data.routes);

  const perPage = 25;

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  function formatValue(property, value) {
    if (property === "airline") {
      return data.getAirlineById(value)
    } else {
      return data.getAirportByCode(value);
    }
  }

  const handleFilterAirlines = (event) => {
    let airlineId = event.target.value;
    if (airlineId === "all") {
      setRows(data.routes);
      return;
    }
    setRows(data.routes.filter(route => Number(airlineId) === route.airline));
  }

  const handleFilterAirports = (event) => {
    let airportCode = event.target.value;
    if (airportCode === "all") {
      setRows(data.routes);
      return;
    }
    console.log(airportCode, data.routes[0].airport)
    setRows(data.routes.filter(route => airportCode === route.src || airportCode === route.dest));
  }
  
  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <p>
        Welcome to the app!
      </p>
      <p>Show routes on
        <Select options={filteredAirlines} valueKey="id" titleKey="name"
        allTitle="All Airlines" value="" onSelect={handleFilterAirlines} />
        flying in or out of 
        <Select options={filteredAirports} valueKey="code" titleKey="name" allTitle="All Airports" onSelect={handleFilterAirports}/>
        <button>Show all Routes</button>
      </p>
      <Table className="routes-table" columns={columns} rows={rows} format={formatValue} perPage={perPage} />
    </section>
  </div>
  );
};

export default App;