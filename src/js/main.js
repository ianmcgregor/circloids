'use strict';

var Boid = require('./utils/boid.js'),
    Graphics = require('./utils/graphics.js'),
    randomColor = require('randomColor'),
    FPS = require('FPS'),
    Keyboard = require('Keyboard');

(function() {

    var boids = [],
        colors = randomColor({ count: 50, format: 'rgb' }),
        options = [
            { size: 400, decrement: 1 },
            { size: 800, decrement: 20 },
            { size: 800, decrement: 4 },
            { size: 100, decrement: 0.1 },
            { size: 8, decrement: 0.01 }
        ],
        size = 0,
        decrement = 0,
        fps = new FPS();

    Graphics.init();

    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        var boid = new Boid();
        boid.setBounds(Graphics.width, Graphics.height);
        boid.position.x = Graphics.width * Math.random();
        boid.position.y = Graphics.height * Math.random();
        boid._maxSpeed = 5;
        boid.color = color;
        boids.push(boid);
    }

    function start() {
        Graphics.clear();
        var opt = options[Math.floor(options.length * Math.random())];
        size = opt.size;
        decrement = opt.decrement;
        loop();
    }

    function update() {
        for (i = 0; i < boids.length; i++) {
            var boid = boids[i];
            boid.wander();
            boid.update();
        }
        fps.update();
    }

    function render() {
        //Graphics.clear();
        for (i = 0; i < boids.length; i++) {
            var boid = boids[i];
            Graphics.fill(boid.color);
            Graphics.circle(boid.position.x, boid.position.y, size);

        }
        size-=decrement;
    }

    function loop() {
        if(size > 0) {
            window.requestAnimationFrame(loop);
            update();
            render();
        }
    }
    start();

    window.addEventListener('resize', function() {
        Graphics.size();
    });

    function refresh() {
        if(size > 0) { return; }
        start();
    }

    document.addEventListener('keyup', function(event) {
        switch(event.keyCode) {
            case Keyboard.SPACEBAR:
                refresh();
                break;
            case Keyboard.I:
                Graphics.openImage();
                break;
            default:
            break;
        }
    });

    document.body.addEventListener('click', refresh);
}());