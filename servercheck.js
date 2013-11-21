/* 
 * File which checks for the server
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-19
 */

var server = 'http://renerisha.no-ip.biz';
var minecraftPort = 25565;
var minewebPort = 25566;

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
        port: minecraftPort,
        success: function(){
            setStatus('online');
        },
        error: function(req, err){
           setStatus('offline');
        }
    });
}

function update(ip) {
	$.ajax({
                type: "GET",
                url: "proxy.php?url=" + ip + ":" + minewebPort,
                dataType: "json",
                crossDomain: true,
                async: true,
                success: function(data) {
                    // DO SOMETHING
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
 	update(server);

 });

window.setInterval(function() {
	pingServer(server);
	update(server);
}, 10000);

