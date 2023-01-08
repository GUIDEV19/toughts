import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import sessionFileStore   from 'session-file-store';
import flash from 'express-flash';
import conn from './db/conn.js'
let FileStore  = sessionFileStore(session);
//modules
import { Tought } from './models/Tought.js';
import { User } from './models/User.js';

//import Routes
import toughtsRoutes from './routes/toughtsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { ToughtsController } from './controllers/ToughtsController.js';

const app = express();

// configurando templante engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//Receber respostas do body
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

//session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
);

//flash messages
app.use(flash());

//public path
app.use(express.static('public'));

//set session to res

app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }

    next();
})


//routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)
app.get('/', ToughtsController.showToughts)


conn.sync(/* {force: true} */).then(
    app.listen(80)
).catch(err => console.log(err));
