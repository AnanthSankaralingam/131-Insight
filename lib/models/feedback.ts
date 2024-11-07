import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  taName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    enum: ['CMSC131', 'CMSC132'],
  },
  professorName: {
    type: String,
    required: true,
    enum: ['Elias Gonzalez', 'Pedram Sadeghian'],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  attendanceCount: {
    type: Number,
    required: true,
  },
  attendanceType: {
    type: String,
    enum: ['exact', 'estimate'],
    required: true,
  },
  topicsCovered: {
    type: [String],
    required: true,
  },
  studentEngagement: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  challengingConcepts: {
    type: String,
    required: true,
  },
  suggestions: {
    type: String,
    required: false,
  },
  needsAttention: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);