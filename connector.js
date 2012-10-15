Raphael.fn.connect = function(elem, target) {

  var drawToPos = function(elem, x,y) {
    var $elem = $(elem), elemX, elemY, elemW, elemH;
    elemX = $elem.offset().left;
    elemY = $elem.offset().top;
    elemW = $elem.outerWidth();
    elemH = $elem.outerHeight();
    var radius = 10;

    var startX = elemX + (elemW/2);
    var startY = elemY + elemH;

    var cornerBR = 'a 10 10 0 0 0 10 10';
    var cornerRB = 'a 10 10 0 0 1 10 10';

    var cornerBL = 'a 10 10 0 0 1 -10 10';
    var cornerLB = 'a 10 10 0 0 0 -10 10';

    var firstConnection = cornerBR;
    var secondConnection = cornerRB;
    var endX = x-10;

    if ( startX > x ) {
        // right to left
        firstConnection = cornerBL;
        secondConnection = cornerLB;
        endX = x+10;
      }

      if (startX == x) {
        firstConnection = secondConnection = '';
        endX = x;
      }

      var pathString = ['M',startX,startY,'v',((y-startY)/2)].join(' ');

      pathString += [firstConnection,'H',endX,secondConnection,'V',(y)].join(' ');
      console.log(pathString);

      // var path = paper.path(pathString);
      var animPath = ['M',startX,startY].join(' ');
      var path = paper.path(animPath);
      path.attr('stroke', '#d11260').attr('stroke-dasharray', ['- ']).attr('stroke-width', 1.1);
      animPath += ['v',((y-startY)/2)].join(' ');
      path.animate({path: animPath}, 200, function(){
        animPath += firstConnection;

        this.animate({path: animPath}, 200, function(){
          animPath += ['H',endX].join(' ');
          this.animate({path:animPath}, 200, function() {
            animPath += secondConnection;
            this.animate({path: animPath}, 200, function(){
              animPath += ['V',(y)].join(' ');
              this.animate({path: animPath}, 200);
            });
          });
        });
      });
    };

    var drawToElement = function(elem, target) {
      console.log("drawing from " + elem + " to " + target);

      var targetOffset = $(target).offset();
      var randPos = parseInt(Math.random()*2,10);

      if (randPos === 1) {
          // drawToPos(elem, targetOffset.left, targetOffset.top + ($(target).outerHeight()/2));
        } else {
          // drawToPos(elem, targetOffset.left + ($(target).outerWidth()/2), targetOffset.top);
        }
        drawToPos(elem, targetOffset.left + ($(target).outerWidth()/2), targetOffset.top);

      };
      return $(target).each(function(index, target){
        drawToElement(elem, target);
      });
    };