// imports
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Load the variable from .env file
dotenv.config();

const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const PORT = 3002;

const submissions = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Define a route to test database connection 
app.get('/db-test', async (req, res) => {
    try {
        const [submissions] = await pool.query('SELECT * FROM contacts');
        res.send(submissions);
    } catch (err) {
        console.error('Database error:', err);
    }
});

// Resume page
app.get('/', (req, res) => {
    //res.sendFile(`${import.meta.dirname}/views/home.html`);
    res.render('home');
});

// Contact/guestbook form
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Confirmation page
app.get('/confirm', (req, res) => {
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
    res.render('confirmation');
});

// Admin page
app.get('/admin', async (req, res) => {

    try {
        const [submissions] = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');
        res.render('admin', { submissions });
    } catch (err) {
        console.error('Database error:', err);
    }
    //res.send(submissions);
});

app.post('/submit-request', async (req, res) => {
    const submission = {
        fname: req.body.fname,
        lname: req.body.lname,
        title: req.body.title,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        mailing: req.body.mailing,
        format: req.body.format,
        timestamp: new Date()
    };

    const sql = "INSERT INTO contacts (first_name, last_name, job_title, company, linkedin_url, email, how_met, how_met_other, message, mailing_list, email_format, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // create array of parameters for each placeholder
    const params = [
        submission.fname,
        submission.lname,
        submission.title,
        submission.company,
        submission.linkedin,
        submission.email,
        submission.meet,
        submission.meet === 'other' ? submission.other : null,
        submission.message || null,
        submission.mailing ? 1 : 0,
        submission.mailing ? submission.format : null,
        submission.timestamp
    ];

    try {
        const [result] = await pool.execute(sql, params);

        // Send user to confirmation page
        res.render('confirmation', { submission });

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).send('Error loading orders: ' + err.message);
    }

    // submissions.push(submission);
    // console.log(submissions);

    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});