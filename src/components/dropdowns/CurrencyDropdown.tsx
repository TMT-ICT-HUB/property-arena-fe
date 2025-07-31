import React from 'react';

interface CurrencyFieldProps {
  value: number | string;
  currency: string;
  currencyOptions: string[];
  onValueChange: (value: number) => void;
  onCurrencyChange: (currency: string) => void;
  placeholder?: string;
  className?: string;
}

export const CurrencyFieldWithToggle: React.FC<CurrencyFieldProps> = ({
  value,
  currency,
  currencyOptions,
  onValueChange,
  onCurrencyChange,
  placeholder = "Enter amount",
  className = ""
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Input Field (no artificial padding) */}
      <input
        type="number"
        className="w-full shadow-md p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-red"
        value={value}
        onChange={e => onValueChange(Number(e.target.value))}
        placeholder={placeholder}
      />

      {/* Currency Toggle Tabs (floating, not affecting input layout) */}
      <div className="absolute inset-y-0 right-2 flex items-center space-x-1">
        {currencyOptions.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => onCurrencyChange(option)}
            className={`cursor-pointer h-[80%] px-2 py-1 text-xs font-semibold border border-primary-red rounded ${currency === option
                ? 'bg-primary-red text-white border-primary-green'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
