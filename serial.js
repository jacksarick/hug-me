var usersettings = require("./user-settings.js");
var fs = require("fs");
var serialjs = require('serialport-js');

const blu_port = 'cu.HC-06-DevB' //Bluetooth
const usb_port = 'cu.wchusbserial1420' //USB
const ports = [fs.readdirSync("/dev").indexOf(blu_port) > 0, fs.readdirSync("/dev").indexOf(usb_port) > 0]

console.log(ports);
if(ports[0] || ports[1]) {

	port = blu_port;
	if (!ports[0]){
		port = usb_port;
	}
	console.log(port);

	serialjs.open(
		"/dev/" + port,
		start,
		'\n'
	);

	function start(port){
		port.on('data',
			recieved
		);
	}

	function recieved(data){
		console.log(data);
		state = (((data + []).split(" ").reduce((a, b) => a + b, 0)) > 0);

		if (state) {
			$.post("https://sarick.tech:3000", {function: "log-data", user: usersettings.user, pass: usersettings.pass, plush: 3, date: new Date()}, function(data) {
				console.log(data)
				$("#plush-status").html("Being Hugged!")
			});
		}
		else{
			$("#plush-status").html("Inactive.")
		}
	}
}
