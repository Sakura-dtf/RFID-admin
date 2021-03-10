/**
 * @description 获取token信息的中间件
 * @author me
 * */


const jwt = require('jsonwebtoken');

const util = require('util');
const {ErrorModel} = require("../db/model/ResModel");

const verify = util.promisify(jwt.verify);

/**
 * 验证token
 * @param{Object} ctx
 * @param{function} next
 * */
async function checkToken(ctx,next) {
    const token = ctx.header.authorization;
    try{
        ctx.request['userInfo'] = await verify(token.split(' ')[1], 'dtf');
        await next();
    }catch (e) {
        console.log(e,e.stack);
        return ctx.body = await new ErrorModel({
            errno: 1000,
            message: 'jwt失效'
        })
    }
}

module.exports = checkToken