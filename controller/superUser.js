/**
 * @description user 的 controller
 * @author me
 * */


const {createUserFailInfo,loginFailInfo,findAllUserFailInfo,findUserInfoFailInfo,deleteFailInfo,setFailInfo} = require("../db/model/ErrorInfo");
const {ErrorModel,SuccessModel} = require("../db/model/ResModel");
const {
    createSuperUser,
    findAllSuperUser,
    findOneSuperUser,
    modifyOneSuperUser,
    deleteOneSuperUser,
    modifyOneSuperUserAdmin,
    findOneSuperUserById
} = require("../services/superUser");
const {SuperUser} = require('../db/model/index')

const jwt = require('jsonwebtoken');


async function addSuperUser({username,password,airportId,name}){
    try{
        await createSuperUser({username,password,airportId,name});
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(createUserFailInfo);
    }
}

async function login({username,password}){
    const res = await findOneSuperUser({username,password});
    console.log(res);
    if(res){
        const token = jwt.sign(res, "dtf", { expiresIn: '24h' })
        return new SuccessModel({
            message: '登录成功',
            token,
            airportId: res.airportId
        })
    }else{
        return new ErrorModel(loginFailInfo)
    }

}

async function getOneSuperUserById(id){
    const res = await findOneSuperUserById(id);
    if(res){
        return new SuccessModel(res)
    }else{
        return new ErrorModel(findUserInfoFailInfo);
    }

}


async function getAllSuperUser(){
    const res =  await findAllSuperUser();

    if(res){
        return new SuccessModel(res);
    }else {
        return new ErrorModel(findAllUserFailInfo)
    }
}


async function deleteSuperUser(id){
    try{
        await deleteOneSuperUser(id);
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(deleteFailInfo);
    }

}

async function modifySuperUser({id,username,password,airportId,name}){
    const res = await modifyOneSuperUser({id,username,password,airportId,name});
    if(res){
        return new SuccessModel();
    }else {
        return new ErrorModel(setFailInfo)
    }
}
async function modifySuperUserAdmin({id,isAdmin}){

    try{
        const res = await modifyOneSuperUserAdmin({id,isAdmin});
        return new SuccessModel(res);
    }catch (e){
        return new ErrorModel(setFailInfo)
    }
}


module.exports = {
    addSuperUser,
    login,
    getAllSuperUser,
    deleteSuperUser,
    modifySuperUser,
    modifySuperUserAdmin,
    getOneSuperUserById
}