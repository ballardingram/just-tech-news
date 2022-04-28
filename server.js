const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES > TURN ON
app.use(routes);

// CONNECTION > TO DB AND SERVER
sequelize.sync({ force: true}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
