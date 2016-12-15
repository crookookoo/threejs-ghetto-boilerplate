// Some helper functions and variables

// Add examplepath to all file paths in code that you copied from threejs.org/examples/
var examplepath = 'https://threejs.org/examples/';

// stats.js setup (don't forget to also update index.html)
function setupStats(){
  
}

// dat.gui setup
function setupGui() {

	var h;

	var gui = new dat.GUI();

	// material (attributes)

	h = gui.addFolder( "Material control" );

	h.add( effectController, "shininess", 1.0, 400.0, 1.0 ).name( "shininess" ).onChange( render );
	h.add( effectController, "kd", 0.0, 1.0, 0.025 ).name( "diffuse strength" ).onChange( render );
	h.add( effectController, "ks", 0.0, 1.0, 0.025 ).name( "specular strength" ).onChange( render );
	h.add( effectController, "metallic" ).onChange( render );

	// material (color)

	h = gui.addFolder( "Material color" );

	h.add( effectController, "hue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( render );
	h.add( effectController, "saturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( render );
	h.add( effectController, "lightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( render );

	// light (point)

	h = gui.addFolder( "Lighting" );

	h.add( effectController, "lhue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( render );
	h.add( effectController, "lsaturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( render );
	h.add( effectController, "llightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( render );
	h.add( effectController, "ka", 0.0, 1.0, 0.025 ).name( "ambient" ).onChange( render );

	// light (directional)

	h = gui.addFolder( "Light direction" );

	h.add( effectController, "lx", -1.0, 1.0, 0.025 ).name( "x" ).onChange( render );
	h.add( effectController, "ly", -1.0, 1.0, 0.025 ).name( "y" ).onChange( render );
	h.add( effectController, "lz", -1.0, 1.0, 0.025 ).name( "z" ).onChange( render );

	h = gui.addFolder( "Tessellation control" );
	h.add( effectController, "newTess", [ 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50 ] ).name( "Tessellation Level" ).onChange( render );
	h.add( effectController, "lid" ).name( "display lid" ).onChange( render );
	h.add( effectController, "body" ).name( "display body" ).onChange( render );
	h.add( effectController, "bottom" ).name( "display bottom" ).onChange( render );
	h.add( effectController, "fitLid" ).name( "snug lid" ).onChange( render );
	h.add( effectController, "nonblinn" ).name( "original scale" ).onChange( render );

	// shading
	h = gui.add( effectController, "newShading", [ "wireframe", "flat", "smooth", "glossy", "textured", "reflective" ] ).name( "Shading" ).onChange( render );

}
