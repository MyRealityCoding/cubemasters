/* 
 * Contains all animations (minecraft creatures)
 *
 * Author:  Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Created: 2013-11-20
 */

 function build() {

 	var head = $('#head');
 	width = head.width();
 	height = head.height();
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
        this.behavior = null;

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
        	if (this.behavior != null) {
        		this.behavior.update(delta);
        	}
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

function MovingBehavior(target, speed) {

	this.target = target;
	this.leftMode = Math.random() < 0.5;
	this.waitTime = 35000 * Math.random();
    this.initialWaitTime = this.waitTime;
	this.speed = speed + 0.2 * Math.random();
	this.walkTime = 0;

	if (!this.leftMode) {
        this.target.x = width;  
    } else {
    	this.target.x = -target.width;
    }

    this.target.y = height - this.target.height;

	this.update = function(delta) {

		this.waitTime -= delta;

            if (this.waitTime < 1) {
                this.walkTime += 0.1 * Math.random();
                var factor = this.speed + Math.abs(Math.sin(this.walkTime));
                if (this.leftMode) {
                    this.target.x += factor;
                } else {
                    this.target.x -= factor;
                }
            }

            if (this.leftMode && this.target.x > width) {
                this.target.x = -(width);
                this.waitTime = this.initialWaitTime;
            } else if (this.target.x + width < 0) {
                this.target.x = width;
                this.waitTime = this.initialWaitTime;
            }
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
    var creperCount = 10;

    for (var i = 0; i < creperCount; ++i) {
            sprites[i] = new Sprite(creeper, 0, 0, 25, 50);
            sprites[i].behavior = new MovingBehavior(sprites[i], 0.6);
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