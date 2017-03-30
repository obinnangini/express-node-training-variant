const express = require('express');
const movieRouter = express.Router();
const movieService = require('../services/movieService')();

const router = function (navs) {
const movieController = require('../controllers/movieController')(movieService, navs);
    movieRouter.use(movieController.middleware);
    movieRouter.route('/')
        .get(movieController.getIndex);

    movieRouter.route('/:id')
        .get(movieController.getById);

        return movieRouter;
};
module.exports = router;