let markerVisible = { A: false, B: false, C: false , D: false, F: false };

AFRAME.registerComponent('registerevents', {
	init: function () {
		var marker = this.el;
	
		marker.addEventListener('markerFound', function() {
			console.log('markerFound', marker.id); 
			markerVisible[marker.id] = true;
		});

		marker.addEventListener('markerLost', function() {
			console.log('markerLost', marker.id); 
			markerVisible[marker.id] = false;
		});
	}
});


AFRAME.registerComponent('run', {
	init: function() {
		this.A = document.querySelector("#A");
		this.B = document.querySelector("#B");
		this.C = document.querySelector("#C");
		this.D = document.querySelector("#D");
		this.F = document.querySelector("#F");
		this.P = document.querySelector("#P");

		this.pA = new THREE.Vector3();
		this.pB = new THREE.Vector3();
		this.pC = new THREE.Vector3();
		this.pD = new THREE.Vector3();
		this.pF = new THREE.Vector3();

		let material = new THREE.MeshLambertMaterial({color:0xFF0000});
		let geometry=new THREE.CylinderGeometry( 0.05, 0.05, 1, 12);
		geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
		geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( THREE.MathUtils.degToRad( 90 ) ) );
		
		this.cylinderAB = new THREE.Mesh( geometry, material );
		this.lineAB = document.querySelector('#lineAB').object3D;
		this.lineAB.add( this.cylinderAB );
		this.cylinderAB.visible = false;

		this.cylinderBC = new THREE.Mesh( geometry, material );
		this.lineBC = document.querySelector('#lineBC').object3D;
		this.lineBC.add( this.cylinderBC );
		this.cylinderBC.visible = false;

		this.cylinderCD = new THREE.Mesh( geometry, material );
		this.lineCD = document.querySelector('#lineCD').object3D;
		this.lineCD.add( this.cylinderCD );
		this.cylinderCD.visible = false;
		
		this.cylinderDF = new THREE.Mesh( geometry, material );
		this.lineDF = document.querySelector('#lineDF').object3D;
		this.lineDF.add( this.cylinderDF );
		this.cylinderDF.visible = false;
		
		this.cylinderFA = new THREE.Mesh( geometry, material );
		this.lineFA = document.querySelector('#lineFA').object3D;
		this.lineFA.add( this.cylinderFA );
		this.cylinderFA.visible = false;
	},

	tick: function (time, deltaTime) {
		let Pr = 0;
		if ( markerVisible["A"] && markerVisible["B"] ) {
			this.A.object3D.getWorldPosition(this.pA);
			this.B.object3D.getWorldPosition(this.pB);
			let distance = this.pA.distanceTo( this.pB );
			Pr += distance;
			this.lineAB.lookAt( this.pB );
			this.cylinderAB.scale.set(1,1,distance);
			this.cylinderAB.visible = true;
		}
		if ( markerVisible["B"] && markerVisible["C"] ) {
			this.B.object3D.getWorldPosition(this.pB);
			this.C.object3D.getWorldPosition(this.pC);
			let distance = this.pB.distanceTo( this.pC );
			Pr += distance;
			this.lineBC.lookAt( this.pC );
			this.cylinderBC.scale.set(1,1,distance);
			this.cylinderBC.visible = true;
		}
		if ( markerVisible["C"] && markerVisible["D"] ) {
			this.C.object3D.getWorldPosition(this.pC);
			this.D.object3D.getWorldPosition(this.pD);
			let distance = this.pC.distanceTo( this.pD );
			Pr += distance;
			this.lineCD.lookAt( this.pD );
			this.cylinderCD.scale.set(1,1,distance);
			this.cylinderCD.visible = true;
		}
		if ( markerVisible["D"] && markerVisible["F"] ) {
			this.D.object3D.getWorldPosition(this.pD);
			this.F.object3D.getWorldPosition(this.pF);
			let distance = this.pD.distanceTo( this.pF );
			Pr += distance;
			this.lineDF.lookAt( this.pF );
			this.cylinderDF.scale.set(1,1,distance);
			this.cylinderDF.visible = true;
		}
		if ( markerVisible["F"] && markerVisible["A"] ) {
			this.F.object3D.getWorldPosition(this.pF);
			this.A.object3D.getWorldPosition(this.pA);
			let distance = this.pF.distanceTo( this.pA );
			Pr += distance;
			this.lineFA.lookAt( this.pA );
			this.cylinderFA.scale.set(1,1,distance);
			this.cylinderFA.visible = true;
		}
		if (markerVisible["A"] && markerVisible["B"] && markerVisible["C"] && markerVisible["D"] && markerVisible["F"])
			this.P.setAttribute('value', "P = "+Pr);
		else
			this.P.setAttribute('value', "");
			
		if ( !markerVisible["A"] )
			this.cylinderAB.visible = this.cylinderFA.visible = false;
		if ( !markerVisible["B"] )
			this.cylinderBC.visible = this.cylinderAB.visible = false;
		if ( !markerVisible["C"] )
			this.cylinderCD.visible = this.cylinderBC.visible = false;
		if ( !markerVisible["D"] )
			this.cylinderDF.visible = this.cylinderCD.visible = false;
		if ( !markerVisible["F"] )
			this.cylinderFA.visible = this.cylinderDF.visible = false;
	}

});

