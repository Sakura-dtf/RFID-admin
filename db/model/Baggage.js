/**
 * @description 用户数据模型
 * @author me
 * */

const seq = require('../seq');

const { STRING, DECIMAL, INTEGER} = require('../type');

const Baggage =  seq.define('baggage',{
    rfId:{
        type: STRING,
        allowNull: false,
        unique: true,  //唯一
        comment: 'rfid 号码，唯一'
    },
    flightId:{
        type: INTEGER,
        allowNull: true,
        comment: '此行的航班 ID'
    },
    state:{
        type: DECIMAL,
        allowNull: false,
        defaultValue: 0,
        comment: '0 表示办理托运托运 1 表示托运中 2 表示待领取 3 表示已出库',
    },
    airportId:{
        type: INTEGER,
        allowNull: true,
        comment: '代办的机场 ID'
    }
})


module.exports = Baggage