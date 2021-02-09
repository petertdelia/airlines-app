import React, { useState } from 'react';

const Table = ({columns, rows, format, perPage}) => {
  const [rowCount, setRowCount] = useState(0);

  const rowsToShow = rows.filter((row, idx) => idx >= rowCount && idx < rowCount + perPage);

  const handlePreviousButton = () => {
    if (rowCount - perPage > 0) {
      setRowCount(rowCount - perPage);
    } else {
      setRowCount(0);
    }
  };

  const handleNextButton = () => {
    if (rowCount + perPage < rows.length) {
      setRowCount(rowCount + perPage);
    } else {
      // setRowCount(0);
    }
  };

  return (
    <div>
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <td key={column.key}>{column.name}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsToShow.map(row => (
          <tr key={row.key}>
            <td>{row.airline}</td>
            <td>{row.src}</td>
            <td>{row.dest}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>showing {rowCount + 1}-{rowCount + perPage} of {rows.length} routes</p>
    <button onClick={handlePreviousButton}>previous page</button>
    <button onClick={handleNextButton}>next page</button>
    </div>
  );

};

export default Table;