
import * as THREE from 'three';
import {Domevents, DomeventPointer} from "domevents.pack";
import Viewport from "viewport";
import WoodBox from "./WoodBox.js";
import chaser from "../../dist/chaser.pack.es.js";


Domevents.extend( DomeventPointer.config({emulateMouse:true}) );

var VP;
var DEH;

init();

function init() {
    
    
    VP = new Viewport();

    VP.init();
    VP.start();

    VP.loop.add( function(){ chaser.TWEEN.update(); });

    VP.camera.position.z = 400;

    DEH = new Domevents( VP.camera, VP.renderer.domElement );

    DEH.activate( VP.scene );
    
    
    let mesh1 = new WoodBox(100,100,100);
    mesh1.name = "box_klein";
    mesh1.position.set(-200,-50,0);


    let posChaser = new chaser.PositionChaser( mesh1 );

    mesh1.onClick = function(){ 
        console.log("click mesh1"); 
        posChaser.toggle();
    };


    let mesh2 = new WoodBox(100,100,100);
    mesh2.name = "box_klein";
    mesh2.position.set(-400,-50,0);


    let rotChaser = new chaser.RotationChaser( mesh2 );

    mesh2.onClick = function(){ 
        console.log("click mesh1"); 
        rotChaser.toggle();
    }

    VP.scene.add( mesh1, mesh2 );

}
