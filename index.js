'use strict';

var sketch = function( p ) {

  var screenHeight = window.innerHeight;
  var screenWidth = window.innerWidth;

  var maxNbrOfBranch = 5;
  var maxBranchReduce = 1;
  var maxAngleSize = p.PI/2.5;
  var nrbOfBranches = 2;
  var branchReduce = 0.8;
  var angleSize = p.PI/3;

  p.setup = function() {
    p.createCanvas(screenWidth, screenHeight);
  };

  p.draw = function() {
    p.background(0);

    p.push();
      p.stroke(255);
      p.strokeWeight(10);
      p.translate(p.width/2, p.height);
      drawBranch(0);
    p.pop();

  };

  p.mouseMoved = function () {
    nrbOfBranches = 2 + p.floor((p.mouseX / p.width) * maxNbrOfBranch);
    //branchReduce = 0.1 + ((p.mouseY / p.height) * maxBranchReduce);
    angleSize = p.PI/20 + ((p.mouseY / p.height) * maxAngleSize);
  }

  function drawBranch(deep) {
    if (deep > 5) { return; }
    p.strokeWeight(10 - (deep*2));
    //var lineHeight = (150 * (1 - deep/10)) + p.random(0, 10*deep);
    var lineHeight = (200 * p.pow(branchReduce, deep));
    p.line(0, 0, 0, -lineHeight);

    //var nrbOfBranches = ([2, 2, 2, 3, 3, 4])[p.floor(p.random(6))];
    var anglePart = (angleSize)/nrbOfBranches;
    var base  = (-(angleSize / 2)) + anglePart/2;
    for (var i = 0; i < nrbOfBranches; i++) {
      p.push()
        p.translate(0, -lineHeight);
        p.rotate(base + anglePart*i);
        drawBranch(deep+1);
      p.pop()
    }
  }
};


var myp5 = new p5(sketch);
