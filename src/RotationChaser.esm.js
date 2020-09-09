/**
 * Created by Hessberger on 18.03.2015.
 */
import TWEEN from "@tweenjs/tween.js/dist/tween.esm";
import { Object3D } from "three/build/three.module";

const defaults = {
    hinge:"left", 
    dir:"y", 
    odir:"in", 
    val:1.57
};

    const RotationChaser = function( obj, opt )
    {
        console.assert( !(obj instanceof Object3D), "object3D must be instance of THREE.Object3D" );
        var options = Object.assign( {}, defaults, opt );
        var angle = {left:-options.val, right:options.val, in:1, out:-1, o:-options.val, u:options.val};
        var start = obj.rotation[options.dir];
        var stop = start+angle[options.hinge]*angle[options.odir];
        var to = stop;
        var rotation = {  y: start };
        var target = {  y: stop };
        var animate = false;
        var time = 2000;

        var tween = new TWEEN.Tween( rotation ).to(target, time)
        .onStart(function(){
            animate = true;
        })
        .onComplete(function(){
            animate = false;
            to = (to === start)? stop:start;
            tween.to({y: to}, time);
            CMD.Scene.trigger("tweenCompleted");
        })
        .onStop(function(){
            animate = false;
            to = (to === start)? stop:start;
            tween.to({y: to}, time);
        })
        .onUpdate(function(){
            obj.rotation[options.dir] = rotation.y;
        });

        this.start = function(){
            tween.start();
        };
        this.toggle = function(){
            if ( animate ) tween.stop();
            else tween.start();
        };
        this.close = function( t ){
            if( rotation.y === start ) return;
            if ( animate ) {
                tween.stop();
            }
            if( typeof t === "number" ){
                tween.to({y: start}, t);
            }
            tween.start();
        };
        this.open = function( t ){
            if( rotation.y === stop ) return;
            if ( animate ) {
                tween.stop();
            }
            if( typeof t === "number" ){
                tween.to({y: stop}, t);
            }
            tween.start();
        };


    };
    
export default RotationChaser;
export { RotationChaser };