class Coin extends PIXI.TilingSprite{
    _frameIndex = 0;
    _frameRow = 0;
    _tickCount = 0;

    _velocity = new Vector2d(0,0);
    _acceleration = new Vector2d(0,0);

    constructor(options){
        super(options.texture, options.width, options.height);
        
        this.loop = options.loop || false;                      // The animation will loop or not.
        this.reverse = options.reverse || false;                // Determines if the animation will play in reverse.
        this.numberOfFrames = options.numberOfFrames || 1;
        this.numberOfRows = options.numberOfRows || 1;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.mass = options.mass || 1;

    }
    update() {
        if(!this.visible)
            return;
            
        this._tickCount += 1;
        if (this._tickCount > this.ticksPerFrame) {
            this._tickCount = 0;

            this.tilePosition.x = 1 - (this._width * this._frameIndex);
            this.tilePosition.y = 1 - (this._height * this._frameRow);
            
            if(!this.reverse)
                this.nextFrame();
            else
                this.previousFrame();
        }
        this.position.x += this._velocity.x;
        this.position.y += this._velocity.y;
        
        this.visible = !(this.position.x < 0 || this.position.x > canvas.width
                    || this.position.y < 0 || this.position.y > canvas.height)
        
    }
    previousFrame(){
        // If the current frame index is in range
        if (this._frameIndex > 0) {	
            // Go to the next frame
            this._frameIndex -= 1;
        }
        else if(this._frameRow > 0){
            this._frameIndex = this.numberOfFrames-1;
            this._frameRow -= 1;
        }
        else if (this.loop){
            this._frameIndex = this.numberOfFrames-1;
            this._frameRow = this.numberOfRows-1;
        }
    }
    nextFrame(){
        // If the current frame index is in range
        if (this._frameIndex < this.numberOfFrames - 1) {	
            // Go to the next frame
            this._frameIndex += 1;
        }	
        else if(this._frameRow < this.numberOfRows -1){
            this._frameIndex = 0;
            this._frameRow += 1;
        }
        else if (this.loop){
            this._frameIndex = 0;
            this._frameRow = 0;
        }
    }
    get velocity(){
        return this._velocity;
    }
    set velocity(value){
        this._velocity = value;
    }
    get acceleration(){
        return this._acceleration;
    }
}