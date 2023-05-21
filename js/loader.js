import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

import * as THREE from 'three';

// завантаження моделей
export const loadGLTF = (path) => {
	return new Promise( (resolve, reject) => {
		const loader = new GLTFLoader();
		loader.load(path, (gltf) => {
			resolve(gltf);
		}),
		(xhr) => {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded from '+ path );
		},
		(error) => {
			reject(error);
		}
	});
}

// завантаження аудіо
export const loadAudio = (path) => {
	return new Promise( (resolve, reject) => {
		const loader = new THREE.AudioLoader();
		loader.load(path, (audio) => {
			resolve(audio);
		});
	});
}


// завантаження відео
export const loadVideo = (path) => {
	return new Promise( (resolve, reject) => {
		const video = document.createElement("video");
		video.addEventListener("loadeddata", () => {
			video.setAttribute("playsinline", "");
			resolve(video);
		});
		video.src = path;
	});
}


// завантаження текстури
export const loadTexture = (path) => {
	return new Promise( (resolve, reject) => {
		const loader = new THREE.TextureLoader();
		loader.load(path, (texture) => {
			resolve(texture);
		});
	});
}


// завантаження набору текстур: [текстура1, текстура2, ..., текстураN]
export const loadTextures = (paths) => {
	const loader = new THREE.TextureLoader();

	const promises = [];

	for(let i = 0; i< paths.length; i++) 
		promises.push(new Promise((resolve, reject) => {
			loader.load(paths[i], (texture) => {
				resolve(texture);
			});
		}));

	return Promise.all(promises);
}



