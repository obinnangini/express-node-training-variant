const fetch = require('node-fetch');

const omdbService = function() {
    const getMovieById = function(imdbId, cb) {
        fetch(`http://www.omdbapi.com/?i=${imdbId}`)
        .then(function(res) {
            return res.json();
        }).then(function(body) {
            cb(null, body);   
        });
    };

    return {
        getMovieById: getMovieById
    };
};

module.exports = omdbService;