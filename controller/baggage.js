/**
 * @description baggage 的 controller
 * @author me
 * */


const {addBaggageFailInfo,findAllBaggageFailInfo,deleteFailInfo,setFailInfo} = require("../db/model/ErrorInfo");
const {SuccessModel,ErrorModel} = require("../db/model/ResModel");
const {
    createBaggage,
    findAllBaggage,
    deleteOneBaggage,
    findOneBaggageById,
    modifyOneBaggage
} = require("../services/baggage");

async function addBaggage({cardId,flightId,rfId,airportId,state}){
    try{
        await createBaggage({cardId,flightId,rfId,airportId,state});
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(addBaggageFailInfo);
    }
}

async function getAllBaggage(){
    const res = await findAllBaggage();

    if(res){
        return new SuccessModel(res);
    }else {
        return new ErrorModel(findAllBaggageFailInfo)
    }
}
async function findBaggageById(id){
    const res = await findOneBaggageById(id);
    if(res){
        return new SuccessModel(res)
    }else {
        return new ErrorModel(findAllBaggageFailInfo);
    }
}

async function deleteBaggage(id){
    try{
        await deleteOneBaggage(id);
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(deleteFailInfo)
    }
}


async function modifyBaggage({rfId,flightId,state,id,airportId}){
    try{
        await modifyOneBaggage({rfId,flightId,state,id,airportId});
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(setFailInfo)
    }

}
module.exports = {
    addBaggage,
    getAllBaggage,
    deleteBaggage,
    findBaggageById,
    modifyBaggage
}