const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const session = require('express-session')

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))


   
  app.use('*',async (req, res, next) => {
    let date=new Date().toUTCString();
    let method=req.method;
    let url=req.originalUrl;
    let Authuser="";
    if(req.session.user){
        Authuser="Authenticated User";
    }else{
        Authuser="Non-Authenticated User";
    }
    console.log("["+date+"]: "+method+url+" ("+Authuser+")");
    next();
}); 

app.use('/private',async (req, res, next) => {
    if(!req.session.user){
        res.status(403).render('pages/Not_logged',{user:"User is not logged in"});
    }else{
        next();
    }
});



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});





