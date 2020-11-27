
import * as THREE from '../../node_modules/three/build/three.module.js';
import {Domevents, DomeventPointer} from "../../node_modules/three-domevents/dist/domevents.pack.es.js";
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js";
import WoodBox from "./WoodBox.js";
import chaser from "../../src/chaser.es.js";
import TWEEN from "../../node_modules/@tweenjs/tween.js/dist/tween.esm.js";

Domevents.extend( DomeventPointer.config({emulateMouse:true}) );

var VP;
var DEH;

init();

function init() {
    
    
    VP = new Viewport();

    VP.init();
    VP.start();

    VP.loop.add( function(){ TWEEN.update(); });

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
    };



    let mesh = new WoodBox(200, 200, 200);
    mesh.name = "box_gross";

    mesh.onClick = function( ev ){
        console.log("mesh onclick", ev );
        VP.scene.remove(mesh);
        setTimeout(function(){ VP.scene.add(mesh); }, 6000);
    };

    let box = new THREE.Mesh( new THREE.BoxGeometry(20,20,20),new THREE.MeshBasicMaterial({color:"green"}) );
    box.name = "mini_1";
    box.position.set(100,100,100);

    let box2 = new THREE.Mesh( new THREE.BoxGeometry(20,20,20), new THREE.MeshBasicMaterial({color:"red"}) );
    box2.name = "mini_2";
    box2.position.set( 100, -100, 100 );
    
    box2.onClick = function( ev ){
        console.log("*** red box click", ev );
        ev.stopPropagation();
    };
    box.onClick = function( ev ){
        console.log("*** box click", ev );
    };

    VP.scene.add( mesh1 );
    VP.scene.add( mesh2 );

    VP.scene.add( mesh );

    mesh.add(box);
    mesh.add(box2);

}
