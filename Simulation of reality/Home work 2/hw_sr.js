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
		
		const loader = new THREE.TextureLoader();
		const geometry = new THREE.CircleGeometry(0.3, 32);
		const material = new THREE.MeshBasicMaterial({
			map: loader.load("myphoto.jpg")
		});
		const circle = new THREE.Mesh(geometry, material);
		anchor.group.add(circle);

		const geometry2 = new THREE.OctahedronGeometry(0.2, 1);
		const material2 = new THREE.MeshBasicMaterial({
			map: loader.load("https://raw.githubusercontent.com/kzahel/web-server-chrome/master/images/200ok-128.png")
		});
		const octahedron = new THREE.Mesh(geometry2, material2);
		anchor.group.add(octahedron);
		
		const geometry3 = new THREE.CapsuleGeometry( 0.2, 0.2, 4, 8 );
		const material3 = new THREE.MeshBasicMaterial({
			map: loader.load("https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/%D0%A4%D0%BB%D0%B5%D0%B1%D0%BE%D0%B4%D0%B8%D1%83%D0%BC_%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9.jpg/400px-%D0%A4%D0%BB%D0%B5%D0%B1%D0%BE%D0%B4%D0%B8%D1%83%D0%BC_%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9.jpg")
		});
		const capsule = new THREE.Mesh(geometry3, material3);
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