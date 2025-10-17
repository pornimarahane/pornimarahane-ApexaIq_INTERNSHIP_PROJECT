/**
 * @fileoverview Mock data for interview questions.
 * This file separates the data from the application logic for better maintainability.
 */

// Common questions that are the same for all job roles.
const Behavioural = {
  behavioural: [
    'Describe a time you solved a challenging problem.',
    'How do you handle conflicts within a team?',
    'Tell me about a project you are particularly proud of and why.',
    'Describe how you prioritize tasks when you have multiple deadlines.',
    'How do you handle last-minute changes to project requirements?',
    'How do you ensure the quality and accuracy of your work?',
    'Describe a situation where a project you were on failed. What did you learn?'
  ]}

  const hr = {
  hr: [
    'Why are you interested in working for our company?',
    'Where do you see yourself professionally in the next 3-5 years?',
    'What motivates you to do your best work?',
    'What do you consider your greatest professional strength and weakness?',
    'How do you handle working under pressure or with tight deadlines?',
    'Describe your biggest professional achievement.'
  ]
};

// Technical questions specific to each job role.
const technicalQuestions = {
  'Web Developer': [
    'Explain the difference between HTML and XHTML.',
    'What are closures in JavaScript, and why are they useful?',
    'How do you optimize a website for better performance?',
    'Explain the box model in CSS.',
    'What is the difference between `let`, `const`, and `var` in JavaScript?',
    'Describe the concept of the event loop in JavaScript.',
    'What is prototypal inheritance and how does it differ from classical inheritance?',
    'Explain the difference between Promises and async/await for handling asynchronous operations.',
    'What is the significance of the `this` keyword in JavaScript and how its value is determined?',
    'What are some key principles of web accessibility (WCAG)?'
  ],
  'Full Stack Developer': [
    'Explain what a REST API is and its main advantages.',
    'What is the difference between SQL and NoSQL databases? Provide an example of when you would use each.',
    'How do you handle state management in a front-end framework like React or Vue?',
    'What is Cross-Origin Resource Sharing (CORS), and how do you resolve it?',
    'Describe the concept of middleware in a Node.js/Express application.',
    'How would you implement JWT-based authentication in a full-stack application?',
    'Compare and contrast microservices architecture with a monolithic architecture.',
    'What is containerization, and why is Docker a popular choice for it?',
    'Explain the purpose of a CI/CD pipeline.',
    'What are WebSockets and when would you use them over standard HTTP requests?'
  ],
  'Automation Engineer': [
    'Explain the architecture of Selenium WebDriver.',
    'What are the different levels of software testing?',
    'How would you design an automation framework from scratch?',
    'What is the difference between BDD (Behavior-Driven Development) and TDD (Test-Driven Development)?',
    'Explain the Page Object Model (POM) design pattern and its benefits.',
    'How do you handle dynamic web elements that change their attributes?',
    'Describe your strategy for API test automation.',
    'What techniques do you use for managing test data effectively?',
    'How can you achieve parallel test execution in your automation suite?',
    'What is the difference between implicit and explicit waits in Selenium?'
  ],
  'Data Analyst': [
    'Explain the different types of SQL JOINs with examples.',
    'How do you handle missing data or outliers in a dataset?',
    'What is normalization in a database, and why is it important?',
    'Describe a challenging dataset you have worked with and what insights you derived from it.',
    'Explain the difference between supervised and unsupervised machine learning.',
    'What are SQL window functions and provide a practical use case?',
    'Describe the ETL (Extract, Transform, Load) process.',
    'You are asked to run an A/B test. What are the key steps you would follow?',
    'What is the purpose of a p-value in statistical analysis?',
    'How would you use Python libraries like Pandas and NumPy for data cleaning and manipulation?'
  ],
  'Software Tester': [
    'What is the difference between the Software Development Life Cycle (SDLC) and Software Testing Life Cycle (STLC)?',
    'Explain the Defect Life Cycle (or Bug Life Cycle).',
    'What is the difference between a test plan and a test strategy?',
    'Compare and contrast black-box testing and white-box testing.',
    'What are smoke testing and sanity testing? When are they performed?',
    'Explain the concepts of regression testing and retesting.',
    'How would you write a good bug report?',
    'Describe exploratory testing and when it is most useful.',
    'What is API testing and what are some common tools you might use?',
    'Write a basic SQL query to verify that data submitted through a UI has been correctly saved to a database table.'
  ]
};

module.exports = {
  commonQuestions: {
    behavioural: Behavioural.behavioural,
    hr: hr.hr
  },
  technicalQuestions
};

