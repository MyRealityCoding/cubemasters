/* 
 * Contains all animations (minecraft creatures)
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-20
 */

 function build() {

 	var head = $('#head');
 	var width = head.width();
 	var height = head.height();
 	head.append('<canvas id="canvas" width="' + width + '" height="' + height + '"></canvas>');
 	var canvas = $('#canvas');
 	canvas.css({
 		position:"relative",
 		marginTop: -height
 	});
 }

 function Sprite(image, x, y, width, height) {

        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.getLeft = function() {
            return this.x;
        }

        this.getTop = function() {
            return this.y;
        }

        this.getWidth = function() {
            return this.width;
        }

        this.getHeight = function() {
            return this.height;
        }

        this.getRight = function() {
            return this.getX() + this.getWidth();
        }

        this.getBottom = function() {
            return this.getY() + this.getHeight();
        }

        this.update = function(delta) {

        };

        this.render = function(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        };

        this.updateAndRender = function(context, delta) {
            this.update(delta);
            this.render(context);
        };
}

function renderArray(data, context, delta) {
    for (var i = 0; i < data.length; ++i) {
        var sprite = data[i];
        sprite.updateAndRender(context, delta);
    }
}



 $(document).ready(function() {

 	var creeper = new Image();
    creeper.src = "img/creeper.png";

 	build();

	var sprites = new Array();
 	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var intervalID = -1;
    var currentTime = +new Date();
    var lastTime = currentTime;
    var delta = currentTime - lastTime;
    var creperCount = 4;

    for (var i = 0; i < creperCount; ++i) {
            sprites[i] = new Sprite(creeper, 0, 0, 25, 50);
    }

    var renderingLoop = function () {

    	lastTime = currentTime;
        currentTime = +new Date();       
        delta = currentTime - lastTime;

        context.clearRect(0, 0, canvas.width, canvas.height); 

		renderArray(sprites, context, delta);

    	QueueNewFrame();
 	}

 	var QueueNewFrame = function () {

        if (window.requestAnimationFrame)
            window.requestAnimationFrame(renderingLoop);
        else if (window.msRequestAnimationFrame)
            window.msRequestAnimationFrame(renderingLoop);
        else if (window.webkitRequestAnimationFrame)
            window.webkitRequestAnimationFrame(renderingLoop);
        else if (window.mozRequestAnimationFrame)
            window.mozRequestAnimationFrame(renderingLoop);
        else if (window.oRequestAnimationFrame)
            window.oRequestAnimationFrame(renderingLoop);
        else {
            QueueNewFrame = function () {
            };
            intervalID = window.setInterval(renderingLoop, 16.7);
        }
    };

    renderingLoop();
 });