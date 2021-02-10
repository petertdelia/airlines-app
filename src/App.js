import React, { useState, Component } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';
import Select from './components/Select';

data.routes = data.addId(data.routes);
data.airports = data.addId(data.airports);
data.airlines = data.addId(data.airlines);

const App = () => {
  const [airlines, setairlines] = useState(data.airlines);
  const [airports, setairports] = useState(data.airports);
  const [selectedAirline, setSelectedAirline] = useState("all");
  const [selectedAirport, setSelectedAirport] = useState("all");
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
      setSelectedAirline(airlineId);
      return;
    }
    setRows(data.routes.filter(route => Number(airlineId) === route.airline));
    setSelectedAirline(airlineId);
  }

  const handleFilterAirports = (event) => {
    let airportCode = event.target.value;
    if (airportCode === "all") {
      setRows(data.routes);
      setSelectedAirport(airportCode);
      return;
    }
    setRows(data.routes.filter(route => airportCode === route.src || airportCode === route.dest));
    setSelectedAirport(airportCode);
  }

  const handleClearFilters = (event) => {
    setRows(data.routes);
    setSelectedAirport("all");
    setSelectedAirline("all");
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
        <Select options={airlines} valueKey="id" titleKey="name"
        allTitle="All Airlines" value={selectedAirline} onSelect={handleFilterAirlines} />
        flying in or out of 
        <Select options={airports} valueKey="code" titleKey="name" allTitle="All Airports" onSelect={handleFilterAirports} value={selectedAirport}/>
        <button onClick={handleClearFilters}>Show all Routes</button>
      </p>
      <Table className="routes-table" columns={columns} rows={rows} format={formatValue} perPage={perPage} />
    </section>
  </div>
  );
};

export default App;