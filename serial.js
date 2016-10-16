var usersettings = require("./user-settings.js");
var fs = require("fs");
var serialjs = require('serialport-js');

const blu_port = 'cu.HC-06-DevB' //Bluetooth
const usb_port = 'cu.wchusbserial1420' //USB
const ports = [fs.readdirSync("/dev").indexOf(blu_port) > 0, fs.readdirSync("/dev").indexOf(usb_port) > 0]

if(ports[0] || ports[1]) {

	port = blu_port;
	if (!ports[0]){
		port = usb_port;
	}

	serialjs.open(
		port
		start,
		'\n'
	);

	function start(port){
		port.on('data',
			recieved
		);
	}

	var target = $("#target");
	function recieved(data){
		state = (((data + []).split(" ").reduce((a, b) => a + b, 0)) > 0);

		target.html(state + []);
		if (state) {
			$.post("https://sarick.tech:3000", {function: "log-data", user: usersettings.user, pass: usersettings.pass, plush: 3, date: Math.floor(new Date() / 1000)}, function(data) {
				console.log(data)
			});
		}
	}
}