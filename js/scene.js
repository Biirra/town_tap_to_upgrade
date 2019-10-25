class Scene extends PIXI.Container {
  scaleForDesktop = false;
  init() {
    this.buildScene();
    this.onRotate();
  }
  buildScene() {
    this.buildBackground();
    this.buildClouds();  // Done
    this.buildSpecialEffects();
    this.buildHouses(); // Done
    this.buildGUI();
  }

  buildBackground() {
    this.background = new PIXI.Sprite(backgroundTexture);
    this.background.anchor.set(0.5, 1);
    this.background.x = 0;
    this.background.y = 0;
    this.addChild(this.background);
  }
  buildClouds(){
    // create clouds
    this.cloud_1 = new PIXI.Sprite(cloud01Texture);
    this.cloud_2 = new PIXI.Sprite(cloud02Texture);
    this.cloud_3 = new PIXI.Sprite(cloud03Texture);

    this.cloud_1.anchor.set(0.5,0);
    this.cloud_2.anchor.set(0.5,0);
    this.cloud_3.anchor.set(0.5,0);

    // add clouds to container.
    this.addChild(this.cloud_1);
    this.addChild(this.cloud_2);
    this.addChild(this.cloud_3);
  }
  buildHouses(){
    this.house01 = new House({
      texture: house1Texture,
      coins_for_next_stage: 2,
    });
    
    this.house02 = new House({
      texture: house2Texture,
      coins_for_next_stage: 17
    });
    
    this.house03 = new House({
      texture: house3Texture,
      coins_for_next_stage: 999,
      finished:true // house is not clickable
    });
    
    this.house01.anchor.set(0.5, 1);
    this.addChild(this.house01);
    
    this.house02.anchor.set(0.5, 1);
    this.house02.visible = false;
    this.addChild(this.house02);
    
    this.house03.anchor.set(0.5, 1);
    this.house03.visible = false;
    this.addChild(this.house03);
    
  }
  buildSpecialEffects(){
    this.shine = new Shine({
      texture:shineTexture
    });
    this.shine.scale.set(0.5,0.5);
    this.shine.anchor.set(0.5, 0.5);
    this.addChild(this.shine);

  }
  buildGUI(){
    this.hand = new PIXI.Sprite(handTexture);
    this.addChild(this.hand);

    this.greatjob_Text = new PIXI.Sprite(greatjob_txtTexture);
    this.greatjob_Text.visible = false;
    this.greatjob_Text.anchor.set(0.5,0);
    this.addChild(this.greatjob_Text);

    this.TTU_Text = new PIXI.Sprite(TTU_txtTexture);
    this.TTU_Text.anchor.set(0.5,0.5);
    this.addChild(this.TTU_Text);

    this.instal_btn = new Button(instal_btnTexture);
    this.instal_btn.visible = false;
    this.instal_btn.anchor.set(0.5,1);
    this.addChild(this.instal_btn);

    this.playnow_btn = new Button(playnow_btnTexture);
    this.playnow_btn.anchor.set(0.5,1);
    this.addChild(this.playnow_btn);
    
    this.progressBar = new ProgressBar({
      backgroundTexture: barTexture,
      foregroundTexture: fillbarTexture,
      foreGroundOffset: new Vector2d(11,11),
      house:this.house01
    });
    this.addChild(this.progressBar);
  }

  onRotate() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    let width = 720;
    let height = 970;

    let scale = new Vector2d(canvas.width/ width, canvas.height / height);

    // stop scaling if screen gets to big.
    if(!this.scaleForDesktop){
      if(canvas.width > width){
        scale = new Vector2d(1, scale.y);
      }
      if(canvas.height > height){
        scale = new Vector2d(scale.x,1);
      }
    }
      
    
    if (this.background) {
      this.background.x = (canvas.width / 2);
      this.background.y = canvas.height;
      this.background.scale.x = scale.x;
      this.background.scale.y = scale.y;
    }

    // houses
    let y = canvas.height - (225*scale.y);
    if(this.house01){
      this.house01.position.set(canvas.width/2, y);
      this.house01.scale.x = scale.x*0.7;
      this.house01.scale.y = scale.y*0.7;
      this.house01.origScale = new Vector2d(this.house01.scale.x, this.house01.scale.y);
    }
    if(this.house02){
      this.house02.position.set(canvas.width/2, y);
      this.house02.scale.x = scale.x*0.7;
      this.house02.scale.y = scale.y*0.7;
      this.house02.origScale = new Vector2d(this.house02.scale.x, this.house02.scale.y);
    }
    if(this.house03){
      this.house03.position.set(canvas.width/2, y);
      this.house03.scale.x = scale.x*0.7;
      this.house03.scale.y = scale.y*0.7;
      this.house03.origScale = new Vector2d(this.house03.scale.x, this.house03.scale.y);
    }
    
    // clouds
    if(this.cloud_1){
      this.cloud_1.position.set(canvas.width/2 - (100*scale.x) ,130*scale.y);
      this.cloud_1.scale.x = scale.x;
      this.cloud_1.scale.y = scale.y;
    }
    if(this.cloud_2){
      this.cloud_2.position.set(canvas.width/2 + (350*scale.x), 10*scale.y);
      this.cloud_2.scale.x = scale.x;
      this.cloud_2.scale.y = scale.y;
    }
    if(this.cloud_3){
      this.cloud_3.position.set(canvas.width/2 - (190*scale.x) ,40*scale.y);
      this.cloud_3.scale.x = scale.x;
      this.cloud_3.scale.y = scale.y;
    }
    
    // GUI
    if(this.hand){
      this.hand.position.set(canvas.width/2 + (50*scale.x), 560*scale.y);
      this.hand.scale.x = scale.x/2;
      this.hand.scale.y = scale.y/2;
    }
    if(this.TTU_Text){
      this.TTU_Text.position.set(canvas.width/2, 330*scale.y);
      this.TTU_Text.scale.x = scale.x;
      this.TTU_Text.scale.y = scale.y;
    }

    if(this.greatjob_Text){
      this.greatjob_Text.position.set(canvas.width/2, 40*scale.y);
      this.greatjob_Text.scale.x = scale.x;
      this.greatjob_Text.scale.y = scale.y;
    }

    if(this.playnow_btn){
      this.playnow_btn.position.set(canvas.width/2, canvas.height - (30*scale.y));
      this.playnow_btn.scale.x = scale.x;
      this.playnow_btn.scale.y = scale.y;
    }

    if(this.instal_btn){
      this.instal_btn.position.set(canvas.width/2, canvas.height - (30*scale.y));
      this.instal_btn.scale.x = scale.x*0.9;
      this.instal_btn.scale.y = scale.y*0.9;
    }

    if(this.progressBar){
      this.progressBar.position.set(canvas.width/2-(256*scale.x), 40*scale.y); // TODO: Do this diffrent. hardcoded cause onload this value is not known yet. Possibly cause we don't wait for images to load.
      this.progressBar.scale = scale;
    }

    // special effects
    if(this.shine){
      this.shine.position.set(canvas.width/2, canvas.height/2);
    }
  }
}
