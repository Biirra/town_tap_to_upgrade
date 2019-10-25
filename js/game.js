//---------------------------
// Settings
//---------------------------
// Note to self: Next time probably use a setting.json file.
const COINS_PER_TAB = 3;            // The amount of coins that spawn after tab on house. Might slow down performance if set to high. Recomended: 3-4. Can be higher on smaller screens.
const HOUSE_FADEOUT_SPEED = 0.01;   // Next house pops up after house is completely invisible. (0.2 = 5 ticks to become invisible)
const SPAWN_COINS_ON_SPAWN = false; // When the next house spawns. Spawn it with some gold coins.
const SCALE_FOR_DESKTOP = false;    // Scale for larger screens. Desktop, tablet(landscape), long phones(landscape), Ipad Pro

//-------------------------------
// Textures
//-------------------------------
// load images
const backgroundTexture = PIXI.Texture.from('img/background.jpg');

// All house states
const house1Texture = PIXI.Texture.from('img/house01.png');
const house2Texture = PIXI.Texture.from('img/house02.png');
const house3Texture = PIXI.Texture.from('img/house03.png');

// clouds
const cloud01Texture = PIXI.Texture.from('img/cloud01.png');
const cloud02Texture = PIXI.Texture.from('img/cloud02.png');
const cloud03Texture = PIXI.Texture.from('img/cloud03.png');

// progress bar
const barTexture = PIXI.Texture.from('img/bar.png');
const fillbarTexture = PIXI.Texture.from('img/fill_bar.png');

// confetti 
const green_confettiTexture = PIXI.Texture.from('img/green_confetti.png');
const orange_confettiTexture = PIXI.Texture.from('img/orange_confetti.png');
const red_confettiTexture = PIXI.Texture.from('img/red_confetti.png');

// coin
const coinSpritesheet = PIXI.Texture.from('img/coin_spritesheet.png');

// buttons gui
const playnow_btnTexture = PIXI.Texture.from('img/playnow_cta.png');
const instal_btnTexture = PIXI.Texture.from('img/install_cta_endcard.png');
const handTexture = PIXI.Texture.from('img/hand.png');

// text
const TTU_txtTexture = PIXI.Texture.from('img/TAP TO UPGRADE.png');
const greatjob_txtTexture = PIXI.Texture.from('img/text_greatjob_endcard.png');

const shineTexture = PIXI.Texture.from('img/shine.png');

//-------------------------------
// Global variables
//-------------------------------
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas });
const stage = app.stage;
const scene = new Scene();
scene.scaleForDesktop = SCALE_FOR_DESKTOP || false; // stop scaling if screen gets to big.

stage.addChild(scene);
scene.init();

// game loop
app.ticker.add(() => gameLoop());

//-----------------------
// Local Variables
//-----------------------
let lastKnownCoinAmount = 0;
let coins = []; // contains all the coins that require an update.
let confettiContainer = []; // contains all the confetty that require an update
let houses = [scene.house01, scene.house02, scene.house03];
let currentHouse = 0;
let tickCount = 0;  // amount of ticks since the loop started.

/**
 * TODO: 
 * - See if it is better performance to create all the objects before the scene is created.
 * - Add innitials.
 */

function gameLoop(){
  tickCount++;
  if(!houses[currentHouse])
    return;

  let house = houses[currentHouse];
  house.update();

  for(let i = 0; i < coins.length; i++){
    if(coins[i].visible)
      coins[i].update();
  }
  for(let i = 0; i < confettiContainer.length; i++){
    if(confettiContainer[i].visible)
      confettiContainer[i].update();
    // if confetti not in view remove it.
    if(confettiContainer[i].position.y > canvas.height+20){
      confettiContainer[i].visible = false;
      confettiContainer.splice(i, 1);
    }
  }

  if(scene.shine.visible){
    scene.shine.update();
  }

  // when switching to the next house.
  if(!house.visible && houses[currentHouse+1]){
    scene.shine.fadeIn();
    houses[currentHouse+1].fadeIn();
    currentHouse++;
  }

  // last house reached. 
  if(currentHouse === houses.length-1){
    scene.shine.loop = true;
    scene.progressBar.visible = false;
    scene.greatjob_Text.visible = true;
    scene.playnow_btn.visible = false;
    scene.instal_btn.visible = true;
    if(confettiContainer.length < 40){
      if(tickCount % 30 == 0){
        let confetti = createConfetti();
        confettiContainer.push(confetti)
        scene.addChild(confetti);
      }
    }
    return;
  }

  // when house is clicked for the first time.
  if(currentHouse === 0 && house.currentCoins > 0){
    scene.hand.visible = false;
    scene.TTU_Text.visible = false;
  }
  // when house is clicked.
  if(house.currentCoins !== lastKnownCoinAmount){
    // update Progressbar
    scene.progressBar.update();
    if(scene.progressBar.house != house)
      scene.progressBar.house = house;

    // create coin.
    if((house.currentCoins > 0 || SPAWN_COINS_ON_SPAWN)){
      for(let i = 0; i < COINS_PER_TAB; i++){
        let coin = createCoin();
        coin.position.set(canvas.width/2, canvas.height/2 +100);
        coins.push(coin);
        scene.addChild(coin);
      }
    }
    // update last known coin amount.
    lastKnownCoinAmount = house.currentCoins;
  }
}

function createConfetti(){
  let colorPicker = Math.random();
  let green = colorPicker < 0.33;
  let orange = colorPicker > 0.33 && colorPicker < 0.66;
  let red = colorPicker > 0.66;

  // get a texture in random.
  let texture = null;
  if(green)
    texture = green_confettiTexture;
  if(orange)
    texture = orange_confettiTexture;
  if(red)
    texture = red_confettiTexture;

  // create a velocity.
  let velocity = new Vector2d(0, 1.5);

  let result = new Confetti({
    texture:texture,
    velocity:velocity
  });
  let scale = Vector2d.randomVector2d(0.5,1,0.5,1);
  result.scale.set(scale.x, scale.y);

  result.anchor.set(0.5,0.5);
  result.rotation = Math.random() * 360;

  let minX = scene.background.x - scene.background.width/2;
  let maxX = scene.background.x + scene.background.width/2;
  let posX = randomInt(minX, maxX);
  result.position.set(posX, -10);
  

  return result;
}

function createCoin(){
  // create a random framespeed but not to slow.
  let randomFrameSpeed = randomInt(2,4);
  
  // 50% chance of playing the animation in reverse
  let reverse = Math.random() >= 0.5;

  let result = new Coin({
    texture:coinSpritesheet, 
    width:200, 
    height:200, 
    numberOfFrames: randomFrameSpeed,
    numberOfRows:2,
    ticksPerFrame:2,
    reverse:reverse,
    loop:true});

  let scale = Vector2d.randomVector2d(0.3,0.5);
  result.scale.set(scale.x,scale.x);

  result.anchor.set(0.5,0.5);

  // create a random force for velocity.
  let velocity = Vector2d.randomVector2d(3, 10, 3, 10);
  result.velocity = velocity;

  return result;
}

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('resize', () => {
  scene.onRotate();
});
