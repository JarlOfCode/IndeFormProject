class SceneController {
	
	//file:///C:/Users/Juozas/Desktop/indeform-threejs-demo/threejs-demo.html
	//chrome.exe --disable-web-security --user-data-dir="c://chrome-tmp"
	
			/*data = {
			cmd:"SET_PLANET_RADIUS", 
			planetId:18,
			radius: e.target.value
		}*/
				
		/*$.ajax({
			type: "POST",
			url: "http://192.28.28.2/api/cmd",
			data: data,
			success: success,
			dataType: dataType
		});*/
		//ajax serverio paumt eilute gaut calla

//get json ajax -----------------google
    constructor(){
        window.addEventListener("load", this.init.bind(this));
        window.addEventListener("click", this.onDocumentClick.bind(this));
		
		// bendras saules objektas
		this.sun;
        // SCENE OBJECTS
        this.objects = {};

        // CLICK EVENTS HANDLING
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
		this.spherNr = 0;
		
        // RENDER LOOP
        this.renderLoop = this.renderFunc.bind(this);
    }
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------


    /**
     * Initiate scene and start render loop.
     
     */
    init() {
        this.initiateScene();
		 this.data = [
			 {
				id: 1,
				title:"System1",
				planets: [
					{id:1, title:"Doris", radius: 1, speed: 0.0015, color: 0x1EF9F8, vector: 1, orbitRadius: 5},
					{id:2, title:"Baiba", radius: 1, speed: 0.0023, color: 0x555555, vector: -1,  orbitRadius: 8},
					{id:3, title:"Truhali", radius: 1, speed: 0.003, color: 0x7658ef, vector: 1,  orbitRadius: 12},
				],
			},

			 {
				id: 2,
				title:"System2",
				planets: [
					{id:1, title:"Notilius", radius: 2, speed: 0.0015, color: 0x555555, vector: -1, orbitRadius: 15},
					{id:2, title:"Ylimus", radius: 2, speed: 0.001, color: 0x1EF9F8, vector: 1, orbitRadius: 8},
				],
			},
		
			{
				id: 3,
				title:"System3",
				planets: [
					{id:1, title:"Luntalus", radius: 2, speed: 0.0014, color: 0x1EF9F8, vector: 1,  orbitRadius: 7},
					{id:2, title:"Porir", radius: 1, speed: 0.0023, color: 0x555555, vector: -1,  orbitRadius: 11},
					{id:3, title:"Cicipa", radius: 2, speed: 0.0019, color: 0x7658ef, vector: 1,  orbitRadius: 15},
					{id:4, title:"Meaja", radius: 1, speed: 0.0027, color: 0x7658ef, vector: -1,  orbitRadius: 20},
				],
			},
			
			{
				id: 4,
				title:"System4",
				planets: [
					{id:1, title:"Tyuralis", radius: 1, speed: 0.0019, color: 0x1EF9F8, vector: 1,  orbitRadius: 7},
					{id:2, title:"Mewyla", radius: 1, speed: 0.0023, color: 0x555555, vector: -1, orbitRadius: 9},
					{id:3, title:"Tyolis", radius: 1, speed: 0.0016, color: 0x7658ef, vector: 1,  orbitRadius: 13},
					{id:4, title:"Koncve", radius: 2, speed: 0.0025, color: 0x7658ef, vector: -1,  orbitRadius: 16},
					{id:5, title:"Tryeas", radius: 1, speed: 0.0021, color: 0x555555, vector: -1,  orbitRadius: 19},
					{id:6, title:"Honcha", radius: 2, speed: 0.0018, color: 0x7658ef, vector: 1,  orbitRadius: 21},
					{id:7, title:"Loita", radius: 3, speed: 0.0005, color:0x7658ef, vector: -1,  orbitRadius: 27},
				],
			},
		 ];
		 
		 this.textures = [ 
			"textures/mer.jpg",
			"textures/mercury.jpg",
			"textures/moon.jpg",
			"textures/pluton.jpg",
			"textures/saturn.jpg",
			"textures/venera.jpg",
			"textures/venus.jpg"
		 ];

        this.renderFunc();
		this.setupUI();
		this.createSolarSystem(0);
		
    }
	
		
	
	//	
	setupUI() 
	{		
		let list = document.getElementById("mySelect");
		list.addEventListener("change", this.changeSolarSystem.bind(this));
		
		//clear all options
		list.innerHTML = "";
		
		//add new options to myselect list
		for(let i = 0, n = this.data.length; i<n; i++) {
					var option = document.createElement("option");
					option.value = i;
					option.innerText = this.data[i].title;
					list.add(option);
		}
	}
	
	
	//
	changeSolarSystem(e)
	{		
		//console.log(e);
		this.createSolarSystem(parseInt(e.target.value));
	}
	
	
	//sukuria saules sistema
	createSolarSystem(systemId)
	{
		
		let ss = this.data[systemId];
		//console.log(systemId);
		this.clearScene();
		
		for(let j = 0, m = ss.planets.length; j < m; j++)
			{
				this.createPlanet(ss.planets[j]);
			}		
			//console.log(this.objects);	
	}
	
	
	//isvalom objektus, kad uzkrautu naujus
	clearScene()
	{
		for(let key in this.objects)
		{
			Core.coreElements.scene.remove(this.objects[key].obj);
		}
		
		this.objects = {};
	}
	
	
	// sukuria planeta
	createPlanet(planet)
	{	
		//console.log(planet);
		let key = "planet_" + planet.id;
		this.objects[key] = {
			orbitRadius: planet.orbitRadius,
			speed: planet.speed,
			vector: planet.vector,
			obj: this.createSpher({
				geometry: { radius:planet.radius, widthSegments:32, heightSegments:32 },
				material: { color:planet.color }
			}),
		}		
	}
	
	// prideda planetos duomenis ir planeta i scena
	createSpher({geometry: {radius, widthSegments, heightSegments}, material: {color}}){
        var geom = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
		
		var rnd = Math.floor(Math.random() * 7);
		
		var texture = new THREE.TextureLoader().load( this.textures[rnd]);

		// immediately use the texture for material creation
		var matrl = new THREE.MeshBasicMaterial( { map: texture } );
		var spher = new THREE.Mesh(geom, matrl);	
		
		Core.coreElements.scene.add( spher );
        return spher;
    }  
	
	

    /**
     * Render loop function.
     */
    renderFunc(){
		//this.animate();
        requestAnimationFrame(this.renderLoop);
		this.update();
        this.render();	
    }
	
	
	//sukam
	update() {
		for(let key in this.objects)
		{	
			let planet = this.objects[key];
			let r = planet.orbitRadius;			
			var time = Date.now() * planet.speed * planet.vector;
			planet.obj.position.x = Math.cos(time)*r;
			planet.obj.position.y = Math.sin(time)*r;
			
		}
	}
	
	
    /**
     * Render scene.
     */
    render(){
		Core.coreElements.renderer.render(Core.coreElements.scene, Core.coreElements.camera);		
    }


    /**
     * Initiate main elements.
     */
    initiateScene(){
        // SCENE SETUP
        Core.coreElements.scene = new THREE.Scene();



        // CAMERA SETUP
        const { fov, aspect, near, far } = Core.config.camera;
        Core.coreElements.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        Core.coreElements.camera.up.set( 0, 0, 1 );
        Core.coreElements.camera.position.set( -40, -50, 15 );
        Core.coreElements.scene.add( Core.coreElements.camera );

        // GRID SETUP
        let grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x555555 );
        grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI / 180 ) );
        Core.coreElements.scene.add( grid );

        // ADD OBJECTS TO SCENE
        this.addObjects();

        // RENDERER SETUP
        Core.coreElements.renderer = new THREE.WebGLRenderer( Core.config.renderer );
        Core.coreElements.renderer.setPixelRatio( window.devicePixelRatio );
        Core.coreElements.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( Core.coreElements.renderer.domElement );
		

		
		
        // SCENE CONTROLS SETUP
        this.controls = new THREE.OrbitControls( Core.coreElements.camera, Core.coreElements.renderer.domElement );
        this.controls.addEventListener( 'change', this.render.bind(this) );
        this.controls.target.set( 0, 1.2, 2 );

    }

    /**
     * Change aspect ratio and update render container size.
     */
    onWindowResize(){
        Core.coreElements.camera.aspect = window.innerWidth / window.innerHeight;
        Core.coreElements.camera.updateProjectionMatrix();
        Core.coreElements.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    /**
     * Create objects and set positions for them.
     */
    addObjects(){
        // Create main objects
		
        this.sun = this.createSphere({
            geometry: Core.config.sceneObjects.sphere.geometry,
            material: Core.config.sceneObjects.sphere.material,
        });
        this.sun.position.set( 0, 0, 0 );

	}
	
    /**
     * Create sphere object.
     * @param {Object} obj geometry and material properties.
     */
    createSphere({geometry: {radius, widthSegments, heightSegments}, material: {color}}){
		/*var mat = new THREE.MeshPhongMaterial(); //????????????????????????????????????????
		mat.map = new THREE.ImageUtils.loadTexture(
		"../assets/textures/partial-transparency.png");
		mat.transparent = true;
		mat.side = THREE.DoubleSide;
		mat.depthWrite = false;
		mat.color = new THREE.Color(0xff0000)
*/
        var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

		var texture = new THREE.TextureLoader().load( 'sun/sun.jpg' );

		// immediately use the texture for material creation
		var material = new THREE.MeshBasicMaterial( { map: texture } );
        var sphere = new THREE.Mesh( geometry, material );
        //sphere.callback = this.sphereClickHandler.bind(this);
		
        Core.coreElements.scene.add( sphere );
        return sphere;
    }


    /**
     * Click event handling for sphere.
     */
    sphereClickHandler(){
        this.sun.material.color.setHex( 0x880000 );
    }

	
	
    /**
     * Handle click event.
     * @param {*} e
     */
    onDocumentClick(e){
        e.preventDefault();

        this.mouse.x = ( e.clientX / Core.coreElements.renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / Core.coreElements.renderer.domElement.clientHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.mouse, Core.coreElements.camera );

        var intersects = this.raycaster.intersectObjects( Core.coreElements.scene.children );

        if ( intersects.length > 0 ) {
            if(intersects[0].object.callback !== undefined){
                intersects[0].object.callback();			
            }
        }
    }
	
	
	
}

Core.sceneController = new SceneController();
