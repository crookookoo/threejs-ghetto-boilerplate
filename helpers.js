// Some helper functions and variables
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// Add examplepath to all file paths in code that you copied from threejs.org/examples/
var examplepath = 'https://threejs.org/examples/';
var stats = new Stats();

// Quickly turn on/off stats & gui
var statsOn = true;
var guiOn = true;

// ---------------------------------------------------------------------

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

// dat.gui setup
function setupGui() {

	var gui = new dat.GUI();

	var h = gui.addFolder( "Material control" );

	h.add( effectController, "shininess", 1.0, 400.0, 1.0 ).name( "shininess" ).onChange( render );
	h.add( effectController, "kd", 0.0, 1.0, 0.025 ).name( "diffuse strength" ).onChange( render );
	h.add( effectController, "ks", 0.0, 1.0, 0.025 ).name( "specular strength" ).onChange( render );
	h.add( effectController, "metallic" ).onChange( render );

	h = gui.addFolder( "Material color" );

	h.add( effectController, "hue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( render );
	h.add( effectController, "saturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( render );
	h.add( effectController, "lightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( render );

}

// ---------------------------------------------------------------------
// EVENT HANDLERS

function onWindowResize() {

	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;

	renderer.setSize( canvasWidth, canvasHeight );

	camera.aspect = canvasWidth / canvasHeight;
	camera.updateProjectionMatrix();

	render();

}