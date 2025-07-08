import React from 'react';

interface FormFieldBoxProps {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean; // if true, spans full width
}

const FormFieldBox: React.FC<FormFieldBoxProps> = ({ label, children, fullWidth = false }) => (
  <div className={`${fullWidth ? 'w-full' : 'flex-1 min-w-[200px]'}`}>
    <label className="block font-normal mb-1">{label}</label>
    {children}
  </div>
);

export default FormFieldBox;