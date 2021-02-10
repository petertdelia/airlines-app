import React, { useState } from 'react';
import generateId from '../utils/generateId';

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

  const getUpperPageBound = () => {
    if (rowCount + perPage > rows.length) {
      return rows.length;
    } else {
      return rowCount + perPage;
    }
  }

  return (
    <div>
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <td key={generateId()}>{column.name}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsToShow.map(row => (
          <tr key={generateId()}>
            <td>{format("airline", row.airline)}</td>
            <td>{format("src", row.src)}</td>
            <td>{format("dest", row.dest)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>showing {rowCount + 1}-{getUpperPageBound()} of {rows.length} routes</p>
    <button onClick={handlePreviousButton}>previous page</button>
    <button onClick={handleNextButton}>next page</button>
    </div>
  );

};

export default Table;