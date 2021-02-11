import React, { useState } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';
import Select from './components/Select';

data.routes = data.addId(data.routes);
data.airports = data.addId(data.airports);
data.airlines = data.addId(data.airlines);

// TODO: look up whether to always make a copy of my data before passing it to useState? I remember fullstackopen talking about this issue.
// TODO: The pagination doesn't reset when I filter and the result has fewer pages. Probably need to have a ref to that piece of state within the Table and reset it each time a filter is selected

const App = () => {
  const [airlines, setAirlines] = useState(data.airlines);
  const [airports, setAirports] = useState(data.airports);
  const [selectedAirline, setSelectedAirline] = useState("all");
  const [selectedAirport, setSelectedAirport] = useState("all");
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState(data.routes);

  const perPage = 25;

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  const formatValue = (property, value) => {
    if (property === "airline") {
      return data.getAirlineById(value)
    } else {
      return data.getAirportByCode(value);
    }
  };

  const filterRowsByAirline = (airlineId, rows) => {
    if (airlineId === "all") return rows;
    return rows.filter(route => Number(airlineId) === route.airline);
  };

  const filterRowsByAirport = (airportCode, rows) => {
    if (airportCode === "all") return rows;
    return rows.filter(route => airportCode === route.src || airportCode === route.dest);
  };

  const handleFilterAirlines = (event) => {
    let airlineId = event.target.value;
    let rows = filterRowsByAirline(
      airlineId,
      filterRowsByAirport(selectedAirport, data.routes)
    );
    setRows(rows);
    setSelectedAirline(airlineId);
    setAirlines(getAirlinesFromRows(rows));
    setAirports(getAirportsFromRows(rows));
    setRowCount(0);
  };

  const handleFilterAirports = (event) => {
    let airportCode = event.target.value;
    let rows = filterRowsByAirport(
      airportCode, 
      filterRowsByAirline(selectedAirline, data.routes)
    );
    setRows(rows);
    setSelectedAirport(airportCode);
    setAirlines(getAirlinesFromRows(rows));
    setAirports(getAirportsFromRows(rows));
    setRowCount(0);
  };

  const getAirportsFromRows = (rows) => {
    let allAirports = data.airports;
    let enabledAirports = rows.reduce((accum, row) => {
      if (!accum.includes(row.src)) {
        accum.push(row.src);
      } if (!accum.includes(row.dest)) {
        accum.push(row.dest);
      }
      return accum;
    }, []);

    let mappedAirports = allAirports.map(airport => {
      return enabledAirports.includes(airport.code)
        ? {disabled: null, ...airport}
        : {disabled: true, ...airport};
    });

    return mappedAirports;
  }

  const getAirlinesFromRows = (rows) => {
    let allAirlines = data.airlines;

    let enabledAirlines = rows.reduce((accum, row) => {
      return accum.includes(row.airline)
        ? accum
        : [row.airline, ...accum];
    }, []);

    let mappedAirlines = allAirlines.map(airline => {
      if (enabledAirlines.includes(airline.id)) {
        return {disabled: null, ...airline};
      } else {
        return {disabled: true, ...airline};
      }
    });

    return mappedAirlines;
  }

  const handleClearFilters = (event) => {
    setRows(data.routes);
    setSelectedAirport("all");
    setSelectedAirline("all");
    setAirlines(data.airlines);
    setAirports(data.airports);
    setRowCount(0);
  };
  
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
      <Table className="routes-table" columns={columns} rows={rows} format={formatValue} perPage={perPage} rowCount={rowCount} setRowCount={setRowCount}/>
    </section>
  </div>
  );
};

export default App;