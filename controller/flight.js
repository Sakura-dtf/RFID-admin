/**
 * @description flight 的 controller
 * @author me
 * */


const {createFlight,findAllFlight,findAllFlightByTime,modifyOneFlight,findOneFlight} = require("../services/flight");
const {addFlightFailInfo,findFlightFailInfo,setFailInfo,findAllBaggageFailInfo} = require("../db/model/ErrorInfo");

const {SuccessModel,ErrorModel} = require("../db/model/ResModel");


async function addFlight({beginTime,flightId,endTime,beginAirportId,endAirportId}){
    try{
        await createFlight({beginTime,flightId,endTime,beginAirportId,endAirportId});
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(addFlightFailInfo);
    }
}


async function getAllFlight(){
    const res = await findAllFlight();

    if(res){
        return new SuccessModel(res);
    }else {
        return new ErrorModel(findFlightFailInfo)
    }
}

async function getAllFlightByTime(year,month,day){
    const res = await findAllFlightByTime(year,month,day)

    if(res !== null){
        return new SuccessModel(res);
    }else {
        return new ErrorModel(findFlightFailInfo)
    }
}

async function modifyFlight({id,beginTime,flightId,endTime,beginAirportId,endAirportId}){
    try{
        await modifyOneFlight({id,beginTime,flightId,endTime,beginAirportId,endAirportId});
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(setFailInfo)
    }
}

async function findFlightById(id){
    const res = await findOneFlight(id);

    if(res){
        return new SuccessModel(res);
    }else{
        return new ErrorModel(findAllBaggageFailInfo);
    }
}

module.exports = {
    addFlight,
    getAllFlight,
    getAllFlightByTime,
    modifyFlight,
    findFlightById
}