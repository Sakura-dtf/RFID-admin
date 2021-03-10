/**
 * @description 机场 的 service
 * @author me
 * */

const {Airport,Flight} = require('../db/model/index')


async function createAirport(address) {
    await Airport.create({
        address
    })
}


async function findAllAirport(){
    const res = await Airport.findAll({
        attributes:['id','address'],
        include:[
            {
                model: Flight
            }
        ]
    });
    console.log(res);
    return res;

}


module.exports = {
    createAirport,
    findAllAirport
}