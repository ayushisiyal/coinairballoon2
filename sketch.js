var bg, ballon;
var bgimg, balloonimg,bird1,bird2,bird3;
var coinimg;
var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


var birdgroup, coingroup;

function preload(){
bgimg= loadImage("bg.jpg");
balloonimg= loadImage("ballon.png");
bird1= loadImage("bluebird.png");
bird2= loadImage("bluebird1.png");
bird3= loadImage("pinkbird.png");
coinimg= loadImage("coin.png")
}

function setup(){
createCanvas(windowWidth, windowHeight);

bg= createSprite(width/2, height/2,width,height);
bg.addImage("background-img", bgimg);
bg.scale=0.6;

balloon=createSprite(width/2, height/2-100,40,50);
balloon.addImage("ballonimg", balloonimg);
balloon.debug=true;
balloon.setCollider("rectangle", 0,0,100,200)
score=0;

coingroup=createGroup();

birdgroup=createGroup();
}

function draw(){
background("cyan");


console.log(score);
if(gameState===PLAY){
  balloon.velocityY=1;

  if(keyDown("space")){
    balloon.y= balloon.y-10;
  }
  
  if(keyDown(LEFT_ARROW)){
    balloon.x= balloon.x-5;
  }
  
  if(keyDown(RIGHT_ARROW)){
    balloon.x= balloon.x+5;
  }
  
  if(coingroup.isTouching(balloon)){
    score=score+1;
    coingroup.get(0).destroy();
  }
  
  if(birdgroup.isTouching(balloon)){
    gameState=END;
  }
    
  spawnBirds3();
  spawnBirds1();
  spawnBirds2();
  spawnCoins();
}
else if (gameState === END) {
background("black");
text("Game over",width/2, height/2);
}
fill("black")
textSize(20);
text("Score : " +score, 100,100);
drawSprites();
}

function spawnBirds1() {
 
  if (frameCount % 220 === 0) {
    bird = createSprite(width,200,40,10);
    bird.y = Math.round(random(50,350));
    bird.addImage("bluebird", bird1);
    bird.scale = 0.3;
    bird.velocityX = -5;       
   
    birdgroup.add(bird);
  }
}
function spawnBirds2() {
 
  if (frameCount % 260 === 0) {
     bird = createSprite(-10,200,40,10);
    bird.y = Math.round(random(150,350));
    bird.addImage("bluebird", bird2);
    bird.scale = 0.3;
    bird.velocityX = 5;       
   
    birdgroup.add(bird);

  }
}
function spawnBirds3() {
 
  if (frameCount % 1000=== 0) {
     bird = createSprite(width,200,40,10);
    bird.y = Math.round(random(50,350));
    bird.addImage("bluebird", bird3);
    bird.scale = 0.3;
    bird.velocityX = -4;       
   
    birdgroup.add(bird);

  }
}

function spawnCoins(){
  if(frameCount%100 ===0){
    coin=createSprite(50,-10,30,30);
    coin.debug=true;
    coin.x= Math.round(random(50, width-50));
    coin.addImage("con img", coinimg);
    coin.velocityY=3;
    coin.scale=0.2;
    coingroup.add(coin);
    coin.setCollider("rectangle", 0,0,50,100)
  }

}
















/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
   restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("rectangle", 0, 0, 250, 80, 0);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4- 3*score/100;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if(score%100 == 0 && score>0){
      checkPointSound.play();
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        jumpSound.play();
        trex.velocityY = -12;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
       /// gameState = END;
       // dieSound.play();
       jumpSound.play();
       trex.velocityY = -12;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6-score/100;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

*/