function enemyHit(enemy,bullet){
  
  if(enemy.type > 0){ 
    
    //get rid of the bullet
    bullet.remove();
    //change color
    enemy.shapeColor = 'yellow';
    //subtract health
    enemy.type--;
  }else if(enemy.type === 0){
    //create explosion when bullet hits enemy
    for(var i=0; i<explosionDensity; i++) {
      var p = createSprite(bullet.position.x, bullet.position.y,random(20),random(20));
      
      p.setSpeed(random(3,5), random(360));
      p.friction = 0.95;
      p.life = 15;
    }
    enemyhitSound.amp(1.2);
    enemyhitSound.play();
    enemy.remove();
    bullet.remove();
     score++;
     
     if(score == 10){
      gameState = 'countDown1';
      heroState = 'regular';
    }
    if(score == 25){
    gameState = 'countDown2';
    heroState = 'regular';
     }
  if(score == 45){
    gameState = 'win';
    levelThreeMusic.stop();
    youWinMusic.loop();
  }
  }
}

function heroHit(enemy,hero){
  
  heroState = 'regular';
  
  heroHealth--;
  herohitSound.play();
  if(heroHealth <= 0){
    gameState = 'loose';
    levelOneMusic.stop();
    youLoseMusic.loop();
  }
  enemy.remove();
  hero.shapeColor = 'red';
  
}


function powerHit(powerUp,hero){
  powerUp.remove();
  heroState = "power";
}