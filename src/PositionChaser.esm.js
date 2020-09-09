import TWEEN from "@tweenjs/tween.js/dist/tween.esm";
import { Object3D } from "three/build/three.module";

const PositionChaser = function(obj, opt)
{
    console.assert( !(obj instanceof Object3D), "object3D must be instance of THREE.Object3D" );
    opt = opt || {};
    var sliderange = opt.sliderange || 20;
    var time = 2000;
    var axis = opt.axis || "z";
    var start = obj.position[axis];
    var stop = start + sliderange;
    var to = stop;
    var position = {  z: start };
    var target = {  z: to };
    var animate = false;


    var tween = new TWEEN.Tween(position).to(target, time)
        .onStart(function(){
            animate = true;
        })
        .onComplete(function(){
            animate = false;
            to = (to === start)? stop:start;
            tween.to({z: to}, time);
            CMD.Scene.trigger("tweenStopped", this);
            CMD.Scene.trigger("tweenCompleted", start);

        })
        .onStop(function(){
            animate = false;
            to = (to === start)? stop:start;
            tween.to({z: to}, time);
        })
        .onUpdate(function(){
            obj.position[axis] = position.z;
        });
    this.toggle = function(){
        if ( animate ) {
            tween.stop();
        }
        else {
            tween.start();
            CMD.Scene.trigger("tweenStarted", this);
        }
    };
    this.close = function( t ){
        if( position.z === start ) return;

        if ( animate ) {
            tween.stop();
        }
        if( typeof t === "number" ){
            tween.to({z: start}, t);
        }
        tween.start();
    };
    this.open = function( t ){
        if( position.z === stop ) return;

        if ( animate ) {
            tween.stop();
        }
        if( typeof t === "number" ){
            tween.to({z: stop}, t);
        }
        tween.start();
    };
};

export default PositionChaser;
export { PositionChaser };