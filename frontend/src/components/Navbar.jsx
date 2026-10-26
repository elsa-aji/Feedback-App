import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-400">EduFeedback</span>
          <span className="bg-slate-800 text-xs px-2 py-0.5 rounded text-slate-400 font-mono">Panel</span>
        </div>
        <div className="flex space-x-4">
          <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded text-sm font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>Dashboard</NavLink>
          <NavLink to="/add-feedback" className={({ isActive }) => `px-3 py-2 rounded text-sm font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>Add Feedback</NavLink>
        </div>
      </div>
    </nav>
  );
}
