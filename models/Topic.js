import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    text: String,
    link: String,
});

const SubtopicSchema = new mongoose.Schema({
    name: String,
    questions: [QuestionSchema],
});

const TopicSchema = new mongoose.Schema({
    name: String,
    level: String,
    subtopics: [SubtopicSchema],
});

const Topic = mongoose.models.Topic || mongoose.model('Topic', TopicSchema);

export default Topic;
