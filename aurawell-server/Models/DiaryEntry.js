const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    mood: {
        type: String,
        required: true,
    },
    tips: {
        type: String,
    }
}, { timestamps: true });

const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);
module.exports = DiaryEntry;
