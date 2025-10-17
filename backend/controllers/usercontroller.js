const User = require('../models/userModel');
const AppliedJob = require('../models/appliedJobModel');
const { parseResume } = require('../services/parserService');
const fs = require('fs');

// --- UPLOAD RESUME FUNCTION ---
const uploadAndParseResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No resume file uploaded.' });
  }

  try {
    const userId = req.user.id;
    console.log(`--- CHECKPOINT 2: File uploaded by multer for user ${userId}. Starting PDF parse... ---`);
    
    const parsedData = await parseResume(req.file.path);
    console.log('--- CHECKPOINT 3: PDF parsing finished. Updating database... ---');
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $set: {
          skills: parsedData.skills,
          experience: parsedData.experience,
        }
      },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
    }

    console.log('--- CHECKPOINT 4: Database updated. Sending success response. ---');
    res.status(200).json({ message: 'Resume parsed and profile updated!', user: updatedUser });

  } catch (error) {
    console.error('--- CRITICAL ERROR in uploadAndParseResume ---:', error);
    res.status(500).json({ message: 'Server error during file parsing. Check server logs for details.' });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

// --- TRACK APPLICATION FUNCTION ---
const trackApplication = async (req, res) => {
    const userId = req.user.id;
    const { adzunaId, title, company } = req.body;
    
    try {
        const existingApplication = await AppliedJob.findOne({ adzunaId, userId });
        if (existingApplication) {
            return res.status(200).json(existingApplication);
        }

        const newApplication = await AppliedJob.create({ 
            userId, 
            adzunaId, 
            title, 
            company 
        });
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ message: "Failed to track application."});
    }
};

// --- GET APPLIED JOB TITLES FUNCTION ---
const getAppliedJobTitles = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobs = await AppliedJob.find({ userId }).select('title');
        
        const uniqueTitles = [...new Set(jobs.map(job => job.title))];

        res.status(200).json(uniqueTitles);
    } catch (error) {
        console.error("Error fetching applied job titles:", error);
        res.status(500).json({ message: 'Server error fetching job titles.' });
    }
};


module.exports = { uploadAndParseResume, trackApplication, getAppliedJobTitles };