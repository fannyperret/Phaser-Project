window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-project',
    {
      preload: preload,
      create: create,
      update: update,
      distanceToPointer: distanceToPointer,
      moveToXY: moveToXY,
      render: render
    });

    var sprite;
    var counter = 0;
    var step = Math.PI * 2 / 360 ;

    var music;

    var content = [
    " ",
    "Sydo présente...",
    "Une production Sydo :",
    "Sydologie",
    " ",
    "Dirigé par Sydo",
    "Créé par Sydo",
    " ",
    "Ici tu verras des jeux pédagogiques",
    "pour apprendre en t'amusant !",
    "Click sur l'écran pour commencer !"

];
    var text;
    var index = 0;
    var line = '';


function preload() {

    // Load images to use as the game sprites
    game.load.image('logo', 'assets/sprites/sydo-logo.jpg');

    game.load.audio('music', 'assets/audio/logo-music.mp3');

};

function create() {

  game.stage.backgroundColor = '#024542';

  music = game.add.audio('music');
  music.onDecoded.add(start, this);

  text = game.add.text(400, 550, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
  nextLine();

  // text = game.add.text(game.world.centerX, 550, 'Serious Game');
  text.anchor.set(0.5);
  text.align = 'center';
  text.fontSize = 30;
  text.fill = '#ffffff';
  text.setShadow(0,0, 'rgba(0, 0, 0, 0.5)', 0);

    // Create sprite and put it in the middle of the stage
    sprite = game.add.sprite(0, 0, 'logo');
    sprite.alpha = 0.5;
    sprite.x = game.width / 2;
    sprite.anchor.x = sprite.anchor.y = 0.5;

};

function update() {

  var offset = moveToXY(game.input.activePointer, text.x, text.y, 8);
  text.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)', distanceToPointer(text, game.input.activePointer) / 30);

    // Move sprite up and down smoothly for show
    var tStep = Math.sin( counter );
    sprite.y = (game.height/2) + tStep * 30 ;
    sprite.rotation += Phaser.Math.degToRad( 0.1 * tStep );
    counter += step ;
};

function updateLine() {

    if (line.length < content[index].length)
    {
        line = content[index].substr(0, line.length + 1);
        // text.text = line;
        text.setText(line);
    }
    else
    {
        //  Wait 2 seconds then start a new line
        game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
    }

}

function nextLine() {

    index++;

    if (index < content.length)
    {
        line = '';
        game.time.events.repeat(80, content[index].length + 1, updateLine, this);
    }

}

function distanceToPointer(displayObject, pointer) {

    this._dx = displayObject.x - pointer.x;
    this._dy = displayObject.y - pointer.y;

    return Math.sqrt(this._dx * this._dx + this._dy * this._dy);

};

function moveToXY(displayObject, x, y, speed) {

    var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);

    var x = Math.cos(_angle) * speed;
    var y = Math.sin(_angle) * speed;

    return { x: x, y: y };

};

function start () {

  music.fadeIn(4000);
};

function render() {

    // Sprite debug info
    game.debug.spriteInfo(sprite, 32, 32);
    // Audio debug info
    game.debug.soundInfo(music, 450, 32);

};

};
