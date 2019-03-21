var five = require("johnny-five");
var board = new five.Board();
var led;

function lightOn(){
    console.log("turning light on!");
    led.on();
    setTimeout(lightOff, 5000);
}
function lightOff(){
    led.off();
    console.log("turning light off!");
}

board.on("ready", function(){
    led = new five.Led(13);
    lightOn();
    //led.blink(500);
    
    //led.strobe();
});