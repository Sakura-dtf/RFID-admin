/**
 * @description 航班的路由操作
 * @author me
 * */

const {addFlight,getAllFlight,getAllFlightByTime,modifyFlight,findFlightById} = require("../controller/flight");
const router = require('koa-router')();

router.prefix('/flight')


router.post('/addFlight',async (ctx,next) => {
    let {beginTime,flightId,endTime,beginAirportId,endAirportId} = ctx.request.body;

    console.log(beginTime,endTime)

    ctx.body = await addFlight({beginTime,flightId,endTime,beginAirportId,endAirportId});
})


router.get('/getAllFlight', async (ctx, next) => {
    ctx.body = await getAllFlight();
})

router.get('/getAllFlightByTime',async (ctx,next) => {
    let {year,month,day} = ctx.request.query;
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    console.log(222,year,month,day);
    ctx.body = await getAllFlightByTime(year,month,day);
})


router.post('/modifyFlight', async (ctx,next) => {
    let {id,beginTime,flightId,endTime,beginAirportId,endAirportId} = ctx.request.body;

    ctx.body = await modifyFlight({id,beginTime,flightId,endTime,beginAirportId,endAirportId});
})





router.get('/findFlightById', async (ctx,next) => {
    let {id} = ctx.request.query;

    id = parseInt(id);

    ctx.body = await findFlightById(id);
})
module.exports = router