 function levelTwo(){
   
  //setup the enemy to be created ever 30 frames
  if(frameCount%enemyRate2 === 0){
    //make an enemy at the top, random X
    var enemy = createSprite(random(width), 0,40,40);
    //set the speed and direction of the bullet
    enemy.setSpeed(2,random(90 - enemyAngle,60 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    enemy.life = 400;
    //we are going to store the enemy health in the .type parameter
    enemy.type = 0;
    //add the image that was loaded in the preload
    
    enemy.addAnimation("enemyTwoImg", enemyTwoImg);
    enemy.changeAnimation("enemyTwoImg");
    
    //add the singular bullet to the GROUP bullets
    enemies.add(enemy);
    
  }
  
  //NOW FOR POWERUPS
  if(frameCount%powerRate === 0){
    //make an enemy at the top, random X
    var powerUp = createSprite(random(width), 0,40,40);
    //set the speed and direction of the bullet
    powerUp.setSpeed(3,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    powerUp.life = 200;
    //add the image that was loaded in the preload
    //enemy.addImage(enemyOneImg);
    
    powerUp.addAnimation("powerUpImg",powerUpImg);
    powerUp.changeAnimation("powerUpImg")
    
    powerUps.add(powerUp);
    
  }
  
  //eneimes.length returns the current length of the enemies array
  /*
  for(var i = 0;i < enemies.length;i++ ){
    if(enemies[i].position.x > width){
      enemies[i].position.x = 0;
    }
    if(enemies[i].position.x < 0){
      enemies[i].position.x = width;
    }
  }*/
  
  /* THIS IS CODE FOR BOUNCING ENEMIES ON THE X
  for(var i = 0;i < enemies.length;i++){
    // || is the OR symbol && is the AND symbol
    if(enemies[i].position.x > width || enemies[i].position.x < 0){
      enemies[i].velocity.x *= -1;
    }
    
  }
  */
  
   //THIS IS THE CODE FOR RANDOM ENEMY MOVEMENT
  for(var i = 0;i < enemies.length;i++){
    //a technique for timing something randomly
    if(random(90) < enemyDrunkness){
      enemies[i].velocity.x += random(-enemyDrunkDirection,enemyDrunkDirection);
    }
    
    // || is the OR symbol && is the AND symbol
    if(enemies[i].position.x > width || enemies[i].position.x < 0){
      enemies[i].velocity.x *= -1;
    }
  } 
  
  
  
  
  
  
  
  background(bg_levelTwo);
  //test any overlap
  //first group name.overlap(second group,callback function)
  enemies.overlap(bullets,enemyHit);
  //did the enemy hit the hero?
  enemies.overlap(hero,heroHit);
  powerUps.overlap(hero,powerHit);
  
  
 
 
  textSize(32);
  text("score " + score, 10, 30);
  text("health " + heroHealth,10, 60);
  //this changes the healthbar pictures
  /*text("health ",10, 60);
    switch(heroHealth){
      case 1:
        image(health_end,40,60);break;
      case 2:
        image(health_half,40,60);break;
      case 3:
        image(health_full,40,60);break;
    }*/
    
  //use this in every p5play program
  // only call it once per frame, almost always at the end of the draw

  
  //find out if we are playing the left turn animation
  //is the left turn animation over?
  if(hero.getAnimationLabel() == "heroLeft" && hero.animation.getFrame() === hero.animation.getLastFrame()){
      hero.changeAnimation("heroDefault");
      //start at the the beginning
      hero.animation.changeFrame(0);
    }
    
  if(hero.getAnimationLabel() == "heroRight" && hero.animation.getFrame() === hero.animation.getLastFrame()){
      hero.changeAnimation("heroDefault");
      //start at the the beginning
      hero.animation.changeFrame(0);
    }
    
    
  drawSprites();
  
}