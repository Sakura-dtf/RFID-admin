/**
 * @description 数据模型入口文件
 * @author me
 * */

const Airport = require('./Airport');
const Baggage = require('./Baggage');
const Flight = require('./Flight');
const User = require('./User');
const SuperUser = require('./SuperUser');

Baggage.belongsTo(User,{
    foreignKey: 'cardId',
    targetKey: 'cardId'
})

User.hasMany(Baggage,{
    foreignKey: 'cardId'
})

User.hasOne(Flight,{
    foreignKey: 'flightId',
    constraints: false
})

Baggage.hasOne(Flight,{
    foreignKey: 'flightId',
    constraints: false
})

Baggage.hasOne(Airport,{
    foreignKey: 'airport',
    constraints: false
})


Flight.belongsTo(Airport,{
    foreignKey: 'endAirportId'
})

Airport.hasMany(Flight,{
    foreignKey: 'beginAirportId'
})



SuperUser.hasOne(Airport,{
    foreignKey: 'airportId',
    constraints: false
})

module.exports = {
    Airport,
    Baggage,
    Flight,
    User,
    SuperUser
}