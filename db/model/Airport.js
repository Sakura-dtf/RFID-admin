/**
 * @description 航班数据模型
 * @author me
 * */

const seq = require('../seq');

const { STRING, DECIMAL,INTEGER,FLOAT, DATE,TIME } = require('../type');

const Airport =  seq.define('airport',{
   address: {
       type: STRING,
       allowNull: false,
       comment: '机场的位置'
   }
})


module.exports = Airport