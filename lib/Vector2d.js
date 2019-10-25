/*
Created by: Jan Willem Huising

An object that keeps track of data that has coordinates in 2d.
For example the location, velocity, acceleration of a sprite.
*/
class Vector2d{
    constructor(x, y){
        this._x = x;
        this._y = y;
    }
    /**
     * Overwrite the current parameters with a Vector2d.
     * @param {Vector2d} vector2d Value to overwrite object parameters with.
     */
    set(vector2d){
        this._x = vector2d.x;
        this._y = vector2d.y;
    }
    /**
     * Add the values of a Vector2d to the current parameters.
     * @param {Vector2d} vector2d Value to overwrite object parameters with.
     */
    add(vector2d) {
        this._x += vector2d.x;
        this._y += vector2d.y;
    };
    /**
     * Subtract the values of a Vector2d from the current parameters.
     * @param {Vector2d} vector2d Value to overwrite object parameters with.
     */
    sub(vector2d) {
        this._x -= vector2d.x;
        this._y -= vector2d.y;
    };
    /**
     * Multiply the current parameters with a multiplier.
     * @param {number} mult Value to multiply object parameters with.
     */
    mult(mult) {
        this._x *= mult;
        this._y *= mult;
    };
    /**
     * Divide the current parameters with a divider.
     * @param {number} div Value to divide object parameters with.
     */
    div(div) {
        this._x /= div;
        this._y /= div;
    }; 
    /**
     * Return the magnitude of the object.
     * @returns {number} Contains the magnitude of this object.
     */
    mag() {
        return Math.sqrt((this._x * this._x) + (this._y * this._y));
    };
    // Normalize the parameters of this object.
    norm() {
        let m = this.mag();
        if (m !== 0) {
            this.div(m);
        }
    };
    /**
     * If the current parameters have values above the max this function will overwrite the parameters of this object to the maximal value it can have. 
     * @param {number} max Maximal value this object can have. 
     */
    limit(max) {
        if (this.mag() > max) {
            this.norm();
            this.mult(max);
        }
    };
    /**
     * Add two Vector2d's together.
     * @param   {Vector2d} v1 
     * @param   {Vector2d} v2 
     * @returns {Vector2d}      Contains a new Vector2d with combined values.
     */
    static add(v1, v2){
        return new Vector2d(v1.getX() + v2.getX(), v1.getY() + v2.getY());
    }
    /**
     * Subtract two Vector2d's from eachother.
     * @param   {Vector2d} v1 
     * @param   {Vector2d} v2 
     * @returns {Vector2d}      Contains a new Vector2d with combined values.
     */
    static sub(v1, v2){
        return new Vector2d(v1.getX() - v2.getX(), v1.getY() - v2.getY());
    }
    /**
     * Multiply a given Vector2d with a value.
     * @param   {Vector2d}  v1 
     * @param   {number}    mult 
     * @returns {Vector2d}          Contains a new Vector2d with Multiplied values.
     */
    static mult(v1, mult){
        return new Vector2d(v1.getX() * mult, v1.getY() * mult);
    }
    /**
     * Divide a given Vector2d with a value.
     * @param   {Vector2d}  v1 
     * @param   {number}    div 
     * @returns {Vector2d}          Contains a new Vector2d with divided values.
     */
    static div(v1, div){
        return new Vector2d(v1.x / div, v1.y / div);
    }
    /*
    Shortcut functions to create a new Vector2d
    */
    static get zero(){
        return new Vector2d(0,0);
    }
    static get one(){
        return new Vector2d(1,1);
    }
    static get up(){
        return new Vector2d(0,1);
    }
    static get down(){
        return new Vector2d(0,-1);
    }
    static get right(){
        return new Vector2d(1,0);
    }
    static get left(){
        return new Vector2d(-1,0);
    }
    /**
     * Returns a Vector2d with random coordinates from 0 to 1.
     * Use a multiplier to increase this.
     * @param   {number}    multiplier  
     * @returns {Vector2d}              Contains a new Vector with random parameters.
     * TODO: Make sure it takes y coordinates in consideration aswell.
     * TODO: Also think of a way to include a minimum.
     */
    static random(multiplier){
        let vector;
        let random = Math.random();
        if (random <= 0.25) {
            vector = new Vector2d(-Math.random() * multiplier, -Math.random() * multiplier);
        } else if (random > 0.25 && random <= 0.5) {
            vector = new Vector2d(-Math.random() * multiplier, Math.random() * multiplier);
        } else if (random > 0.5 && random <= 0.75) {
            vector = new Vector2d(Math.random() * multiplier, -Math.random() * multiplier);
        } else {
            vector = new Vector2d(Math.random() * multiplier, Math.random() * multiplier);
        }
        return vector;
    }
    /**
     * TODO: Make documentation.
     * @param {*} minX 
     * @param {*} maxX 
     * @param {*} minY 
     * @param {*} maxY 
     */
    static randomVector2d(minX, maxX, minY = 0, maxY = 0){
        let result = Vector2d.zero;
        let directionDecider = Math.random();
        let x = Vector2d.randomFloat(minX, maxX);
        let y = Vector2d.randomFloat(minY, maxY);

        if (directionDecider <= 0.25)
            result = new Vector2d(-x, -y);
        else if (directionDecider > 0.25 && directionDecider <= 0.5)
            result = new Vector2d(-x, y);
        else if (directionDecider > 0.5 && directionDecider <= 0.75)
            result = new Vector2d(x, -y);
        else 
            result = new Vector2d(x, y);
        
        return result;
    }
    /**
     * TODO: Make documentation.
     * @param {*} min 
     * @param {*} max 
     */
    static randomFloat(min, max) { // min and max included 
        return Math.random() * (max - min) + min;
    }
    /**
     * TODO: Make documentation.
     * @param {*} length 
     * @param {*} angleDegree 
     */
    static polarToCartasian(length, angleDegree){
        let x = length * cos(angleDegree);
        let y = length * sin(angleDegree);
        return new Vector2d(x,y);
    }
    /**
     * Set the x parameter of the object.
     * @param {number} x Value will be parsed to float before set.
     */
    set x(x){
        this._x = parseFloat(x);
    }
    /**
     * Get the x parameter of the object.  
     * @returns {number} Returns the value of this._x.
     */ 
    get x(){
        return this._x;
    }
    /**
     * Set the y parameter of the object.
     * @param {number} y Value will be parsed to float before set.
     */
    set y(y){
        this._y = parseFloat(y);
    }
    /**
     * Get the y parameter of the object.  
     * @returns {number} Returns the value of this._y.
     */ 
    get y(){
        return this._y;
    }
}