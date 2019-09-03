var fbx;
var noiseVal = 0;
var noiseX= 0;

var video, videoImage, videoImageContext, videoTexture;

//INTERACTION
var INTERSECTED;
var radius = 100, theta = 0;
var objects = [];
var maxMove = 4;
var factor = 70;
var topVisible = true;

var x;
var y;

var projector, mouse = {
    x: 0,
    y: 0
  }, mouseClient = {
    x: 0,
    y: 0
  }, hover, hovered, clicked, mouseOn = false;

var hoverSmooth = 1;
var startHeight = 0;

var name = "";
var tTexture = 0;
var tilt = false;
var alpha, beta, gamma;
var factorZoom = 0;

var container = document.getElementById('container');
var renderer, scene, camera, raycaster;
var origin = new THREE.Vector3();
var rectLight;
var param = {};
var stats;

var hdri;
var offsetX = 0;
var offsetY = 0;

var touch = false;

var lineGeo = [];
var controls;
$(document).ready(function(){
	init3D();
	animate();
});


function init3D() {
	renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
	renderer.setClearColor( 0xffffff, 0);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = false;
	var container = document.getElementById('container');
	$("body").append( renderer.domElement );
	$("body canvas").addClass('hide');
	var gl = renderer.context;

	if ( ! gl.getExtension( 'OES_texture_float' ) ) {
		console.log( 'OES_texture_float not supported' );
	}
	if ( ! gl.getExtension('OES_texture_float_linear' ) ) {
		console.log( 'OES_texture_float_linear not supported' );
	}

	if(touch){
		startHeight = window.innerHeight;
	}

	//CAMERA––––––––––––––––––––––––––––

	factor = window.innerHeight/10;
	camera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, -1000, 1000 );
	camera.position.set( 0, 0, 100 );

	scene = new THREE.Scene();

	//LIGHTS––––––––––––––––––––––––––––

	// AMBIENT LIGHT
	var ambient = new THREE.AmbientLight( 0xffffff, 0.9 );
	scene.add( ambient );
	var directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.5 );
	directionalLight.position.set( 100, 350, 250 );
	directionalLight.castShadow = true;
	scene.add( directionalLight );

	//TEXTURES––––––––––––––––––––––––––––

	var textureLoader = new THREE.TextureLoader( manager );
	hdri = textureLoader.load( 'assets/fbx/hdri4.jpg' );
	hdri.wrapS = THREE.RepeatWrapping;
	hdri.wrapT = THREE.RepeatWrapping;
	hdri.repeat.set( 0.6, 0.6 );
	hdri.mapping = THREE.EquirectangularRefractionMapping
	// hdri.mapping = THREE.EquirectangularReflectionMapping;

	var hdri2 = textureLoader.load( 'assets/fbx/hdri.jpg' );
	hdri2.mapping = THREE.SphericalReflectionMapping;

	video = document.getElementById( 'video' );
	videoImage = document.createElement( 'canvas' );
	videoImage.width = 640/1.2;
	videoImage.height = 464/1.3;

	videoImageContext = videoImage.getContext( '2d' );
	videoImageContext.fillStyle = '#ffffff';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height);

	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
	};

	var loader = new THREE.FBXLoader();
	loader.load( 'assets/fbx/3D_Final.fbx', function ( object ) {

		var miscCount = 0;
		var printCount = 0;
		var objectCount = 0;

		var prevPos = new THREE.Vector3();
		var childCount = 0;

		object.traverse( function ( child ) {

			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;

				if(child.name.includes("metal")){
					child.material = new THREE.MeshPhongMaterial({color: 0xffffff, reflectivity: 1, envMap: hdri2});
				} else {
					if(child.name.includes("tex")){
						child.material = new THREE.MeshPhongMaterial({color: 0xffffff, reflectivity: 1, refractionRatio: 0.8, map: hdri});
					} else {

						child.material = new THREE.MeshPhongMaterial({color: 0xffffff, reflectivity: 1, refractionRatio: 0.8, envMap: hdri});
					}
					
				}
				objects.push(child);

			}
		});
		object.scale.set(0.1,0.1,0.1);
		object.position.set(0,0,0);

		fbx = object;

		scene.add( object );

		$(".layer--3D").css("opacity", "1");
		$("body canvas").removeClass('hide');
	} );

	

	

	if(window.DeviceOrientationEvent){
		tilt = true;
		window.addEventListener("deviceorientation", handleOrientation, true);
	}else{
		console.log("DeviceOrientationEvent is not supported");
	}

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.minZoom = 0.5;
	controls.maxZoom = 2;
	controls.enableDamping = true;
	controls.dampingFactor = 0.1;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 2;

	window.addEventListener( 'resize', onResize, false );
	stats = new Stats();
	// document.body.appendChild( stats.dom );

	noise.seed(Math.random());
	raycaster = new THREE.Raycaster();

	$(".overlay").mousedown(function(){
		clicked = true;
	});
	$(".overlay").mouseup(function(){
		clicked = false;
	});

	$(".overlay").hover(function(){
		mouseOn = true;
	}, function(){
		mouseOn = false;
	});

	$(".zoom--plus").mousedown(function(){
		factorZoom += 20;
		if(factorZoom > 60){
			factorZoom = 60;
		}
		onResize();
	});

	$(".zoom--minus").mousedown(function(){
		factorZoom -= 20;
		if(factorZoom < -40){
			factorZoom = -40;
		}
		onResize();
	});

	if(!touch){
		setInterval(raycast, 50);
	}
}


