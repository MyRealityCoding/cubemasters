/* 
 * File which checks for the server
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-19
 */

//var server = 'http://renerisha.no-ip.biz';
//var port = 25566;
var server = 'http://localhost';
var port = 12345;

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

function update(ip) {
	$.ajax({
                type: "GET",
                url: "proxy.php?url=" + ip + ":" + port,
                dataType: "json",
                crossDomain: true,
                async: true,
                timeout: 1000,
                success: function(data) {
                    setStatus('online');
                },
                error: function(req, err) {
                	setStatus('offline');
                }
            });
}

 $(document).ready(function() {

	var button = $('.server_button');
	var height = button.outerHeight();

	space.height(height);

	space.insertAfter(button);
	
	button.hide();
 	update(server);

 });

window.setInterval(function() {
	update(server);
}, 10000);

