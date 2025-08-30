const mongoose = require('mongoose');
const Review = require('./review.js');
const User = require('./user.js');
const Schema  = mongoose.Schema;


const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true},
    image:{
        url:String,
        filename:String
    },
    price:Number,
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref : "Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    category:{
        type:String,
        enum:['Trending','Rooms','Iconic cities','Mountain cities','Farmhouse','castle','Aractic','Other'],
        default:'Other'
    }
});

listingSchema.post('findOneAndDelete',async(list) =>{
    if(list.reviews.length){
        await Review.deleteMany(({_id:{$in:list.reviews}}));
    }
})
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;