function onResize() {
	var height = window.innerHeight;
	if(touch){
		height = startHeight;
	}
    renderer.setSize( window.innerWidth, height );
}


function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	mouseClient.x = event.clientX;
	mouseClient.y = event.clientY;

	// $("main canvas").css({"filter": "hue-rotate(" + mouse.x * 360 + "deg)"})
}

function handleOrientation(event) {

	alpha = event.alpha;
	beta = event.beta;
	gamma = event.gamma;
}

function raycast(){
	raycaster.setFromCamera( mouse, camera );
    if(mouseOn && !touch){
	    var intersects = raycaster.intersectObjects( objects );
		if (intersects.length > 0) {
			hover = true;
		    if (intersects[0].object != INTERSECTED) {
				if ( INTERSECTED ) {
					INTERSECTED.userData.hovered = false;
					hovered = false;
					$(".about ." + name).css({"opacity": "1"});
					$(".overlay ." + name).removeClass("selected");
				}
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.userData.hovered = true;
				hovered = true;
				name = INTERSECTED.name;
				if (name.indexOf('_') > -1){
					name = name.substring(0, name.indexOf("_"));
				}
				$(".about ." + name).css({"opacity": "0"});
		        $("body").css({"cursor": "s-resize"});
				$(".overlay ." + name).addClass("selected");
				$(".overlay ." + name + " .small--numbers").addClass("button--selected");

		    }
		} else {
			hover = false;
			if ( INTERSECTED ){
				INTERSECTED.userData.hovered = false;
				hovered = false;
				$(".about ." + name).css({"opacity": "1"});
		        $("body").css({"cursor": "default"});
				$(".overlay ." + name).removeClass("selected");
				name = "";
			}
			INTERSECTED = null;
		}
		if(clicked && name != ""){
			clicked = false;
			that = $(".project." + name)[0];
			openProject(that);
		}
	}
}

function animate() {
	if(topVisible){
		requestAnimationFrame( animate );
	}

	var childCount = 0;
	var m = 1000000;
	var moveDist = 200;
	var prevPos = new THREE.Vector3();

	for(var i = 0; i < lineGeo.length; i++){
		scene.remove(lineGeo[i]);
		lineGeo[i].geometry.dispose();
	}

	lineGeo = [];

	if(fbx){
		fbx.traverse( function ( child ) {

			if ( child.isMesh) {

				var noiseValX = noise.simplex2(noiseX / m * child.id*10, child.id*10);
				var noiseValY = noise.simplex2(noiseX / m * child.id*10, child.id*50);
				var noiseValZ = noise.simplex2(noiseX / m * child.id*10, child.id*100);
				if(hover){
					if(hoverSmooth < 0.1){
						hoverSmooth = 0.1;
					}
					noiseX += hoverSmooth;
					hoverSmooth -= 0.005;
				} else {
					if(hoverSmooth > 1){
						hoverSmooth = 0.1;
					}
					noiseX += 0.3;
					hoverSmooth += 0.005;
				}

				child.position.set(noiseValX*moveDist,noiseValY*moveDist,noiseValZ*moveDist);
				child.rotation.set(noiseValX*Math.PI*2,noiseValY*Math.PI*2,noiseValZ*Math.PI*2);

				// var c = new THREE.Color("rgb(" + Math.round((125 + Math.abs(noiseValX*moveDist)/2)) +"," + 0 + "," + 0 +")");

				// child.material.color = c;

				for(var i = 0; i < objects.length; i++){

					var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
					var geometry = new THREE.Geometry();
					geometry.dynamic = true;

					var position = new THREE.Vector3();
					geometry.vertices.push( position.applyMatrix4( child.matrixWorld ) );
					var position = new THREE.Vector3();
					geometry.vertices.push( position.applyMatrix4( objects[i].matrixWorld ) );
					geometry.verticesNeedUpdate = true;

					var line = new THREE.Line( geometry, material );
					lineGeo.push(line);

					var r = Math.round(Math.random());
					// if(r == 1){
						scene.add( line );
					// }
				}
				var position = new THREE.Vector3();
				prevPos = position.applyMatrix4( child.matrixWorld );

				childCount++;
			}
		});
	}

	offsetX += (mouse.x - hdri.offset.x)/100;
	offsetY += (mouse.y - hdri.offset.y)/100;

	hdri.offset.set( offsetX , offsetY );

	var height = window.innerHeight;
	if(touch){
		height = startHeight;
	}

	var factorDest = height/16 + factorZoom;
	factor += (factorDest - factor)/20;
	if(factor < 15){
		factor = 15;
	}

	camera.left = -window.innerWidth / factor;
    camera.right = window.innerWidth / factor;
    camera.top = height / factor;
    camera.bottom = -height / factor;
    camera.updateProjectionMatrix();

	render();
	update();
}

function update() {
	controls.update();
}

function render() {

	

	// if ( video.readyState === video.HAVE_ENOUGH_DATA )
	// {
	// 	videoImageContext.drawImage( video, 0, 0 );
	// 	if ( videoTexture )
	// 		videoTexture.needsUpdate = true;
	// }

	if(fbx && tilt && alpha){

		var rotDest = fbx.rotation.y + Math.radians(gamma/5);
		fbx.rotation.y += (rotDest-fbx.rotation.y)/10;
	}
	
	
	stats.update();
	renderer.render( scene, camera );
	
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
