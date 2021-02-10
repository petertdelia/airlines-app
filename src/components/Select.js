import React from 'react';
import generateId from '../utils/generateId';

const Select = ({options, onSelect, allTitle, valueKey, titleKey, value}) => {
  options = [{key: generateId(), id: "all", name: allTitle}, ...options];
  return (
    <select onChange={onSelect} value={value}>
      {options.map(option => (
        <option key={option.key} value={option[valueKey] || "all"}>{option[titleKey]}</option>
      ))}
    </select>
  )
}

export default Select;