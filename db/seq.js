/**
 * @description sequelize 实例
 * @author me
 * */

let MYSQL_CONF = {
    port: '',
    host: '',
    user: '',
    password: '',
    database: ''
}

//数据库参数


const Sequelize = require('sequelize');


const { host, user, password, database } = MYSQL_CONF;


const config = {
    host,
    timezone: '+08:00', //时区东八区
    dialect: 'mysql'
}


config.logging = () => {}  //测试时不打印log日志



const seq = new Sequelize(database,user,password,config);


module.exports = seq;
