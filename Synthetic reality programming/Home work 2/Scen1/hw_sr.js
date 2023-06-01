import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {

	const start = async () => {
		//1. Ініціалізація MindAR
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "Marker/targets.mind"
		});

		//2. Щось намалювати
		const {renderer, scene, camera} = mindarThree;

		const anchor = mindarThree.addAnchor(0);

		// Instantiate a loader
		const loader = new GLTFLoader();


		// Load a glTF resource
		loader.load(
			'Model/potted_plant_01_4k.gltf',

			// called when the resource is loaded
	 		( gltf ) => {
				gltf.scene.scale.set(0.6, 0.6, 0.6);
				gltf.scene.position.set(0, -0.4, 0);
				//3. Прив'язати модель до цільового зображення (маркеру)
				anchor.group.add(gltf.scene);
				
			},
			// called while loading is progressing
			( xhr ) => {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			( error ) => {
				console.log( 'An error happened: ', error );
			}
		);

		const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbbb, 1 );
		scene.add( light );

		//4. Запуск MindAR 
		await mindarThree.start();

		//5. Цикл оновлення
		renderer.setAnimationLoop( () => {
			//if(isloaded)
			renderer.render(scene, camera);
		});
	}

	start();
});
