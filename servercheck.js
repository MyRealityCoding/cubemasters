/* 
 * File which checks for the server
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-19
 */

function setStatus(status) {

 	var button = $('.server_button');

 	button.removeClass(status + 'offline');
 	button.addClass(status);

 	// Change text
 	button.children('.status').html(status);
 }

 function checkStatus() {
 	$.ajax({
		type: 'GET',
		url: 'http://renerisha.no-ip.biz',
		timeout: 15000,
		success: function(data) { 
			setStatus('online'); 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			setStatus('offline'); 
		}
	});
 }

 $(document).ready(function() {
 	checkStatus();
 });

window.setInterval(function() {
	checkStatus();
}, 10000);

