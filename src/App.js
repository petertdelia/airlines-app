import React, { useState, Component } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';
import Select from './components/Select';

const generateId = (() => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
})();

data.routes = data.routes.map(route => (
  {
    airline: data.getAirlineById(route.airline),
    src: data.getAirportByCode(route.src),
    dest: data.getAirportByCode(route.dest),
    key: generateId(),
  }
));

const App = () => {
  const [filteredAirlines, setFilteredAirlines] = useState([{id: "all", name: "All Airlines"}, ...data.airlines]);
  const [rows, setRows] = useState(data.routes);

  const perPage = 25;

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ].map(column => ({...column, key: generateId()}));

  function formatValue(property, value) {
    return "";
  }

  const handleFilterAirlines = (event) => {
    let airlineId = event.target.value;
    console.log(airlineId)
    if (airlineId === "all") {
      setRows(data.routes);
      return;
    }
    setRows(data.routes.filter(route => data.getAirlineById(Number(airlineId)) === route.airline));
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
      <Select options={filteredAirlines} valueKey="id" titleKey="name"
    allTitle="All Airlines" value="" onSelect={handleFilterAirlines} />
      <Table className="routes-table" columns={columns} rows={rows} format={formatValue} perPage={perPage} />
    </section>
  </div>
  );
};

export default App;