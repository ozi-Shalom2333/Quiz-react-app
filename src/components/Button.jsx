import React from 'react';

export default function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`rounded px-6 py-2 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 shadow transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
