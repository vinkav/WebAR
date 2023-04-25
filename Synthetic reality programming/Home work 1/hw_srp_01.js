import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "targets.mind",
		});
		const {renderer, scene, camera} = mindarThree;
		const anchor = mindarThree.addAnchor(0);
		
		const geometry = new THREE.CircleGeometry(0.3, 32);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ffff, transparent: true, opacity: 0.5
		});
		const circle = new THREE.Mesh(geometry, material);
		anchor.group.add(circle);

		const geometry2 = new THREE.OctahedronGeometry(0.2, 1);
		const octahedron = new THREE.Mesh(geometry2, material);
		anchor.group.add(octahedron);
		
		const geometry3 = new THREE.CapsuleGeometry( 0.2, 0.2, 4, 8 );
		const capsule = new THREE.Mesh(geometry3, material);
		anchor.group.add(capsule);


		circle.position.x = 0.5;
		capsule.position.x = -0.5;
		octahedron.position.x = 0;
		octahedron.position.y = -0.5;

		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});

	}
	start();


});