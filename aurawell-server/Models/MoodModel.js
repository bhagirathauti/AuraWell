const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  entryIds : {type:Array,default:[]}
});
const Mood = mongoose.model('Mood', MoodSchema);
module.exports = Mood;
