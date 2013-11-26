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
                timeout: 2000,
                success: function(data) {
                    setStatus('online');
                    generatePlayers(data['players']);

                },
                error: function(xhr, status, error) {
                	setStatus('offline');
                    console.log("jqXHR: " + xhr.status + "\ntextStatus: " + status + "\nerrorThrown: " + error);
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

    var player_count = players.length;
    var container = $('.players');

    container.html("");

    // Order players by level
    players.sort(function(a, b) {
        if (a.level > b.level) {
            return 1;
        } else if (a.level < b.level) {
            return -1;
        } else {
            return 0;
        }
    });

    for (var i = 0; i < player_count; ++i) {
        generatePlayer(players[i], container);
    }
}

function generatePlayer(player, container) {

    var playerState = player.online === 'true' ? 'online' : 'offline';
    var element = '<div class="player ' + playerState + '"><div class="table"><div class="row">';

    if (player.level === '') {
        player.level = 'n/a';
    }

    var level = '<div class="cell"><span class="level">' + player.level + "</span></div>";

    var label = '<div class="cell"><span class="name">' + player.name + '</span></div>';


    element += level;
    element += label;

    container.append(element + '</div></div></div>');

    var namebox = container.children('.player').last().children('.table').last().children('.row').last().children('.cell').last().children('.name');

    if (player.op == 'true') {
        namebox.prepend('<span class="op">(op)</span>');
    }

    if (player.online === 'true') {
        var life = '(' + Math.round(player.health) + '/' + Math.round(player.healthMax) + ')';

        var percentage = player.health * 100 / player.healthMax;
        var lifeClass = 'life';

        if (percentage > 60) {
            lifeClass += ' high';
        } else if (percentage < 60 && percentage > 20) {
            lifeClass += ' medium';
        } else if (percentage > 0 && percentage < 20) {
            lifeClass += ' low';
        }


        if (player.dead === 'true') {
            life = '(dead)';
            lifeClass += ' dead';
        }

        namebox.append('<span class="' + lifeClass + '">' + life + '</span>');
        namebox.append('<span class="xp">(' + Math.round(player.xp * 100) + '% EXP)</span>');
    } else {
        namebox.append(' (Offline)');
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

 });

window.setInterval(function() {
	update();
}, 10000);

