import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto m-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={28} />
        </button>

        {/* Title */}
        <div className="p-8 pb-4 border-b">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">Last updated: January 27, 2026</p>
        </div>

        {/* Content */}
        <div className="p-8 prose prose-lg max-w-none text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;