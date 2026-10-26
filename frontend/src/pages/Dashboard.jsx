import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api/feedback';

  const fetchItems = async () => {
    try { 
      const res = await axios.get(API_URL); 
      setFeedbacks(res.data); 
    } catch (e) { 
      console.error("Error connecting to database logic", e); 
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this course feedback entry?")) {
      await axios.delete(`${API_URL}/${id}`);
      setFeedbacks(feedbacks.filter(f => f._id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Feedback Dashboard</h1>
        <p className="text-sm text-slate-500">MERN Evaluation Data Log Grid</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Comments</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-500 text-sm">No course feedback found. Open the 'Add Feedback' tab to create records.</td>
              </tr>
            ) : (
              feedbacks.map(f => (
                <tr key={f._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-indigo-600 font-semibold">{f.courseId}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-slate-800">{f.courseName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{f.courseDuration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-bold">★ {f.feedbackRating}.0</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{f.feedbackComments}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button onClick={() => navigate('/add-feedback', { state: { existingRecord: f } })} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold">Update</button>
                    <button onClick={() => handleDelete(f._id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
