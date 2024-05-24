'use client';
import React, { useState, useEffect } from 'react';

interface ToggleButtonProps {
  options: string[];
  onChange: (selectedOption: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [underlineStyle, setUnderlineStyle] = useState({
    width: '0px',
    transform: 'translateX(0px)',
  });

  useEffect(() => {
    const index = options.indexOf(selectedOption);
    setUnderlineStyle({
      width: `${90 / options.length}%`,
      transform: `translateX(${100 * index}%)`,
    });
  }, [selectedOption, options]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="relative inline-flex items-center w-full h-12 bg-gray-100 rounded-lg shadow-custom p-1">
      {options.map((option) => (
        <div
          key={option}
          className={`flex-1 text-center transition-colors duration-300 ease-in-out cursor-pointer ${
            selectedOption === option ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
      <div
        className="absolute top-1 bottom-1 left-1 bg-blue-900 rounded-md transition-transform duration-300 ease-in-out"
        style={{
          width: underlineStyle.width,
          transform: underlineStyle.transform,
        }}
      >
        하하
      </div>
    </div>
  );
};

export default ToggleButton;
