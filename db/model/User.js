/**
 * @description 用户数据模型
 * @author me
 * */

const seq = require('../seq');

const { STRING, DECIMAL, INTEGER } = require('../type');

const User =  seq.define('user',{
    flightId:{
        type: INTEGER,
        allowNull: true,
        comment: '此行的航班 ID'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    name:{
        type: STRING,
        allowNull: false,
        comment: '真实姓名'
    },
    cardId:{
        type: STRING,
        allowNull: false,
        unique: true,  //唯一
        comment: '身份证号码，唯一'
    }
})


module.exports = User