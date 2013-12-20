/* **********************************************************************
 * Author:  Jks Liu(chinatianma@gmail.com)
 * License: Public Domain
 * **********************************************************************/

function main() {
    /* All time in this script are nanosecond */
    
    var clock = document.getElementById('clock').value;    
    var machine_cycle = document.getElementById('machine cycle').value;
    var djnz_cycle = document.getElementById('djnz cycle').value;
    document.getElementById('echo').innerHTML =
	'Your clock is <strong>' + clock + '</strong> MHz.<br/>' +
	'Your machine cycle is <strong>' + machine_cycle + '</strong>.<br/>' +
	'Your DJNZ cycle is <strong>' + djnz_cycle + '</strong>.';

    document.getElementById('condition').innerHTML =
	';     Clock is ' + clock + 'MHz\n' +
	';     Machine cycle is ' + machine_cycle + '.\n' +
	';     DJNZ instruction cycle is ' + djnz_cycle +'.';

    var period = 1e9 / (clock * 1e6);
    var machine_period = period * machine_cycle;
    var djnz_period = machine_period * djnz_cycle;

    function generate_delay(time, name) {
	var count = Math.ceil((time - machine_period) / djnz_period);
	var quotient = Math.floor(count / 256);
	var remainder = count % 256;

	elements = document.getElementsByName(name);
	
	for (var i = 0; i < elements.length; ++i) {
	    if (count <= 0) {
		elements[i].innerHTML = '    ; No delay here';
	    } else if (quotient == 0) {
		elements[i].innerHTML = 
		    '    MOV R7, #' + remainder + '\n' +
		    '    DJNZ R7, $';
		
	    } else {
		elements[i].innerHTML = 
		    '    MOV R6, #' + (quotient + 1) + '\n' +
		    '    MOV R7, #' + (remainder + 1) + '\n' + /* remainder MAYBE 0 */
		    elements[i].id + '_loop:' + '\n' +
		    '    DJNZ R7, $' + '\n' +
		    '    DJNZ R6, ' + elements[i].id + '_loop';
	    }
	}
    }
    
    
    generate_delay(1e6, 'delay_1ms');
    generate_delay(1e3, 'delay_1us');
    generate_delay(2e3, 'delay_2us');
    generate_delay(58e3, 'delay_58us');
    generate_delay(60e3, 'delay_60us');
    generate_delay(420e3, 'delay_420us');
    generate_delay(480e3, 'delay_480us');
}
