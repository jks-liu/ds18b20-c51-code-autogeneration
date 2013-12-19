/* **********************************************************************
 * Author:  Jks Liu(chinatianma@gmail.com)
 * License: Public Domain
 * **********************************************************************/

function main() {
    var djnz_time_ns = document.getElementById('djnz time ns').value;
    document.getElementById('djnz time ns echo').innerHTML =
	'Executing \`DJNZ\' needs <strong>' + djnz_time_ns + '</strong> nanosecond(s).';

    generate_delay(1e6, 'delay_1ms', djnz_time_ns);
}

function generate_delay(time_ns, id, djnz_time_ns) {

    var count = Math.ceil(time_ns / djnz_time_ns - 0.5); // Inherent delay
    if (count <= 0) {
	document.getElementById(id).innerHTML = '; No delay here';
    }
    var quotient = Math.floor(count / 256);
    var remainder = count % 256;

    if (quotient == 0) {
	document.getElementById(id).innerHTML = 
	    '    MOV R7, #' + remainder + '\n' +
	    '    DJNZ R7, $';

    } else {
	document.getElementById(id).innerHTML = 
	    '    MOV R6, #' + (quotient + 1) + '\n' +
	    '    MOV R7, #' + remainder + '\n' +
	    id + '_loop:' + '\n' +
	    '    DJNZ R7, $' + '\n' +
	    '    DJNZ R6, ' + id + '_loop'
    }
}
