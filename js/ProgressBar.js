class ProgressBar extends PIXI.Container {
    _scale = Vector2d.one;
    constructor(options){
        super();
        this.backgroundTexture = options.backgroundTexture;
        this.foregroundTexture = options.foregroundTexture;
        this.foreGroundOffset = options.foreGroundOffset;
        this._house = options.house;

        this.init();
    }
    init(){
        this.buildBackGround();
        this.buildForeground();
    }
    buildBackGround(){
        this.outerBar = new PIXI.Sprite(barTexture);
        this.addChild(this.outerBar);
    }
    buildForeground(){
        this.innerBar = new PIXI.Sprite(fillbarTexture);
        
        this.innerBar.width = 0;
        this.addChild(this.innerBar);
    }
    update(){
        if(!this.visible)
            return;

        let maxWidth  = this.foregroundTexture.orig.width
        let fillPerc = this._house.currentCoins / this._house.maxCoins * maxWidth;
        this.innerBar.width = fillPerc *this.scale.x;
    }
    set house(value){
        this._house = value;
    }
    get house(){
        return this._house;
    }
    set scale(value){
        this._scale = value;
        this.innerBar.position.x = this.outerBar.position.x + (this.foreGroundOffset.x*this._scale.x);
        this.innerBar.position.y = this.outerBar.position.y + (this.foreGroundOffset.y*this._scale.y);
        this.innerBar.scale.x = this.innerBar.width* value.x;
        this.innerBar.scale.y = value.y;
        this.outerBar.scale.x = value.x;
        this.outerBar.scale.y = value.y;
    }
    get scale(){
        return this._scale;
    }
}