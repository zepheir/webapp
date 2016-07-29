

var iosocket;

function initSocketIO(httpServer,debug){
  iosocket = io.listen(httpServer);

  // window.onload = function(){
  //   initSocketIO();
  // };

  iosocket.on('connection', function (socket) {
    console.log('user connected.');

    // socket.on('sliderval', function (data) {
    //   console.log('sliderval:',data);
    // });
  });
}
