import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FeedbackForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const editRecord = location.state?.existingRecord || null;

  const [formData, setFormData] = useState({ courseName: '', feedbackComments: '', feedbackRating: 5 });

  useEffect(() => {
    if (editRecord) {
      setFormData({ 
        courseName: editRecord.courseName, 
        feedbackComments: editRecord.feedbackComments, 
        feedbackRating: editRecord.feedbackRating 
      });
    }
  }, [editRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = 'http://localhost:5000/api/feedback';
    try {
      if (editRecord) { 
        await axios.put(`${API_URL}/${editRecord._id}`, formData); 
      } else { 
        await axios.post(API_URL, formData); 
      }
      navigate('/');
    } catch (err) {
      alert("Error sending data to backend server engine.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 sm:my-12 mx-4 sm:mx-auto p-5 sm:p-8 bg-white rounded-xl shadow border border-slate-200">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-900">{editRecord ? '✏️ Update Evaluation' : '➕ Add Feedback'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Course Name</label>
          <input type="text" required className="w-full border px-3 py-2 rounded focus:outline-indigo-500 bg-white text-slate-800 text-sm sm:text-base" value={formData.courseName} onChange={e => setFormData({...formData, courseName: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Feedback Comments</label>
          <textarea rows="3" required className="w-full border px-3 py-2 rounded focus:outline-indigo-500 bg-white text-slate-800 text-sm sm:text-base" value={formData.feedbackComments} onChange={e => setFormData({...formData, feedbackComments: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Feedback Rating</label>
          <select className="w-full border px-3 py-2 rounded bg-white text-slate-800 focus:outline-indigo-500 text-sm sm:text-base" value={formData.feedbackRating} onChange={e => setFormData({...formData, feedbackRating: parseInt(e.target.value)})}>
            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars {'★'.repeat(n)}</option>)}
          </select>
        </div>
        <div className="flex gap-2 pt-2">
          <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded font-bold hover:bg-indigo-700 transition text-sm sm:text-base">Save Data</button>
          <button type="button" onClick={() => navigate('/')} className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded font-medium hover:bg-slate-200 text-sm sm:text-base">Cancel</button>
        </div>
      </form>
    </div>
  );
}
