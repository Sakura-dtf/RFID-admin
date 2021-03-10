/**
 * @description user 的 service
 * @author me
 * */

const {User,Baggage,Flight} = require('../db/model/index')

const Sequelize = require('sequelize')

async function createBaggage({cardId,flightId,rfId,airportId,state}) {
    let data = {cardId,rfId};
    if(flightId){
        data.flightId = flightId
    }
    if(airportId){
        data.airportId = airportId
    }
    if(state){
        data.state = state;
    }
    console.log(data);
    await Baggage.create(data)
}



async function findOneBaggageById(id){
    const res = await Baggage.findOne({
        attributes:['id','rfId','flightId','airportId','state'],
        where:{
            id
        }
    });
    return res.dataValues;
}


async function findOneBaggageByCardId({cardId}){
    const res = await Baggage.findOne({
        attributes:['id','flightId','airportId','state'],
        where:{
            cardId
        }
    });
    if(res){
        return res.dataValues;
    }
    return res;
}


async function findAllBaggage(){
    const res = await Baggage.findAll({
        attributes:['id','flightId','rfId','airportId','state'],
        include: [
            {
                model: User,
                attributes:['id','name','cardId']
            },
            {
                model: Flight,
                on: {
                    id: {
                        [Sequelize.Op.eq]: Sequelize.col('baggage.flightId'),
                    },
                }
            },
        ]
    });
    console.log(res);
    res.map(item => {
        return item.dataValues;
    })
    return res;
}

async function deleteOneBaggage(id){
    await Baggage.destroy({
        where:{
            id
        }
    })
}

async function modifyOneBaggage({rfId,flightId,state,id,airportId}){
    console.log({rfId,flightId,state,id,airportId})
    await Baggage.update({
        rfId,
        flightId,
        state,
        airportId
    },{
        where:{
            id
        }
    });
}

module.exports = {
    createBaggage,
    findOneBaggageByCardId,
    findOneBaggageById,
    findAllBaggage,
    deleteOneBaggage,
    modifyOneBaggage
}