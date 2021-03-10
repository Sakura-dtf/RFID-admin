/**
 * @description 超级管理员的路由操作
 * @author me
 * */

const {
    login,
    addSuperUser,
    getAllSuperUser,
    modifySuperUser,
    deleteSuperUser,
    modifySuperUserAdmin,
    getOneSuperUserById
} = require("../controller/superUser");
const router = require('koa-router')();

router.prefix('/admin')


router.post('/login', async (ctx,next) => {
    const { username, password} = ctx.request.body;
    console.log({ username, password})
    ctx.body =  await login({ username,password } );
})


router.post('/addSuperUser',async (ctx,next) => {
    const {username,password,airportId,name} = ctx.request.body;
    ctx.body = await addSuperUser({username,password,airportId,name});
})


router.get('/getAllSuperUser',async (ctx,next) => {
    ctx.body = await getAllSuperUser();
})



router.get('/getOneSuperUserById',async (ctx,next) => {
    let {id} = ctx.request.query;
    id = parseInt(id);
    console.log(id);
    ctx.body = await getOneSuperUserById(id);
})


router.post('/deleteSuperUser',async (ctx,next) => {
    const { id } = ctx.request.body;

    ctx.body = await deleteSuperUser(id);
})


router.post('/modifySuperUser',async (ctx,next) => {
    const {id,username,password,airportId,name} = ctx.request.body;

    ctx.body = await modifySuperUser({id,username,password,airportId,name});
})


router.post('/modifySuperUserAdmin',async (ctx,next) => {
    const {id,isAdmin} = ctx.request.body;

    ctx.body = await modifySuperUserAdmin({id,isAdmin});
})

module.exports = router