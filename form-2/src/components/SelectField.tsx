import React from 'react';

interface SelectFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, name, value, onChange, options, error }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-medium">{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? 'border-red-500' : ''}`}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
