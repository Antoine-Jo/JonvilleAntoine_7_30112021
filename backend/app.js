const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const userRoutes = require('./routes/user_routes');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Header qui permet d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());
app.use(cookieParser());



app.use('/api/user', userRoutes);

module.exports = app;