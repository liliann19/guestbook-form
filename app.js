import express from 'express';

const app = express();

const PORT = 3002;

const submissions = [];

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/confirm', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});

app.get('/admin', (req, res) => {
    res.send(submissions);
})

app.post('/submit-request', (req, res) => {
    const submission = {
        fname: req.body.fname,
        lname: req.body.lname,
        title: req.body.title,
        company: req.body.company,
        url: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        mailing: req.body.mailing,
        format: req.body.format
    };

    submissions.push(submission);
    console.log(submissions);

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});