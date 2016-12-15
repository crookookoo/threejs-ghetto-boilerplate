// Boilerplate example based on:
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_teapot.html
// Utah/Newell Teapot demo

var camera, scene, renderer, controls;

var effectController;
var phongMaterial;

var diffuseColor = new THREE.Color();
var specularColor = new THREE.Color();

// default initialization, in helpers.js
initRenderer();

init();

function init() {

	// CAMERA
	camera.position.set( -600, 550, 1300 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x333333 );	// 0.2
	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
  light.position.set( 0.32, 0.39, 0.7 );
	light.color.setHSL( 0.04, 0.01, 1.0 );

	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 0, 0 );
	controls.addEventListener( 'change', render );

	// MATERIALS
	var materialColor = new THREE.Color();
	materialColor.setRGB( 1.0, 1.0, 1.0 );
	phongMaterial = new THREE.MeshPhongMaterial( { color: materialColor, shading: THREE.SmoothShading, side: THREE.DoubleSide } );

	// scene itself
	scene = new THREE.Scene();
	scene.add( ambientLight );
	scene.add( light );
  
  var teapotGeometry = new THREE.TeapotBufferGeometry( 400 );
	var teapot = new THREE.Mesh(teapotGeometry,phongMaterial);
	scene.add( teapot );

  effectController = {
    shininess: 40.0,
    ka: 0.17,
    kd: 0.51,
    ks: 0.2,
    metallic: true,

    hue:		0.121,
    saturation: 0.73,
    lightness:  0.66,
  };

	// GUI
	if(guiOn) setupGui();
  
  render();

}

function render() {
  
  updateScene();
	renderer.render( scene, camera );
  if(statsOn) stats.update();

}

function updateScene(){
  
  phongMaterial.shininess = effectController.shininess;

  diffuseColor.setHSL( effectController.hue, effectController.saturation, effectController.lightness );

  if ( effectController.metallic ) specularColor.copy( diffuseColor );
  else specularColor.setRGB( 1, 1, 1 );
  
  phongMaterial.color.copy( diffuseColor );

  specularColor.multiplyScalar( effectController.ks );
  phongMaterial.specular.copy( specularColor );

}

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


