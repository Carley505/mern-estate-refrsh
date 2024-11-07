

import mongoose from "mongoose";
const { Schema, model } = mongoose

const bookSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['mountain', 'road', 'hybrid', 'electric'],
        required: true,
    },
    type: {
        type: String,
        enum: ['sell', 'rent'],
        required: true,
    },
    condition:{
        type: String,
        enum: ["poor", "fair", "good", "very good", "excellent"],
        default: "good",
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    }
},
{ timestamps: true }
);


const Bicycle = model('Bicycle', bookSchema)

export default Bicycle;