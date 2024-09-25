import React from 'react';

export default ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg relative max-w-3xl w-full">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 text-xl hover:text-gray-900"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
