
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
//import routes from './Routes/routes.js'
//import factory_functions from './factory function/web_App.js'
//import db_queries from './database/db_queries.js';


const app = express();
const connectionString = process.env.DATABASE_URL
const pgp = pgPromise({});
const db = pgp(connectionString);

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


// // Index route
// app.get('/', routeInstance.homeRoute);

// //waiter select days route
// app.get('/waiters/:username',routeInstance.chooseDaysRoute)

// //Send the days the waiter can work to the server.
// app.post('/waiters/:username', routeInstance.insertRoute);

// // show admin days available
// app.get('/days',routeInstance.availableDaysRoute);

// // Clear database route (POST)
// app.post('/clear',routeInstance.clearingRoute);

//PORT
const PORT = process.env.PORT || 2023;
app.listen(PORT, (req, res) => {
    console.log('We taking off on port:', PORT)
});