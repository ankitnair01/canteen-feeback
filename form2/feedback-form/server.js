const express = require('express');
const mysql = require('mysql2'); // Changed from 'mysql' to 'mysql2'
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Parse application/json
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index1.html')); // Added this route
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'feedbackuser',
    password: 'yourpassword',
    database: 'catering_feedback_db'
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Handle form submission
app.post('/submit-feedback', (req, res) => {
    const feedback = {
        guestName: req.body.guestName,
        department: req.body.department,
        date: req.body.date,
        seatNo: req.body.seatNo,
        teaMorning: req.body.teaMorning,
        teaQuality: req.body.teaQuality,
        teaEvening: req.body.teaEvening,
        lunchQuality: req.body.lunchQuality,
        snacksOnTime: req.body.snacksOnTime,
        snacksQuality: req.body.snacksQuality,
        mrpItems: req.body.mrpItems,
        serviceQuality: req.body.serviceQuality,
        staffEfficiency: req.body.staffEfficiency,
        cateringQuality: req.body.cateringQuality,
        serviceRating: req.body.serviceRating,
        comments: req.body.comments,
    };

    // Insert feedback into the database
    db.query('INSERT INTO feedbacks SET ?', feedback, (err, result) => {
        if (err) {
            console.error('Failed to insert feedback:', err);
            res.status(500).send('Failed to submit feedback');
        } else {
            console.log('Feedback submitted:', result);
            res.send('Thank you for your feedback!');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

