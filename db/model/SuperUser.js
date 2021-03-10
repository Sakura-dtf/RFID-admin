/**
 * @description 管理员数据模型
 * @author me
 * */

const seq = require('../seq');

const { STRING, DECIMAL, INTEGER } = require('../type');

const SuperUser =  seq.define('superuser',{
    username: {
        type: STRING,
        allowNull: false,
        unique: true,  //唯一
        comment: '用户名，唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    airportId:{
        type: INTEGER,
        allowNull: true,
        comment: '代办的机场 ID'
    },
    name:{
        type: STRING,
        allowNull: false,
        comment: '姓名'
    },
    isAdmin: {
        type: DECIMAL,
        defaultValue: 0,
        comment: '是否是超级管理员 0 普通用户  1 超级管理员'
    }
})


module.exports = SuperUser