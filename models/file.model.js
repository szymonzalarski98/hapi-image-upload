const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  fileName: {
    required: true,
    type: String,
  },
  fileId: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  }
});

module.exports = mongoose.model('File', FileSchema);