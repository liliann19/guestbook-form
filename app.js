import express from 'express';

const app = express();

const PORT = 3002;

const submissions = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

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
app.get('/admin', (req, res) => {
    //res.send(submissions);
    res.render('admin', { submissions });
});

app.post('/submit-request', (req, res) => {
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
        timestamp: new Date().toLocaleString()
    };

    submissions.push(submission);
    console.log(submissions);

    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
    res.render('confirmation', { submission });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});