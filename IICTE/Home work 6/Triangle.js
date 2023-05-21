let markerVisible = { A: false, B: false, C: false };

AFRAME.registerComponent('registerevents', 
{
	init: function () 
	{
		let marker = this.el;
		marker.addEventListener('markerFound', function() 
		{
			markerVisible[ marker.id ] = true;
		});
		marker.addEventListener('markerLost', function() 
		{
			markerVisible[ marker.id ] = false;
		});
	}
});

AFRAME.registerComponent('run', 
{
	init: function() 
	{
		this.A = document.querySelector("#A");
		this.B = document.querySelector("#B");
		this.C = document.querySelector("#C");
		
		this.p0 = new THREE.Vector3();
		this.p1 = new THREE.Vector3();
		this.p2 = new THREE.Vector3();
		
		let material = new THREE.MeshLambertMaterial(
		{color:0xFF0000});
		let geometry=new THREE.CylinderGeometry( 0.05, 0.05, 1, 12);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0.5, 0 ) );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX(THREE.Math.degToRad( 90 ) ) );
		
		this.cylinderAB = new THREE.Mesh( geometry, material );
		this.lineAB = document.querySelector('#lineAB').object3D;
		this.lineAB.add( this.cylinderAB );
		this.cylinderAB.visible = false;
		
		this.cylinderBC = new THREE.Mesh( geometry, material );
		this.lineBC = document.querySelector('#lineBC').object3D;
		this.lineBC.add( this.cylinderBC );
		this.cylinderBC.visible = false;
		
		this.cylinderAC = new THREE.Mesh( geometry, material );
		this.lineAC = document.querySelector('#lineAC').object3D;
		this.lineAC.add( this.cylinderAC );
		this.cylinderAC.visible = false;
	},

	tick: function (time, deltaTime) 
	{
		if ( markerVisible["A"] && markerVisible["B"] ) 
		{
			this.A.object3D.getWorldPosition(this.p0);
			this.B.object3D.getWorldPosition(this.p1);
			let distance = this.p0.distanceTo( this.p1 );
			this.lineAB.lookAt( this.p1 );
			this.cylinderAB.scale.set(1,1,distance);
			this.cylinderAB.visible = true;
		}
		if ( markerVisible["B"] && markerVisible["C"] ) 
		{
			this.B.object3D.getWorldPosition(this.p1);
			this.C.object3D.getWorldPosition(this.p2);
			let distance = this.p1.distanceTo( this.p2 );
			this.lineBC.lookAt( this.p2 );
			this.cylinderBC.scale.set(1,1,distance);
			this.cylinderBC.visible = true;
		}
		if ( markerVisible["A"] && markerVisible["C"] ) 
		{
			this.A.object3D.getWorldPosition(this.p0);
			this.C.object3D.getWorldPosition(this.p2);
			let distance = this.p2.distanceTo( this.p0 );
			this.lineAC.lookAt( this.p0 );
			this.cylinderAC.scale.set(1,1,distance);
			this.cylinderAC.visible = true;
		}
		
		if ( !markerVisible["A"] )
			this.cylinderAB.visible = this.cylinderAC.visible = false;
		if ( !markerVisible["B"] )
			this.cylinderAB.visible = this.cylinderBC.visible = false;
		if ( !markerVisible["C"] )
			this.cylinderAC.visible = this.cylinderBC.visible = false;
		}
});
