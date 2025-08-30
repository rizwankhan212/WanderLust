const Listing = require('../models/listing.js');
const { cloudinary } = require('../cloudConfig');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    let listings = await Listing.find();
    res.render('listings/home.ejs', { listings });
};

module.exports.form = (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in to create a listing');
        return res.redirect('/login');
    }
    res.render("listings/form");
};

module.exports.save = async (req, res) => {
    let resposne = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit:1
    })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, filename);
    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = { url, filename };
    newList.geometry = resposne.body.features[0].geometry;
    let savelist = await newList.save();
    console.log(savelist);
    req.flash('success', 'new listing created');
    res.redirect('/listings');
};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        }
    }).populate("owner");
    if (!list) {
        req.flash('error', 'Listing does not exist');
        return res.redirect('/listings');
    }
    res.render("listings/showList.ejs", { list });
};
module.exports.delete = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if (list.image && list.image.filename) {
        await cloudinary.uploader.destroy(list.image.filename);
    }
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing Delete successful');
    res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if (!list) {
        req.flash('error', 'Listing does not exist');
        return res.redirect('/listings');
    }
    res.render('listings/edit', { list });
}

module.exports.update = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid Data");
    }
    let { id } = req.params;
    let list = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    if (req.file && list.image && list.image.filename) {
        await cloudinary.uploader.destroy(list.image.filename);
    }
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = { url, filename };
        await list.save();
    }
    req.flash('success', 'Listing updated');
    // or await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true});
    res.redirect(`/listings/${id}`);
};