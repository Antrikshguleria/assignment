import React from 'react';

interface CheckboxFieldProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, value, name, checked, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default CheckboxField;
