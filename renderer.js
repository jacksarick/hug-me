var serialjs = require('serialport-js');
serialjs.open(
	'/dev/cu.HC-06-DevB',
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
}   