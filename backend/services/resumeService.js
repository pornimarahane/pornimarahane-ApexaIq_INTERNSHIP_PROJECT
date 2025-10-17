
const JOB_ROLES_SKILLS = {
  "Web Developer": ["javascript", "react", "html", "css", "node.js", "api", "git", "express"],
  "Data Analyst": ["sql", "python", "excel", "tableau", "power bi", "statistics", "r"],
  "Software Tester": ["qa", "selenium", "cypress", "jest", "jira", "test cases", "api testing"],
  "Automation Engineer": ["python", "bash", "jenkins", "docker", "kubernetes", "ci/cd", "ansible"],
  "Java Developer": ["java", "spring boot", "hibernate", "sql", "rest", "maven", "docker"],
  "DevOps Engineer": ["aws", "azure", "docker", "kubernetes", "ci/cd", "terraform", "linux"]
};

/**
 * @param {string[]} userSkills 
 * @returns {Array<Object>} 
 */
const analyzeResumeSkills = (userSkills) => {
  const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
  const analysisResults = [];

  for (const role in JOB_ROLES_SKILLS) {
    const requiredSkills = JOB_ROLES_SKILLS[role];
    
    // Find which skills match
    const matchingSkills = requiredSkills.filter(reqSkill => userSkillsLower.includes(reqSkill));
    
    // Find which skills are missing
    const lackingSkills = requiredSkills.filter(reqSkill => !userSkillsLower.includes(reqSkill));
    
    // Calculate the match percentage
    const matchPercentage = Math.round((matchingSkills.length / requiredSkills.length) * 100);

    analysisResults.push({
      role,
      matchPercentage,
      lackingSkills,
    });
  }

  return analysisResults;
};

module.exports = { analyzeResumeSkills };