import React, { useState } from 'react';
import { HieroglyphArrowDownIcon } from './Icons';

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  defaultOpenIndices?: number[];
}

const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndices = [] }) => {
  const [openIndices, setOpenIndices] = useState<number[]>(defaultOpenIndices);

  const toggle = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-gray-200">{item.title}</span>
              <HieroglyphArrowDownIcon
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-4 bg-[#2a2b2e] text-gray-300">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;