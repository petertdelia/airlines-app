import React from 'react';

const Select = ({options, onSelect}) => {
  return (
    <select onClick={onSelect}>
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  )
}

export default Select;