const User = require('../models/userModel');
const { fetchJobsFromAdzuna } = require('../services/adzunaService');
const { findLearningResources } = require('../services/learningService');
const { generateAssessment } = require('../services/assessmentService');


// This is no longer a "master list" but a large dictionary of potential skills
// to find within job descriptions across multiple domains.
const SKILL_CANDIDATES = [
    // Programming Languages
    'python', 'java', 'c++', 'c#', 'javascript', 'typescript', 'go', 'rust', 'swift', 'kotlin', 'php', 'ruby', 'sql',
    // Web Development
    'react', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'html', 'css', 'api', 'rest', 'graphql',
    // Databases
    'mongodb', 'mysql', 'postgresql', 'redis', 'firebase',
    // Cloud & DevOps
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'ci/cd', 'terraform', 'devops',
    // Embedded Systems
    'c', 'embedded c', 'rtos', 'firmware', 'microcontroller', 'arm', 'i2c', 'spi', 'uart', 'can bus', 'jtag',
    // Data Science & ML
    'machine learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'data analysis',
    // Management & Soft Skills
    'agile', 'scrum', 'jira', 'project management', 'communication', 'problem solving',
    // Testing & QA
    'selenium', 'jest', 'junit', 'qa', 'automation testing', 'manual testing'
];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}


const extractSkillsFromJobs = (jobs) => {
    // Combine all job descriptions into a single lowercase text block for analysis.
    const corpus = jobs.map(job => job.description.toLowerCase()).join(' ');

    const skillFrequency = {};

    // Scan the entire corpus for each skill candidate.
    SKILL_CANDIDATES.forEach(skill => {
        const escapedSkill = escapeRegExp(skill);
        const skillRegex = new RegExp(`\\b${escapedSkill}\\b`, 'gi');
        const matches = corpus.match(skillRegex);

        if (matches) {
            skillFrequency[skill] = matches.length;
        }
    });

    // Sort the found skills by frequency and return the top 7.
    return Object.keys(skillFrequency)
      .sort((a, b) => skillFrequency[b] - skillFrequency[a])
      .slice(0, 7);
};


const analyzeJobSkills = async (req, res) => {
    const { jobTitle } = req.body; 
    
    if (!jobTitle) {
      return res.status(400).json({ message: 'A job title is required for analysis.' });
    }
  
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      if (!user || !user.skills || user.skills.length === 0) {
        return res.status(404).json({ message: 'Your skills are not yet available. Please upload your resume first.' });
      }
  
      const adzunaJobs = await fetchJobsFromAdzuna(jobTitle, 'India');
      if (adzunaJobs.length === 0) {
        return res.status(404).json({ message: `Could not find similar jobs for "${jobTitle}" to analyze.` });
      }
      
      // The new dynamic function is called here.
      const requiredSkills = extractSkillsFromJobs(adzunaJobs);
  
      if (requiredSkills.length === 0) {
        return res.status(404).json({ 
          message: `We couldn't identify any key technical skills for "${jobTitle}" from our list. Try a different job title.` 
        });
      }
      
      const userSkillsLower = user.skills.map(s => s.toLowerCase());
  
      const skillsYouHave = requiredSkills.filter(s => userSkillsLower.includes(s));
      const skillsToLearnNames = requiredSkills.filter(s => !userSkillsLower.includes(s));
  
      const skillsToLearn = await Promise.all(
        skillsToLearnNames.map(async (skillName) => ({
          name: skillName,
          status: 'learning',
          proficiency: 15,
          category: 'Technical',
          icon: 'mdi-school',
          resources: await findLearningResources(skillName),
        }))
      );
      
      const formattedSkillsYouHave = skillsYouHave.map(skillName => ({
          name: skillName,
          status: 'completed',
          proficiency: 80,
          category: 'Technical',
          icon: 'mdi-check-decagram',
      }));
      
      res.status(200).json({ skillsYouHave: formattedSkillsYouHave, skillsToLearn });
  
    } catch (error) {
      console.error("Error in analyzeJobSkills:", error);
      res.status(500).json({ message: 'Server error during skill analysis.' });
    }
};
  
const getAssessment = async (req, res) => {
    const { skill, jobTitle } = req.query;
    try {
        const questions = await generateAssessment(skill, jobTitle);
        if (!questions || questions.length === 0) {
            return res.status(500).json({ message: 'AI failed to generate questions. Please try again.'})
        }
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error in getAssessment:", error);
        res.status(500).json({ message: 'Failed to generate assessment' });
    }
};

module.exports = { analyzeJobSkills, getAssessment };