'use server'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/competitive_programming', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const SubtopicSchema = new mongoose.Schema({
    name: String,
    questions: [{ text: String, link: String }],
});

const TopicSchema = new mongoose.Schema({
    name: String,
    level: String,
    subtopics: [SubtopicSchema],
});

const Topic = mongoose.model('Topic', TopicSchema);

// Routes
app.get('/api/topics', async (req, res) => {
    const topics = await Topic.find();
    res.json(topics);
});

app.post('/api/topics', async (req, res) => {
    const { topics } = req.body;
    await Topic.deleteMany(); // Clear existing data
    await Topic.insertMany(topics); // Insert updated data
    res.status(200).send('Data saved');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
