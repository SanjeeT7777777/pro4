
var ground;
var player;
var  bgImage;
var health;
var restart ; 
var PLAY = 1;
var END = 0;
var RESTART = 2;
var gameState = PLAY;


var helathe1 ;

var e1;
var bulletgroupenemies ;
var bulletgroupplayer ;

function preload (){
bgImage = loadImage("S1.jpg");
playerImage = loadImage("sprite_0.png");
playerImageflip = loadImage("player.png");

enemyImage = loadImage("enemy.png");
enemyImageflip = loadImage("enemy1.png");

bulletImage = loadImage("bullet.png");

}

function setup(){
    var canvas = createCanvas(1200,800);
     player = createSprite (200,600,60,60);
     player.addImage(playerImage);

    

e1= createSprite(285 , 575 , 50 , 50 );
     e1.addImage(enemyImage);
     e1.setCollider("rectangle",0,0,200,100);
    e1.debug = true;
    e1.velocityX = 10;

 restart = createSprite(500,500);
 restart.visible   = false;

bulletgroupenemies = new Group();
bulletgroupplayer = new Group ();
edges = createEdgeSprites();
    
     health = 500;
    healthe1= 100;

}

function draw(){
    background(bgImage);

if (gameState = PLAY){

e1.bounceOff(edges);
       player.bounceOff(edges);

if(bulletgroupplayer.isTouching(e1)){
    healthe1 = healthe1 - 20
}

if(keyDown("space")){
    createbullets();
}

if(keyDown(UP_ARROW)){
            player.y = player.y-10;
}

if(keyDown(DOWN_ARROW)){
            player.y = player.y+10;
}

if(keyDown(LEFT_ARROW) && keyDown ("space")){
           player.x = player.x-10;
            player.addImage(playerImageflip);
            createbulletsflip();
      
}

if(keyDown(RIGHT_ARROW) && keyDown ("space")){
           player.x = player.x+10;
           player.addImage(playerImage);
        createbullets();
}
if(bulletgroupenemies.isTouching(player)){
    health = health - 10 ; 
}
if(health < 0  ){
    player.visible = false;
    gameState = END;
}

if(healthe1 < 0 ){
    e1.visible = false;
    gameState = END;

}
enemies();
}
  if (gameState === END){
    restart.visible = true;
    health = health;
    healthe1 = healthe1 ;


    if(mousePressedOver(restart)  ){
    gameState = RESTART;
    //restart.visible = false ; 
}
}



if(gameState === RESTART ){
    e1.x = 285;
    e1.y= 575;

    player.x = 200;
    player.y = 600

   player.visible = true;
   e1.visible = true;

     restart.visible = false ; 

    health = 500;
    healthe1= 100;
    gameState = PLAY;
}




console.log(gameState)


    drawSprites();

if(health < 0 && gameState === END){
    textSize(26);
    fill("red");
    textFont("Georgia");
    text("DEATH",580,400);
    text("GAMEOVER",580, 450);
}
if(healthe1 < 0 && gameState === END){
    textSize(26);
    fill("red");
    textFont("Georgia");
    text("YOU WON",580,400);
   
}

    textSize(28);
    textFont("Georgia");
    fill("red");
    text("HEALTH:"+health,1000,50)

    textSize(28);
    textFont("Georgia");
    fill("red");
    text("HEALTHe1:"+healthe1,50,50)
    
}

function createbullets () {
    var bullets = createSprite(player.x,player.y,10,20);
    bullets.addImage(bulletImage);
     bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = 15;
    bullets.lifetime = 150;
    bulletgroupplayer.add(bullets);
}
function createbulletsflip () {
    var bullets = createSprite(player.x , player.y,10,20);
     bullets.addImage(bulletImage);
      bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = -15;
    bullets.lifetime = 150;
    bulletgroupplayer.add (bullets)
}
function createbulletsfore1 (pos) {
    var bullets = createSprite(pos.x,pos.y,10,20);
     bullets.addImage(bulletImage);
     bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = 15;
    bullets.lifetime = 150;
    bulletgroupenemies.add (bullets)
}
function createbulletsfore1flip (pos) {
    var bullets = createSprite(pos.x,pos.y,10,20);
     bullets.addImage(bulletImage);
      bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = -15;
    bullets.lifetime = 150;
    bulletgroupenemies.add (bullets)
}



function enemies (){
     
    

    
    if (e1.isTouching(player) && player.x < e1.x ){
        e1.x = 285;
        e1.y = 575;
        e1.addImage(enemyImageflip);
        e1.shapeColor = "red";
        createbulletsfore1flip(e1);
    }
    if (e1.isTouching(player) && player.x > e1.x ){
        e1.x = 285;
        e1.y = 575;
        e1.shapeColor = "red";
        e1.addImage(enemyImage);
        createbulletsfore1(e1);
    }
    

     

}