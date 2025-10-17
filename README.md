# PlacementPilot

**PlacementPilot** is a career assistant that streamlines the job search process for students and job seekers. It offers resume parsing, personalized job recommendations, skill gap analysis, interview preparation, and resume optimization.

---

## Features

* Intelligent resume parsing
* Smart job matching using real-time job data
* Personalized fit score for each job
* Skill gap analysis
* Learning resources to bridge skill gaps
* Job-specific interview preparation
* Resume optimization feedback

---

## Tech Stack

* **Frontend:** Vue.js, Vuetify
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Job Data API:** Adzuna API
* **Resume Parsing:** pdf2json

---

## Getting Started

### Prerequisites

* Node.js (v14+)
* npm or Yarn
* Git
* MongoDB (local or cloud URI)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/placementpilot.git
cd placementpilot
```

2. **Install dependencies**

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_api_key
YOUTUBE_API_KEY=your_api_key
PORT=5000
```

### Running the Application

```bash
# Backend
cd backend
npm start

# Frontend
cd ../frontend
npm run serve
```

Access the app at: `http://localhost:8080`

Note: For more dynamic behaviour you can integrate gemini API.

---


---



---



---


