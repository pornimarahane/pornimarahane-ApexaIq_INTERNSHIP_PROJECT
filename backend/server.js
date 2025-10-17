const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');


const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const skillRoutes = require('./routes/skillRoutes');
const authRoutes = require('./routes/authRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const interviewRoutes = require('./routes/interview');
const resumeRoutes = require('./routes/resumeRoutes');



// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/auth', authRoutes); // 2. USE the new auth routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);




app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});