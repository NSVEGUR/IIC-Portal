import config from './config';
import path from 'path';
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction, Express } from 'express';
import passport from 'passport';
import morgan from 'morgan';
import helmet from 'helmet';
import methodOverride from 'method-override';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import session from 'express-session';
import xss from 'xss-clean';
import hpp from 'hpp';
import expressLayouts from 'express-ejs-layouts';
const MongoStore = require('connect-mongo')(session);
import AppError from './util/appError.util';
import errorHandler from './controller/error.controller';
import ejsLocals from './util/ejs';
import authRouter from './routes/auth.route';
import indexRouter from './routes/index.route';
import storyRouter from './routes/story.route';


//Configuring passport
require('./config/passport.config')(passport);

const app: Express = express();

app.use(helmet());


if (config.NODE_ENV == 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Method override
app.use(
	methodOverride(function (req: Request, res: Response) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			let method = req.body._method
			delete req.body._method
			return method
		}
	})
)

//Data Sanitisation against NoSQL query injection
app.use(ExpressMongoSanitize());

//Data Sanitisation against XSS
app.use(xss());

//Prevent Parameter Pollution
app.use(hpp({
	whitelist: []//Parameters for which we don't wanna restrict duplications
}));

const publicDirectory = path.join(__dirname, '../public');

//View Engine
app.locals = ejsLocals;
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views/layouts/base'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Static folder
app.use(express.static(publicDirectory));

// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
	res.locals.user = req.user || null
	next();
});


app.get('/', function (req, res, next) {
	res.render('login');
})


// // Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/stories', storyRouter);

//UNUSED ROUTES MIDDLEWARE
app.use('*', (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(`can't find the ${req.originalUrl} on this server`, 404));
})

//GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export default app;
