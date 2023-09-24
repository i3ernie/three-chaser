import TWEEN from "../node_modules/@tweenjs/tween.js/dist/tween.esm.js";

const ChaserTween = {
    make : function( position, opts ){
        let o = opts;

        return new TWEEN.Tween( position )
            .to( o.target, o.time )

            .onStart(function(){ 
                o.animate = true;
                o.dispatcher.dispatchEvent({ type:"started", target:o.object3D });
            })

            .onComplete(function(){ 
    
                o.dispatcher.dispatchEvent({ type:"completed", target:o.object3D });
                this.stop();
            })
            
            .onStop(function(){ 
                o.animate = false;
    
                if ( o.to === o.start ){
                    o.to = o.stop;
                    this._valuesStart = this._valuesStartRepeat = { z : o.start };
                } else {
                    o.to = o.start;
                    this._valuesStart = this._valuesStartRepeat = { z : o.stop };
                }
    
                this.to({z: o.to}, o.time);
    
                o.dispatcher.dispatchEvent({ type:"stopped", target:o.object3D });
            });
    }
};

export default ChaserTween
export {TWEEN, ChaserTween}