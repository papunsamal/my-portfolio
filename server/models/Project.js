const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  techStack: [String],
  images: [String],
  githubLink: String,
  liveLink: String,
  isPrivate: { type: Boolean, default: false },
});

module.exports = mongoose.model('Project', projectSchema);
