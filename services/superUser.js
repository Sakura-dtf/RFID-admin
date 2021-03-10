/**
 * @description user 的 service
 * @author me
 * */

const {SuperUser,Baggage,Flight} = require('../db/model/index')

const Sequelize = require('sequelize');

async function createSuperUser({username,password,airportId,name}) {
    await SuperUser.create({
        username,
        password,
        airportId,
        name
    })
}


async function findOneSuperUser({password,username}){
    const res = await SuperUser.findOne({
        attributes: ['id', 'username','isAdmin', 'password', 'name' ,'airportId'],
        where:{
            password,
            username
        }
    });
    if(res){
        return res.dataValues;
    }
    return res;
}


async function findOneSuperUserById(id){
    const res = await SuperUser.findOne({
        attributes: ['id', 'username','isAdmin', 'password', 'name' ,'airportId'],
        where:{
            id
        }
    });
    if(res){
        return res.dataValues;
    }
    return res;
}


async function findAllSuperUser(){
    return await SuperUser.findAll({
        attributes: ['id', 'username','isAdmin', 'name', 'password', 'airportId'],
    });
}


async function deleteOneSuperUser(id){
    await SuperUser.destroy({
        where:{
            id
        }
    })
}

async function modifyOneSuperUser({id,username,name,password,airportId}){
    return await SuperUser.update({
        username,
        password,
        airportId,
        name
    }, {
        where: {
            id
        }
    });
}

async function modifyOneSuperUserAdmin({id,isAdmin}){
    const res =  await SuperUser.update({
        isAdmin: isAdmin
    },{
        where: {
            id
        }
    });
    console.log(res);
    return res;
}


module.exports = {
    createSuperUser,
    findAllSuperUser,
    deleteOneSuperUser,
    modifyOneSuperUser,
    findOneSuperUser,
    modifyOneSuperUserAdmin,
    findOneSuperUserById
}