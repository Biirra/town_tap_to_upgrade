class Shine extends PIXI.Sprite{
    _animateIn = false;
    _animateOut = false;
    _loopCount = 1; // times the shine fades in and out. 
    constructor(options){
        super();
        this.texture = options.texture;
        this.visible = false;
        this.loop = false;
    }
    update(){
        this.rotation += 0.01;
        if(!this.loop)
            this.fadeOut();
    }
    fadeIn(){
        this.visible = true;
        this.alpha = 2;
    }
    fadeOut(){
        this.alpha -= .01;
        if(this.alpha <= 0)
            this.visible = false;
    }
}