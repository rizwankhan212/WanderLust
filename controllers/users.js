const User = require('../models/user.js');

module.exports.renderSignup =  (req, res) => {
    res.render('users/signup');
};

module.exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser,(err) =>{
            if(err){
                return next(err);
            }
            req.flash('success', 'Welcome to Wanderlust!');
            res.redirect('/listings');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        return res.redirect('/users/signup');
    }

};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = async (req, res) => {
    let redirectUrl = res.locals.redirectUrl ||'/listings';
    req.flash('success', 'Welcome back to WanderLust!');
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash('success','Logged out successfully');
        res.redirect('/listings');
    });
};