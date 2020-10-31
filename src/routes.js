const express = require('express');
const routes = express.Router();
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');

routes.post('/register', AuthController.store);
routes.post('/authenticate', AuthController.authenticate);

routes.use(authMiddleware);

routes.get('/', (req, res) => {
    console.log(req.userId);
    return res.json({deu:"certo"})
});

module.exports = routes;