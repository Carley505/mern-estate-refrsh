
import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"


export const createListing = async(req, res, next)=>{

    try {
        const listing = new Listing(req.body)
        await listing.save()
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async(req, res, next) =>{
    
    try {

        const listing = await Listing.findById({ _id:req.params.id })

        if(!listing){
            return next(errorHandler(404, "Listing Not Found!"))
        }
    
        if(req.user.id  !== listing.userRef.toString()){
            return next(errorHandler(401, "You can only delete your own listings!"))
        }else{
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("Listing deleted Successfully!")
        }
    } catch (error) {
        next(error)
    }
}

export const updateListing = async(req, res, next) =>{
    const listingId = req.params.id
    const { name, description, address, regularPrice, 
            discountPrice, bathRooms, bedRooms, furnished, 
            parking, type, offer, imageUrls, userRef } = req.body
    
        try {
            const listing = await Listing.findById(listingId)

            if(!listing) return next(errorHandler(404, "Listing Not Found!"))
            if(req.user.id !== listing.userRef) return next(errorHandler(401, "You can Only update your listing!"))
            const updatedUser = await Listing.findByIdAndUpdate(
                listingId, 
                {
                    $set: {
                        name, description, address, regularPrice, discountPrice, bathRooms, bedRooms,
                        furnished, parking, type, offer, imageUrls, userRef
                    },
                },
                { new:true }
            );
            if(!updatedUser) return next(errorHandler(500, "Failed!"))
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
}

export const getListing = async(req, res, next)=>{
    const listingId = req.params.id
    try {
        const listing = await Listing.findById(listingId)
        if(!listing){
           return next(errorHandler(404, "Listing Not Found!"))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}