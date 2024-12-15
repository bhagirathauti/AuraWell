const express = require('express');
const Diary = require('../Models/DiaryEntry');
const User = require('../Models/UserModel'); 
const Mood = require('../Models/MoodModel');
const router = express.Router();

router.post('/add-entry', async (req, res) => {
    const { email, content } = req.body;

    if (!email || !content) {
        return res.status(400).json({ message: 'Email and content are required.' });
    }

    try {
        const newEntry = new Diary({ content });
        const savedEntry = await newEntry.save();

        const user = await User.findOneAndUpdate(
            { email },
            { $push: { entryIds: savedEntry._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found. Cannot save entry ID.' });
        }

        res.status(201).json({ message: 'Entry added successfully!', entryId: savedEntry._id });
    } catch (err) {
        res.status(500).json({ message: 'Error adding entry', error: err.message });
    }
});
router.get('/get-entries/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const entryIds = user.entryIds;
        if (!entryIds || entryIds.length === 0) {
            return res.status(404).json({ message: 'No diary entries found for this user' });
        }
        const diaryEntries = await Diary.find({
            _id: { $in: entryIds }
        });
        res.status(200).json(diaryEntries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching diary entries', error: err.message });
    }
});

router.put('/edit-entry/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Content is required to update the entry.' });
    }

    try {
        const updatedEntry = await Diary.findByIdAndUpdate(
            id,
            { content, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Diary entry not found.' });
        }

        res.status(200).json({ message: 'Diary entry updated successfully.', updatedEntry });
    } catch (err) {
        res.status(500).json({ message: 'Error updating diary entry', error: err.message });
    }
});
router.delete('/delete-entry/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required to verify the user.' });
    }

    try {
        const user = await User.findOne({ email});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const deletedEntry = await Diary.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Diary entry not found.' });
        }
        user.entryIds = user.entryIds.filter(entryId => entryId.toString() !== id);
        await user.save();

        res.status(200).json({ message: 'Diary entry deleted successfully.', deletedEntry });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting diary entry', error: err.message });
    }
});


router.post('/add-mood', async (req, res) => {
    const { email, mood } = req.body;

    if (!email || !mood) {
        return res.status(400).json({ message: 'Email and mood are required.' });
    }

    try {
        const updatedMood = await Mood.findOneAndUpdate(
            { email }, 
            { $push: { moods: mood } },
            { upsert: true, new: true } 
        );

        res.status(200).json({
            message: 'Mood updated successfully!',
            moodDetails: updatedMood
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating or adding mood.',
            error: err.message
        });
    }
});

module.exports = router;
