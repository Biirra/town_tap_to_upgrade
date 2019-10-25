class House extends PIXI.Sprite{
    _tickCount = 0;
    
    // for keeping track of jumping animation
    _jumping = false;
    _animatingEnlarge = false;  // object is currently playing animation enlarge
    _animatingDiminish = false; // object is currently playing animation diminish

    
    constructor(options){
        super();
        this.texture = options.texture;
        this.maxCoins = options.coins_for_next_stage;
        this.currentCoins = 0;
        this.finished = options.finished || false;

        this.ticksPerFrame  = options.ticksPerFrame  || 0; // speed of animation

        // make sure you can click on it.
        this.interactive = true;
        this.buttonMode = true;

        this.origScale = new Vector2d(this.scale.x, this.scale.y);
        this.init();
    }
    init(){
        this.setupHandlers();
    }
    setupHandlers(){
        this
        // set the mousedown and touchstart callback...
        .on('mousedown', this.onButtonDown)
        .on('touchstart', this.onButtonDown)

    }
    update(){
        if(!this.visible)
            return;

        if(this.currentCoins >= this.maxCoins){
            this.fadeOut();
            return;
        }
            
        if(this._jumping)
            this.jump();
            
    }
    fadeOut(){
        if(this.alpha <= 0){
            this.visible = false;
        }
        this.finished = true;
        this.alpha -= HOUSE_FADEOUT_SPEED || 1;
    }
    fadeIn(){
        if(!this.visible){
            this.visible = true;
            this._jumping = true;
        }
    }
    jump(){
        let maxSizeX = this.origScale.x + 0.15;
        let maxSizeY = this.origScale.y + 0.15;

        // go bigger if
        //  its not above max
        //  its not going smaller.
        let max = this.scale.x > maxSizeX && this.scale.y > maxSizeY ;
        let min = this.scale.x < this.origScale.x && this.scale.y < this.origScale.y;
        if(max){
            this._animatingEnlarge = false;
            this.scale.x = maxSizeX;
            this.scale.y = maxSizeY;
        }
        else if(!max && !this._animatingDiminish){
            this.scale.x += 0.05;
            this.scale.y += 0.05;
            if(!this._animatingEnlarge){
                this._animatingEnlarge = true;
                this._animatingDiminish = false;
            }
        }

        // go smaller if
        //  its not below min
        //  its not going bigger.
        if (min){
            this._animatingDiminish = false;
            this.scale.x = this.origScale.x;
            this.scale.y = this.origScale.y;
            this._jumping = false;
        }
        else if(!min && !this._animatingEnlarge){
            this.scale.x -= 0.05;
            this.scale.y -= 0.05;
            if(!this._animatingDiminish){
                this._animatingDiminish = true;
                this._animatingEnlarge = false;
            }
        }
    }
    onButtonDown()
    {        
        if(!this.visible || this.finished)
            return;
        
        this._jumping = true;
        this.currentCoins++;
    }
    setScale(x,y){
        this.scale.set(x,y);
        this.origScale.x = this.scale.x;
        this.origScale.y = this.scale.y;
        
    }
}