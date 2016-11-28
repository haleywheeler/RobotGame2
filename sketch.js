// resize the canvas, but keep the 9:16 aspect ratio

var canvasMultiplier = 40;

//make an enemy every so many frames
var enemyRate1 = 70;
var enemyRate2 = 56;
var enemyRate3 = 20;
var powerRate = 400;
var enemyAngle = 0;
var enemyDrunkness = 50;
// drunk direction is the magnitude of direction shifts
var enemyDrunkDirection = 2;
var heroSpeed = 8;
var explosionDensity = 20;
var score = 0;
var gameState = 'startUp';
var heroHealth = 3;

//declare the sound effects
var shootSound;
var herohitSound;
var enemyhitSound;

//declare the MUSIC
var levelOneMusic;
var levelTwoMusic;
var levelThreeMusic;
var TitleScreenMusic;
var youLoseMusic;
var youWinMusic;

//declare the hero
var hero;
//declare heroState
var heroState = 'regular';


//declare sprite GROUP
var bullets;
var enemies; 

//declare the powerup sprite
var powerUps;
var powerUpImg;

//variable for health
var health_end,health_half,health_full;

//declare the backgrounds
var titleScreen,bg_levelOne,bg_levelTwo,bg_levelThree,youWin,youLose,countdownImg;

// declare enemy sprite images
var enemyOneImg,enemyTwoImg,enemyThreeImg;

//hero animation variables
var heroDefault,heroLeft,heroRight;

var count1Downtimer = 0;
var count2Downtimer = 0;

var level1ScoreAdvance = 1;
var level2ScoreAdvance = 2;

//Use preload to load any media before the application starts
function preload(){
  
  shootSound = loadSound("assets/lazer.mp3");
  herohitSound = loadSound("assets/herohit.mp3");
  enemyhitSound = loadSound("assets/enemyhit.mp3");
  
  levelOneMusic = loadSound("assets/level1music.mp3");
  levelTwoMusic = loadSound("assets/level2music.mp3");
  levelThreeMusic = loadSound("assets/level3music.mp3");
  titleScreenMusic = loadSound("assets/titlescreenmusic.mp3");
  youWinMusic = loadSound("assets/youwinmusic.mp3");
  youLoseMusic = loadSound("assets/youlosemusic.mp3");
  
  titleScreen = loadImage("assets/titleScreen.png");
  bg_levelOne = loadImage("assets/bg_level1.png");
  bg_levelTwo = loadImage("assets/bg_level2.png");
  bg_levelThree = loadImage("assets/bg_level3.png");
  countdownImg = loadImage("assets/countdownImg.png");
  youWin = loadImage("assets/youwin.png");
  youLose = loadImage("assets/youlose.png");
  
  
  enemyOneImg = loadAnimation("enemyone/enemyone_00000.png","enemyone/enemyone_00023.png");
  enemyTwoImg = loadAnimation ("enemytwo/enemytwo_00000.png","enemytwo/enemytwo_00023.png");
  enemyThreeImg = loadAnimation ("enemythree/enemythree_00000.png","enemythree/enemythree_00023.png");
  
  powerUpImg = loadAnimation ("powerup/powerup_00000.png","powerup/powerup_00011.png");
  /*health_end = loadImage()
  health_half = loadImage()
  health_full = loadImage()*/
  
  heroDefault = loadAnimation("herosprite/herodefault_00000.png","herosprite/herodefault_00023.png");
  heroDefault.frameDelay = 0;
  heroLeft = loadAnimation("heroleft/heroleft_00000.png","heroleft/heroleft_00009.png");
  //make sure this animation does not loop
  heroLeft.looping = false;
  //control the speed of the animation, 1 would make it faster, 3 would make it slower
  heroLeft.frameDelay = 3;
  
  heroRight = loadAnimation("heroright/heroright_00000.png","heroright/heroright_00009.png");
  heroRight.looping = false;
  heroLeft.frameDelay = 3;
  
}

