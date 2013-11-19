/* 
 * File which checks for the server
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-19
 */

var server = 'http://renerisha.no-ip.biz:25565';

function setStatus(status) {

 	var button = $('.server_button');

 	button.removeClass('online offline');
 	button.addClass(status);

 	// Change text
 	button.children('.status').html(status);
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
 	pingServer(server);
 });

window.setInterval(function() {
	pingServer(server);
}, 10000);

