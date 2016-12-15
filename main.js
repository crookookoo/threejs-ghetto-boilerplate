document.ontouchmove = function(event){
    event.preventDefault();
};

var renderer, scene, camera, controls, effect, manager, mouseX, mouseY;

renderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

scene = new THREE.Scene();
scene.background = new THREE.Color( 0xff0000 );
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 2300);
camera.position.z = -2;
scene.add(camera);

var ambient = new THREE.AmbientLight( 0xffffff );
scene.add(ambient);

var directionalLight = new THREE.DirectionalLight( 0xffeedd );
directionalLight.position.set( 0, 0, 1 );
scene.add( directionalLight );

manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
  console.log( item, loaded, total );
};

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

var onError = function ( xhr ) {
};

var mat =  new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xff0000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } );


var loader = new THREE.OBJLoader( manager );
loader.load( 'sa.obj', function ( object ) {
  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
      child.material = mat;
    }
  } );
  // object.position.y = - 95;
  scene.add( object );
}, onProgress, onError );

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}

animate();

function onResize(e) {
  camera.aspect = window.innerWidth / window.innerHeight;
}

window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);
window.addEventListener("orientationchange", onResize, true);
