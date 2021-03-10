/**
 * @description 行李的路由操作
 * @author me
 * */

const {
    addBaggage,
    getAllBaggage,
    deleteBaggage,
    findBaggageById,
    modifyBaggage
} = require("../controller/baggage");
const router = require('koa-router')();

router.prefix('/baggage')

router.post('/addBaggage',async (ctx,next) => {
    let {rfId,cardId,flightId,airportId,state} = ctx.request.body;
    ctx.body = await addBaggage({cardId,flightId,rfId,airportId,state});
})


router.get('/getAllBaggage', async (ctx,next) => {
    ctx.body = await getAllBaggage();
})


router.post('/deleteBaggage',async (ctx,next) => {
    const {id} = ctx.request.body;
    ctx.body = await deleteBaggage(id);
})


router.post('/findOneBaggage',async (ctx,next) => {
    const {id} = ctx.request.body;
    console.log(id);
    ctx.body = await findBaggageById(id);
})


router.post('/modifyBaggage',async (ctx,next) => {
    const {id,flightId,airportId,state,rfId} = ctx.request.body;
    ctx.body = await modifyBaggage({id,flightId,state,rfId,airportId});
})

module.exports = router