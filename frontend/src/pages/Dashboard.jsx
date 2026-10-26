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
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Feedback Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-500">MERN Evaluation Data Log Grid</p>
      </div>

      {feedbacks.length === 0 ? (
        <div className="bg-white rounded-lg p-10 text-center border border-slate-200 text-slate-500 text-sm">
          No course feedback found. Open the 'Add Feedback' tab to create records.
        </div>
      ) : (
        <>
          {/* MOBILE RESPONSIVE CARDS VIEW (Shows on mobile screens) */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {feedbacks.map(f => (
              <div key={f._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">{f.courseId}</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-bold">★ {f.feedbackRating}.0</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{f.courseName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Duration: {f.courseDuration}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded text-sm text-slate-600 italic">
                  "{f.feedbackComments}"
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => navigate('/add-feedback', { state: { existingRecord: f } })} className="flex-1 text-center bg-indigo-50 text-indigo-600 py-2 rounded text-sm font-semibold hover:bg-indigo-100">Update</button>
                  <button onClick={() => handleDelete(f._id)} className="flex-1 text-center bg-red-50 text-red-600 py-2 rounded text-sm font-semibold hover:bg-red-100">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE VIEW (Hidden on mobile screens, shows on larger monitors) */}
          <div className="hidden sm:block bg-white shadow rounded-lg overflow-x-auto border border-slate-200">
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
                {feedbacks.map(f => (
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
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
