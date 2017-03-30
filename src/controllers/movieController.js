const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const movieController = function(movieService, navs) {

    const getIndex = function(req, res){
        const url = 'mongodb://localhost:27017/moviesApp';
        mongodb.connect(url, function(err, db) {
            const collection = db.collection('movies');
            collection.find({}).toArray(function(err, results) {
                res.render('movieListView', 
                {title:'Movie Library', navs: navs, movies: results});
            });
        });
    };

    const getById = function(req, res){
        const id = new ObjectId(req.params.id);
        const url = 'mongodb://localhost:27017/moviesApp';
        mongodb.connect(url, function(err, db) {
            const collection = db.collection('movies');
            collection.findOne({
                _id: id
            }, 
            function(err, results) {
                if(results.imdbId) {
                    movieService.getMovieById(results.imdbId, function(err, movie) {
                        movie.Title = results.Title;
                        movie._id = id;
                        res.render('movieView', 
                        {title:'Movie Library', navs: navs, movie: movie});
                    });
                } else {
                    res.render('movieView', 
                        {title:'Movie Library', navs: navs, movie: movie});
                }
            });
        });
    };

    const middleware = function(req, res, next) {
        if(!req.user) {
            // res.redirect('/');
            // return;
        }
        next();
    };

    return{
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports =  movieController;