
const mfsjea = require( './mfsjea.js' ) 
const readline = require( 'readline' ) 

const rl = readline .createInterface( new class { 
	input = process .stdin, 
	output = process .stdout 
	prompt = '> ' 
	} ) 

rl .on( 'line', line => { 
	const result = mfsjea .jeamfs( line ) 
	let { str, source, destination, score } = result 
	console.log( `BEST RESULT: ${ str } (${ source }-${ destination }, score: ${ score })` ) 
	} ) 
