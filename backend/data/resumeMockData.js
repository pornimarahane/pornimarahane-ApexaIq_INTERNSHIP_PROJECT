/**
 * @fileoverview Mock data for resume optimization tips, tailored to specific job roles.
 * This data is based on best practices for passing Applicant Tracking Systems (ATS) and appealing to recruiters.
 */

export const resumeOptimizationTips = {
  "web developer": {
    keywords: ["JavaScript", "React", "Vue", "Node.js", "Express", "RESTful APIs", "GraphQL", "HTML5", "CSS3", "Git", "Webpack", "CI/CD"],
    actionVerbs: ["Developed", "Engineered", "Launched", "Modernized", "Refactored", "Implemented", "Integrated", "Optimized", "Architected"],
    achievements: [
      "Quantify your impact: 'Optimized web vitals, improving Lighthouse scores by 25%' instead of 'Made the website faster.'",
      "Link to your live projects or GitHub repository in your contact information section.",
      "Detail the tech stack used for each project (e.g., 'Project X - Built with React, Redux, and Node.js').",
      "Mention specific features you were responsible for, e.g., 'Implemented a secure authentication flow using JWT.'"
    ],
    summary: "Start with a 2-3 sentence summary highlighting your years of experience, key frameworks (e.g., React, Node.js), and your passion for creating efficient, user-friendly web applications."
  },
  "data analyst": {
    keywords: ["SQL", "Python", "R", "Tableau", "Power BI", "Excel", "Data Visualization", "ETL", "Pandas", "NumPy", "Statistical Analysis", "A/B Testing"],
    actionVerbs: ["Analyzed", "Visualized", "Interpreted", "Modeled", "Forecasted", "Reported", "Automated", "Cleaned", "Transformed"],
    achievements: [
      "Focus on the outcome: 'Created a Tableau dashboard that gave insights into sales trends, leading to a 15% increase in quarterly revenue.'",
      "Specify the size of datasets you've worked with (e.g., 'Analyzed customer data sets with over 10 million rows').",
      "Highlight any reports or dashboards that are used by leadership for decision-making.",
      "Mention specific statistical methods used, like regression analysis or clustering."
    ],
    summary: "A concise summary should state your proficiency with key tools (SQL, Python, Tableau) and your ability to translate complex data into actionable business insights."
  },
  "software tester": {
    keywords: ["QA", "Manual Testing", "Automation Testing", "Selenium", "Cypress", "Playwright", "Jest", "JUnit", "Jira", "Test Cases", "Regression Testing", "API Testing"],
    actionVerbs: ["Tested", "Validated", "Automated", "Verified", "Reported", "Debugged", "Executed", "Designed", "Created"],
    achievements: [
      "Use metrics: 'Developed an automation suite of 200+ tests, reducing manual regression testing time by 80%.'",
      "Mention your bug-finding impact: 'Identified and reported 50+ critical bugs prior to production release.'",
      "Specify the types of testing you performed (e.g., 'Conducted performance, security, and usability testing').",
      "Highlight your experience with CI/CD tools like Jenkins in the context of testing."
    ],
    summary: "Your summary should emphasize your experience in both manual and automated testing, your chosen frameworks (e.g., Selenium, Cypress), and your meticulous attention to detail in ensuring software quality."
  },
  "java developer": {
    keywords: ["Java", "Spring Boot", "Hibernate", "Microservices", "REST APIs", "Maven", "Gradle", "JPA", "SQL", "NoSQL", "Docker", "AWS", "JUnit"],
    actionVerbs: ["Developed", "Architected", "Implemented", "Designed", "Maintained", "Optimized", "Integrated", "Deployed"],
    achievements: [
      "Be specific about your contributions: 'Designed and implemented RESTful APIs for a microservices-based application serving 100,000+ users.'",
      "Show performance improvements: 'Optimized database queries which improved API response times by 40%.'",
      "Mention your experience with cloud platforms, e.g., 'Deployed applications to AWS using Docker containers.'",
      "Include experience with build tools and testing frameworks like Maven/Gradle and JUnit/Mockito."
    ],
    summary: "Highlight your expertise in the Java ecosystem (especially Spring Boot), your experience in building scalable backend systems, and your proficiency with databases and cloud technologies."
  },
  "automation engineer": {
    keywords: ["Automation", "CI/CD", "Jenkins", "Ansible", "Terraform", "Docker", "Kubernetes", "Python", "Bash", "Groovy", "AWS", "Azure", "GCP"],
    actionVerbs: ["Automated", "Orchestrated", "Provisioned", "Configured", "Deployed", "Monitored", "Scripted", "Scaled", "Secured"],
    achievements: [
      "Quantify efficiency gains: 'Created a CI/CD pipeline in Jenkins that reduced software deployment time from 2 hours to 15 minutes.'",
      "Show cost savings: 'Wrote Terraform scripts to manage cloud infrastructure, reducing monthly AWS costs by 20%.'",
      "Mention the scale of your work: 'Managed a Kubernetes cluster with 50+ microservices.'",
      "Highlight specific tools and scripts you built to solve problems."
    ],
    summary: "Focus on your ability to improve development and operational efficiency through automation. Mention key tools (Jenkins, Docker, Kubernetes, Terraform) and scripting languages (Python, Bash) you master."
  }
};
