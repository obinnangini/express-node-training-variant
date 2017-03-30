const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

const router = function(navs) {

    const movies = [
        {
            Title: 'Get out',
            imdbId: 'tt5052448'
        },
        {
            Title: 'Beauty and the Beast',
            imdbId: 'tt2771200'
        },
        {
            Title: 'Logan',
            imdbId: 'tt3315342'
        },
        {
            Title: 'La La Land',
            imdbId: 'tt3783958'
        }
    ];

    adminRouter.route('/addMovies')
        .get(function(req, res) {
            const url = 'mongodb://localhost:27017/moviesApp';
            mongodb.connect(url, function(err, db) {
                const collection = db.collection('movies');
                collection.insertMany(movies, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
};

module.exports = router;