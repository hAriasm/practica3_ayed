var demo = (function(){

    "use strict";

    var scene=new THREE.Scene(),
        light= new THREE.AmbientLight(0xffffff),
        renderer,
        camera,
        renderer = new THREE.WebGLRenderer(),
        box,
        ground,
        controls=null;

        function initScene(){

            renderer.setSize( window.innerWidth, window.innerHeight );
            document.getElementById("webgl-container").appendChild(renderer.domElement);

            scene.add(light);

            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );

            camera.position.set( 0, 0, 100 );

            scene.add(camera);

            box = new THREE.Mesh(
              new THREE.BoxGeometry(40,40,40),
              new THREE.MeshBasicMaterial({color: 0xFF0000}));

            scene.add(box);

            var childBox = new THREE.Mesh(
              new THREE.BoxGeometry(10,10,10),
              new THREE.MeshBasicMaterial({color:0x00FF00})
            );

            childBox.position.x = 50;
            childBox.position.y = 0;
            childBox.position.z = 0;
            box.add(childBox);

            console.log(childBox.position)

console.log(box.children);


            requestAnimationFrame(render);

        };

var keep = true;



        function render() {
                renderer.render(scene, camera);
                //box.rotation.x +=.01;
                //box.rotation.y += .04;
                //movebox();
                requestAnimationFrame(render);
        };

        window.onload = initScene;

})();