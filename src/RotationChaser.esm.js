/**
 * Created by Hessberger on 18.03.2015.
 */
import ChaserTween from "./ChaserTween.esm.js";
import { Object3D, EventDispatcher } from "../node_modules/three/build/three.module.js";

const defaults = {
    hinge:"left", 
    dir:"y", 
    odir:"in", 
    val: 1.57,
    time : 2000
};

    const RotationChaser = function( obj, opt )
    {
        console.assert( obj instanceof Object3D, "object3D must be instance of THREE.Object3D" );

        this.options = Object.assign( {}, defaults, opt );

        let scope = this;

        let angle = {left:-this.options.val, right:this.options.val, in:1, out:-1, o:-this.options.val, u:this.options.val};
        var start = obj.rotation[this.options.dir];
        var stop = start+angle[this.options.hinge]*angle[this.options.odir];
        var to = stop;
        var rotation = {  z: start };
        var target = {  z: stop };

        let priv = {
            object3D : obj,

            start : start,
            stop : stop,
            to : to,
            target : target,

            animate : false,
            dispatcher : scope.options.dispatcher || scope
        };

        let tween = ChaserTween.make( rotation, priv ).onUpdate(function(){
            obj.rotation[scope.options.dir] = rotation.z;
        });


        this.start = function(){
            tween.start();
        };

        this.toggle = function(){
            if ( priv.animate ) tween.stop();
            else tween.start();
        };

        this.close = function( t ){
            if( rotation.z === priv.start ) return;
            if ( priv.animate ) {
                tween.stop();
            }
            if( typeof t === "number" ){
                tween.to({z: priv.start}, t);
            }
            tween.start();
        };

        this.open = function( t ){
            if( rotation.z === priv.stop ) return;
            if ( priv.animate ) {
                tween.stop();
            }
            if( typeof t === "number" ){
                tween.to({z: priv.stop}, t);
            }
            tween.start();
        };

    };

    RotationChaser.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {
        constructor : RotationChaser
    });
    
export default RotationChaser;
export { RotationChaser };