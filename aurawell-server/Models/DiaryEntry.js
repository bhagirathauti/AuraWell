const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const wordCount = value.split(' ').length;
                return wordCount >= 50 && wordCount <= 200;
            },
            message: 'Content must be between 50 and 200 words.',
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);
module.exports = DiaryEntry;
