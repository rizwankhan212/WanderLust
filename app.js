if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listingsRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/review.js');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const userRouter = require('./routes/user.js');


app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs',ejsMate);


const db_url = process.env.ATLAS_DB_URL;

main()
.then(() =>{
    console.log("Connected to Database");
})

async function main(){
    await mongoose.connect(db_url);
}

app.listen(8080,() =>{
    console.log('Port is Listning on 8080');
})


const store = mongoStore.create({
    mongoUrl: db_url,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (e) => {
    console.log("Mongo Session Store Error:", e);
});

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};


app.use(session(sessionOptions));
app.use(flash());

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

//flash middelware
app.use((req,res,next) =>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});
app.use((req, res, next) => {
    res.locals.currentPath = req.path; // ye current URL path dega
    next();
});
// app.get("/",(req,res) =>{
//     res.render("listings/index");
// });


// listings
app.use("/listings",listingsRouter);

// reviews
app.use("/listings/:id/review",reviewRouter);

// user routes
app.use("/",userRouter);

app.use( (req,res,next) =>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next) =>{
    let {statusCode =500,message="something Wrong"} = err;
    res.status(statusCode).render('error',{message});
});