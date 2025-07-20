
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    let sunGeo = new THREE.SphereGeometry(2, 32, 32);
    let sunMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    let sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    let earthGeo = new THREE.SphereGeometry(0.5, 32, 32);
    let earthMat = new THREE.MeshStandardMaterial({ color: 0x1e90ff });
    let earth = new THREE.Mesh(earthGeo, earthMat);

    let orbit = new THREE.Object3D();
    orbit.add(earth);
    scene.add(orbit);

    earth.position.x = 5;

    camera.position.z = 10;

    let isPaused = false;
    let earthOrbitSpeed = parseFloat(document.getElementById("earthSpeed").value);

    document.getElementById("pauseBtn").addEventListener("click", () => {
      isPaused = !isPaused;
      document.getElementById("pauseBtn").textContent = isPaused ? "▶ Resume" : "⏸ Pause";
    });

    document.getElementById("earthSpeed").addEventListener("input", (e) => {
      earthOrbitSpeed = parseFloat(e.target.value);
    });

    document.getElementById("themeBtn").addEventListener("click", () => {
      document.body.classList.toggle("light");
    });

    function animate() {
      requestAnimationFrame(animate);
      if (!isPaused) {
        orbit.rotation.y += earthOrbitSpeed;
        earth.rotation.y += 0.05;
      }
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });