var app;

(function(){

  function initialize(){

    this.$createArcher = $('#create-archer');
    this.$createArcher.on('click', $.proxy(this, 'createArcher' ));

    this.$canvas = $('#canvas');
    this.$army = $('#army');

    this.units = [];

    resources.load([
      'archer-sprite.png',
      'background.png'
    ]);

    resources.onReady(app.renderBackground);

    // Create the canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 512;
    this.canvas.height = 480;
    this.$canvas.html(this.canvas);
  }

  function renderBackground(){
    var terrainPattern = app.ctx.createPattern(resources.get('background.png'), 'repeat');
    app.ctx.fillStyle = terrainPattern;
    app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
  }

  function renderEntity(entity){
    this.ctx.save();
    this.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(this.ctx);
    this.ctx.restore();
  }

  function Archer(posx, posy){
    this.health = 10;
    this.pos = [posx, posy];
    this.sprite = new Sprite(
      'archer-sprite.png',  //url
      [5, 10],              //pos
      [53, 53]              //size
      // 20,                //speed
      // [0,1,2,3,4,5,6,7,8,9,10,11] //frames
    );
  }

  Archer.prototype.move = function(){
    console.log('archer prototype');
  };

  Archer.prototype.injure = function(){
    this.health = this.health - 1;
  };

  Archer.prototype.template = function(){
    return '<div class="unit"><button class="unit-forward">^</button></div>';
  };

  function createArcher(){
    // need a way to update positions
    var posx = 200, posy = 200, lastArcher, archer;

    if (this.units.length){
      lastArcher = this.units[this.units.length - 1];
      posx = lastArcher.pos[0] + 53;
    }

    archer = new this.Archer(posx, posy);

    this.units.push(archer);
    this.renderEntity(archer);
    this.$army.append(archer.template());
  }

  app = {
    Archer: Archer,
    initialize: initialize,
    renderBackground: renderBackground,
    createArcher: createArcher,
    renderEntity: renderEntity
  };

})();

app.initialize();

// (function() {
//  wrap everyting in anothe IFFEE
//   app = require('app');
//   app.initialize();
  
// })();