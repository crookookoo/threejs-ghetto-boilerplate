// Some helper functions and variables
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// Add examplepath to all file paths in code that you copied from threejs.org/examples/
var examplepath = 'https://threejs.org/examples/';
var stats = new Stats();

// Quickly turn on/off stats & gui
var statsOn = true;
var guiOn = true;


function initRenderer() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  if(statsOn) container.appendChild( stats.dom );

  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );

  // RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xAAAAAA );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	container.appendChild( renderer.domElement );
  
  // EVENTS
	window.addEventListener( 'resize', onWindowResize, false );
  
}

// EVENT HANDLERS

function onWindowResize() {

	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;

	renderer.setSize( canvasWidth, canvasHeight );

	camera.aspect = canvasWidth / canvasHeight;
	camera.updateProjectionMatrix();

	render();

}