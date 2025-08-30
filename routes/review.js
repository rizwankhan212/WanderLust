const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const{validateReview, isLoggedIn, isReviewAuthor} = require('../middleware/Middleware.js');
const reviewsController = require('../controllers/reviews.js');



// review route

router.post('/',isLoggedIn,validateReview,wrapAsync(reviewsController.create));

// Review Delete 

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewsController.delete));

module.exports = router;