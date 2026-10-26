import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. Load environment variables
dotenv.config();

// 2. Initialize the Express Application (This fixes the "app is not defined" error!)
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Setup Global Middleware
const frontendOrigins = (
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173'
)
  .split(',')
  .map((origin) => origin.trim());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || frontendOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origin not allowed by CORS'));
  }
}));
app.use(express.json());

// 4. Establish MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 5. Define Database Schema & Model
const feedbackSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  courseDuration: { type: String, required: true },
  feedbackComments: { type: String, required: true },
  feedbackRating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

// 6. REST API Endpoints

app.get('/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'unavailable'
  });
});

// GET: Fetch all feedback items
app.get('/api/feedback', async (req, res) => {
  try {
    const list = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add new course feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { courseName, feedbackComments, feedbackRating } = req.body;
    const courseId = 'CRS-' + Math.floor(1000 + Math.random() * 9000);
    const durations = ['4 Weeks', '8 Weeks', '12 Weeks', '6 Months'];
    const courseDuration = durations[Math.floor(Math.random() * durations.length)];

    const entry = new Feedback({ courseId, courseName, courseDuration, feedbackComments, feedbackRating });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Update an existing feedback entry by ID
app.put('/api/feedback/:id', async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a feedback record
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 7. Start the Server Engine
app.listen(PORT, () => console.log(`🚀 Engine active on port ${PORT}`));
