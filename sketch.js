var gun
var gunShot
var backgroundImage
var gunImage
var gunShotImage
var backgroundboard
var Bomb
var BombImage
var Bubble
var BubbleImage
var Blast
var gameOverImage
var gameOver
var Score=0
var Life=3
var gameState='play'


function preload()
{
  backgroundImage=loadImage('back.jpg')
  gunImage=loadImage('gun1.png')
  BombImage=loadImage('redbubble.png')
  BubbleImage=loadImage('waterBubble.png')
  gunShotImage=loadImage('bullet1.png')
  gameOverImage=loadImage('gameOver.png')
}






function setup()
{
  createCanvas(800,800)
  backgroundboard=createSprite(50,width/2,100,height)
  backgroundboard.addImage('back',backgroundImage)
  
  gun=createSprite(100,height/2,50,50)
  gun.addImage('gun',gunImage)
  gun.scale=0.2

  BombsGroup=new Group()
  GunShotGroup=new Group()
  BubblesGroup=new Group()

  gameOver=createSprite(400,400)
  gameOver.addImage(gameOverImage)
}


function draw()
{
  if(gameState==='play')
  {
    gameOver.visible=false
    if(GunShotGroup.isTouching(BombsGroup))
  {
   GunShotGroup.destroyEach()
    BombsGroup.destroyEach()
    Score=Score+1
    
  }


  if(GunShotGroup.isTouching(BubblesGroup))
  {
   GunShotGroup.destroyEach()
    BubblesGroup.destroyEach()
    Score=Score+1
    
  }
  if(BombsGroup.isTouching(gun))
  {
    Life=Life-1
    BombsGroup.destroyEach()
  }


  gun.y=mouseY


  spawnBombs()
    spawnBubbles()
    //keyPressed()
    
    
    if(Life===0)
    {
      gameState='end'
    }
  }
  if(gameState==='end')
  {
    gun.velocityY=0
    BombsGroup.setVelocityXEach(0)
    BubblesGroup.setVelocityXEach(0)
    BombsGroup.setLifetimeEach(-1)
    BubblesGroup.setLifetimeEach(-1)
    gameOver.visible=true
  }
  
 

  




  /*if(BombsGroup.isTouching(gun))
  {
    BombsGroup.destroyEach()
    fill('red')
    text('You Lose',230,70)
  }
    */



     background('#BDA297')
     
    drawSprites()
    textSize(20)
    fill('white')
    text('Score='+Score,281,30)
    text('Life='+Life,500,30)


  
    


    
}


function spawnBombs()
{
   if(frameCount%300==0)
   {
     Bomb=createSprite(800,random(0,800),10,10)
     Bomb.velocityX=-5
     Bomb.addAnimation('BombMoving',BombImage)
     Bomb.scale=0.1
     Bomb.lifetime=200
     BombsGroup.add(Bomb)

   }

}


function spawnBubbles()
{
  if(frameCount%110==0)
  {
    Bubble=createSprite(800,random(0,800),10,10)
    Bubble.velocityX=-5
    Bubble.addAnimation('BubbleMoving',BubbleImage)
    Bubble.scale=0.1
    Bubble.lifetime=200
    BubblesGroup.add(Bubble)
  }
}


function keyPressed()
{
  //if(keyDown('space'))
  if(keyCode===32)
  {
     gunShot=createSprite(gun.x,gun.y)
     gunShot.addAnimation('gunShot',gunShotImage)
     gunShot.scale=0.2
     gunShot.velocityX=7
     GunShotGroup.add(gunShot)


  }
}


