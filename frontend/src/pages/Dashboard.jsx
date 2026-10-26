import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedbackApi } from '../api';

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try { 
      const res = await feedbackApi.get('/');
      setFeedbacks(res.data); 
    } catch (e) { 
      console.error("Error connecting to database logic", e); 
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this course feedback entry?")) {
      try {
        await feedbackApi.delete(`/${id}`);
        setFeedbacks(feedbacks.filter(f => f._id !== id));
      } catch (err) {
        alert("Failed to delete record.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Dashboard Metadata */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Feedback Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-500">MERN Administration Panel Core Grid</p>
      </div>

      {/* DESKTOP VIEW: Table Headers explicitly showing required tracking fields */}
      <div className="hidden sm:block bg-white shadow rounded-lg overflow-x-auto border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Course Duration</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Overall Feedback Rating</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Comments</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-400 text-sm">
                  No records stored yet. Click "Add Feedback" above to map new data metrics.
                </td>
              </tr>
            ) : (
              feedbacks.map(f => (
                <tr key={f._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-indigo-600 font-semibold">{f.courseId}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-slate-800">{f.courseName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{f.courseDuration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-bold">★ {f.feedbackRating}.0 / 5</span>
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

      {/* MOBILE VIEW: Cards explicitly listing the labels clearly */}
      <div className="block sm:hidden">
        {feedbacks.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-xl border border-slate-200 text-slate-400 text-sm">
            No records stored yet. Click "Add Feedback" to populate.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {feedbacks.map(f => (
              <div key={f._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Course ID</p>
                    <span className="font-mono text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">{f.courseId}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right">Overall Rating</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-bold">★ {f.feedbackRating}.0</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Course Name</p>
                  <h3 className="font-bold text-slate-800 text-base">{f.courseName}</h3>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Course Duration</p>
                  <p className="text-sm text-slate-600">{f.courseDuration}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Comments</p>
                  <div className="bg-slate-50 p-2.5 rounded text-sm text-slate-600 italic">"{f.feedbackComments}"</div>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <button onClick={() => navigate('/add-feedback', { state: { existingRecord: f } })} className="flex-1 text-center bg-indigo-50 text-indigo-600 py-2 rounded text-sm font-semibold hover:bg-indigo-100">Update</button>
                  <button onClick={() => handleDelete(f._id)} className="flex-1 text-center bg-red-50 text-red-600 py-2 rounded text-sm font-semibold hover:bg-red-100">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
