import React from 'react';
import generateId from '../utils/generateId';

const Table = ({columns, rows, format, perPage, rowCount, setRowCount}) => {

  const rowsToShow = rows.filter((_, idx) => idx >= rowCount && idx < rowCount + perPage);

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
    }
  };

  const getUpperPageBound = () => {
    if (rowCount + perPage > rows.length) {
      return rows.length;
    } else {
      return rowCount + perPage;
    }
  }

  console.log('upper page bound:', getUpperPageBound(), 'rows.length:', rows.length);

  return (
    <div>
    <table className="routes-table">
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
    <button className="pagination" disabled={rowCount === 0 ? true : null} onClick={handlePreviousButton}>previous page</button>
    <button className="pagination" disabled={getUpperPageBound() === rows.length ? true : null} onClick={handleNextButton}>next page</button>
    </div>
  );

};

export default Table;