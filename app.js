const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({secret: 'movies', resave: true, saveUninitialized: true}));

require('./src/config/passport')(app);
app.set('views','./src/views');
app.set('view engine', 'ejs');

const navs = [
	{title:'About', link:'/about'}, 
	{title:'Movie Search', link: '/movies'}, 
	{title:'Contact', link:'/contact'}, 
	{title:'Sign in', link:'/login'}];

const movieRouter = require('./src/routes/movieRoutes')(navs);
app.use('/movies', movieRouter);

const adminRouter = require('./src/routes/adminRoutes')(navs);
app.use('/admin', adminRouter);

const authRouter = require('./src/routes/authRoutes')(navs);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {title :'Movie Library', navs: navs});
});

app.listen(port, function() {
	console.log('Server running on port ' + port);
});