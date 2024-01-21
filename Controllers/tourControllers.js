const Tour = require('../models/tourModel')
const ApiFactory = require('../utils/apiFactory')
const handle = require('../utils/handleAsync')


//------------------------- CRUD operations -------------------------
//------------------- Get All Tours -------------------

exports.getAllTours = ApiFactory.getAll(Tour)

//------------------- Get one Tour -------------------


exports.getOneTour = ApiFactory.getOne(Tour,'tour')

//------------------- Create Tour -------------------

exports.createNewTour = ApiFactory.createNew(Tour)

//------------------- Delete Tour -------------------

exports.deleteTour = ApiFactory.delete(Tour)

//------------------- Update Tour -------------------

exports.updateTour = ApiFactory.update(Tour)
//----------------------------------------------------------------------------------------------------




//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//------------------------- Addtional operations -------------------------

//------------------- top5 Price -------------------
exports.top5 = (req,res,next)=>{
    req.query.sort = '-price'
    req.query.limit = 5
    next()
}
//------------------- Statistics -------------------
exports.stats = handle(async(req,res,next)=>{
    const stats = await Tour.aggregate([
        {
            $group:{
                _id:`$difficulty`,
                count: { $sum: 1 },
                avgPrice:{$avg : '$price' } 
            }
        }
    ])
    return {
        stateNum:stats.length,
        stats
    }
})





