import React from 'react';
import "./Input.css";

const Input = ({ className = "", type = "text", ref, label, ...props }) => {
  return (
    <>
      {label && <label htmlFor={label && label}> {label && label}<span className='required'>*</span></label>}
      <br />
      <input
        className={`input ${className}`}
        type={type}
        {...props}
        ref={ref}
        id={label && label}
      />
    </>
  )
}

export default Input