/**
 * @description 机场的路由操作
 * @author me
 * */

const {getAllAirport,addAirport} = require("../controller/airport");
const router = require('koa-router')();

router.prefix('/airport')


router.post('/addAirport',async (ctx,next) => {
    let {address} = ctx.request.body;
    ctx.body = await addAirport(address);
})


router.get('/getAllAirport', async (ctx,next) => {
    ctx.body = await getAllAirport();
})


module.exports = router