/**
 * @description 航班号 的 service
 * @author me
 * */

const {User,Baggage,Flight} = require('../db/model/index')


function isDuringDate (year,month,day,curDate) {
    let beginDate = new Date(year,month,day-1);

    let endDate = new Date(year,month,day + 1);


    return curDate >= beginDate && curDate <= endDate;

}



async function createFlight({beginTime,flightId,endTime,beginAirportId,endAirportId}) {
    console.log(beginTime,endTime)
    await Flight.create({beginTime,flightId,endTime,beginAirportId,endAirportId});
}



async function findAllFlight(){
    const res = await Flight.findAll({
        attributes:['id','beginTime','endTime', 'beginAirportId', 'endAirportId' ,'flightId','laterTimer'],
    });
    res.map(async item => {
        return item.dataValues;
    })
    return res;
}

async function findAllFlightByTime(year,month,day){
    const res = await Flight.findAll({
        attributes:['id','beginTime','endTime', 'beginAirportId', 'endAirportId' ,'flightId','laterTimer'],
    });

    let result = [];

    res.forEach(item => {
        if(isDuringDate(year,month - 1,day,item.dataValues.beginTime)) {
            result.push(item.dataValues);
        }
    })
    return result;
}



async function findOneFlight(id){
    const res = await Flight.findOne({
        attributes:['id','beginTime','endTime', 'beginAirportId', 'endAirportId' ,'flightId','laterTimer'],
        where: {
            id
        }
    });

    if(res){
        return res.dataValues;
    }else{
        return res;
    }
}



async function modifyOneFlight({id,beginTime,flightId,endTime,beginAirportId,endAirportId}){
    console.log({id,beginTime,flightId,endTime,beginAirportId,endAirportId});

    await Flight.update({
        beginTime,
        flightId,
        endTime,
        beginAirportId,
        endAirportId
    },{
        where: {
            id
        }
    })
}


module.exports = {
    createFlight,
    findAllFlight,
    findAllFlightByTime,
    modifyOneFlight,
    findOneFlight
}