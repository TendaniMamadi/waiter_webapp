
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
// app.get('/', (req, res) => {
    
//     res.render('index')
// });

app.get('/waiters/:username', (req, res) => {
    // Implement logic to show a screen where waiters can select the days they can work
    // Fetch data from the database and render a template
    res.render('waiter_selection', { username: req.params.username });
});

app.post('/waiters/:username', (req, res) => {
    const selectedDays = req.body.days; // This will be an array of selected days
    console.log(`Waiter ${req.params.username} selected the following days: ${selectedDays}`);
    res.redirect('/waiters/' + req.params.username);
});


app.get('/days', (req, res) => {
    // Implement logic to show which days waiters are available
    // Fetch data from the database and render a template
    res.render('waiter_availability');
});

// // Clear database route (POST)
// app.post('/clear', (req, res) => {
//     res.redirect('/')
// });

//PORT
const PORT = process.env.PORT || 2025;
app.listen(PORT, (req, res) => {
    console.log('We taking off on port:', PORT)
});