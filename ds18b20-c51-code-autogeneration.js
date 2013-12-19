/* **********************************************************************
 * Author:  Jks Liu(chinatianma@gmail.com)
 * License: Public Domain
 * **********************************************************************/

function main() {
    var djnz_time_ns = document.getElementById('djnz time ns').value;
    document.getElementById('djnz time ns echo').innerHTML =
	'Executing \`DJNZ\' needs <strong>' + djnz_time_ns + '</strong> nanosecond(s).';

    generate_delay_1ms(djnz_time_ns);
}

function generate_delay_1ms(ns) {
    var count = Math.ceil(1e6 / ns) - 2; // Two `MOVE', one `RET'
    var quotient = Math.floor(count / 256);
    var remainder = count % 256;
    
    document.getElementById('delay 1ms').innerHTML = 
	'    MOV R6, ' + (quotient + 1) + '\n' +
	'    MOV R7, ' + remainder + '\n' +
	'delay_ms_loop:' + '\n' +
	'    DJNZ R7, $' + '\n' +
	'    DJNZ R6, delay_ms_loop' + '\n' +
	'    RET'
}
