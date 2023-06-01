import { MindARThree } from 'mindar-image-three';
import * as THREE from 'three';
import {loadGLTF} from "../../../js/loader.js"

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


		const wolf = await loadGLTF('Model/source/Dragon animation standing.glb');

		wolf.scene.position.set(0, -0.4, 0);
		//3. Прив'язати модель до цільового зображення (маркеру)
		anchor.group.add(wolf.scene);

		const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbbb, 1 );
		scene.add( light );

		//4. Запуск MindAR 
		await mindarThree.start();

		const gradus = Math.PI/180;

		//5. Цикл оновлення
		renderer.setAnimationLoop( () => {
			//if(isloaded)
			wolf.scene.rotation.y += 2*gradus;
			renderer.render(scene, camera);
		});
	}

	start();
});
