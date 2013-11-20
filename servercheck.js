/* 
 * File which checks for the server
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-19
 */

var server = 'http://renerisha.no-ip.biz:25565';

var space = $('<div></div>');

function setStatus(status) {

 	var button = $('.server_button');

 	button.removeClass('online offline');
 	button.addClass(status);

 	// Change text
 	button.children('.status').html(status);
	space.hide();
	button.fadeIn();

	
 }

function pingServer(ip) {

    $.ajax({
        url: ip,
        timeout: 3000, //set the timeout to 3 seconds
        success: function(){
            setStatus('online');
        },
        error: function(req, err){
           setStatus('online');
        }
    });
}

 $(document).ready(function() {

	var button = $('.server_button');
	var height = button.outerHeight();

	space.height(height);

	space.insertAfter(button);
	
	button.hide();
 	pingServer(server);
 });

window.setInterval(function() {
	pingServer(server);
}, 10000);

