
import Bicycle from "../models/bicycle.model.js"
import {errorHandler} from "../utils/error.js"

export const postBicyle = async(req, res, next) =>{
    try {
        const bicycle = await Bicycle.create(req.body)
        if(!bicycle) return next(errorHandler(401, "Failed to create new Book"))
        res.status(200).json(bicycle)
    } catch (error) {
        next(error)
    }
}

export const getBicyle = async(req, res, next)  =>{
    const id = req.params.id
    try {
        const bicycle = await Bicycle.findById(id)
        if(!bicycle) return next(errorHandler(404, "Not Found!"))
        res.status(200).json(bicycle)
    } catch (error) {
        next(error)
    }
}

export const getBicyles = async(req, res, next)  =>{
    try {
        const bicycles = await Bicycle.find()
        if(!bicycles) return next(errorHandler(404, "Not Found!"))
        res.status(200).json(bicycles)
    } catch (error) {
        next(error)
    }
}


export const deleteBicyle = async(req, res, next)  =>{
    const id = req.params.id
    try {
        const bicycle = await Bicycle.findByIdAndDelete(id)
        if(!bicycle) return next(errorHandler(404, "Not Found!"))
        res.status(200).json({message: "Bicycle Deleted Successfully."})
    } catch (error) {
        next(error)
    }
}

export const updateBicycle = async(req, res, next) =>{
    const id = req.params.id
    
    try {
        const bicycle = await Bicycle.findById(id)
        if(!bicycle) return next(errorHandler(404, "Bicycle not Found!"))
        if(req.user.id !== bicycle.userRef) return next(errorHandler(401, "You can only update your own Bicycle listing"))
        const updatedBicycle = await Bicycle.findByIdAndUpdate(
            id, 
            {
            $set: req.body
            }, 
            { new:true }
            );
        if(!updatedBicycle) return next(errorHandler(401, "Failed to Update."))
        res.status(200).json(updatedBicycle)
    } catch (error) {
        next(error)
    }
}

export const getBicyclesBySearch = async(req, res, next)=>{
    try {

        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let category = req.query.category;
        
        if(category === undefined || type === 'all'){
            category = {$in: ["mountain", "hybrid", "road", "electric"]}
        }
        
        let type = req.query.type;

        if(type === undefined || type === 'all'){
            type = {$in: ["sell", "rent"]}
        }

        let offer = req.query.offer;

        if(offer === undefined || offer === 'false'){
            offer = {$in: ["true", "false"]}
        }

        let searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';
        const bicycles = await Bicycle.find({ 
            model: {$regex: searchTerm, $options: 'i'},
            category,
            type,
            offer,
         })
         .sort({ [sort]: order })
         .limit(limit)
         .skip(startIndex);
        if(!bicycles) return next(errorHandler(404, "Not Found"));
        res.status(200).json(bicycles)
    } catch (error) {
        next(error)
    }
}

