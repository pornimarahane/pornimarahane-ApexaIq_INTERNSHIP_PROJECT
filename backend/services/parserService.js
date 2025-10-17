const PDFParser = require("pdf2json");

// Skills to look for throughout the resume
const SKILL_KEYWORDS = [
    'javascript', 'react', 'vue', 'node.js', 'express', 'mongodb',
    'python', 'java', 'c++', 'sql', 'html', 'css', 'aws', 'docker',
    'typescript', 'angular', 'api', 'rest', 'graphql', 'git', 'qa', 'selenium'
];


const EXPERIENCE_HEADERS = ['experience', 'work experience', 'professional experience', 'employment history'];

const OTHER_SECTION_HEADERS = ['education', 'skills', 'projects', 'technical skills', 'contact', 'awards', 'certifications'];
const ALL_HEADERS = [...EXPERIENCE_HEADERS, ...OTHER_SECTION_HEADERS];

const extractSection = (originalLines, lowerCaseLines, sectionStartKeywords) => {
    let sectionStartIndex = -1;
    for (const keyword of sectionStartKeywords) {
        const index = lowerCaseLines.findIndex(line => line === keyword);
        if (index !== -1) {
            sectionStartIndex = index;
            break;
        }
    }
    if (sectionStartIndex === -1) return null;

    let sectionEndIndex = originalLines.length;
    for (let i = sectionStartIndex + 1; i < lowerCaseLines.length; i++) {
        if (ALL_HEADERS.includes(lowerCaseLines[i])) {
            sectionEndIndex = i;
            break;
        }
    }
    const sectionLines = originalLines.slice(sectionStartIndex + 1, sectionEndIndex);
    return sectionLines.join('\n').trim();
};

const parseResume = (filePath) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);

        pdfParser.on("pdfParser_dataReady", () => {
            try {
                const rawText = pdfParser.getRawTextContent();
                const lowerCaseText = rawText.toLowerCase();
                
                const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                const emails = lowerCaseText.match(emailRegex);
                const email = emails ? emails[0] : null;
                
                const skills = SKILL_KEYWORDS.filter(skill => lowerCaseText.includes(skill.toLowerCase()));

                const allLines = rawText.split('\n');
                const lowerCaseLines = allLines.map(line => line.trim().toLowerCase());
                const experience = extractSection(allLines, lowerCaseLines, EXPERIENCE_HEADERS);

                resolve({
                    email,
                    skills: [...new Set(skills)], 
                    experience: experience ?? 0,
                });
            } catch (error) {
                reject(error);
            }
        });
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.loadPDF(filePath);
    });
};

module.exports = { parseResume };