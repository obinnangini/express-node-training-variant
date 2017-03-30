const passport = require('passport');
const mongodb = require('mongodb').MongoClient;
const LocalStrategy = require('passport-local').Strategy;

const config = function() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
        const url = 'mongodb://localhost:27017/moviesApp';
        mongodb.connect(url, function(err, db) {
            const collection = db.collection('users');
            collection.findOne({username: username},
            function(err, results) {
                if(results.password === password) {
                    const user = results;
                    done(null, user);
                } else {
                    done(null, false, {message: 'Bad password'});
                }
            });
        });
        const user = {
            username: username,
            password: password
        };
    }));
};

module.exports = config;