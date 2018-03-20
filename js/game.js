
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-project');

game.state.add('Scene1', sc1State);
game.state.add('Scene2', sc2State);
game.state.add('Scene3', sc3State);
game.state.add('Scene4', sc4State);

game.state.start('Scene1');
