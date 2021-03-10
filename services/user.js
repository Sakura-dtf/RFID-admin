/**
 * @description user 的 service
 * @author me
 * */

const {User,Baggage,Flight} = require('../db/model/index')

const Sequelize = require('sequelize');

async function createUser({password,name,cardId,flightId}) {
    let data = {
        password,
        name,
        cardId
    }
    if(flightId){
        data.flightId = flightId
    }
    await User.create(data)
}


async function findOneUser({password,cardId}){
    const res = await User.findOne({
        where:{
            cardId,
            password
        }
    });
    if(res){
        return res.dataValues;
    }
    return res;
}

async function findAllUser(){
    const res = await User.findAll({
        attributes: ['id', 'cardId', 'name', 'flightId'],
        include: [
            {
                model: Baggage,
                attributes: ['id', 'flightId', 'state','rfId'],
                on: {
                    cardId: {
                        [Sequelize.Op.eq]: Sequelize.col('user.cardId'),
                    }
                }
            },
            {
                model: Flight,
                on: {
                    id: {
                        [Sequelize.Op.eq]: Sequelize.col('user.flightId'),
                    },
                }
            },

        ]
    });
    console.log(res);
    return res;
}



async function findOneUserByCardId(cardId){
    const res = await User.findOne({
        attributes: ['id', 'cardId', 'name', 'flightId'],
        where:{
            cardId
        },
        include: [
            {
                model: Baggage,
                attributes: ['id', 'flightId','airportId','state','rfId'],
                on: {
                    cardId: {
                        [Sequelize.Op.eq]: Sequelize.col('user.cardId'),
                    }
                },
                include: [
                    {
                        model: Flight,
                        on: {
                            id: {
                                [Sequelize.Op.eq]: Sequelize.col('baggage.flightId'),
                            },
                        }
                    }
                ]
            },
            {
                model: Flight,
                on: {
                    id: {
                        [Sequelize.Op.eq]: Sequelize.col('user.flightId'),
                    },
                }
            },

        ]
    });
    if(res){
        return res.dataValues;
    }

    return res;
}


async function deleteOneUser(cardId){
    await User.destroy({
        where:{
            cardId
        }
    })
}

async function modifyOneUser({flightId,password,id}){
    return await User.update({
        flightId,
        password
    }, {
        where: {
            id
        }
    });
}



module.exports = {
    createUser,
    findOneUser,
    findAllUser,
    findOneUserByCardId,
    deleteOneUser,
    modifyOneUser
}