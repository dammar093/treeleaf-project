import React from 'react';
import "./Select.css";

const Select = ({ data, className = "", label, selectedItem, ...props }) => {
  return (
    <div className={`select-container ${className}`}>
      {label && (
        <label htmlFor={label}>
          {label} <span className='required'>*</span>
        </label>
      )}
      <select id={label} className="select" {...props}>
        <option value="">Select {label}</option>
        {data.map((dataItem) => (
          <option
            key={dataItem}
            value={dataItem}
            selected={dataItem.toLowerCase() === String(selectedItem).toLowerCase()}
          >
            {dataItem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
