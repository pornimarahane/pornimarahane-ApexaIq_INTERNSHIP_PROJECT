const mockAssessments = {
  javascript: [
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function having access to the parent scope, even after the parent function has closed.",
        "A way to lock a variable's value.",
        "A built-in method for arrays.",
        "A type of loop.",
      ],
      correctAnswer:
        "A function having access to the parent scope, even after the parent function has closed.",
    },
    {
      question: "What is the difference between `==` and `===`?",
      options: [
        "They are identical.",
        "`==` compares for value equality only, while `===` compares for both value and type.",
        "`===` is used for assignments, `==` for comparison.",
        "`==` is the modern syntax for `===`.",
      ],
      correctAnswer:
        "`==` compares for value equality only, while `===` compares for both value and type.",
    },
    {
      question: "What does the `this` keyword refer to?",
      options: [
        "It always refers to the global window object.",
        "It refers to the object from which the function was called.",
        "It refers to the function itself.",
        "It is used to declare a new variable.",
      ],
      correctAnswer:
        "It refers to the object from which the function was called.",
    },
    {
      question: "What is a Promise?",
      options: [
        "A guarantee that a function will execute.",
        "An object representing the eventual completion or failure of an asynchronous operation.",
        "A callback function.",
        "A syntax for creating classes.",
      ],
      correctAnswer:
        "An object representing the eventual completion or failure of an asynchronous operation.",
    },
    {
      question: "What is the purpose of `Array.prototype.map()`?",
      options: [
        "To filter an array based on a condition.",
        "To create a new array with the results of calling a provided function on every element.",
        "To check if at least one element in the array passes a test.",
        "To execute a function for each array element.",
      ],
      correctAnswer:
        "To create a new array with the results of calling a provided function on every element.",
    },
    {
      question: "What does `event bubbling` mean?",
      options: [
        "An event triggering from the top element down to the target.",
        "An event triggering from the target element up to the root.",
        "A memory leak in an event listener.",
        "The process of creating custom events.",
      ],
      correctAnswer:
        "An event triggering from the target element up to the root.",
    },
    {
      question: "How do you declare a constant variable?",
      options: ["`let myConst = 10;`", "`var myConst = 10;`", "`const myConst = 10;`", "`static myConst = 10;`"],
      correctAnswer: "`const myConst = 10;`",
    },
    {
      question: "What is the output of `typeof null`?",
      options: ["'null'", "'undefined'", "'object'", "'string'"],
      correctAnswer: "'object'",
    },
    {
      question: "What is JSX?",
      options: ["A JavaScript templating engine.", "A syntax extension for JavaScript, often used with React.", "A version of JavaScript.", "A database query language."],
      correctAnswer: "A syntax extension for JavaScript, often used with React.",
    },
    {
      question: "What is the main purpose of a `try...catch` block?",
      options: ["To create loops.", "To define functions.", "To handle errors gracefully without crashing the application.", "To declare variables."],
      correctAnswer: "To handle errors gracefully without crashing the application.",
    },
  ],
  react: [
    {
      question: "What is JSX?",
      options: [
        "A syntax extension for JavaScript.",
        "A templating engine.",
        "A state management library.",
        "A CSS preprocessor.",
      ],
      correctAnswer: "A syntax extension for JavaScript.",
    },
    {
      question: "What is a React Component?",
      options: [
        "A CSS class.",
        "A function that returns a promise.",
        "A reusable piece of UI that can have its own logic and appearance.",
        "A global variable.",
      ],
      correctAnswer: "A reusable piece of UI that can have its own logic and appearance.",
    },
    {
      question: "What is the purpose of `useState` in React?",
      options: [
        "To fetch data from an API.",
        "To add state to a functional component.",
        "To create a new component.",
        "To handle routing.",
      ],
      correctAnswer: "To add state to a functional component.",
    },
    {
      question: "What are 'props' in React?",
      options: [
        "Internal state of a component.",
        "A way to pass data from a parent component to a child component.",
        "A built-in method to style components.",
        "A tool for debugging.",
      ],
      correctAnswer: "A way to pass data from a parent component to a child component.",
    },
    {
      question: "What is the virtual DOM?",
      options: [
        "The browser's DOM.",
        "A direct copy of the real DOM.",
        "A lightweight in-memory representation of the real DOM.",
        "A styling system for React.",
      ],
      correctAnswer: "A lightweight in-memory representation of the real DOM.",
    },
    {
      question: "What is a React Hook?",
      options: ["A special function that lets you 'hook into' React features.", "A type of component.", "A way to handle events.", "A lifecycle method."],
      correctAnswer: "A special function that lets you 'hook into' React features.",
    },
    {
      question: "How do you handle events in React?",
      options: ["Using `addEventListener`", "Using camelCase event handlers like `onClick`", "Using `attachEvent`", "Using inline JavaScript"],
      correctAnswer: "Using camelCase event handlers like `onClick`",
    },
    {
      question: "What is the purpose of `useEffect`?",
      options: ["To manage component state.", "To perform side effects in functional components.", "To pass props to children.", "To define the component's structure."],
      correctAnswer: "To perform side effects in functional components.",
    },
    {
      question: "What does `lifting state up` mean?",
      options: ["Moving state to a higher-level component.", "Storing state in local storage.", "Using a global state manager.", "Deleting state."],
      correctAnswer: "Moving state to a higher-level component.",
    },
    {
      question: "What is conditional rendering?",
      options: ["Rendering a component based on a condition.", "Using CSS to show or hide elements.", "A way to loop through data.", "The initial render of a component."],
      correctAnswer: "Rendering a component based on a condition.",
    },
  ],
  css: [
    {
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      correctAnswer: "Cascading Style Sheets",
    },
    {
      question: "What is the CSS `box-sizing: border-box` property used for?",
      options: [
        "To add a border around an element.",
        "To include padding and border in the element's total width and height.",
        "To create a 3D box effect.",
        "To align items in a box.",
      ],
      correctAnswer: "To include padding and border in the element's total width and height.",
    },
    {
      question: "What is a pseudo-class in CSS?",
      options: [
        "A class that does not exist.",
        "A keyword added to a selector that specifies a special state of the selected element(s).",
        "A class for styling pseudo-elements.",
        "A CSS class with a typo.",
      ],
      correctAnswer: "A keyword added to a selector that specifies a special state of the selected element(s).",
    },
    {
      question: "What is the difference between `display: none` and `visibility: hidden`?",
      options: [
        "They are the same.",
        "`display: none` removes the element from the layout, while `visibility: hidden` only hides it.",
        "`visibility: hidden` removes the element from the layout.",
        "`display: none` only works on block elements.",
      ],
      correctAnswer: "`display: none` removes the element from the layout, while `visibility: hidden` only hides it.",
    },
    {
      question: "What is Flexbox?",
      options: [
        "A CSS preprocessor.",
        "A one-dimensional layout model for arranging items in rows or columns.",
        "A JavaScript library for animations.",
        "A tool for creating responsive images.",
      ],
      correctAnswer: "A one-dimensional layout model for arranging items in rows or columns.",
    },
    {
      question: "What is the `z-index` property used for?",
      options: ["To set the zoom level.", "To specify the stack order of an element.", "To define the size of an element.", "To add a shadow effect."],
      correctAnswer: "To specify the stack order of an element.",
    },
    {
      question: "What is a media query?",
      options: ["A query to a database.", "A way to apply CSS styles based on device characteristics like width, height, or orientation.", "A JavaScript function.", "A type of CSS selector."],
      correctAnswer: "A way to apply CSS styles based on device characteristics like width, height, or orientation.",
    },
    {
      question: "What is the `rem` unit in CSS?",
      options: ["A unit relative to the root element's font size.", "A fixed pixel unit.", "A unit relative to the parent element's font size.", "A percentage unit."],
      correctAnswer: "A unit relative to the root element's font size.",
    },
    {
      question: "What is specificity in CSS?",
      options: ["The speed of a CSS animation.", "The algorithm used by browsers to determine which CSS rule applies if multiple rules conflict.", "A CSS validator.", "A way to name classes."],
      correctAnswer: "The algorithm used by browsers to determine which CSS rule applies if multiple rules conflict.",
    },
    {
      question: "How do you center a block element horizontally?",
      options: ["`text-align: center;`", "`align: center;`", "`margin: 0 auto;`", "`position: center;`"],
      correctAnswer: "`margin: 0 auto;`",
    },
  ],
  'data analysis': [
    {
      question: "What is the primary purpose of data cleaning?",
      options: ["To visualize data", "To collect data", "To remove errors and inconsistencies", "To build models"],
      correctAnswer: "To remove errors and inconsistencies",
    },
    {
      question: "Which of the following is a measure of central tendency?",
      options: ["Standard Deviation", "Range", "Variance", "Mean"],
      correctAnswer: "Mean",
    },
    {
      question: "What does a p-value represent in hypothesis testing?",
      options: ["The probability of the null hypothesis being true", "The probability of observing the data if the null hypothesis is true", "The effect size", "The sample size"],
      correctAnswer: "The probability of observing the data if the null hypothesis is true",
    },
    {
      question: "Which chart is best for showing the relationship between two continuous variables?",
      options: ["Bar Chart", "Pie Chart", "Scatter Plot", "Histogram"],
      correctAnswer: "Scatter Plot",
    },
    {
      question: "What is overfitting in machine learning?",
      options: ["A model that performs well on new, unseen data", "A model that is too simple", "A model that performs well on training data but poorly on new data", "A model with high bias"],
      correctAnswer: "A model that performs well on training data but poorly on new data",
    },
    {
      question: "Which of these is NOT a type of data?",
      options: ["Nominal", "Ordinal", "Interval", "Abstract"],
      correctAnswer: "Abstract",
    },
    {
      question: "What is the main goal of exploratory data analysis (EDA)?",
      options: ["To prove a hypothesis", "To summarize the main characteristics of a dataset", "To deploy a model", "To clean the data"],
      correctAnswer: "To summarize the main characteristics of a dataset",
    },
    {
      question: "What is A/B testing used for?",
      options: ["To compare two versions of something to see which performs better", "To test the database connection", "To analyze historical data", "To create a predictive model"],
      correctAnswer: "To compare two versions of something to see which performs better",
    },
    {
      question: "What does SQL stand for?",
      options: ["Strong Question Language", "Structured Query Language", "Simple Query Logic", "Standard Question Logic"],
      correctAnswer: "Structured Query Language",
    },
    {
      question: "Which Python library is most commonly used for data manipulation and analysis?",
      options: ["NumPy", "Matplotlib", "Scikit-learn", "Pandas"],
      correctAnswer: "Pandas",
    },
  ],
  mysql: [
    {
      question: "Which SQL keyword is used to retrieve data from a database?",
      options: ["GET", "RETRIEVE", "SELECT", "OPEN"],
      correctAnswer: "SELECT",
    },
    {
      question: "What is the difference between DELETE and TRUNCATE in MySQL?",
      options: ["They are the same", "DELETE is faster", "TRUNCATE removes all rows and resets identity", "DELETE is not a valid command"],
      correctAnswer: "TRUNCATE removes all rows and resets identity",
    },
    {
      question: "Which clause is used to filter results in a SELECT statement?",
      options: ["FILTER", "WHERE", "HAVING", "CONDITION"],
      correctAnswer: "WHERE",
    },
    {
      question: "What is a PRIMARY KEY?",
      options: ["A key that is used for foreign relationships", "A unique identifier for a record in a table", "A key that can be null", "An index for faster queries"],
      correctAnswer: "A unique identifier for a record in a table",
    },
    {
      question: "Which type of JOIN returns all records from the left table, and the matched records from the right table?",
      options: ["INNER JOIN", "RIGHT JOIN", "FULL JOIN", "LEFT JOIN"],
      correctAnswer: "LEFT JOIN",
    },
    {
      question: "What command is used to add a new column to an existing table?",
      options: ["ADD COLUMN", "MODIFY TABLE", "ALTER TABLE", "NEW COLUMN"],
      correctAnswer: "ALTER TABLE",
    },
    {
      question: "Which function is used to count the number of rows in a result set?",
      options: ["COUNT()", "SUM()", "TOTAL()", "NUMBER()"],
      correctAnswer: "COUNT()",
    },
    {
      question: "What does 'DDL' stand for in the context of SQL?",
      options: ["Data Definition Language", "Data Distribution Logic", "Data Deletion Language", "Direct Data Link"],
      correctAnswer: "Data Definition Language",
    },
    {
      question: "How do you sort the results in descending order?",
      options: ["ORDER BY ... DESC", "SORT BY ... DESC", "ORDER BY ... DESCENDING", "GROUP BY ... DESC"],
      correctAnswer: "ORDER BY ... DESC",
    },
    {
      question: "What is the purpose of an index in a database?",
      options: ["To enforce uniqueness", "To store data", "To speed up the performance of queries", "To create relationships between tables"],
      correctAnswer: "To speed up the performance of queries",
    },
  ],
  go: [
    {
      question: "How do you declare a variable in Go?",
      options: ["`let name = \"Go\"`", "`var name string = \"Go\"`", "`string name = \"Go\"`", "`name := \"Go\"`"],
      correctAnswer: "`name := \"Go\"`",
    },
    {
      question: "What is a Goroutine?",
      options: ["A type of variable", "A function that runs in the background", "A lightweight thread managed by the Go runtime", "A data structure"],
      correctAnswer: "A lightweight thread managed by the Go runtime",
    },
    {
      question: "Which keyword is used to execute a function concurrently?",
      options: ["`async`", "`concurrent`", "`go`", "`thread`"],
      correctAnswer: "`go`",
    },
    {
      question: "What is the purpose of a channel in Go?",
      options: ["To format strings", "To handle errors", "To communicate between goroutines", "To read files"],
      correctAnswer: "To communicate between goroutines",
    },
    {
      question: "In Go, what does `defer` do?",
      options: ["It stops the execution of a function", "It schedules a function call to be run after the surrounding function completes", "It defines a default value", "It runs a function immediately"],
      correctAnswer: "It schedules a function call to be run after the surrounding function completes",
    },
    {
      question: "How are errors typically handled in Go?",
      options: ["Using try-catch blocks", "By returning an error value as the last return value", "Using assertions", "By ignoring them"],
      correctAnswer: "By returning an error value as the last return value",
    },
    {
      question: "What is the entry point of a Go program?",
      options: ["`func start()`", "`func main()`", "`func init()`", "`func run()`"],
      correctAnswer: "`func main()`",
    },
    {
      question: "What is a 'slice' in Go?",
      options: ["A fixed-size array", "A pointer to an array segment", "A key-value map", "A string data type"],
      correctAnswer: "A pointer to an array segment",
    },
    {
      question: "How do you define a struct in Go?",
      options: ["`class Person {}`", "`interface Person {}`", "`type Person struct {}`", "`object Person {}`"],
      correctAnswer: "`type Person struct {}`",
    },
    {
      question: "What does `GOPATH` environment variable specify?",
      options: ["The location of the Go compiler", "The root of your workspace", "The path to the standard library", "The project's output directory"],
      correctAnswer: "The root of your workspace",
    },
  ],
  api: [
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Program Interaction", "Application Process Integration", "Automated Programming Interface"],
      correctAnswer: "Application Programming Interface",
    },
    {
      question: "Which HTTP method is typically used to retrieve data from a server?",
      options: ["POST", "GET", "PUT", "DELETE"],
      correctAnswer: "GET",
    },
    {
      question: "What does a `404 Not Found` status code indicate?",
      options: ["The request was successful", "The server is down", "The requested resource could not be found", "The client is not authenticated"],
      correctAnswer: "The requested resource could not be found",
    },
    {
      question: "What is REST?",
      options: ["A programming language", "A database", "An architectural style for designing networked applications", "A data format"],
      correctAnswer: "An architectural style for designing networked applications",
    },
    {
      question: "Which data format is most commonly used in modern web APIs?",
      options: ["XML", "HTML", "CSV", "JSON"],
      correctAnswer: "JSON",
    },
    {
      question: "What is the purpose of an API key?",
      options: ["To encrypt data", "To identify and authenticate the calling application", "To specify the data format", "To define the API endpoint"],
      correctAnswer: "To identify and authenticate the calling application",
    },
    {
      question: "Which HTTP method is idempotent and used to create or replace a resource?",
      options: ["POST", "GET", "PUT", "PATCH"],
      correctAnswer: "PUT",
    },
    {
      question: "What is a webhook?",
      options: ["A way for an app to provide other applications with real-time information", "A security token", "A type of API endpoint", "A method for client-side polling"],
      correctAnswer: "A way for an app to provide other applications with real-time information",
    },
    {
      question: "What does 'CRUD' stand for in the context of APIs?",
      options: ["Create, Read, Update, Delete", "Connect, Run, Undo, Deploy", "Create, Run, Utilize, Debug", "Connect, Read, Update, Deploy"],
      correctAnswer: "Create, Read, Update, Delete",
    },
    {
      question: "Which HTTP status code indicates a successful request?",
      options: ["400", "500", "301", "200"],
      correctAnswer: "200",
    },
  ],
  selenium: [
    {
      question: "What is Selenium primarily used for?",
      options: ["Database management", "Automating web browsers", "API testing", "Unit testing backend code"],
      correctAnswer: "Automating web browsers",
    },
    {
      question: "Which component of Selenium is used to run tests on different machines against different browsers in parallel?",
      options: ["Selenium IDE", "Selenium WebDriver", "Selenium Grid", "Selenium RC"],
      correctAnswer: "Selenium Grid",
    },
    {
      question: "What is a 'locator' in Selenium?",
      options: ["A command to find an element on a web page", "A browser setting", "A test report file", "A type of assertion"],
      correctAnswer: "A command to find an element on a web page",
    },
    {
      question: "Which of the following is NOT a valid locator strategy in WebDriver?",
      options: ["By.ID", "By.Name", "By.LinkText", "By.Color"],
      correctAnswer: "By.Color",
    },
    {
      question: "What is the difference between `driver.get()` and `driver.navigate().to()`?",
      options: ["`get()` is faster", "`Maps().to()` allows browser history navigation", "There is no difference", "`get()` is for local files only"],
      correctAnswer: "`Maps().to()` allows browser history navigation",
    },
    {
      question: "What is an 'implicit wait' in Selenium?",
      options: ["A wait for a specific condition to be met", "A command to pause the test for a fixed time", "A default waiting time for elements to be found", "A wait for a page to load completely"],
      correctAnswer: "A default waiting time for elements to be found",
    },
    {
      question: "How do you handle pop-up alerts in Selenium?",
      options: ["`driver.switchTo().alert()`", "`driver.handle.popup()`", "`driver.getAlert()`", "`driver.find.alert()`"],
      correctAnswer: "`driver.switchTo().alert()`",
    },
    {
      question: "What is the purpose of the Page Object Model (POM)?",
      options: ["To make tests run faster", "To create a repository for UI elements, making tests cleaner and easier to maintain", "To handle test data", "To generate test reports"],
      correctAnswer: "To create a repository for UI elements, making tests cleaner and easier to maintain",
    },
    {
      question: "Which method is used to type text into an input field?",
      options: ["`type()`", "`inputText()`", "`sendKeys()`", "`fillText()`"],
      correctAnswer: "`sendKeys()`",
    },
    {
      question: "What is Selenium IDE?",
      options: ["A programming library", "A command-line tool", "A record-and-playback tool for authoring tests", "A test execution server"],
      correctAnswer: "A record-and-playback tool for authoring tests",
    },
  ],
  agile: [
    {
      question: "What is a key principle of the Agile Manifesto?",
      options: ["Comprehensive documentation over working software", "Following a plan over responding to change", "Individuals and interactions over processes and tools", "Contract negotiation over customer collaboration"],
      correctAnswer: "Individuals and interactions over processes and tools",
    },
    {
      question: "What is a 'sprint' in Scrum?",
      options: ["A quick meeting to discuss progress", "A feature to be developed", "A time-boxed period during which a 'Done' increment of product is created", "A document outlining project requirements"],
      correctAnswer: "A time-boxed period during which a 'Done' increment of product is created",
    },
    {
      question: "Who is responsible for prioritizing the product backlog?",
      options: ["The Scrum Master", "The Development Team", "The Product Owner", "The Stakeholders"],
      correctAnswer: "The Product Owner",
    },
    {
      question: "What is the purpose of the Daily Scrum (or stand-up)?",
      options: ["To provide a status report to management", "To plan the work for the next 24 hours", "To solve complex technical problems", "To demo completed work"],
      correctAnswer: "To plan the work for the next 24 hours",
    },
    {
      question: "What is 'velocity' in an Agile context?",
      options: ["The speed at which the team codes", "A measure of the amount of work a team can tackle during a single sprint", "The number of bugs fixed per sprint", "The total project duration"],
      correctAnswer: "A measure of the amount of work a team can tackle during a single sprint",
    },
    {
      question: "What is a user story?",
      options: ["A detailed technical specification", "A bug report", "A short, simple description of a feature told from the perspective of the person who desires it", "A contract with the customer"],
      correctAnswer: "A short, simple description of a feature told from the perspective of the person who desires it",
    },
    {
      question: "What is a Sprint Retrospective?",
      options: ["A meeting to plan the next sprint", "A demo of the work completed", "An opportunity for the Scrum Team to inspect itself and create a plan for improvements", "A meeting to prioritize the backlog"],
      correctAnswer: "An opportunity for the Scrum Team to inspect itself and create a plan for improvements",
    },
    {
      question: "Which of these is NOT a core Scrum role?",
      options: ["Product Owner", "Project Manager", "Scrum Master", "Development Team"],
      correctAnswer: "Project Manager",
    },
    {
      question: "What is a Kanban board used for?",
      options: ["To visualize the workflow", "To write user stories", "To track team velocity", "To document requirements"],
      correctAnswer: "To visualize the workflow",
    },
    {
      question: "What does 'WIP' limit mean in Kanban?",
      options: ["The maximum number of items in a single column at any one time", "The project's budget limit", "The total number of tasks in the backlog", "The time limit for a single task"],
      correctAnswer: "The maximum number of items in a single column at any one time",
    },
  ],
  qa: [
    {
      question: "What is the primary goal of Quality Assurance (QA)?",
      options: ["To find all bugs in the software", "To ensure the software meets specified requirements and quality standards", "To write automated tests", "To manage the development team"],
      correctAnswer: "To ensure the software meets specified requirements and quality standards",
    },
    {
      question: "What is the difference between verification and validation?",
      options: ["There is no difference", "Verification is 'Are we building the product right?'; Validation is 'Are we building the right product?'", "Verification is testing; Validation is code review", "Verification is done by developers; Validation by QA"],
      correctAnswer: "Verification is 'Are we building the product right?'; Validation is 'Are we building the right product?'",
    },
    {
      question: "Which of the following is a type of non-functional testing?",
      options: ["Unit Testing", "Integration Testing", "Performance Testing", "System Testing"],
      correctAnswer: "Performance Testing",
    },
    {
      question: "What is a test case?",
      options: ["A document describing the scope of testing", "A set of conditions under which a tester will determine if a feature is working correctly", "A bug report", "The code written for an automated test"],
      correctAnswer: "A set of conditions under which a tester will determine if a feature is working correctly",
    },
    {
      question: "What is regression testing?",
      options: ["Testing a new feature for the first time", "Retesting a specific bug fix", "Testing to ensure that new code changes have not broken existing functionality", "Testing the user interface"],
      correctAnswer: "Testing to ensure that new code changes have not broken existing functionality",
    },
    {
      question: "What is black-box testing?",
      options: ["Testing where the internal structure of the code is known", "Testing without knowledge of the internal workings of the application", "Testing performed by developers", "Testing individual code modules"],
      correctAnswer: "Testing without knowledge of the internal workings of the application",
    },
    {
      question: "What is the purpose of a bug report?",
      options: ["To assign blame for a defect", "To provide developers with enough information to reproduce and fix a defect", "To track test case execution", "To list all features of the application"],
      correctAnswer: "To provide developers with enough information to reproduce and fix a defect",
    },
    {
      question: "What is smoke testing?",
      options: ["A type of in-depth performance testing", "A quick test to ensure the most crucial functions of a program work", "Testing done at the end of a project", "Testing a specific component in isolation"],
      correctAnswer: "A quick test to ensure the most crucial functions of a program work",
    },
    {
      question: "What is the Software Testing Life Cycle (STLC)?",
      options: ["The process of developing software", "A sequence of specific activities conducted during the testing process", "The Agile development methodology", "A tool for automating tests"],
      correctAnswer: "A sequence of specific activities conducted during the testing process",
    },
    {
      question: "What is usability testing?",
      options: ["Testing the application's performance under load", "Testing the security of the application", "Testing to see how user-friendly the application is", "Testing the database connections"],
      correctAnswer: "Testing to see how user-friendly the application is",
    },
  ],
};

module.exports = { mockAssessments };

