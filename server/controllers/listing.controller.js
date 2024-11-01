
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