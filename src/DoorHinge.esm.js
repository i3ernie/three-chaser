import { Object3D, EventDispatcher } from "../node_modules/three/build/three.module.js";
import RotationChaser from "./RotationChaser.esm.js"

const deafults = {
    hinge : "left",
    dir : "in",
    event : "click"
};

const DoorHinge = function( opts ) {
    this.options = Object.assign({}, defaults, opts );
    this.addEventListener( this.options.event, this.toggle.bind(this) );
};

DoorHinge.prototype = Object.assign( Object.create( Object3D.prototype ), {

    constructor : DoorHinge,

    add : function( mesh ){
        if ( this.children.length > 0 ) {
            this.clear();
        }
        this.chaser = new RotationChaser( mesh, {"hinge": this.options.hinge} );
        Object3D.prototype.add.call( this, mesh );
    },

    setHinge : function( h ){

    },
    setDir : function(  d ){

    },
    toggle : function(){
        this.chaser.toggle();
    }

});

export default DoorHinge