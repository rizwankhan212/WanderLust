const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner } = require('../middleware/Middleware.js');
const { validateListing } = require('../middleware/Middleware.js');
const listingsController = require('../controllers/listings.js');
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });



// on root route
router.route('/')
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.save));
//create Route

router.get("/new", isLoggedIn,listingsController.form);

//request on id
router.route('/:id')
    .get(wrapAsync(listingsController.show))
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.delete))
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.update));


// edit page
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.edit));


module.exports = router;