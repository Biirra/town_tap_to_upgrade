class Confetti extends PIXI.Sprite{
    _velocity = Vector2d.zero;
    constructor(options){
        super(options.texture);
        this._velocity = options.velocity || Vector2d.down;
        this.rotateSpeed = Math.random()*0.05;
        this.rotateDirection = Math.random() > 0.5 ? -this.rotateSpeed : this.rotateSpeed;
    }
    update(){
        this.position.x += this._velocity.x;
        this.position.y += this._velocity.y;
        this.rotation += this.rotateDirection;
    }
}