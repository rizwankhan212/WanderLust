const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.create = async(req,res) =>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the author to the current user
    list.reviews.push(newReview);
    await list.save()
    await newReview.save();
    req.flash('success','New Review created');
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async(req,res) =>{
    let {id,reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    req.flash('success','Review Deleted');
    res.redirect(`/listings/${id}`);
};