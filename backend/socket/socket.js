const User = require('../models/Users');
const Message = require('../models/Message');
ObjectId = require('mongodb').ObjectID;
let sockets = {};

sockets.init = (server,sessionMiddleware) => {
  const io = require('socket.io').listen(server);
  
  const pipeline = [
    {$match: {operationType: "insert"}}
  ]

  const changeStream = Message.watch(pipeline, { fullDocument: 'updateLookup' });

  changeStream.on('change',(change)=>{
    console.log(change);
    
    io.emit('unseenMessage',{recipient: change.fullDocument.recipient, addNum : 1});    
    //socket.request.session
    io.emit('test',change.fullDocument);
  });  

  io.use(function(socket, next){
    // Wrap the express middleware
    sessionMiddleware(socket.request, {}, next);
  })

  io.sockets.on('connection', (socket)=> {
    console.log('socket connected');


    socket.on('disconnect',()=>{
      console.log('socket disconnected');
      //changeStream.driverChangeStream.close(console.log("close"));
    })

  });
}

module.exports = sockets;