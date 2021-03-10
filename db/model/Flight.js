/**
 * @description 航班数据模型
 * @author me
 * */

const seq = require('../seq');

const { STRING, DECIMAL,INTEGER,FLOAT, DATE,TIME } = require('../type');

const Flight =  seq.define('flight',{
    flightId:{
        type: STRING,
        allowNull: false,
        comment: '航班号'
    },
    beginTime: {
        type: DATE,
        allowNull: false,
        comment: '航班的起飞时间'
    },
    endTime: {
        type: DATE,
        allowNull: false,
        comment: '航班的落地时间'
    },
    laterTimer: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '晚点时间'
    }
})


module.exports = Flight