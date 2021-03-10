/**
 * @description 用户的路由操作
 * @author me
 * */


const {loginFailInfo} = require("../db/model/ErrorInfo");
const {SuccessModel,ErrorModel} = require("../db/model/ResModel");
const checkToken = require('../middlewares/checkToken');

const router = require('koa-router')();
router.prefix('/user');

const {
    addUser,
    login,
    getAllUser,
    getOneUserByCardId,
    deleteUser,
    modifyUser
} = require("../controller/user");



router.post('/login', async (ctx,next) => {
    const { cardId, password} = ctx.request.body;
    console.log({ cardId, password})
    ctx.body =  await login({ cardId,password } );
})


router.post('/addUser',async (ctx,next) => {
    const {password, cardId, name,flightId} = ctx.request.body;
    ctx.body = await addUser({  password, cardId, name, flightId});
})


router.get('/getAllUser',async (ctx,next) => {
    ctx.body = await getAllUser();
})

router.get('/getAllUser',async (ctx,next) => {
    ctx.body = await getAllUser();
})

router.get('/getOneUserByCardId',async (ctx,next) => {
    const { cardId } = ctx.request.query;

    ctx.body = await getOneUserByCardId(cardId);
})

router.get('/getOneUserByLogin', checkToken ,async (ctx,next) => {
    const { cardId } = ctx.request.userInfo;

    ctx.body = await getOneUserByCardId(cardId);
})

router.post('/deleteUser',async (ctx,next) => {
    const { cardId } = ctx.request.body;

    ctx.body = await deleteUser(cardId);
})

router.post('/modifyUser',async (ctx,next) => {
    const {id,flightId,password} = ctx.request.body;

    ctx.body = await modifyUser({id,flightId,password});
})

module.exports = router