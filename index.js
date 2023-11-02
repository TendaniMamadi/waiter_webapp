
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import route from './routes/routes.js';
import frontEnd from './services/web_App.js'
import db_queries from './services/db_queries.js';


const app = express();
const connectionString = process.env.DATABASE_URL
const pgp = pgPromise({});
const db = pgp(connectionString);
const frontendInstance = frontEnd();
const backendInstance = db_queries(db)
const routeInstance = route(frontendInstance,backendInstance);

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


//Routes
app.get('/', routeInstance.homeRoute);
app.post('/', routeInstance.authenticateUser);
app.post('/signup',routeInstance.register)
app.get('/signup',routeInstance.signUp)
app.get('/waiters/:username',routeInstance.checkAuth,routeInstance.showDays);
app.post('/waiters/:username',routeInstance.submitDays);
app.get('/days',routeInstance.checkAuth,routeInstance.admin);
app.post('/days',routeInstance.clearingRoute);
app.get('/logout',routeInstance.endSession);

  

//PORT
const PORT = process.env.PORT || 2023;
app.listen(PORT, (req, res) => {
    console.log('We taking off on port:', PORT)
});