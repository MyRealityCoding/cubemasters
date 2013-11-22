/* 
 * File which checks for the server
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-19
 */

function ContentHandler() {

    this.ip = "127.0.0.1";
    this.port = "25566";
    this.name = "mineweb";
    this.website = "https://github.com/MyRealityCoding/mineweb";
    this.forum = "https://github.com/MyRealityCoding/mineweb";
    this.map = "https://github.com/MyRealityCoding/mineweb";

    var content = this;

    $.ajax({
                type: "GET",
                url: "config.json",
                dataType: "json",
                crossDomain: true,
                async: false,
                success: function(data) {
                    content.ip = data['ip'];
                    content.port = data['port'];
                    content.name = data['name'];
                    content.website = data['website'];
                    content.forum = data['forum'];
                    content.map = data['map'];
                }
     });


}

var content = new ContentHandler();

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

function update() {
	$.ajax({
                type: "GET",
                url: "proxy.php?url=http://" + content.ip + ":" + content.port,
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

function setContent() {
    $('.ip').html(content.ip);
    $('.server_button').attr('href', content.website);
    $('#map').attr('href', content.map);
    $('#forum').attr('href', content.forum);
    $('.banner').html(content.name);
}

function generatePlayers(players) {

    var player_count = 4;
    var container = $('.players');

    for (var i = 0; i < player_count; ++i) {

        var element = '<div class="player button table"><div class="icon cell"><img src="img/icon-online.png" /></div><div class="name cell">Player name</div></div>';

        container.append(element);
    }
}

 $(document).ready(function() {
	var button = $('.server_button');
	var height = button.outerHeight();
	space.height(height);
	space.insertAfter(button);	
	button.hide();
    setContent();
 	update();
    generatePlayers(null);

 });

window.setInterval(function() {
	update();
}, 10000);

