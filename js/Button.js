class Button extends PIXI.Sprite{
    constructor(texture){
        super(texture);
        this.interactive = true;
        this.buttonMode = true;
        this.init();
    }
    init(){
        this.setupHandlers();
        this.enable();
    }
    setupHandlers(){

    }
    enable(){
        this
        // set the mousedown and touchstart callback...
        .on('mousedown', this.onButtonDown)
        .on('touchstart', this.onButtonDown)

        // set the mouseup and touchend callback...
        .on('mouseup', this.onButtonUp)
        .on('touchend', this.onButtonUp)

    }
    onButtonDown()
    {
        this.isdown = true;
        this.alpha = 1;
    }

    onButtonUp()
    {
        this.isdown = false;

        console.log("Play now!");
    }
}