function setup() {
  
  var tempWidth = canvasMultiplier * 9;
  var tempHeight = canvasMultiplier * 16;
  createCanvas(tempWidth,tempHeight);
  titleScreenMusic.loop();
  
   //initialize bullets as a group of sprites
  bullets = new Group();
  enemies = new Group();
  powerUps = new Group();
  
  // load the hero image
  var heroImg = loadImage("assets/herosprite.png");

  //define the hero sprite in the middle towards the bottom 
  hero = createSprite(width/2, height*.8, 30, 30);
  
  // give the hero sprite some friction
  //decrease number to increase friction, increase number to decrease friction
  hero.friction = 0.85;
  
  //add all animations to the hero
  hero.addAnimation("heroLeft", heroLeft);
  hero.addAnimation("heroRight", heroRight);
  hero.addAnimation("heroDefault", heroDefault);
  //start animatiing with the default
  hero.changeAnimation("heroDefault");
  

  }

function draw() {
  
  switch(gameState){
    case 'startUp':
      background(titleScreen);
      break;
      
    case 'loose':
      background(youLose);
      break;
      
    case 'win':
      background(youWin);
      break;
      
    case 'levelOne':
      levelOne();
      break;
      
    case 'levelTwo':
      levelTwo();
      break;
      
    case 'levelThree':
    levelThree();
    break;
    
    case 'countDown1':
      background(countdownImg);
      textSize(32);
      //only runs the first time through the countdown
      if(count1Downtimer === 0){
        count1Downtimer = frameCount;
      }
      var flooredCount = floor((frameCount - count1Downtimer)/50);
      //this runs every time
      textAlign(CENTER);
      textSize(150);
      if((3 - flooredCount) <= 0){
        
        text("GO!",width/2,400);
      }else{
        text(3 - flooredCount,width/2,400);
      }
      
      //advance to level 2
      if(flooredCount > 3){
        gameState = "levelTwo";
        levelOneMusic.stop();
        levelTwoMusic.loop();
        
      }
      break;
      
      case 'countDown2':
      background(countdownImg);
      textSize(32);
      //only runs the first time through the countdown
      if(count2Downtimer === 0){
        count2Downtimer = frameCount;
      }
      var flooredCount = floor((frameCount - count2Downtimer)/50);
      //this runs every time
      textAlign(CENTER);
      textSize(150);
      if((3 - flooredCount) <= 0){
        
        text("GO!",width/2,400);
      }else{
        text(3 - flooredCount,width/2,400);
      }
      
      //advance to level 3
      if(flooredCount > 3){
        gameState = "levelThree";
        levelTwoMusic.stop();
        levelThreeMusic.loop();
        
      }
      break;
  }
}

function keyPressed(){
 
  if (keyCode == RIGHT_ARROW) {
    //provide a burst of speed to the right (zero degrees)
    hero.setSpeed(heroSpeed,0);
    //change to the left turn animation
    hero.changeAnimation("heroRight");
    //start at the beginning
    hero.animation.changeFrame(0);
  } else if (keyCode == LEFT_ARROW) {
   //provide a burst of speed to the left (180 degress)
    hero.setSpeed(heroSpeed,180);
    //change to the left turn animation
    hero.changeAnimation("heroLeft");
    //start at the beginning
    hero.animation.changeFrame(0);
  } else if(key == ' '){
    
    shootSound.play();
    
    if(heroState == 'regular'){
    //create bullet at the location of the hero and set the size
    var bullet = createSprite(hero.position.x, hero.position.y,5,5);
    //set the speed and direction of the bullet
    bullet.setSpeed(20,270);
    //make the bullet dissappear after a certain number of frames
    bullet.life = 50;
    bullet.shapeColor = 'white';
    //add the singular bullet to the GROUP bullets
    bullets.add(bullet);
  }
  
  if(heroState == 'power'){
      for(var i = 0;i < 3;i++){
        //create bullet at the location of the hero and set the size
        var bullet = createSprite(hero.position.x, hero.position.y,5,5);
        //set the speed and direction of the bullet
        var angle = 255 + (i*15);
        bullet.setSpeed(20,angle);
        //make the bullet dissappear after a certain number of frames
        bullet.life = 50;
        bullet.shapeColor = 'white';
        //add the singular bullet to the GROUP bullets
        bullets.add(bullet);
      }
  }
  }
}

function keyTyped(){
  if(key === 'x'){
     gameState = 'levelOne';
     titleScreenMusic.stop();
     levelOneMusic.loop();
  }
}
