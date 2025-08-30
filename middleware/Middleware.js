const ExpressError = require('../utils/ExpressError.js');
const {listingSchema} = require('../schema.js');
const {reviewSchema} = require('../schema.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        req.flash('error', 'You must be logged in to access this page');
        return res.redirect('/login');
    }
    next();
}

module.exports.saveUrl = (req,res,next)=>{
    res.locals.redirectUrl = req.session.redirectUrl;
    next();
};

module.exports.validateListing = (req,res,next) =>{
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req,res,next) =>{
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isOwner =  async (req, res, next) => {
    let {id} = req.params;
    const editedList = await Listing.findById(id);
    if ( res.locals.currUser && ! editedList.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error',"you are not a owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor =  async (req, res, next) => {
    let {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if ( res.locals.currUser && ! review.author._id.equals(res.locals.currUser._id)) {
        req.flash('error',"you are not a author  of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};