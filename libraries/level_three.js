 function levelThree(){
   
  //setup the enemy to be created ever 30 frames
  if(frameCount%enemyRate3 === 0){
    //make an enemy at the top, random X
    var enemy = createSprite(random(width), 0,40,40);
    //set the speed and direction of the bullet
    enemy.setSpeed(2,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    enemy.life = 400;
    //we are going to store the enemy health in the .type parameter
    enemy.type = 0;
    //add the image that was loaded in the preload
    
    enemy.addAnimation("enemyThreeImg", enemyThreeImg);
    enemy.changeAnimation("enemyThreeImg");
    
    //add the singular bullet to the GROUP bullets
    enemies.add(enemy);
    
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
    if(random(100) < enemyDrunkness){
      enemies[i].velocity.x += random(-enemyDrunkDirection,enemyDrunkDirection);
    }
    
    // || is the OR symbol && is the AND symbol
    if(enemies[i].position.x > width || enemies[i].position.x < 0){
      enemies[i].velocity.x *= -1;
    }
  } 
  
  
  
  
  
  
  
  background(bg_levelThree);
  //test any overlap
  //first group name.overlap(second group,callback function)
  enemies.overlap(bullets,enemyHit);
  //did the enemy hit the hero?
  enemies.overlap(hero,heroHit);
  
  
 
 
  textSize(32);
  text("score " + score, 10, 30);
  text("health " + heroHealth,10, 60);
  //use this in every p5play program
  // only call it once per frame, almost always at the end of the draw
  drawSprites();
  
   println(hero.getAnimationLabel());
  println(hero.animation.getFrame());
  println(hero.animation.getLastFrame());
  
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