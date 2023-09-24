const rollup  = require('rollup');
const resolve =require('@rollup/plugin-node-resolve');
const buble = require('@rollup/plugin-buble');
const replace = require("./replace.js");
//const async = require("async");

const transforms = {
    arrow: false,
    classes: true,
    letConst : false
};
console.log(resolve.nodeResolve);
const build_chaser = function( done ){
   
    rollup.rollup({
        input : 'src/chaser.es.js',
        external: ['../node_modules/three/build/three.module.js', '../../node_modules/three/build/three.module.js'],
        
        plugins:[
            
            resolve.nodeResolve(),
            
            buble({
				transforms: transforms
            })
        ]
    }).then(( bundle ) => { 
        bundle.write({
            file: './dist/chaser.pack.es.js',
            plugins:[
                
                replace({
                    "../node_modules/three/build/three.module.js" : "three"
                })
            ],
            
            format: 'es',
            name: 'three',
            exports: 'named',
            sourcemap: true
          });
          done( );
    }).catch(
        (err)=>{console.error(err);}
    );
};


module.exports = build_chaser;