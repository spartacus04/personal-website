import './style.css'
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg') !,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);


if (window.innerWidth < 870) {
	camera.position.setX(-3);
}

renderer.render(scene, camera);

document.body.classList.add('visible')

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const addStar = () => {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({
		color: 0xffffff
	});
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
};

Array(200).fill(null).forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('assets/space.png');
scene.background = spaceTexture;

// Avatar

const pfpTexture = new THREE.TextureLoader().load('assets/pfp.png');

const pfp = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({
	map: pfpTexture
}));

scene.add(pfp);

// Earth 
const earthTexture = new THREE.TextureLoader().load('assets/earth.png');
const normalEarthTexture = new THREE.TextureLoader().load('assets/earth_normal.png');

const earth = new THREE.Mesh(
	new THREE.SphereGeometry(10, 64, 64),
	new THREE.MeshStandardMaterial({
		map: earthTexture,
		normalMap: normalEarthTexture,
	})
);

scene.add(earth);
// Moon

const moonTexture = new THREE.TextureLoader().load('assets/moon.png');
const normalTexture = new THREE.TextureLoader().load('assets/moon_normal.png');

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: moonTexture,
		normalMap: normalTexture,
	})
);

scene.add(moon);

// Sun

const sunTexture = new THREE.TextureLoader().load('assets/sun.png');

const sun = new THREE.Mesh(new THREE.SphereGeometry(300, 64, 64), new THREE.MeshBasicMaterial({
	map: sunTexture
}));


scene.add(sun)

sun.position.z = -250;
sun.position.x = -1000;
sun.position.y = -50;

moon.position.z = 17;
moon.position.x = -10;
moon.position.y = 5

pfp.position.z = -5;
pfp.position.x = 2;

// Scroll Animation

const getScrollPercent = () => {
	const {
		scrollTop,
		scrollHeight
	} = document.scrollingElement!;
	return scrollTop / (scrollHeight - window.innerHeight);
}

const moveCamera = () => {
	const t = document.body.getBoundingClientRect().top;

	pfp.rotation.y = 5 * getScrollPercent();
	pfp.rotation.z = 5 * getScrollPercent();

	const w = +( < HTMLElement > document.querySelector('#bg') !).style.width.replace('px', '');

	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.position.z += w < 870 ? 4 : 0;
	camera.position.x += w < 870 ? 2 : 0;
	camera.position.y = w < 870 ? 3 : 0;

	camera.rotation.y = t * -0.0002;
};

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

const animate = () => {
	requestAnimationFrame(animate);

	moon.rotation.x += 0.0005;
	earth.rotation.y += 0.0002;
	earth.rotation.z += 0.0002;
	sun.rotation.x += 0.00002
	sun.rotation.y += 0.00002
	sun.rotation.z += 0.00002

	renderer.render(scene, camera);
};

animate();

window.onbeforeunload = () => {
	document.body.classList.remove('visible');
	renderer.clear();
	window.scrollTo(0, 0);
}

document.querySelector('#language') !.addEventListener('click', () => {
	document.body.classList.remove('visible');
	renderer.clear();
	window.scrollTo(0, 0);
	setTimeout(
		() => {
			window.location.href = window.location.href.includes('italian') ? '/index.html' : '/italian.html';
		},
		1000
	)
})

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.position.setX(0);


	if (window.innerWidth < 870) {
		camera.position.setX(-3);
	}

	moveCamera();
});