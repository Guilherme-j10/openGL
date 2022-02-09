import React, { useEffect } from 'react';
import * as THREE from 'three';
import './style.css';

function App() {

  const SpherRadius = 2;

  const convertCordinatesToSphere = (lat: number, long: number): { x: number, y: number, z: number } => {

    const latitude = lat * Math.PI / SpherRadius;
    const longitude = long * Math.PI / SpherRadius;

    return { 
      x: Math.cos(longitude) * Math.sin(latitude), 
      y: Math.sin(longitude) * Math.sin(latitude), 
      z: Math.cos(latitude)
    };

  }

  const InitializeGlobeElement = () => {

    const TargetElement = document.getElementById('targetElement');

    const WIDTH = TargetElement?.offsetWidth as number;
    const HEIGHT = TargetElement?.offsetHeight as number;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    const camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    TargetElement?.appendChild( renderer.domElement);

    const geometry = new THREE.SphereGeometry(SpherRadius, 90, 90);
    const material = new THREE.MeshPhongMaterial({
      shininess: 0.2,
      opacity: 0.3,
      transparent: true,
      depthWrite: false,
    });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0x3333ee, 2);
    light.position.set(10, 10, 10);
    scene.add(light);

    const Condinates = [ 
      { lat: -3.131583, long: -62.396477 }, 
      { lat: -10.402852, long: -57.360048 }, 
      { lat: -2.752022, long: -53.525119 },
      { lat: -23.470221, long:  -48.385198 } 
    ];

    for(let i in Condinates) {

      const positions = convertCordinatesToSphere(Condinates[i].lat, Condinates[i].long);

      const point = new THREE.SphereGeometry(.1, 10, 10);
      const matherial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sphere = new THREE.Mesh(point, matherial);

      sphere.position.set(positions.x, positions.y, positions.z);
      scene.add(sphere);

    }

    function animate() {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

  }   

  useEffect(() => {

    if(document.getElementById('targetElement')?.childElementCount == 0){

      InitializeGlobeElement();

    }

  }, []);

  return (
    <div className='TargetElement'>
      <div id='targetElement' className='ContainerTargetElement' ></div>
    </div>
  )
}

export default App
