// SKILL SCORE CALCULATION ---
const calculateSkillScore = (userSkills, jobDescription) => {
  if (!userSkills || userSkills.length === 0 || !jobDescription) return 0;

  const descriptionText = jobDescription.toLowerCase();
  let matchedSkills = 0;

  userSkills.forEach(skill => {
    if (descriptionText.includes(skill.toLowerCase())) {
      matchedSkills++;
    }
  });

  return (matchedSkills / userSkills.length) * 100;
};

// EXPERIENCE SCORE CALCULATION ---
const getUserExperienceLevel = (experienceText) => {
    if (!experienceText || typeof experienceText !== 'string') return 1; // Default to Junior
    const textLength = experienceText.length;
    if (textLength > 500) return 3; // Senior
    if (textLength > 150) return 2; // Mid-level
    return 1; // Junior
};

const getJobExperienceLevel = (jobTitle, jobDescription) => {
    const text = `${jobTitle.toLowerCase()} ${jobDescription.toLowerCase()}`;
    const seniorKeywords = ['senior', 'sr.', 'lead', 'principal', 'manager'];
    const midKeywords = ['mid-level', 'intermediate', '2+ years', '3+ years', '4+ years', '5+ years'];
    
    if (seniorKeywords.some(kw => text.includes(kw))) return 3;
    if (midKeywords.some(kw => text.includes(kw))) return 2;
    return 1; // Default to Junior/Entry-Level
};

const calculateExperienceScore = (userExperience, jobTitle, jobDescription) => {
    const userLevel = getUserExperienceLevel(userExperience);
    const jobLevel = getJobExperienceLevel(jobTitle, jobDescription);

    if (userLevel >= jobLevel) return 100; // Perfect match or overqualified
    if (userLevel === jobLevel - 1) return 50; // One level below, potential fit
    return 0; // Gap is too large
};


//FINAL ENHANCED FIT SCORE CALCULATION ---
/**
 * Calculates a weighted "fit score" based on skills and experience.
 * @param {object} user 
 * @param {object} job 
 * @returns {number} A percentage score from 0 to 100.
 */
const calculateEnhancedFitScore = (user, job) => {
    // Define weights for each component
    const SKILL_WEIGHT = 0.7; // 70%
    const EXPERIENCE_WEIGHT = 0.3; // 30%

    const skillScore = calculateSkillScore(user.skills, job.description);
    const experienceScore = calculateExperienceScore(user.experience, job.title, job.description);
    
    // Calculate the final weighted score
    const finalScore = (skillScore * SKILL_WEIGHT) + (experienceScore * EXPERIENCE_WEIGHT);

    return Math.round(finalScore);
};

module.exports = { calculateEnhancedFitScore };