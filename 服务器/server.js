/*
 * @Author: DragonL
 * @Date: 2022-06-14 10:07:36
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-21 17:11:05
 * @Description: 
 */
const Koa = require('koa');
const koaSend = require('koa-send');
const statics = require('koa-static');
const socket = require('socket.io');

const path = require('path');
const http = require('http');

const port = 3006;
const app = new Koa();


app.use(statics(
    path.join(__dirname, './dist')
));
app.use(async (ctx, next) => {
    if (!/\./.test(ctx.request.url)) {
        await koaSend(
            ctx,
            'index.html',
            {
                root: path.join(__dirname, './'),
                maxage: 1000 * 60 * 60 * 24 * 7,
                gzip: true,
            }
        );
    } else {
        await next();
    }
});
const httpServer = http.createServer(app.callback()).listen(port, () => {
    console.log('httpServer app started at port ...' + port);
});
const options = {
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 5000,
    }
};
const httpIo = socket(httpServer, options);
// const rooms = {};
const socks = {};
const httpConnectIoCallBack = (sock) => {
    // console.log(Object.values(socks) );
    sock.emit('connectionSuccess', sock.id);
    sock.on("send_my_content", ({ id }) => {
        console.warn(id, "id")
        if (!socks[id]) {
            socks[id] = sock
        }
        console.warn(Object.keys(socks))
        // console.warn("成功存储用户本地ID：" + socks)
    })
    //收到Offer需要转发给被控制方
    sock.on('receiveOffer', ({ id, offer, m_id }) => {
        console.warn("收到来自" + m_id + '的offer,转发给' + id + 'offer')
        const toUser = socks[id]
        // console.warn(offer)
        toUser.emit('receiveOffer', { offer, id: m_id });
    });
    sock.on('receiveAnswer', ({ id, answer }) => {
        console.warn("收到answer,转发给" + id)
        const toUser = socks[id]
        toUser.emit('receiveAnswer', answer);
    });
    sock.on('icecandidate', ({ id, iceCandidate }) => {
        try {
            console.warn("收到来自需要发送给" + id + "的请求")
            // try {
            const toUser = socks[id]
            // console.warn(toUser,"toUser")
            toUser.emit('icecandidate', iceCandidate);
        } catch (e) {
            console.warn(e)
        }
    });
    sock.on("userleave", ({ id }) => {
        delete socks[id]
        console.warn("删除成功", Object.keys(socks))
        // const toUser = socks[id]
        // toUser.emit('receiveAnswer', answer);
    })
};
httpIo.on('connection', httpConnectIoCallBack);



