
const composeString = str => [ ... str ] 
	.reduce( ( a, c ) => { 
		let pickLast = a .splice( -1 ) 
		return a .concat( compose( pickLast, convert( c ) ) ) 
		}, [ 0 ] ) 
	.flatMap( code => reverse( code ) ) 
	.join( '' ) 
	.normalize( 'NFC' ) 

const convert = c => { 
	let cc = code( c ) 
	let CC = cc & 0xff 
	switch( true ) { 
		case isCho( c ) : 
			CC = CC + 0x01 << 0x10 
			break 
		case isJung( c ) : 
			CC = CC - 0x60 << 0x08 
			break 
		case isJong( c ) : 
			CC = CC - 0xa7 
			break 
		default : 
			return cc 
		} 
	return 0x1000_0000 | CC 
	} // -- convert() 
const reverse = code => { 
	let list = isHangulCode( code ) ? decode( code ) 
		: [ code & 0xff_ffff ] 
	let filled = list .filter( code => code != 0 ) 
	let chars = filled .map( code => String .fromCharCode( code ) ) 
	return chars .join( '' ) 
	} // -- reverse() 
const decode = code => { 
	let bb = ( ( code & 0xff_0000 ) >> 0x10 ) - 0x01 
	let cc = ( ( code & 0xff00 ) >> 0x08 ) + 0x60 
	let dd = ( code & 0xff ) + 0xa7 
	; [ bb, cc, dd ] = [ bb, cc, dd ] .map( v => 0x1100 | v ) 
	
	return [ bb, cc, hasJong ? dd : 0 ] 
	} // -- decode() 
let items = ( ... ar ) => ar 
const compose = ( composing, input ) => { 
	let F = hasCho( input ) ? cho 
		: hasJung( input ) ? jung 
		: hasJong( input ) ? jong 
		: items 
	
	return F( composing, imput ) 
	} // -- compose() 
const isCho = input => range( input .charCodeAt(), 0x1100, 0x1112 ) 
const isJung = input => range( input .charCodeAt(), 0x1161, 0x1175 ) 
const isJong = input => range( input .charCodeAt(), 0x11a8, 0x11c2 ) 
const range = ( num, a, b ) => num >= a && num <= b 
const code = c => c .charCodeAt() 

const hasCho = code => isHangulCode( code ) 
	&& ( code & 0xff_0000 ) != 0 
	// -- hasCho() 
const hasJung = code => isHangulCode( code ) 
	&& ( code & 0xff00 ) != 0 
	// -- hasJung() 
const hasJong = code => isHangulCode( code ) 
	&& ( code & 0xff ) != 0 
	// -- hasJong() 

const isHangulCode = code => ( code & 0x1000_0000 ) != 0 

const cho = ( composing, input ) => isHangulCode( composing ) 
	? hasCho( composing ) ? [ composing, input ] : composing | input 
	: [ composing, input ] 
	// -- cho() 
const jung = ( composing, input ) => isHangulCode( composing ) 
	? hasJung( composing ) ? [ composing, input ] : composing | input 
	: [ composing, input ] 
	// -- jung() 
const jong = ( composing, input ) => isHangulCode( composing ) 
	? hasJong( composing ) ? [ composing, input ] : composing | input 
	: [ composing, input ] 
	// -- jong() 

module .exports = composeString 
