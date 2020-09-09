import ChaserTween from "./ChaserTween.esm.js";
import { Object3D, EventDispatcher } from "../node_modules/three/build/three.module.js";

const defaults = {
    sliderange : 100,
    time : 2000,
    axis : "z"
};


const PositionChaser = function( obj, opt )
{
    console.assert( obj instanceof Object3D, "object3D must be instance of THREE.Object3D" );
    
    this.options = Object.assign( {}, defaults, opt );

    let scope = this;
    
    let start = obj.position[this.options.axis];
    let stop = start + this.options.sliderange

    let position = {  z: start };
    let target = {  z: stop };

    let priv = {
        object3D : obj,
    
        start   : start,
        stop    : stop,
        to      : stop,
        target  : target,

        animate : false,
        dispatcher : scope
    };

    let tween = ChaserTween.make( position, priv ).onUpdate(function(){ 
            obj.position[scope.options.axis] = position.z;
        });

    this.toggle = function(){ 
        if ( priv.animate ) {
            tween.stop();
        }
        else {
            tween.start(); 
        }
    };

    this.close = function( t ){
        if( position.z === priv.start ) return;

        if ( priv.animate ) {
            tween.stop();
        }
        if( typeof t === "number" ){
            tween.to({z: priv.start}, t);
        }
        tween.start();
    };

    this.open = function( t ){
        if( position.z === priv.stop ) return;

        if ( priv.animate ) {
            tween.stop();
        }
        if( typeof t === "number" ){
            tween.to({z: priv.stop}, t);
        }
        tween.start();
    };
};

PositionChaser.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {
    constructor : PositionChaser
});

export default PositionChaser;
export { PositionChaser };