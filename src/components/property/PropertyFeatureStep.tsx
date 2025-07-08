import React, { useState, KeyboardEvent } from 'react';
import { FaTimes } from 'react-icons/fa';

interface PropertyFeaturesStepProps {
  features: string[];
  onChange: (features: string[]) => void;
}

const PropertyFeaturesStep: React.FC<PropertyFeaturesStepProps> = ({ features, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const addFeature = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !features.includes(trimmed)) {
      onChange([...features, trimmed]);
      setInputValue('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    onChange(features.filter(f => f !== featureToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div className="space-y-4 p-[5%]">
      <h2 className="text-lg font-medium mb-2">Property Features</h2>
      <div className="flex gap-2 flex-wrap mb-2">
        {features.map((feature, idx) => (
          <span
            key={idx}
            className="flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm"
          >
            {feature}
            <button
              type="button"
              onClick={() => removeFeature(feature)}
              className="ml-2 focus:outline-none"
            >
              <FaTimes />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a feature and hit Enter"
          className="flex-1 p-2 border rounded-md shadow-sm focus:outline-none"
        />
        <button
          type="button"
          onClick={addFeature}
          className="px-4 py-2 bg-primary-green text-white rounded-md hover:bg-primary-green-hover disabled:opacity-50"
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </div>
      <div className="text-sm text-gray-600">
        Press Enter or click "Add" to save a feature.
      </div>
    </div>
  );
};

export default PropertyFeaturesStep;
