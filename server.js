require("dotenv").config();

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers.js');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SECRET,
    //sign out user if site idle for 30 min.
    cookie: {
        maxAge: 30 * 60 * 1000 // 1 minutes
    },
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});