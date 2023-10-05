
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
//import route from './services/web_App.js';
import frontEnd from './services/web_App.js'
//import db_queries from './database/db_queries.js';


const app = express();
const connectionString = process.env.DATABASE_URL
const pgp = pgPromise({});
const db = pgp(connectionString);
const frontendInstance = frontEnd();
//const backendInstance = db_queries(db)
//const routeInstance = route();

app.engine('handlebars', engine({
    layoutsDir: './views/layouts'
}));
app.use(session({
    secret: "waiters_WebApp",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


// Index route
app.get('/', (req, res) => {
    res.render('index')
});

// Define a simple in-memory database of users (for demonstration purposes)
const correctUsername = "Tendani";
const correctPassword = "1234";

//waiter select days route
app.get('/waiters/:username', (req, res) => {
    const { username, password } = req.body;
    // Check if the provided username and password match any user in the database
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        // Authentication successful, proceed to the next page
        res.send('Authentication successful. Welcome to the next page!');
    } else {
        // Authentication failed, render the login page with an error message
        res.render('login', { error: 'Invalid username or password' });
    }
})

//Send the days the waiter can work to the server.
app.post('/waiters/:username', (req, res) => {

    const { username, password } = req.body;

    if (username === correctUsername && password === correctPassword) {
        // Redirect to the next page or perform the desired action
        res.redirect('/selectDays');
    } else {
        // Display an error message
        res.send("Invalid username or password. Please try again.");
    }

});

// show admin days available
// app.get('/days', (req, res) => {
//     res.send("<h1>Welcome to the Next Page</h1>");

// });

// // Clear database route (POST)
// app.post('/clear', (req, res) => {
//     res.redirect('/')
// });

//PORT
const PORT = process.env.PORT || 2023;
app.listen(PORT, (req, res) => {
    console.log('We taking off on port:', PORT)
});