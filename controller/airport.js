/**
 * @description baggage 的 controller
 * @author me
 * */


const {createAirport,findAllAirport} = require("../services/airport");
const {findAllAirportFailInfo,addAirportFailInfo} = require("../db/model/ErrorInfo");
const {SuccessModel,ErrorModel} = require("../db/model/ResModel");
const {} = require("../services/baggage");

async function addAirport(address){
    try{
        await createAirport(address);
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(addAirportFailInfo);
    }
}

async function getAllAirport(){
    const res = await findAllAirport();
    if(res){
        return new SuccessModel(res);
    }else {
        return new ErrorModel(findAllAirportFailInfo)
    }
}

module.exports = {
    addAirport,
    getAllAirport
}