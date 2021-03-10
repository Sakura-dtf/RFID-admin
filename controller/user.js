/**
 * @description user 的 controller
 * @author me
 * */


const {createUserFailInfo,loginFailInfo,findAllUserFailInfo,findUserInfoFailInfo,deleteFailInfo,setFailInfo} = require("../db/model/ErrorInfo");
const {ErrorModel,SuccessModel} = require("../db/model/ResModel");
const {
    createUser,
    findOneUser,
    findAllUser,
    findOneUserByCardId,
    deleteOneUser,
    modifyOneUser
} = require("../services/user");
const {User} = require('../db/model/index')

const jwt = require('jsonwebtoken');


async function addUser({password,name,cardId,flightId}){
    try{
        await createUser({password,name,cardId,flightId});
        return new SuccessModel();
    }catch (e){
        console.log(e);
        return new ErrorModel(createUserFailInfo);
    }
}

async function login({cardId,password}){
    const res = await findOneUser({cardId, password});
    if(res){
        const token = jwt.sign(res, "dtf", { expiresIn: '24h' })
        return new SuccessModel({
            message: '登录成功',
            token,
        })
    }else{
        return new ErrorModel(loginFailInfo)
    }

}


async function getAllUser(){
    const res =  await findAllUser();

    console.log(res);
    if(res){
        return new SuccessModel(res);
    }else {
        return new ErrorModel(findAllUserFailInfo)
    }
}

async function getOneUserByCardId(cardId){
    const res =  await findOneUserByCardId(cardId);

    if(res){
        return new SuccessModel(res);
    }else {
        return new ErrorModel(findUserInfoFailInfo)
    }
}

async function deleteUser(cardId){
    const res = await findOneUserByCardId(cardId);
    console.log(res,res.baggage);

    console.log(res.baggage,res.baggage.length <= 0);

    if(res.baggage.length > 0){
        return new ErrorModel(deleteFailInfo);
    }else {
        try{
            await deleteOneUser(cardId);
            return new SuccessModel();
        }catch (e){
            console.log(e);
            return new ErrorModel(deleteFailInfo);
        }
    }

}

async function modifyUser({id,flightId,password}){
    const res = await modifyOneUser({id,flightId,password});

    if(res){
        return new SuccessModel();
    }else {
        return new ErrorModel(setFailInfo)
    }
}

module.exports = {
    addUser,
    login,
    getAllUser,
    getOneUserByCardId,
    deleteUser,
    modifyUser
}