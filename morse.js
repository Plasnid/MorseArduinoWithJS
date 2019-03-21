//bringing in the keypress and five libraries
var five = require("johnny-five");
var keypress = require("keypress");
//defining a new board
var board = new five.Board();
//defining the variables for led, activeLetter, and key pressed
var led;
var activeLetter;
var letterPos;

//an object of arrays to hold letter references for us
var m_code = {
    a: [".","-"],
    b: ["-",".",".","."],
    c: ["-",".","-","."],
    d: ["-",".","."],
    e: ["."],
    f: [".",".","-","."],
    g: ["-","-","."],
    h: [".",".",".","."],
    i: [".","."],
    j: [".","-","-","-"],
    k: ["-",".","-"],
    l: [".","-",".","."],
    m: ["-","-"],
    n: ["-","."],
    o: ["-","-","-"],
    p: [".","-","-","."],
    q: ["-","-",".","-"],
    r: [".","-","."],
    s: [".",".","."],
    t: ["-"],
    u: [".",".","-"],
    v: [".",".",".","-"],
    w: [".","-","-"],
    x: ["-",".",".","-"],
    y: ["-",".","-","-"],
    z: ["-","-",".","."],

}
//a function for dots
function shortLight(){
    console.log("short light");
    led.on();
    setTimeout(lightOff, 300);
}
//a function for dashes
function longLight(){
    console.log("long light");
    led.on();
    setTimeout(lightOff, 800);
}
//a reusable function for turning off the light
function lightOff(){
    led.off();
    console.log("turning light off!");
    letterPos +=1;
    setTimeout(playLetter, 100);
}
//function for playing the letter, one dash/dot at a time
function playLetter(letter){
    if(!activeLetter){
        activeLetter = m_code[letter];
        console.log(letter);
        console.log(m_code[letter]);
        letterPos = 0;
    }
    if(activeLetter[letterPos]){
        switch(activeLetter[letterPos]){
            case ".":
                shortLight();
                break;
            case "-":
                longLight();
                break;
        }
    }else{
        activeLetter = null;
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }
}
//an action for keeping track of key presses
function keyAction(ch, key){
    console.log(key.name);
    playLetter(key.name);
}
//keeping track of when the board is ready, and tracking key press events
board.on("ready", function(){
    led = new five.Led(13);
    keypress(process.stdin);
    process.stdin.on("keypress", keyAction);  
});