var scene,
			    scene2,
			    camera,
		 	    renderer,
			    camera2,
			    camraPos;
			var cScene,
			    cCamera;
			var sand;
			var clock = new THREE.Clock();
			var hat,
			    head,
			    scarf,
			    clap,
			    foot,
			    coin,
			    clothGeometry;
			    
			var loading = false;  
			var gameover = false;
			var load = document.getElementById('loading');  
			var manager = new THREE.LoadingManager();
		      manager.onLoad = function(){
		      console.log('resourse complete!');
		      loading = true;
		      var tips = document.getElementById('tips');
		      tips.style.display = 'block';
		    };
		    
			scene = new THREE.Scene();
			scene2 = new THREE.Scene();
		    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.001,10000);
		    camera2 = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.001,10000);
			camera.position.set(0,50,1800);
			camera2.position.set(0,50,1800);
		    renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
		    renderer.setSize(window.innerWidth,window.innerHeight);
		    renderer.shadowMapEnabled = true;
		    var container =  document.getElementById('world');
		    container.appendChild(renderer.domElement);
		    window.addEventListener('resize',onWindowResize,false);
		    window.addEventListener('load',onWindowResize.false);
		    function onWindowResize(){
	           WIDTH=window.innerWidth;
	           HEIGHT=window.innerHeight;
               renderer.setSize(WIDTH, HEIGHT);
               camera.aspect = WIDTH / HEIGHT;
               camera.updateProjectionMatrix();
               camera2.aspect = WIDTH / HEIGHT;
               camera2.updateProjectionMatrix();
            }
		    
		    
		    var axis = new THREE.AxisHelper(50);
		    //scene.add(axis);
		    
		    var ambient = new THREE.AmbientLight(0xeeeeee);
			scene.add( ambient );
			scene2.add(ambient.clone());
			var directionalLight = new THREE.DirectionalLight( 0xffffff );
			directionalLight.position.set( 0, 0, 1 );
			scene.add( directionalLight );
			scene2.add(directionalLight.clone());
			
						
	    var onProgress = function ( xhr ) {
		  if( xhr.lengthComputable ){
			var percentComplete = xhr.loaded / xhr.total * 100;
		  }
		};
		/*沙地场景*/
        var mtlLoader = new THREE.MTLLoader(manager);
            mtlLoader.setPath('model/');
            mtlLoader.load('scene.mtl', function(materials){
            materials.preload();
        var objLoader = new THREE.OBJLoader(manager);
            objLoader.setMaterials( materials );
            objLoader.setPath('model/');
            objLoader.load( 'scene.obj', function (object){
              object.name = 'scene';
		      //scene.add(object);
		      }, onProgress);
            });
       
       /*沙尘*/
      var textureLoader = new THREE.TextureLoader(manager);
      var texture = textureLoader.load('./img/cloud.png');
      var particleGroupCrash = new SPE.Group({
        texture:{
        	value: texture
        },
        blending: THREE.NormalBlending,
        maxParticleCount: 750
      });
      var crashEmitter = new SPE.Emitter({
        maxAge: { value: 3 },
        position:{
        	value: new THREE.Vector3(0,75,1600),
        	spread: new THREE.Vector3(200,30,100)
        },
        size:{
        	value: 75,
        	spread: 50
        },
        velocity: {
         value: new THREE.Vector3( 0 , 0 , 180),
        },
        opacity: {
          value: [ 0, 1 , 0 ]
        },
        color: {
          value: new THREE.Color( 0xFFD068 )
        },
        angle: [0, 0.125*Math.PI],
        particleCount: 750,
      });
      particleGroupCrash.addEmitter( crashEmitter );
      scene.add( particleGroupCrash.mesh );
      
      /*人物*/
     var cameraPos = camera.position.clone();
      var loader1 = new THREE.JSONLoader(manager);
	  loader1.load('./model/hat.json',function(geo,mat){
	  	model = new THREE.Mesh(geo, mat[0]);
	  	model.rotation.y = Math.PI/2;
	  	model.scale.set(0.5,0.5,0.5);
	  	model.position.set(cameraPos.x,cameraPos.y-5,cameraPos.z - 20);
	  	model.name = 'hat';
	  	hat = model;
	  	scene.add(model);
	  	scene2.add(model.clone());
	  });
	  var loader2 = new THREE.JSONLoader(manager);
	  loader2.load('./model/head.json',function(geo,mat){
	  	model = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color:0xFFFFFF,transparent:true,opacity:0.7}));
	  	model.rotation.y = Math.PI/2;
	  	model.scale.set(0.5,0.5,0.5);
	  	model.position.set(cameraPos.x,cameraPos.y-5,cameraPos.z - 20);
	  	model.name = 'head';
	  	head = model;
	  	scene.add(model);
	  	scene2.add(model.clone());
	  });
      var loader3 = new THREE.JSONLoader(manager);
	  loader3.load('./model/scarf.json',function(geo,mat){
	  	model = new THREE.Mesh(geo, mat[0]);
	  	model.rotation.y = Math.PI/2;
	  	model.scale.set(0.5,0.5,0.5);
	  	model.position.set(cameraPos.x,cameraPos.y-5,cameraPos.z - 20);
	  	model.name = 'scarf';
	  	scarf = model;
	  	scene.add(model);
	  	scene2.add(model.clone());
	  });  
	  var loader4 = new THREE.JSONLoader(manager);
	  loader4.load('./model/clap.json',function(geo,mat){
	  	model = new THREE.Mesh(geo, mat[0]);
	  	model.rotation.y = Math.PI/2;
	  	model.scale.set(0.5,0.5,0.5);
	  	model.position.set(cameraPos.x,cameraPos.y-5,cameraPos.z - 20);
	  	model.name = 'clap';
	  	clap = model;
	  	scene.add(model);
	  	scene2.add(model.clone());
	  });
	  var loader5 = new THREE.JSONLoader(manager);
	  loader5.load('./model/foot.json',function(geo,mat){
	  	model = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color:0x5F1801}));
	  	model.rotation.y = Math.PI/2;
	  	model.scale.set(0.5,0.5,0.5);
	  	model.position.set(cameraPos.x,cameraPos.y-4.8,cameraPos.z - 20);
	  	model.name = 'foot';
	  	foot = model;
	  	scene.add(model);
	  	scene2.add(model.clone());
	  });
	  /*钉子*/
	  var pins = [ 30,31,32,33,34,35
	  ];
	  /*围巾*/
      var loader = new THREE.TextureLoader(manager);
	  var clothTexture = loader.load( './img/clap.png' );
	  var clothTexture2 = loader.load( './img/gold.png');
	  clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
	  clothTexture.anisotropy = 16;

	   var clothMaterial = new THREE.MeshPhongMaterial({
	     specular: 0x030303,
		 map: clothTexture,
		 side: THREE.DoubleSide,
		 alphaTest: 0.5
		});
		var clothMaterial2 = new THREE.MeshPhongMaterial({
	     specular: 0x030303,
		 map: clothTexture2,
		 side: THREE.DoubleSide,
		 alphaTest: 0.5
		});

	  clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );
	  clothGeometry.dynamic = true;

	  var uniforms = { texture:  { value: clothTexture } };
	  var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
	  var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;

	  object = new THREE.Mesh( clothGeometry, clothMaterial );
	  object.castShadow = true;
	  object.scale.set(0.2,0.3,1);
	  object.position.set(0,35.5,1780);
	  object.name = 'cloth';
	  var goldCape = object.clone();
	  goldCape.material = clothMaterial2;
	  scene.add(object);
	  scene2.add(goldCape);

	  object.customDepthMaterial = new THREE.ShaderMaterial({
	    uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide
	  });	  
      /*coin*/
     var loader6 = new THREE.JSONLoader(manager);
	  loader6.load('./model/coin.json',function(geo,mat){
	  	model = new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color:0xffd700}));
	  	model.scale.set(30,30,30);
	  	model.name = 'coin';
	  	coin = model;
	  	for(var i=0;i<100;i++){
	  		generateCoin();
	  	}
	  });
      animate();
			
	  /*music*/
	  eatCoin = document.getElementById('coin');
	  eatCoin.volume = 1;
      eatCoin.addEventListener('ended',function(){
		eatCoin.currentTime = 0;
	  });   
	  bc = document.getElementById('bc');
	  bc.volume = 0.1;
	  
	  
	  
		function animate(){
		  var time = Date.now();
		  windForce.set( 0, 40,10);
		  simulate( time );
		  requestAnimationFrame(animate);
		  collide();
		  gameOver();
		  render();
	    }	
		function render(){
			if( loading == true){
	          load.style.display = 'none';
		    }
			cScene = scene;
			cCamera = camera;
			if(gameover){
				cScene = scene2;
				cCamera = camera2;
			}
			var dt= clock.getDelta();
			particleGroupCrash.tick(dt);
			hat && hat.position.set(
				camera.position.x - Math.sin(camera.rotation.y)*20,
				camera.position.y - 5,
				camera.position.z - 20 + 20*(1 - Math.cos(camera.rotation.y))
			);
			hat && hat.rotation.set(
				camera.rotation.x,
				camera.rotation.y + Math.PI/2,
				camera.rotation.z
			);
			head && head.position.set(
				camera.position.x - Math.sin(camera.rotation.y)*20,
				camera.position.y - 5,
				camera.position.z - 20 + 20*(1 - Math.cos(camera.rotation.y))
			);
			head && head.rotation.set(
				camera.rotation.x,
				camera.rotation.y + Math.PI/2,
				camera.rotation.z
			);
			scarf && scarf.position.set(
				camera.position.x - Math.sin(camera.rotation.y)*20,
				camera.position.y - 5,
				camera.position.z - 20 + 20*(1 - Math.cos(camera.rotation.y))
			);
			scarf && scarf.rotation.set(
				camera.rotation.x,
				camera.rotation.y + Math.PI/2,
				camera.rotation.z
			);
			clap && clap.position.set(
				camera.position.x - Math.sin(camera.rotation.y)*20,
				camera.position.y - 5,
				camera.position.z - 20 + 20*(1 - Math.cos(camera.rotation.y))
			);
			foot && foot.position.set(
				camera.position.x - Math.sin(camera.rotation.y)*20,
				camera.position.y - 5,
				camera.position.z - 20 + 20*(1 - Math.cos(camera.rotation.y))
			);
			particleGroupCrash.mesh.position.set(
				camera.position.x - Math.sin(camera.rotation.y)*1800,
				camera.position.y -45,
				camera.position.z - 1800 + 1800*(1 - Math.cos(camera.rotation.y))
			);
			particleGroupCrash.mesh.rotation.set(
				camera.rotation.x,
				camera.rotation.y,
				camera.rotation.z
			);
			object.position.set(
				camera.position.x - Math.sin(camera.rotation.y)*20,
				camera.position.y - 14.5,
				camera.position.z - 20 + 20*(1 - Math.cos(camera.rotation.y))
			);
			object.rotation.set(
				camera.rotation.x,
				camera.rotation.y,
				camera.rotation.z
			);
			
			/*animat scarf*/
		    var p = cloth.particles;
		    for ( var i = 0, il = p.length; i < il; i ++ ) {
		      clothGeometry.vertices[ i ].copy( p[ i ].position );
		    }
		    clothGeometry.computeFaceNormals();
		    clothGeometry.computeVertexNormals();
		    clothGeometry.normalsNeedUpdate = true;
		    clothGeometry.verticesNeedUpdate = true;
	        renderer.render(cScene,cCamera);
        }
		function generateCoin(){
          var clone = coin.clone();
          clone.position.x = range(-2350,2360);
          clone.position.z = range(-2360,2630);
          clone.position.y = 25;
          clone.rotation.y = Math.PI*range(0,1);
          scene.add(clone);
        }
		function collide(){
			  var origin =  new THREE.Vector3(
			  	camera.position.x - Math.sin(camera.rotation.y)*190,
				5,
				camera.position.z - 190 + 190*(1 - Math.cos(camera.rotation.y))
			  );
			  var ray1 = new THREE.Raycaster(origin,new THREE.Vector3(1,0,0),0,65);
			  var ray2 = new THREE.Raycaster(origin,new THREE.Vector3(-1,0,0),0,65);
			  var ray3 = new THREE.Raycaster(origin,new THREE.Vector3(0,1,0),0,65);
			  ray1.ray.rotation = camera.rotation;
			  ray2.ray.rotation = camera.rotation;
			  ray3.ray.rotation = camera.rotation;
			  //var helper = new THREE.ArrowHelper(new THREE.Vector3(1,0,0),origin,20,0xff0000);
			  //scene.add(helper);
			  //console.log(ray.ray);
			  var collide1 = ray1.intersectObjects(scene.children);
			  var collide2 = ray1.intersectObjects(scene.children);
			  var collide3 = ray1.intersectObjects(scene.children);
			  if(collide1.length > 0){
			  	collide1.forEach(function(item){
			  		if(item.object.name == 'cloth'){
			  			return false;
			  		}else{
			  			console.log(item.object.name);
			  			eatGold();
			  			eatCoin.play();
			  			scene.remove(item.object);
			  		}
			  	})
			  }
			  if(collide2.length > 0){
			  	collide2.forEach(function(item){
			  		if(item.object.name == 'cloth'){
			  			return false;
			  		}else{
			  			console.log(item.object.name);
			  			eatGold();
			  			eatCoin.play();
			  			scene.remove(item.object);
			  		}
			  	})
			  }
			  if(collide3.length > 0){
			  	collide3.forEach(function(item){
			  		if(item.object.name == 'cloth'){
			  			return false;
			  		}else{
			  			console.log(item.object.name);
			  			eatGold();
			  			eatCoin.play();
			  			scene.remove(item.object);
			  		}
			  	})
			  }
		}
		function eatGold(){
		  var score = document.getElementById('scorenNum');
		  var scoreNum = parseInt(score.innerHTML);
		  score.innerHTML = scoreNum + 1;
		}
		function gameOver(){
		  var score = document.getElementById('scorenNum');
		  var scoreNum = parseInt(score.innerHTML);
		  var scoreImg = document.getElementById('score');
		  var gameoverPic = document.getElementById('gameover');
		  var walk = document.getElementById('walk');
		  var left = document.getElementById('left');
		  var right = document.getElementById('right');
		  if(scoreNum == 30){
		  	gameover = true;
		  	camera2.position.z += 0.05;
		  	score.style.opacity = 0;
		  	walk.style.opacity = 0;
		  	left.style.opacity = 0;
		  	right.style.opacity = 0;
		  	scoreImg.style.opacity = 0;
		  	gameoverPic.style.display = 'block';
		  }
		}
		function degInRad(deg) {
          return deg * Math.PI / 180;
        }
		function range(min,max){
			var rangeNum = max - min;
			var randomNum = rangeNum*Math.random();
			return min + randomNum;
		}
		